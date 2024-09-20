export enum BannerStateEnum {
  ////////// System feedback //////////
  
  // Some error
  ERROR,

  BASKETPRODUCTADDED,

  BASKETPRODUCTREMOVED,


  ////////// API Endpoint /api //////////

  // Status: 200 OK
  DATABASERESETSUCCESSFUL,


  ////////// API Endpoint /accounts //////////

  // Status: 200 OK
  ACCOUNTLOGINSUCCESSFUL,

  // Status: 400 Bad request
  ACCOUNTLOGINERROR,

  // Status: 401 Unauthorized
  ACCOUNTLOGINWRONGLOGIN,

  // Status: 201 Created
  ACCOUNTREGISTERSUCCESSFUL,

  // Status: 400 Bad request
  ACCOUNTREGISTERERROR,

  // Status: 409 Conflict
  ACCOUNTREGISTERUSERNAMEINUSE,

  // Status: 200 OK
  ACCOUNTUPDATESUCCESSFUL,

  // No status code, runs in local cache
  ACCOUNTLOGOUTSUCCESSFUL,


  ////////// API Endpoint /categories //////////

  // Status: 201 Created
  CATEGORYCREATESUCCESSFUL,

  // Status: 200 OK
  CATEGORYDELETESUCESSFUL,

  // Status: 400 Bad request
  CATEGORYCREATEERROR,

  // Status: 400 Bad request
  CATEGORYDELETEERROR,


  ////////// API Endpoint /orders //////////

  // Status: 201 Created
  ORDERPLACESUCCESSFUL,


  ////////// API Endpoint /products //////////

  // Status: 201 Created
  PRODUCTCREATESUCCESSFUL,

  // Status: 400 Bad request
  PRODUCTCREATEERROR,

  // Status: 200 OK
  PRODUCTDELETESUCCESSFUL,

  // Status: 400 Bad request
  PRODUCTDELETEERROR
}