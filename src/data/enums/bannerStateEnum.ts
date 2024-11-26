export enum BannerStateEnum {
  ////////// System feedback //////////
  
  // Unknown error
  ERROR,

  // Ticket added to basket
  BASKETTICKETADDED,

  // Ticket removed from basket
  BASKETTICKETREMOVED,


  ////////// Exercise feedback //////////

  EXERCISESOLVED01,

  EXERCISESOLVED02,

  EXERCISESOLVED03,

  EXERCISESOLVED11,

  EXERCISESOLVED12,

  EXERCISESOLVED21,

  EXERCISESOLVED22,

  EXERCISESOLVED23,

  EXERCISESOLVED24,

  EXERCISESOLVED25,

  EXERCISESOLVED31,

  EXERCISESOLVED32,


  ////////// API Endpoint /api //////////

  // Status: 200 OK
  DATABASERESETSUCCESSFUL,

  // Status: 200 OK
  EXERCISEPROGRESSRESETSUCCESSFUL,


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
  ACCOUNTREGISTERUSERNAMEORMAILINUSE,

  // Status: 200 OK
  ACCOUNTUPDATESUCCESSFUL,

  // Local check on unvalid username
  ACCOUNTUSERNAMETOOSHORT,

  // Local check on unvalid password
  ACCOUNTPASSWORDTOOSHORT,

  // Local check on unvalid mail address
  ACCOUNTMAILADDRESSUNVALID,

  // No status code, runs in local cache
  ACCOUNTLOGOUTSUCCESSFUL,


  ////////// API Endpoint /orders //////////

  // Status: 201 Created
  ORDERPLACESUCCESSFUL,


  ////////// API Endpoint /bands //////////

  BANDSAVEDSUCCESSFUL,

  BANDSAVEDERROR,

  BANDDELETESUCCESSFUL,

  BANDDELETEERROR,

  ////////// API Endpoint /genres //////////

  GENRESAVEDSUCCESSFUL,

  GENRESAVEDERROR,
  
  GENREDELETESUCCESSFUL,

  GENREDELETEERROR
}