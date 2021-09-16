// ##### Update queries:

// - updateOne(<filter>, <update>, <options>);
// - updateMany(<filter>, <update>, <options>);
// - replaceOne(<filter>, <update>, <options>);

// There are many update operators, either for noraml fields, arrays, modifiers, bitwise and so on
// Look at the manual, such as:
// - $inc => increments.
// - $mul => multiply the field with a value.
// - $currentDate => update the field with the current date.
// - $set => update the document with given data.
// - $unset => deletes a certain field (removes).


// ### $set
// if the specified field to update doesn't exist => then create it.

    db.sample.updateOne({name: 'ahmed'}, {
        $set: { // to updated any field i want
            name: "ahmed", 
            age: 22,
            email: 'ahmed@gmail.com',
        },
        $push: {
            tags: 'four' // to add this value to an array
        }
    })
    // to increment every element in this array with 5
    db.sample.updateOne({name: 'ahmed'}, {
        $inc: {
            'tags.$[]': 5
        }
    })
    // update certain field in the array (i know it's index)
    db.sample.updateOne({name: "ahmed"}, {
        $set: {
            "tags.0": 'one',
            "tags.1": 'two',
            "tags.2": {
                name: "son 1name",
                age: 'son 1 name'
            }
        }
    })


    // $unset
    db.sample.updateOne({name: 'ahmed'}, {
        $unset: { // here we removed a field from a sub document
            'tags.2.age': ''
        }
    })

    // replaceOne(<query>, <replacement>, <options>) => It replaces the document with a whole new document
    // Note: "_id" doesn't change aftehr this operation
    db.sample.replaceOne({name: 'ahmed'}, {

    })

    // $rename operator => it updates the field name to whatever we want
    db.sample.udpateMany({}, {
        $rename: {          // we have to change this typo, right?
            "nmae": "name"
        }
    })
    // if we want to rename an embeded field (Using dot notation)
    db.sample.udpateMany({}, {
        $rename: {          // 
            "name.first": "fname"
        }
    })
    // if the given field doesn't exist, then nothing happens

    // $currentDate operator => It's good to save the time of user creating a document or updating it
    db.sample.updateOne({name: 'ahmed'}, {
        $set: {
            lastUpdatedAt: new Date()
        }
    })
    // If we want to update all the docs that don't have updatedAt and add this field
    db.sample.updateMany({updatedAt: {$exists: false}}, { // all the docs that don't have this updatedAt field
        $currentDate: {
            updatedAt: true // this means add the current date to this field
        }
    })
    db.sample.updateOne({name: 'ahmed'}, {
        $currentDate: {
            updatedAt: true // this means add the current date to this field
        }
    })
// Another array update operators

    // $push => adds element to an exists array (if doesn't exists, create one)
    db.sample.updateOne({name: 'ahmed'}, {
        $push: {
            tags: 'new tag'
        }
    })
    // there are many modifiers, that we can use them with array update operators and so on
    // like $each operator, we can use it with $push, $addToSet operators
    db.sample.updateOne({name: 'ahmed'}, { // to add more than one array item
        $push: {
            tags: {
                $each:  // our modifier
                    // here we add as much items as we want
                    [NumberInt(2343), NumberInt(2343)]
            }
        }
    })
    // $addToSet operator => Is just like $push, but adds the element only if it doesn't exist already.
    // the syntax is just like $push
    db.sample.updateOne({name: 'ahmed'}, { // to add more than one array item
        $addToSet: {
            tags: {
                $each:  // our modifier
                    // here we add as much items as we want
                    [NumberInt(2343), NumberInt(22222)] // this should adds only the second element
                    // as the first is already there.
            }
        }
    })
    // $push operator => to delete either the first or last element in the specified array
    // pass -1 to remove the first element, and 1 to remvoe the last element
    db.sample.updateOne({name: 'ahmed'}, {
        $pop: {
            tags: 1 // this should removes the last element
        }
    })
    // $pull => It removes all array elements that match the specified query
    db.sample.updateOne({name: 'ahmed'}, {
        $pull: {
            tags: {
                $in: ['one', 'two'] // to remove these elements from the array
            },
            lovedFruits: 'carrots' // the same but, on anoter field
        }
    })
    // $pullAll => To remove all instances in the array that match a specified value (remove duplicates)
        { _id: 1, scores: [ 0, 2, 5, 5, 1, 0 ] } // remove the duplicates
        db.sample.updateOne({_id: 1}, {
            $pullAll: {
                scores: [0, 5] // this sould returns scores: [2, 1]
            }
        })


       