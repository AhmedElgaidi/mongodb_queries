// MongoDB queries and projection operators


// ######### Comparison operators:
// eq,ne,gt,gte,lt,lte,in,nin
// examples
{

{
    favoriteFruit: {
        $ne: "apple"
    }
}

{
    age: {
        $gt: 25
    }
}
{
    age: {
        $gt: 20,
        $lt: 25
    }
}

{
    eyeColor: {
        $in: ["green", "blue"]
    }
}
{
    eyeColor: {
        $nin: ["green", "blue"]
    }
}
{
    age: {
        $in: [20, 21]
    }
}

}

// ##### Logical operators:
// and,not,or,nor
// and,or,nor => takes and array of conditons, separated with coma
// while $not is ordinary

{

{
    $and: [
        {gender: "male"},
        {age: 25}
    ]
}
{
    $and: [
        {
            age: {
                $gt: 20
            }
        },
        {
            eyeColor: {
                $in: ["green", "blue"]
            }
        }
    ]
}
{
    $or: [
        {
            age: {
                $gt: 20
            }
        },
        {
            age: {
                $gt: 30
            }
        }
    ]
}
// the upper query is same as this
{
    age: {
        $in: [20, 30]
    }
}

// if we wanted to pass more than conditions, and we didn't use $and operator, then the last condition will 
// override the previous conditions
}

// Query embeded documents
{

    {
        "friends.name": "Glenna Jones"
    }

}

// ####### Array operators:
// all,elemMatch,size
{
    { 
        tags: { 
            $all: [ "ssl" , "security" ] 
        }
    }
    // equals to 
    { 
        $and: [ 
            { tags: "ssl" }, 
            { tags: "security" } 
        ] 
    }
    // $size is ordinary
    {
        tags: { 
            $size: {
                $gte: 2
            } 
        }  
    }
    // elemMatch takes document of query documents
    // this is our docs schema
    { _id: 1, results: [ 82, 85, 88 ] }
    results: { 
        $elemMatch: { 
            $gte: 80, $lt: 85 // this query matchs only docs that have at least one element matchs our con.
        } 
    }
    // what if our array has objects not just number or strings ? (like the previous)
    // look at this schema
    { 
        "_id": 1, 
        "results": [ 
            { "product": "abc", "score": 10 },
            { "product": "xyz", "score": 5 } 
        ] 
    }
    // our query
    { 
        results: { 
            $elemMatch: { // matchs only docs that have at least one element' product equals 'xyz
                            // and the score is gte 8
                product: "xyz", 
                score: { 
                    $gte: 8 
                } 
            } 
        } 
    }
    // another query
    // what if we want to match only one condition ?
    { 
        "results.product": "xyz" // that's it
    }
    // we could make it more complex
    // - with elemMatch
    {// returns docs, where any element of these products is not 'xyz', not effcient
        "results": { 
            $elemMatch: { 
                product: { 
                    $ne: "xyz" 
                } 
            } 
        } 
    }
    // - without elemMatcn
    { // returns all the docs , where all the results's products are not 'xyz', effiecient
        "results.product": {
             $ne: "xyz" 
        } 
    }
    // Remember: // elemMatch means at least one nested docuement in the array matchs the conditions
    {
        arrField: {
            $elemMatch: {
                c1,
                c2,
                c3
            }
        }
    }
    //example
    {
        friends: {
            $elemMatch: {
                name: "Bob",
                age: 25
            }
        }
    }
}

// ###### Element operators:
// exists,type
{
    {
        field: { 
            $exists: boolean
        }
    }
    {
        qty: { // matchs all the docs that have qty field and the values doesn't include 5, 15
            $exists: true, $nin: [ 5, 15 ] }
        // or one conditon
        qty: { 
            $exists: false
        }

    }
    // type:
    {
        tags: { // there are many types, look at the mognodb docs
            $type: "array" 
        } 
        // or
        quantity: {
            $type: ['int', 'double'] // the value is either integer or double
        }
        // or
        index: {
            $type: "int", // the value must be integer and equals to 5
            $eq: 5
        }
    }

}

// We can filter the output
// - With select() method in mongoose
// - or with this
// db.collection.find({<our query>}, {<this is called our filter>
    // name: 1,                         // this will ouput those fields only, just as select mehtod
    // age: 1,
    // 'company.location: 1,
    // _id: 0                           // this exclude this property
// })

// Note: this filtering called projection also (dividing large doc to smaller one)


// ############# Evaluation operators:
// regex,text, where
{
    // regex
    {
        // <field>: { $regex: /pattern/, $options: '<options>' }
        // or
        // <field>: { $regex: 'pattern', $options: '<options>' }
        // or
        // <field>: { $regex: /pattern/<options> } // just as javascipt regex
        sku: { 
            $regex: /^ABC/i
        } 
    }
    // text
    // the field must be indexed first
    // db.collection.createIndex({
        // subject: "text" 
    // })
    // our sample
    [
        { _id: 1, subject: "coffee", author: "xyz", views: 50 },
        { _id: 2, subject: "Coffee Shopping", author: "efg", views: 5 },
        { _id: 3, subject: "Baking a cake", author: "abc", views: 90  },
        { _id: 4, subject: "baking", author: "xyz", views: 100 },
        { _id: 5, subject: "Café Con Leche", author: "abc", views: 200 },
        { _id: 6, subject: "Сырники", author: "jkl", views: 80 },
        { _id: 7, subject: "coffee and cream", author: "efg", views: 10 },
        { _id: 8, subject: "Cafe con Leche", author: "xyz", views: 10 }
    ]
    //
    // then
    { // this will return all the docs that have 'coffee' in the index field "subject"
        $text: { $search: "coffee" } 
    }
    // And this 
    { 
        $text: { // this returns all the docs that have one of these values in the indexed field
            $search: "bake coffee cake" 
        } 
    }

}