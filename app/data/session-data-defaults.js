/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  // Insert values here
  "numberChildren": 0,
  "numberApplicants": "",

  "idFirstApplicant": [],
  "firstApplicantPreviousNames": [],
  "firstApplicantPreviousFirstNames": [],
  "firstApplicantPreviousLastNames": [],
  "firstApplicantNameCount": 0,

  "idSecondApplicant": [],
  "secondApplicantPreviousNames": [],
  "secondApplicantPreviousFirstNames": [],
  "secondApplicantPreviousLastNames": [],
  "secondApplicantNameCount": 0,

  "firstApplicantNationalityId": [],
  "firstApplicantNationalities": [],
  "firstApplicantNationalityCount": 0,

  "secondApplicantNationalityId": [],
  "secondApplicantNationalities": [],
  "secondApplicantNationalityCount": 0,

  "motherNationalityId": [],
  "motherNationalities": [],
  "motherNationalityCount": 0,

  "fatherNationalityId": [],
  "fatherNationalities": [],
  "fatherNationalityCount": 0,

  "childNationalityId": [],
  "childNationalities": [],
  "childNationalityCount": 0,

  "childOrderId": [],
  "childOrderType": [],
  "childOrderNumber": [],
  "childOrderCourt": [],
  "childOrderDay": [],
  "childOrderMonth": [],
  "childOrderYear": [],
  "childOrderCompleted": [],
  "childOrderCount": 0,
  "childOrderIncomplete": 1,

  "siblingOrderId": [],
  "siblingFirstNames": [],
  "siblingLastNames": [],
  "siblingOrderType": [],
  "siblingOrderNumber": [],
  "siblingOrderCourt": [],
  "siblingOrderDay": [],
  "siblingOrderMonth": [],
  "siblingOrderYear": [],
  "siblingOrderCompleted": [],
  "siblingOrderCount": 0,
  "siblingOrderIncomplete": 1,

  "uniqueSiblingId": [],
  "uniqueSiblingFirstNames": [],
  "uniqueSiblingLastNames": [],
  "numberOfSiblings": 0,

  "firstApplicant": "Primary applicant",
  "secondApplicant": "Second applicant",
  "child": "The child's details",
  "mother": "Birth mother's details",
  "father": "Birth father's details",
  "other-parent": "Other parent's details",
  "socialworker": "Your adoption agency or local authority details",
  "childsocialworker": "The child's adoption agency or local authority details",
  "solicitor": "Your solicitor",
  "sibling": "Sibling details",
  "court": "Court details",
  "checkpaysubmit": "Review your application, pay and send",

  "monthName": [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]


,}
