// MongoDB aggregation framework

// - It's really the most powerful tool that mongodb offers.
// - Aggregation means multiple operations on data to get single computed result
// - Aggregation operations group values from multiple documents together, to perform some operations and 
// get our disered result.  

// Aggregation is just a process of stages that our docs go throw (Array of stages)
// Every stage pass the docs the next stage to it's work, until the end to get our disered result
// Every stage get the docs as input and do it's function and give the output to the next stage in our pipeline
// db.collection.aggregate([<stage1>, <stage2>, ...., <stageN>])

// ##### Some common aggregation framework stages (to filter docs with our disered queries): 
// - $match
// - $group
// - $sort
// - $count
// - $project
// - $limit
// - $unwind
// - $skip

// $group (_id is mandatory field)

// To group certain field or many fields => to return unique values (All possible combination)

// Aggregation expressions refer to the name of the field in the docs as follows:

{ $group: {_id: "$age"}}      //this is our first stage and $age is the expression (Has to be string)
// this returns array of this form (unique values, no duplicates)
{ _id: 24 }

// Another example with dot notation
db.users.aggregate([ // returns all the country in our database with no duplicates (all the examples are the same)
    { 
        $group: {
            _id: "$company"
        } 
    }
])

// if we want to add more than one field
db.users.aggregate([
    { // this for example to know different ages of our male users in our system
        $group: {
            _id: { // by adding more fields here, we increase the possibities (so, more docs )
                age: '$age', // Note: you can change the key value any other name => but, it'll be used in the next stages
                gender: 'male' // change this to aggregate expression '$gender' to get all different ages for all genders
            }
        }
    }
])// this will return array of docs for all the collection in this form (unique values, no duplicates)
{ _id: { age: 39, gender: 'male' } }

// If we wanted to write more than one aggregate expresion:
db.users.aggregate([
    { 
        $group: {
            _id: "$name", 
            total: { // key name that will pass with to the next stage
                // $sum is our ordinary opertor
                $sum: "$price" // $price this is our expression
                
            }
        }
    }
])
//==================================================

// $match => to match docs haha

db.users.aggregate([
    { // our first stage
        $match: {
            $and: [
                {gender: 'female'},
                // {age: {
                //     $eq: 25
                //     }
                // }
            ]
        }
    }
])
// Let's comine $match and $group together in one pipeline:
db.users.aggregate([ // the order of used aggregate operators really matters
    // stage 1
    {
        $match: {
            favoriteFruit: 'strawberry' // will return all the docs that has this field with this value
        }
    },
    // stage 2
    { // now let's group these docs into distinct docs with only age and eye-color and gender
        $group: {
            _id: {
                age: '$age',
                eyeColor: '$eyeColor',
                gender: '$gender'
            }
        }
    }
])
// if we want to use math second (depends on our application)
db.users.aggregate([ // the order of used aggregate operators really matters
    // stage 1
    { // now let's group these docs into distinct docs with only age and eye-color and gender
        $group: {
            _id: {
                age: '$age',
                eyeColor: '$eyeColor',
                gender: '$gender'
            }
        }
    },
    // stage 2
    { // now, i have to use this syntax
        $match: { // will return all the docs that has this field with this value
            '_id.age': {
                $gt: 20
            } 
            // or
            '_id.eyeColor': 'blue'
        }
    }
])

//==============================================================

// $count aggregate stage => always be the last operator in our pipeline (of course, if we wanted to count)
// To get the number of all docs in our collection
// ###### Counting documents

// 1) using count operator
    db.users.aggregate([ 
        {
            $count: 'allDocumentsCount'
        }
    ])
// or
    db.users.aggregate([ // The same as above
        {
            $count: 'total'
        }
    ])
// these two ways are same as the count() with find({})
    db.users.find({}).count();

// 2) using toArray().length:
    db.users.aggregate([]).toArray().length;

// 3) using itcount() method:
    db.users.aggregate([]).itcount();

// Let's use $count with $group
db.users.aggregate([
    // stage 1
    {
        $group: {
            _id: '$eyeColor'
        }
    },
    // stage 2
    {   // returns 3
        $count: 'eyeColorscount'// this returns the number of docs (unique values) that enter this stage as input (blue, green, brown)
    }
]);
// if i wanted to group more than one field then
db.users.aggregate([
    // stage 1
    {
        $group: {
            _id: {
                eyecolor: '$eyeColor', 
                gender: '$gender'
            }
        }
    },
    // stage 2
    {
        $count: 'eyeColor_gender_count' // any name, i'd like to use (if there was another next stage), then i'll use this name
    }
]);
// Let's make it more complex and use $match with them
db.users.aggregate([
    // stage1
    {// get only element that match our query
        $match: {
            age: {
                $gte: 27
            }
        }
    },
    // stage 2
    { // let's make the docs unique (remove duplicates)
        $group: {
            _id: {
                eyeColor: '$eyeColor',
                gender: '$gender'
            }
        }
    },
    // stage 3
    { // let's count
        $count: 'countResult'
    }
    // The aggregation process goes as follows:
    // - returns docs that match our query
    // - pass them as input to our next stage ($group) => to decrease their number and return distinct values
    // - count those values
]);

//==============================================================

// $sort aggregate stage
// It's usually used after $match and $group stages
// It's used to sort certain field or many fields

db.users.aggregate([
    {
        $sort: {
            score: -1, // dec order
            // or add many fields
            age: 1 // asc order
        }
    }
]);
// let's comine it with other stages
db.users.aggregate([
    //stage 1
    {
        $group: { // this will return all the distinct fruit in our collection
            _id: '$favoriteFruit'
        }
    },
    {
        $sort: {
            _id: 1 // sort them alphapitically
        }
    }
]);
// Another example
db.users.aggregate([
    // stage 1
    {
        $match: {
            eyeColor: {
                $ne: 'blue' // exclude blue eye color docs
            }
        }
    },
    // stag2 
    {
        $group: {
            _id: {
                eyeColor: '$eyeColor',
                favoriteFruit: '$favoriteFruit'
            }
        }
    }, 
    // stage 3
    {
        $sort: {
            "_id.eyeColor": 1,
            "_id.favoritFruit": -1
        }
    }
]);

//==============================================================

// $project stage
// - Include/ exclude or adds new fields (re-construct)
{
    $project: {
        field1: 1, // means include
        field2: 0, // means exclude
        field3: '$expression'
    }
}
// examples
db.users.aggregate([
    {                    // It's like our select method in mongoose
        $project: {
            _id: 0,          // exclude this
            email: 1         // include this
        }
    }
]);
// if all values were 0, then these fields will be excluded and the rest will be returned
db.users.aggregate([
    {                    // It's like our limit operator in our ordinary find()
        $project: {
            _id: 0,          // return all fields except those fields
            email: 0         
        }
    }
]);
// example with expression instead of 1, 0
db.users.aggregate([
    {                    // It's like our limit operator in our ordinary find()
        $project: {          
            // this will only return those fields + _id (by default)
            name: 1,
            customNameForAge: '$age' // we can change the name   
        }
    }
]);
// So, we could use this stage for renaming fields or may be rec-constructing the document (but only in the output)
// I mean don't change the schema, it just make it simpler and prettier in outputing, as we may have super complex 
// docs and we want to get certain values from these embeded structures

// Let's re-construct our inputs (Imortant! ----> only in printing)
db.users.aggregate([
    {
        $project: {
            _id: 0,
            index: 1,
            name: 1,
            // now we create our new schema the way we want
            info: {
                eye_custom: "$eyeColor",
                company_custom: "$company",

            }
        }
    }
]);

//==============================================================

// $limit stage
// - limits the number of documnets returned

// when to use it?
// - during develpment to get a sample and make sure that everything is okay 
// - after $sort stage, to get the top result, let's say we sorted our products asc, then use limit to 5, to get the cheapest 5 docs in our collection and so on

db.users.aggregate([
    {
        $limit: 3 // return only the first 3 docs
    }
])

//==============================================================

// $unwind stage
// some times we play with array data and we want to use $project stage on them, but we can't,
// so, we have $unwind operator as it splits the array into document, each one has only elment
// tags: ['one', 'two', 'three'] => {tags: 'one'}, {tags: 'two'}, {tags: 'three'}

// This stage is always used with $group stage

// But, let's see it with $project
db.users.aggregate([
    {
        $limit: 1 // return only the first doc
    },
    {
        $unwind: '$tags' // convert this doc into N of docs (tags element number)
    },
    {   
        $project: { // then exclude everything except name, tags
            name: 1,
            tags: 1
        }
    }
    // so, our doc now is converted into many docs depending on array elements number
]);
// this is example is the common as $unwind is always used with $group
db.users.aggregate([
    {
        $unwind: '$tags' // split every do into docs equal to it's tag array number
    },
    {
        $group: {   // then remove the duplicates
            _id: '$tags'
        }
    }           // now we have all the tags in our database
])
// the result is 
[ // All tags
    { _id: 'exercitation' }, { _id: 'qui' },
    { _id: 'dolore' },       { _id: 'ullamco' },
    { _id: 'sunt' },         { _id: 'pariatur' },
    { _id: 'magna' },        { _id: 'velit' },
    { _id: 'aliquip' },      { _id: 'ut' },
    { _id: 'laborum' },      { _id: 'irure' },
    { _id: 'quis' },         { _id: 'reprehenderit' },
    { _id: 'officia' },      { _id: 'id' },
    { _id: 'ex' },           { _id: 'excepteur' },
    { _id: 'labore' },       { _id: 'ad' }
]

//==================================================

// $skip stage
// we use it to skip number of docs during aggregate stage
db.users.aggregate([
    {
        $match: {
            gender: 'female'
        }
    },
    // now, i want to skip the first 10 docs and use the rest in the next stage
    {
        $skip: 10 // that's it!
    }
])

//==================================================

// Common aggregation operators (Usually used with $project stage)

// Arithmetic expression operators:
// - $abs => retur absolute value of a number
// - $add => adds numbers to return the sum (works also for the date)
// - $subtract => subtract second number from first
// - $ceil => returns the nearst small number to the give number (just like js ceil method)
// - $floor => returns the largest number near to the given number
// - $divide => divides two given numbers
// - $pow => for exponents as 2**2
// - $mod => returns the reminder of the first nubmer divided by the second
// - $trunc => trunc the number as 123.234 to 123.2 if i want only on1 decimal number

// Array aggregation operators: 
// - $arrayElemAt => to return the elment at the specified array index
// - $arrayToObject => convert an array of key-value element into object
// - $objectToArray => the opposite of the above operator
// - $concatArrays => concats arrays
// - $zip => concates array but [[1, 2], [2, 3], [3, 4]] => [1, 2, 3],[2, 3, 4]
// - $slice => return a subset of an array
// - $size => returns total number of items of the array
// - $reverseArray => reverse the given array
// - $range => create a array with generated squence of numbers.
// - $map => just like in javascript, returns a new array after doing our expression
// - $first => return first element
// - $last => reteurn last element
// - $isArray => returns a boolean, checks the given operand is array or not
// - $indexOfArray => searchs in the array for certain given occurence
// - $in => check if a given element is in the array or not, return boolean

// Boolean aggregation operators:
// - $and => to evaluate one or more expression in our pipeline
// - $not => the reverse
// - or => to evalute one of the expression

// Comparison operators
// - $eq
// - $ne
// - $ge
// - $gte
// - $le
// - $lte

// Conditional aggregation operators:
// - $cond => To do if condition (ternary operator)
// - $switch => evaluates a series of case expressions

// There are other opertors we could use in our aggregate pipeline, see the manual as there are many.


db.users.aggregate([
    {
        $group: {
            _id: '$favoriteFruit', // return all the unique values of this key property
            count: {'$sum': 1}     // then add the num of docs of each
        }
    }// this returns the num of docs of each unique key property
])

db.users.aggregate([
    {
        $unwind: '$tags'// return splitted docs from tag array
    },
    {
        $group: { // return the count of all these occurences
            _id: '$tags',
            count: {$sum: NumberInt(1)}
        }
    }// returns the count of tags in my database
])

db.users.aggregate([
    {
        $group: {
            _id: '$company',
            avgAge: {
                $avg: '$age'
            }
        }
    } // returns average age of each company
])
// result
[
    { _id: 'SARASONIC', avgAge: 27 },
    { _id: 'KIOSK', avgAge: 22 },
    { _id: 'GEEKFARM', avgAge: 29 },
    { _id: 'BIFLEX', avgAge: 22 },
    { _id: 'KLUGGER', avgAge: 27 },
    { _id: 'ISBOL', avgAge: 38 },
    { _id: 'ZENSURE', avgAge: 37 },
    { _id: 'NUTRALAB', avgAge: 21 },
    { _id: 'NEWCUBE', avgAge: 39 },
    { _id: 'INRT', avgAge: 20 },
    { _id: 'PETIGEMS', avgAge: 38 },
    { _id: 'GENMY', avgAge: 25 },
    { _id: 'JETSILK', avgAge: 21 },
    { _id: 'VINCH', avgAge: 22 },
    { _id: 'ZAGGLE', avgAge: 26 },
    { _id: 'SUPPORTAL', avgAge: 25 },
    { _id: 'SUREMAX', avgAge: 31 },
    { _id: 'EXODOC', avgAge: 29 },
    { _id: 'MEDIOT', avgAge: 32 },
    { _id: 'MANGLO', avgAge: 30 }
  ]


// $out stage is used to save (if collection not found, creates it) our data returned 
// from our pipeline into a new collection

db.users.aggregate([
    {
        $project: {
            name: 1, // include those fields
            email: 1
        }
    }, 
    {
        $out: "aggregation_result" // the name of the created collection with these data.
    }
])