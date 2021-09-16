// Indexes improves mongoDB queries execution
// Without indexes, the whole collection must be scanned (COLLSCAN) => Slower
// Index stores sorted field values (asc, desc)
// If an approppriate index exsists, MongoDB performs only index scan (IXSCAN) => faster
// Each document has a default index (_id) and sorted in our DB in asc order. => unique
// After, we'll create our defined indexed fields, we can know all the indexed values by:
// db.collection.getIndexes() => reqturn an object with all indexed values (we defined, and _id)

// Whic fields should be indexed ?
// - Not just for fields that we want to do text search on it, but whatever field we want to improve it's perfomance.
// There is no limit for the indexed fields, so we can index whateverfield we want (especially common ones)

// we create index as follows:
// db.collection.createIndex({
//  <fieldName>: [1|-1], <options>
// })
// db.collection.createIndex({
    //age: 1
// })

// What about options ?
// - {background: true} => create index in the background and don't block other operations (important with
//  live databases),so always use it in our case.
// - {unique: true} => to make the index unique across the collection.
// - {name: "new name for the field"} => if we want to specify a name for our index field

// so the query will be:
// db.collection.createIndex({age: 1}, {unique: true}, {background: true},{name:  "customAgeIndex"}) 
// this creates an asc unique index on age field in the background, with custom name.

// How can we delete certain index | all indexes?
// db.collection.dropIndex({<fieldName: 1}); => delete cerain index.
// db.colleciton.dropIndexes(); // Delete all indexes except _id index.