// ###### Most common BSON data types

// mongoDB stores data in BSON format, that have many variable types we can use(more than standard json)
// if we will add the docs from our mongodb shell ,we need to specifiy them for not having any conflicts, as
// all the numbers in mongodb stored by defaule as a double (e.g => 1.3)
//                                                      shell syntax
// - ObjectId => ObjectId("6140c3e748f638381c26700d")   ObjectId()
// - string => "hello world"                            ""
// - Object => {name: 'ahmed'}                          {}
// - Array => [1, 2, 3]                                 []
// -Int32 => 10                                         Numberint()
// - Int64 => 247289347293                              NumberFloat()
// - Double => 20.2                                      0.0 => eg. 20.23
// - Boolean => true                                    true
// - Date => 2021-09-14T17:49:01.563+00:00              ISODate()