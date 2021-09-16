// ##### How to show all my databases ?
// - show dbs

// ##### How do i show the db name?
// -db

// ##### How do i delete/ drop the database
// Switch first to the database => use DATABASE_NAME
// db.dropDatabase()

// How to show all my collections in used db
// - show collections

// ##### How do i delete/ drop a colleciton from my database
// Switch first to the database => use DATABASE_NAME
// - db.COLLECTION_NAME.drop() => it will give false, it the collection doesn't exist.

// ##### How to delete a document in our collection:
// To remove either (one document, all the docs that match our query)
// (1) db.collection.remove(QUERY )  => to delete all matched docs
// - To delete only the first matched doc => db.collection.remove(QUERY, true)
// (2) db.collection.deleteOne(QUERY) => it's like remove(), but remove() is deprecated
// (3) db.collection.deleteMany(QUERY) => It deletes all the matched docs

// Note: using remove() or deleteMany() with no query will delete all the collection documents.