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
  "idFirstApplicant": [],
  "firstApplicantPreviousNames": [],
  "firstApplicantNameCount": 0,

  "idSecondApplicant": [],
  "secondApplicantPreviousNames": [],
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


  "numberChildren": 0,
  "numberApplicants": 0,

  "firstApplicant": "Primary applicant",
  "secondApplicant": "Other applicant",
  "child": "The child's details",
  "mother": "Birth mother details",
  "father": "Birth father details"
  

,}
