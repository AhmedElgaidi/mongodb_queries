// ##### MongoDB utilities (Not concerned with the shell):

// (1) mongoexport (download)
// - It exports mongodb collection data in JSON or csv format (json is the default)
// example:

// (1) export data from local database:
// mongoexport --db MY_DATABASE_NAME --collection COLLECTION_NAME --out MY_EXPORTED_DATA.json

// (2) export data from remote mongodb server:
// mongoexport --host REMOTE_SERVER_URL --username USERNAME --password PASSWORD --authenticationDatabase AUTH_DB
// --db DATABASE_NAME --collections COLLECTION_NAME --out MY_EXPORTED_DATA.json

// Note(1) if you want to export as CSV add --type=csv flag, or --jsonArray (json format, default)
// Note(2): if you want to export certain fields from the docs, add this flag --query {QUERY}

//======================================================

// (2) mongoimport: (send)
// - imports mongodb collection data in json or csv format (json is the default)
// example: 

// (1) If mongodb server is local:
// mongoimport --db MY_DATABASE --collection COLLECTION_NAME --file Imported_data.json

// (2) if mongodb server is remote:
// mongoimport --host REMOTE_SERVER_URL --username USERNAME --password PASSWORD --authenticationDatabase AUTH_DB
// --db DATABASE_NAME --collections COLLECTION_NAME --file MY_IMPORTED_DATA.json

// Note: to specify file type, add this flag --type=csv (json is the default)

//=======================================================

// (3) mongodump => used for copying the database into a folder (Used as a backup)

// mongodump --host REMOTE_SERVER_URL --username USERNAME --password PASSWORD --authenticationDatabase AUTH_DB
// --db DATABASE_NAME --collections COLLECTION_NAME --out FOLDER_NAME --archive=<FILE_NAME.gz> --gzip
// last flag is to export that BSON (binary) data into compressed folder

//=======================================================

// (4) mongorestore => restores the data we dumped it with mongodump (use our backup again)

// - All indexes will be re-created
// mongorestore -host REMOTE_SERVER_URL --username USERNAME --password PASSWORD --authenticationDatabase AUTH_DB
// --db DATABASE_NAME --collections COLLECTION_NAME --dir FOLDER_NAME --archive FOLDER_NAME
// Note: either dir or archive flags is written

// (5) mongostat => To get mongodb statistics in real time

// mongostat -host REMOTE_SERVER_URL --username USERNAME --password PASSWORD --authenticationDatabase AUTH_DB
// --db DATABASE_NAME --collections COLLECTION_NAME

// the output is real time, so it's good in monitoring

//=======================================================

// (6) mongotop => for top mongodb current read, write operations