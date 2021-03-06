const { uniqueSiblingFirstNames } = require("../../data/session-data-defaults");

module.exports = (router) => {

// ******************************************** ELIGIBILITY ********************************************
// ************************************************************************************************************************************

// ********************** Eligibility **********************
  router.post('/research-8/eligibility/under-18', function(req, res) {
    var errors = []
    if (req.body['child-under-18'] === undefined) {
      errors.push({
      text: "Please answer the question",
      href: '#under-18'
      })
    }

    if (errors.length === 0) {
      if (req.body['child-under-18'] === "Yes") {
        res.redirect('/research-8/eligibility/married')
      }
      else {
        res.redirect('/research-8/eligibility/cannot-apply-over-18')
      }
    }
    else {
        res.render('.//research-8/eligibility/under-18', { errors: errors })
    }

  })


  router.post('/research-8/eligibility/married', function(req, res) {
    var errors = []
    if (req.body['child-married'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#married'
      })
    }

    if (errors.length === 0) {
      if (req.body['child-married'] === 'Yes') {
        res.redirect('/research-8/eligibility/cannot-apply-married')
      }
      else {
        res.redirect('/research-8/eligibility/under-21')
      }
    }
    else {
        res.render('.//research-8/eligibility/married', { errors: errors })
    }

  })


  router.post('/research-8/eligibility/under-21', function(req, res) {
    var errors = []
    if (req.body['under-21'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#under-21'
      })
    }

    if (errors.length === 0) {
      if (req.body['under-21'] === "Yes") {
        res.redirect('/research-8/eligibility/domicile')
      }
      else {
        res.redirect('/research-8/eligibility/cannot-apply-under-21')
      }
    }
    else {
        res.render('.//research-8/eligibility/under-21', { errors: errors })
    }
  })


  router.post('/research-8/eligibility/domicile', function(req, res) {
    var errors = []
    if (req.body['domicile'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#domicile'
      })
    }

    if (errors.length === 0) {
      if (req.body['domicile'] === "Yes") {
        res.redirect('/research-8/eligibility/lived-uk')
      }
      else {
        res.redirect('/research-8/eligibility/cannot-apply-domicile')
      }
    }
    else {
        res.render('.//research-8/eligibility/domicile', { errors: errors })
    }
  })


  router.post('/research-8/eligibility/lived-uk', function(req, res) {
    var errors = []
    if (req.body['lived-uk'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#lived-uk'
      })
    }

    if (errors.length === 0) {
      if (req.body['lived-uk'] === "Yes") {
        res.redirect('/research-8/registration/start1')
      }
      else {
        res.redirect('/research-8/eligibility/cannot-apply-lived-uk')
      }
    }
    else {
        res.render('.//research-8/eligibility/lived-uk', { errors: errors })
    }
  })


  router.post('/research-8/eligibility/do-you-need-help-with-fees', function(req, res) {
    var errors = []
    if (req.body['need-help-with-fees'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#need-help-with-fees'
      })
    }

    if (errors.length === 0) {
      if (req.body['need-help-with-fees'] === "Yes") {
        res.redirect('/research-8/eligibility/apply-for-help-with-fees')
      }
      else {
        res.redirect('/research-8/registration/start1')
      }
    }
    else {
        res.render('.//research-8/eligibility/do-you-need-help-with-fees', { errors: errors })
    }
  })





// ******************************************** SAVE AS DRAFT ********************************************
// ************************************************************************************************************************************
  router.post('/research-8/save-as-draft', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        res.redirect('/research-8/task-list')
    }
    else {
      res.redirect('/research-8/task-list')
    }
  })
 


// ******************************************** SECTION 1. APPLICATION ********************************************
// ************************************************************************************************************************************

  // ********************** Number of applicants **********************
  router.post('/research-8/application/number-of-applicants', function(req, res) {
    var errors = []
    if (req.body['number-of-applicants'] === undefined) {
      errors.push({
      text: 'Select an option which best describes who is applying',
      href: '#number-of-applicants'
      })
    }
    else if (req.body['number-of-applicants'] === "other" && req.body['other-relationship-description'].length == 0 ) {
      errors.push({
        text: 'Provide details of your relationship with the other applicant',
        href: '#other-explanation'
        })

    }

    req.session.data.numberApplicants = req.body['number-of-applicants']

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/research-8/task-list')
      }
      else {
        res.render('.//research-8/application/number-of-applicants', { errors: errors })
      }
    }
    else {
        res.redirect('/research-8/save-as-draft')
    }
    console.log("Applicants: ", req.session.data.numberApplicants)
  })


  // ********************** Number of children **********************
  router.post('/research-8/application/number-of-children', function(req, res) {
    var errors = []
    if (req.body['number-of-children'] === undefined) {
      errors.push({
      text: 'Select number of children you are applying to adopt',
      href: '#number-of-children'
      })
    }
    else if (req.body['number-of-children'] === "3" && req.body['exact-number-children'].length == 0 ) {
      errors.push({
        text: 'Provide the exact number of children you are applying to adopt',
        href: '#other-explanation'
        })

    }

    req.session.data.numberApplicants = req.body['number-of-children']

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/research-8/task-list')
      }
      else {
        res.render('.//research-8/application/number-of-children', { errors: errors })
      }
    }
    else {
        res.redirect('/research-8/save-as-draft')
    }
    console.log("Applicants: ", req.session.data.numberApplicants)
  })


  // ********************** Date child moved in **********************
  router.post('/research-8/application/date-child-moved-in', function(req, res) {
    var errors = []
    if (req.body['day-moved-in'] === '' || req.body['month-moved-in'] === '' || req.body['year-moved-in'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-90 for different error messages',
      href: '#date-child-moved-in'
      })
    }
      if (req.body['submit-button'] === 'save-and-continue') {
        if (errors.length === 0) {
          req.session.data.dateMovedIn = 1
          res.redirect('/research-8/task-list')
        }
        else {
          res.render('.//research-8/application/date-child-moved-in', { errors: errors })
        }
      }
      else {
        delete req.session.data.dateMovedIn
        res.redirect('/research-8/save-as-draft')
      }
  })


  // ********************** Adoption agency or local authority **********************
  router.post('/research-8/application/local-authority-details', function(req, res) {
    var errors = []
    if (req.body['applicant-agency-name'] === '') {
      errors.push({
      text: 'Enter a name',
      href: '#name'
      })
    }
    if (req.body['applicant-phone-number'] === '') {
      errors.push({
      text: 'Enter a UK telephone number',
      href: '#phone'
      })
    }
    if (req.body['applicant-contact'] === '') {
      errors.push({
      text: 'Enter a name',
      href: '#contact'
      })
    }
    if (req.body['applicant-email'] === '') {
      errors.push({
      text: 'Enter an email address',
      href: '#email'
      })
    }

    req.session.data.agencyStatus = 'in progress'
    
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/research-8/application/applicant-other-adoption-agency')
      }
      else {
        res.render('.//research-8/application/local-authority-details', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/application/applicant-other-adoption-agency', function(req, res) {
    // console.log("Mother alive: ", req.body['other-adoption-agency'])
    var errors = []
    if (req.body['other-adoption-agency'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#other-adoption-agency'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['other-adoption-agency'] === 'yes') {
          res.redirect('/research-8/application/applicant-adoption-agency-details-2')
        }
        else {
          req.session.data.agencyStatus = 'completed'
          res.redirect('/research-8/task-list')
        }
      }
      else {
        res.render('.//research-8/application/applicant-other-adoption-agency', { errors: errors })
      }
    }
    else {
        res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/application/applicant-adoption-agency-details-2', function(req, res) {
    var errors = []
    if (req.body['applicant-agency-name-2'] === '') {
      errors.push({
      text: 'Enter a name',
      href: '#name'
      })
    }
    if (req.body['applicant-phone-number-2'] === '') {
      errors.push({
      text: 'Enter a UK telephone number',
      href: '#phone'
      })
    }
    if (req.body['applicant-contact-2'] === '') {
      errors.push({
      text: 'Enter a name',
      href: '#contact'
      })
    }
    if (req.body['agency-details-address-line-1'] === '') {
      errors.push({
      text: 'Enter the first line of the address',
      href: '#first-line'
      })
    }
    if (req.body['agency-details-address-town'] === '') {
      errors.push({
      text: 'Enter the town or city',
      href: '#town'
      })
    }
    if (req.body['agency-details-address-postcode'] === '') {
      errors.push({
      text: 'Enter the postcode',
      href: '#postcode'
      })
    }
    if (req.body['applicant-email-2'] === '') {
      errors.push({
      text: 'Enter an email address',
      href: '#email'
      })
    }


    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.agencyStatus = 'completed'
        res.redirect('/research-8/task-list')
      }
      else {
        res.render('.//research-8/application/applicant-adoption-agency-details-2', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/application/child-social-worker-details', function(req, res) {
    var errors = []
    if (req.body['child-social-worker-name'] === '') {
      errors.push({
      text: 'Enter a name',
      href: '#name'
      })
    }
    if (req.body['child-social-worker-la-name'] === '') {
      errors.push({
      text: 'Enter a name',
      href: '#laname'
      })
    }
    if (req.body['child-social-worker-phone-number'] === '') {
      errors.push({
      text: 'Enter a UK telephone number',
      href: '#phone'
      })
    }
    if (req.body['child-social-worker-email'] === '') {
      errors.push({
      text: 'Devs: "Enter an email address" [if left blank] or "Enter an email address in the correct format, like name@example.com" [if in the wrong format] ',
      href: '#email'
      })
    }

    req.session.data.agencyStatus = 'in progress'
  
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/research-8/application/local-authority-details')
      }
      else {
        res.render('.//research-8/application/child-social-worker-details', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })
  // router.post('/research-8/application/applicant-adoption-agency-details', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-agency-name'] === '') {
  //     errors.push({
  //     text: 'Enter a name',
  //     href: '#name'
  //     })
  //   }
  //   if (req.body['applicant-phone-number'] === '') {
  //     errors.push({
  //     text: 'Enter a UK telephone number',
  //     href: '#phone'
  //     })
  //   }
  //   if (req.body['applicant-contact'] === '') {
  //     errors.push({
  //     text: 'Enter a name',
  //     href: '#contact'
  //     })
  //   }
  //   if (req.body['applicant-email'] === '') {
  //     errors.push({
  //     text: 'Devs: "Enter an email address" [if left blank] or "Enter an email address in the correct format, like name@example.com" [if in the wrong format] ',
  //     href: '#email'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       req.session.data.agencyStatus = 'in progress'
  //       res.redirect('/research-8/application/applicant-other-adoption-agency')
  //     }
  //     else {
  //       res.render('.//research-8/application/applicant-adoption-agency-details', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/research-8/task-list')
  //   }
  // })


  // router.post('/research-8/application/applicant-other-adoption-agency', function(req, res) {
  //   // console.log("Mother alive: ", req.body['other-adoption-agency'])
  //   var errors = []
  //   if (req.body['other-adoption-agency'] === undefined) {
  //     errors.push({
  //     text: 'Please answer the question',
  //     href: '#other-adoption-agency'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       if (req.body['other-adoption-agency'] === 'yes') {
  //         res.redirect('/research-8/application/applicant-adoption-agency-details-2')
  //       }
  //       else {
  //         res.redirect('/research-8/application/child-social-worker-details')
  //       }
  //     }
  //     else {
  //       res.render('.//research-8/application/applicant-other-adoption-agency', { errors: errors })
  //     }
  //   }
  //   else {
  //       res.redirect('/research-8/task-list')
  //   }
  // })


  // router.post('/research-8/application/applicant-adoption-agency-details-2', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-agency-name-2'] === '') {
  //     errors.push({
  //     text: 'Enter a name',
  //     href: '#name'
  //     })
  //   }
  //   if (req.body['applicant-phone-number-2'] === '') {
  //     errors.push({
  //     text: 'Enter a UK telephone number',
  //     href: '#phone'
  //     })
  //   }
  //   if (req.body['applicant-contact-2'] === '') {
  //     errors.push({
  //     text: 'Enter a name',
  //     href: '#contact'
  //     })
  //   }
  //   if (req.body['applicant-email-2'] === '') {
  //     errors.push({
  //     text: 'Devs: "Enter an email address" [if left blank] or "Enter an email address in the correct format, like name@example.com" [if in the wrong format] ',
  //     href: '#email'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/research-8/application/child-social-worker-details')
  //     }
  //     else {
  //       res.render('.//research-8/application/applicant-adoption-agency-details-2', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/research-8/task-list')
  //   }
  // })


  // router.post('/research-8/application/child-social-worker-details', function(req, res) {
  //   var errors = []
  //   if (req.body['child-social-worker-name'] === '') {
  //     errors.push({
  //     text: 'Enter a name',
  //     href: '#name'
  //     })
  //   }
  //   if (req.body['child-social-worker-phone-number'] === '') {
  //     errors.push({
  //     text: 'Enter a UK telephone number',
  //     href: '#phone'
  //     })
  //   }
  //   if (req.body['child-social-worker-email'] === '') {
  //     errors.push({
  //     text: 'Devs: "Enter an email address" [if left blank] or "Enter an email address in the correct format, like name@example.com" [if in the wrong format] ',
  //     href: '#email'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       req.session.data.agencyStatus = 'completed'
  //       res.redirect('/research-8/task-list')
  //     }
  //     else {
  //       res.render('.//research-8/application/child-social-worker-details', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/research-8/task-list')
  //   }
  // })


  // ********************** Family court finder **********************
  router.post('/research-8/children/family-court-finder', function(req, res) {
    console.log(req.body['placementCourtName'])
    var errors = []
    if (req.body['same-family-court'] === undefined) {
      errors.push({
        text: "Please answer the question",
        href: '#no-radio'
        })
    }
    else if (req.body['familyCourtName'] === '' && req.body['same-family-court'] === 'No') {
      errors.push({
      text: "Enter the name of the court",
      href: '#no-court-name'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['same-family-court'] === 'Yes') {
          req.session.data.familyCourtName = req.body['placementCourtName']
        }
        req.session.data.familyCourtStatus = 'completed'
        res.redirect('/research-8/task-list')
      }
      else {
        res.render('.//research-8/children/family-court-finder', { errors: errors })
      }
    }
    else {
      if (req.body['court-name'] === '') {
        res.redirect('/research-8/save-as-draft')
      }
      else {
        req.session.data.familyCourtStatus = 'in progress'
        res.redirect('/research-8/save-as-draft')
      }
    }
  })






// ******************************************** SECTION 2. APPLICANTS ********************************************
// ************************************************************************************************************************************

  // ********************** First applicant personal details **********************
  router.post('/research-8/applicants/first-applicant-name', function(req, res) {
    var errors = []
    if (req.body['first-applicant-names'] === '') {
      errors.push({
      text: 'Enter your first names',
      href: '#first-names'
      })
    }
    if (req.body['first-applicant-last-names'] === '') {
      errors.push({
      text: 'Enter your last names',
      href: '#last-names'
      })
    }

    req.session.data.firstApplicantPersonalDetailsStatus = 'in progress'

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/research-8/applicants/first-applicant-other-names')
      }
      else {
        res.render('.//research-8/applicants/first-applicant-name', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/applicants/first-applicant-other-names', function(req, res) {
    var errors = []

    if (req.body['first-applicant-other-names'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#first-applicant-other-names'
      })
    }
    else if (req.body['first-applicant-other-names'] === "Yes") {
      if (req.body['first-applicant-previous-first-names'].length === 0 && req.session.data.firstApplicantNameCount < 1) {
        errors.push({
          text: 'Enter your first names',
          href: '#first-applicant-no-first-names'
        })
      }
      if (req.body['first-applicant-previous-last-names'].length === 0  && req.session.data.firstApplicantNameCount < 1) {
        errors.push({
          text: 'Enter your last names',
          href: '#first-applicant-no-last-names'
        })
      }
    }
    if (req.body['submit-button'] === 'add') {
      if (req.body['first-applicant-previous-first-names'].length === 0  && req.session.data.firstApplicantNameCount >= 1) {
        errors.push({
          text: 'Enter your first names',
          href: '#first-applicant-no-additional-first-names'
        })
      }
      if (req.body['first-applicant-previous-last-names'].length === 0 && req.session.data.firstApplicantNameCount >= 1) {
        errors.push({
          text: 'Enter your last names',
          href: '#first-applicant-no-additional-last-names'
        })
      }
    }

    count = req.session.data.firstApplicantNameCount
    if (req.body['submit-button'] === 'add') {
      if (req.body['first-applicant-previous-first-names'] !== '' && req.body['first-applicant-previous-last-names'] !== '') {
        req.session.data.firstApplicantPreviousFirstNames[count] = req.body['first-applicant-previous-first-names']
        req.session.data.firstApplicantPreviousLastNames[count] = req.body['first-applicant-previous-last-names']
        req.session.data.idFirstApplicant[count] = count
        req.session.data.firstApplicantNameCount = count + 1
        res.redirect('/research-8/applicants/first-applicant-other-names')
      }
      else {
        res.render('.//research-8/applicants/first-applicant-other-names', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['first-applicant-previous-first-names'].length !== 0 && req.body['first-applicant-previous-last-names'].length !==0) {
          req.session.data.firstApplicantPreviousFirstNames[count] = req.body['first-applicant-previous-first-names']
          req.session.data.firstApplicantPreviousLastNames[count] = req.body['first-applicant-previous-last-names']
          req.session.data.idFirstApplicant[count] = count
          req.session.data.firstApplicantNameCount = count + 1
        }
        res.redirect('/research-8/applicants/first-applicant-date-birth')
      }
      else {
        res.render('.//research-8/applicants/first-applicant-other-names', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/applicants/first-applicant-date-birth', function(req, res) {
    var errors = []
    if (req.body['first-applicant-day'] === '' || req.body['first-applicant-month'] === '' || req.body['first-applicant-year'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-149 for different error messages',
      href: '#first-applicant-date-birth'
      })
    }
      if (req.body['submit-button'] === 'save-and-continue') {
        if (errors.length === 0) {
          res.redirect('/research-8/applicants/first-applicant-occupation')
        }
        else {
          res.render('.//research-8/applicants/first-applicant-date-birth', { errors: errors })
        }
      }
      else {
        res.redirect('/research-8/save-as-draft')
      }
  })


  router.post('/research-8/applicants/first-applicant-nationality', function(req, res) {
    var errors = []

    if (req.body['first-applicant-british'] === undefined && req.body['first-applicant-irish'] === undefined && req.body['first-applicant-other'] === undefined) {
      // console.log("error")
      errors.push({
      text: 'Select if you are British, Irish or a citizen of a different country',
      href: '#first-applicant-nationality'
      })
    }
    else if (req.body['first-applicant-other'] !== undefined && req.session.data.firstApplicantNationalityCount === 0) {
      // console.log("no nationality added error: ", req.session.data.firstApplicantNationalities)
      errors.push({
      text: 'This is not a valid entry',
      href: '#first-applicant-no-nationality'
      })
    }

    count = req.session.data.firstApplicantNationalityCount
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.firstApplicantNationalities[count] = req.body['first-applicant-different-country']
        res.redirect('/research-8/applicants/first-applicant-occupation')
      }
      else {
        res.render('.//research-8/applicants/first-applicant-nationality', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-as-draft') {
      res.redirect('/research-8/save-as-draft')
    }
    else if (req.body['submit-button'] === 'add' && req.body['first-applicant-different-country'] !== '') {
      req.session.data.firstApplicantNationalities[count] = req.body['first-applicant-different-country']
      req.session.data.firstApplicantNationalityId[count] = count
      req.session.data.firstApplicantNationalityCount = count + 1
      res.redirect('/research-8/applicants/first-applicant-nationality')
    }
    else {
      res.render('.//research-8/applicants/first-applicant-nationality', { errors: errors })
    }
  })


  router.post('/research-8/applicants/first-applicant-occupation', function(req, res) {
    var errors = []
    if (req.body['first-applicant-occupation'] === '') {
      errors.push({
      text: 'Enter your occupation',
      href: '#first-applicant-occupation'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.firstApplicantPersonalDetailsStatus = 'completed'
        res.redirect('/research-8/task-list')
      }
      else {
          res.render('.//research-8/applicants/first-applicant-occupation', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })





  // ********************** First applicant contact details **********************
  router.post('/research-8/applicants/first-applicant-address', function(req, res) {
    var errors = []
    if (req.body['first-applicant-address'] === "") {
      errors.push({
      text: 'Enter a real postcode',
      href: '#first-applicant-address'
      })
    }

    req.session.data.firstApplicantContactDetailsStatus = 'in progress'

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/research-8/applicants/first-applicant-find-address')
      }
      else {
        res.render('.//research-8/applicants/first-applicant-address', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/applicants/first-applicant-find-address', function(req, res) {
    var errors = []
    if (req.body['first-applicant-choose-address'] === 'address-found') {
      errors.push({
      text: 'Select an address',
      href: '#first-applicant-find-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/research-8/applicants/first-applicant-contact')
      }
      else {
        res.render('.//research-8/applicants/first-applicant-find-address', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/applicants/first-applicant-enter-address-manually', function(req, res) {
    var errors = []
    if (req.body['first-applicant-address-line-1'] === '') {
      errors.push({
      text: 'Enter the first line of the address',
      href: '#first-line'
      })
    }
    if (req.body['first-applicant-address-town'] === '') {
      errors.push({
      text: 'Enter the town or city',
      href: '#town'
      })
    }
    if (req.body['first-applicant-address-postcode'] === '') {
      errors.push({
      text: 'Enter the postcode',
      href: '#postcode'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.firstApplicantContactDetailsStatus = 'in progress'
        res.redirect('/research-8/applicants/first-applicant-contact')
      }
      else {
        res.render('.//research-8/applicants/first-applicant-enter-address-manually', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/applicants/first-applicant-contact', function(req, res) {
    var errors = []
    if (req.body['first-applicant-email-address'] === '') {
      errors.push({
        text: 'Enter your email address',
        href: '#first-applicant-email'
        })
    }
    if (req.body['first-applicant-phone-number'] === '') {
      errors.push({
        text: 'Enter a UK telephone number',
        href: '#first-applicant-phone-number'
        })
    }
    if (req.body['first-applicant-served-email'] === undefined) {
      errors.push({
        text: 'Please answer the question',
        href: '#first-applicant-consent'
        })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.firstApplicantContactDetailsStatus = 'completed'
        res.redirect('/research-8/task-list')
      }
      else {
        res.render('.//research-8/applicants/first-applicant-contact', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })




  // ********************** Second applicant personal details **********************
  router.post('/research-8/applicants/second-applicant-name', function(req, res) {
    var errors = []
    if (req.body['second-applicant-names'] === '') {
      errors.push({
      text: 'Enter your first names',
      href: '#first-names'
      })
    }
    if (req.body['second-applicant-last-names'] === '') {
      errors.push({
      text: 'Enter your last names',
      href: '#last-names'
      })
    }

    req.session.data.secondApplicantPersonalDetailsStatus = 'in progress'

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/research-8/applicants/second-applicant-other-names')
      }
      else {
        res.render('.//research-8/applicants/second-applicant-name', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/applicants/second-applicant-other-names', function(req, res) {
    var errors = []

    if (req.body['second-applicant-other-names'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#second-applicant-other-names'
      })
    }
    else if (req.body['second-applicant-other-names'] === "Yes") {
      if (req.body['second-applicant-previous-first-names'].length === 0 && req.session.data.secondApplicantNameCount < 1) {
        errors.push({
          text: 'Enter your first names',
          href: '#second-applicant-no-first-names'
        })
      }
      if (req.body['second-applicant-previous-last-names'].length === 0  && req.session.data.secondApplicantNameCount < 1) {
        errors.push({
          text: 'Enter your last names',
          href: '#second-applicant-no-last-names'
        })
      }
    }
    if (req.body['submit-button'] === 'add') {
      if (req.body['second-applicant-previous-first-names'].length === 0  && req.session.data.secondApplicantNameCount >= 1) {
        errors.push({
          text: 'Enter your first names',
          href: '#second-applicant-no-additional-first-names'
        })
      }
      if (req.body['second-applicant-previous-last-names'].length === 0 && req.session.data.secondApplicantNameCount >= 1) {
        errors.push({
          text: 'Enter your last names',
          href: '#second-applicant-no-additional-last-names'
        })
      }
    }

    count = req.session.data.secondApplicantNameCount
    if (req.body['submit-button'] === 'add') {
      if (req.body['second-applicant-previous-first-names'] !== '' && req.body['second-applicant-previous-last-names'] !== '') {
        req.session.data.secondApplicantPreviousFirstNames[count] = req.body['second-applicant-previous-first-names']
        req.session.data.secondApplicantPreviousLastNames[count] = req.body['second-applicant-previous-last-names']
        req.session.data.idSecondApplicant[count] = count
        req.session.data.secondApplicantNameCount = count + 1
        res.redirect('/research-8/applicants/second-applicant-other-names')
      }
      else {
        res.render('.//research-8/applicants/second-applicant-other-names', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['second-applicant-previous-first-names'].length !== 0 && req.body['second-applicant-previous-last-names'].length !==0) {
          req.session.data.secondApplicantPreviousFirstNames[count] = req.body['second-applicant-previous-first-names']
          req.session.data.secondApplicantPreviousLastNames[count] = req.body['second-applicant-previous-last-names']
          req.session.data.idSecondApplicant[count] = count
          req.session.data.secondApplicantNameCount = count + 1
        }
        res.redirect('/research-8/applicants/second-applicant-date-birth')
      }
      else {
        res.render('.//research-8/applicants/second-applicant-other-names', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/applicants/second-applicant-date-birth', function(req, res) {
    // console.log("Day: ", req.body['day'])
    var errors = []
    if (req.body['second-applicant-day'] === '' || req.body['second-applicant-month'] === '' || req.body['second-applicant-year'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-149 for different error messages',
      href: '#second-applicant-date-birth'
      })
    }
      if (req.body['submit-button'] === 'save-and-continue') {
        if (errors.length === 0) {
          res.redirect('/research-8/applicants/second-applicant-occupation')
        }
        else {
          res.render('.//research-8/applicants/second-applicant-date-birth', { errors: errors })
        }
      }
      else {
        res.redirect('/research-8/save-as-draft')
      }
  })


  router.post('/research-8/applicants/second-applicant-nationality', function(req, res) {
    var errors = []

    if (req.body['second-applicant-british'] === undefined && req.body['second-applicant-irish'] === undefined &&req.body['second-applicant-other'] === undefined) {
      // console.log("error")
      errors.push({
      text: 'Select if you are British, Irish or a citizen of a different country',
      href: '#second-applicant-nationality'
      })
    }
    else if (req.body['second-applicant-other'] !== undefined && req.session.data.secondApplicantNationalityCount === 0) {
      // console.log("no nationality added error: ", req.session.data.secondApplicantNationalities)
      errors.push({
      text: 'This is not a valid entry',
      href: '#second-applicant-no-nationality'
      })
    }

    count = req.session.data.secondApplicantNationalityCount
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondApplicantNationalities[count] = req.body['second-applicant-different-country']
        res.redirect('/research-8/applicants/second-applicant-occupation')
      }
      else {
        res.render('.//research-8/applicants/second-applicant-nationality', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-as-draft') {
      res.redirect('/research-8/save-as-draft')
    }
    else if (req.body['submit-button'] === 'add' && req.body['second-applicant-different-country'] !== '') {
      req.session.data.secondApplicantNationalities[count] = req.body['second-applicant-different-country']
      req.session.data.secondApplicantNationalityId[count] = count
      req.session.data.secondApplicantNationalityCount = count + 1
      res.redirect('/research-8/applicants/second-applicant-nationality')
    }
    else {
      res.render('.//research-8/applicants/second-applicant-nationality', { errors: errors })
    }
  })


  router.post('/research-8/applicants/second-applicant-occupation', function(req, res) {
    var errors = []
    if (req.body['second-applicant-occupation'] === '') {
      errors.push({
      text: 'Enter your occupation',
      href: '#second-applicant-occupation'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondApplicantPersonalDetailsStatus = 'completed'
        res.redirect('/research-8/task-list')
      }
      else {
          res.render('.//research-8/applicants/second-applicant-occupation', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })





  // ********************** Second applicant contact details **********************
  router.post('/research-8/applicants/second-applicant-same-address', function(req, res) {
    var errors = []
    if (req.body['same-address'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#second-applicant-same-address'
      })
    }

    if (errors.length === 0) {
    if (req.body['submit-button'] === 'save-and-continue') {
        if (req.body['same-address'] === "Yes") {
          req.session.data.secondApplicantContactDetailsStatus = 'in progress'
          res.redirect('/research-8/applicants/second-applicant-contact')
        }
        else {
          res.redirect('/research-8/applicants/second-applicant-address')
        }
      }
      else {
        res.redirect('/research-8/save-as-draft')
      }
    }
    else {
        res.render('.//research-8/applicants/second-applicant-same-address', { errors: errors })
    }

  })


  router.post('/research-8/applicants/second-applicant-address', function(req, res) {
    var errors = []
    if (req.body['second-applicant-address'] === "") {
      errors.push({
      text: 'Enter a real postcode',
      href: '#second-applicant-address'
      })
    }

    req.session.data.secondApplicantContactDetailsStatus = 'in progress'

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/research-8/applicants/second-applicant-find-address')
      }
      else {
        res.render('.//research-8/applicants/second-applicant-address', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/applicants/second-applicant-find-address', function(req, res) {
    var errors = []
    if (req.body['second-applicant-choose-address'] === 'address-found') {
      errors.push({
      text: 'Select an address',
      href: '#second-applicant-find-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/research-8/applicants/second-applicant-contact')
      }
      else {
        res.render('.//research-8/applicants/second-applicant-find-address', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/applicants/second-applicant-enter-address-manually', function(req, res) {
    var errors = []
    if (req.body['second-applicant-address-line-1'] === '') {
      errors.push({
      text: 'Enter the first line of the address',
      href: '#first-line'
      })
    }
    if (req.body['second-applicant-address-town'] === '') {
      errors.push({
      text: 'Enter the town or city',
      href: '#town'
      })
    }
    if (req.body['second-applicant-address-postcode'] === '') {
      errors.push({
      text: 'Enter the postcode',
      href: '#postcode'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondApplicantContactDetailsStatus = 'in progress'
        res.redirect('/research-8/applicants/second-applicant-contact')
      }
      else {
        res.render('.//research-8/applicants/second-applicant-enter-address-manually', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/applicants/second-applicant-contact', function(req, res) {
    var errors = []
    if (req.body['second-applicant-email-address'] === '') {
      errors.push({
        text: 'Enter your email address',
        href: '#second-applicant-email'
        })
    }
    if (req.body['second-applicant-phone-number'] === '') {
      errors.push({
        text: 'Enter a UK telephone number',
        href: '#second-applicant-phone-number'
        })
    }
    if (req.body['second-applicant-served-email'] === undefined) {
      errors.push({
        text: 'Please answer the question',
        href: '#second-applicant-consent'
        })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondApplicantContactDetailsStatus = 'completed'
        res.redirect('/research-8/task-list')
      }
      else {
        res.render('.//research-8/applicants/second-applicant-contact', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })






  // ********************** Second applicant upload **********************
  router.post('/research-8/applicants/second-applicant-upload', function(req, res) {
    var errors = []
    if (req.body['second-applicant-upload'] === '') {
      errors.push({
      text: 'Error message',
      href: '#second-applicant-upload'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondupload = 1
        res.redirect('/research-8/task-list')
      }
      else {
        res.render('.//research-8/applicants/second-applicant-upload', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })




// ******************************************** SECTION 3. CHILDREN ********************************************
// ************************************************************************************************************************************

// ******************************************** Child's details ********************************************
  router.post('/research-8/children/child-name', function(req, res) {
    var errors = []
    if (req.body['child-first-names'] === '') {
      errors.push({
      text: 'Enter the child\'s first names',
      href: '#first-names'
      })
    }
    if (req.body['child-last-names'] === '') {
      errors.push({
      text: 'Enter the child\'s last names',
      href: '#last-names'
      })
    }
    req.session.data.childDetailsStatus = 'in progress'

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/research-8/children/child-post-adoption-name')
      }
      else {
        res.render('.//research-8/children/child-name', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })



  router.post('/research-8/children/child-post-adoption-name', function(req, res) {
    var errors = []
    if (req.body['certificate-first-names'] === '') {
      errors.push({
      text: 'Enter their first names',
      href: '#first-names'
      })
    }
    if (req.body['certificate-last-names'] === '') {
      errors.push({
      text: 'Enter their last names',
      href: '#last-names'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.childDetailsStatus = 'completed'
        res.redirect('/research-8/task-list')
      }
      else {
        res.render('.//research-8/children/child-post-adoption-name', { errors: errors })
      }
    }
    else {
      if (req.body['certificate-first-names'] === '' && req.body['certificate-last-names'] === '') {
        res.redirect('/research-8/task-list')
      }
      else {
        req.session.data.adoptionCertificateStatus = 'in progress'
        res.redirect('/research-8/save-as-draft')
      }
    }
  })








  // ********************** Sibling details **********************
  router.post('/research-8/children/sibling-exists', function(req, res) {
    // console.log("father alive: ", req.body['sibling-exists'])
    var errors = []
    if (req.body['sibling-exists'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#sibling'
      })
    }
    else if (req.body['sibling-exists'] === 'unsure' && req.body['reason-not-sure'] === '') {
      errors.push({
      text: 'Enter more detail',
      href: '#sibling-no-reason'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['sibling-exists'] === 'yes') {
          req.session.data.siblingStatus = 'in progress'
          res.redirect('/research-8/children/sibling-court-order-exists')
        }
        else {
          req.session.data.siblingStatus = 'completed'
          res.redirect('/research-8/task-list')
        }
      }
      else {
        res.render('.//research-8/children/sibling-exists', { errors: errors })
      }
    }
    else {
        res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/children/sibling-court-order-exists', function(req, res) {
    console.log("sibling: ", req.body['sibling-court-order-exists'])
    var errors = []
    if (req.body['sibling-court-order-exists'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#court-order-checkbox'
      })
    }
    else if (req.body['sibling-court-order-exists'] === 'unsure' && req.body['reason-not-sure'] === '') {
      errors.push({
      text: 'Enter more detail',
      href: '#sibling-court-order-no-reason'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['sibling-court-order-exists'] === 'yes') {
          res.redirect('/research-8/children/sibling-relationship')
        }
        else {
          req.session.data.siblingStatus = 'completed'
          res.redirect('/research-8/task-list')
        }
      }
      else {
        res.render('.//research-8/children/sibling-court-order-exists', { errors: errors })
      }
    }
    else {
        res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/children/sibling-relationship', function(req, res) {
    var errors = []
    if (req.body['sibling-relationship'] === '') {
      errors.push({
      text: 'Enter the relationship',
      href: '#relationship'
      })
    }
    
    count = req.session.data.siblingOrderCount

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.siblingOrderId[count] = count
        req.session.data.siblingRelationship[count] = req.body['sibling-relationship']
        req.session.data.siblingOrderCount++
        res.redirect('/research-8/children/sibling-order-type')
      }
      else {
        res.render('.//research-8/children/sibling-name', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/children/sibling-change-relationship', function(req, res) {
    var errors = []
    if (req.body['sibling-relationship'] === '') {
      errors.push({
      text: 'Enter the relationship',
      href: '#relationship'
      })
    }
    
    count = req.session.data.siblingOrderCount
    
    if (errors.length === 0) {
      req.session.data.uniqueSiblingFirstNames[sib] = req.body['sibling-relationship']
      res.redirect('/research-8/children/sibling-summary')
    }
    else {
      res.render('.//research-8/children/sibling-change-relationship', { errors: errors })
    }
  })


  router.post('/research-8/children/sibling-order-type', function(req, res) {
    var errors = []
    if (req.body['sibling-order-type'] === '') {
      errors.push({
      text: 'Enter the type of order',
      href: '#order-type'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.siblingOrderType[count] = req.body['sibling-order-type']
        req.session.data.siblingOrderCompleted[count] = "No"
        res.redirect('/research-8/children/sibling-order-case-number')
      }
      else {
        res.render('.//research-8/children/sibling-order-type', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/children/sibling-change-order-type', function(req, res) {
    var errors = []
    if (req.body['sibling-new-order-type'] === '') {
      errors.push({
      text: 'Please answer the question',
      href: '#order-type'
      })
    }
    console.log(req.session.data.siblingOrderType[req.body['sibling-id']])
    console.log(req.body['sibling-new-order-type'])

    if (errors.length === 0) {
      req.session.data.siblingOrderType[req.body['sibling-id']] = req.body['sibling-new-order-type']
      res.redirect('/research-8/children/sibling-check-your-answers')
    }
    else {
      res.render('.//research-8/children/sibling-change-order-type', { errors: errors })
    }
  })



  router.post('/research-8/children/sibling-order-case-number', function(req, res) {
    var errors = []
    if (req.body['sibling-order-case-number'] === '') {
      errors.push({
      text: 'Please answer the question',
      href: '#case-number'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.siblingOrderNumber[count] = req.body['sibling-order-case-number']
        req.session.data.siblingOrderCompleted[count] = "Yes"
        console.log("Relationship: ", req.session.data.siblingRelationship[count])
        console.log("Type: ", req.session.data.siblingOrderType[count])
        console.log("Number: ", req.session.data.siblingOrderNumber[count])
        res.redirect('/research-8/children/sibling-summary')
      }
      else {
        res.render('.//research-8/children/sibling-order-case-number', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/children/sibling-change-order-case-number', function(req, res) {
    var errors = []
    if (req.body['sibling-new-case-number'] === '') {
      errors.push({
      text: 'Please answer the question',
      href: '#case-number'
      })
    }
    console.log(req.session.data.siblingOrderType[req.body['sibling-id']])
    console.log(req.body['sibling-new-case-number'])

    if (errors.length === 0) {
      req.session.data.siblingOrderNumber[req.body['sibling-id']] = req.body['sibling-new-case-number']
      res.redirect('/research-8/children/sibling-check-your-answers')
    }
    else {
      res.render('.//research-8/children/sibling-change-case-number', { errors: errors })
    }
  })


  router.post('/research-8/children/sibling-order-court', function(req, res) {
    var errors = []
    if (req.body['sibling-order-court-name'] === '') {
      errors.push({
      text: 'Please answer the question',
      href: '#order-court-name'
      })
    }

    arrayLength = req.session.data.siblingOrderId.length
    if (arrayLength == 1) {
      count = 0
    }
    else {
      count = req.session.data.siblingOrderId.length - 1
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.siblingOrderCourt[count] = req.body['sibling-order-court-name']
        res.redirect('/research-8/children/sibling-order-date')
      }
      else {
        res.render('.//research-8/children/sibling-order-court', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/children/sibling-change-order-court', function(req, res) {
    var errors = []
    if (req.body['sibling-new-court-name'] === '') {
      errors.push({
      text: 'Please answer the question',
      href: '#order-court-name'
      })
    }
    console.log(req.session.data.siblingOrderType[req.body['sibling-id']])
    console.log(req.body['sibling-new-court-name'])

    if (errors.length === 0) {
      req.session.data.siblingOrderCourt[req.body['sibling-id']] = req.body['sibling-new-court-name']
      res.redirect('/research-8/children/sibling-check-your-answers')
    }
    else {
      res.render('.//research-8/children/sibling-change-court', { errors: errors })
    }
  })


  router.post('/research-8/children/sibling-order-date', function(req, res) {
    var errors = []
    if (req.body['sibling-day'] === '' || req.body['sibling-month'] === '' || req.body['sibling-year'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-281 for different error messages',
      href: '#order-date'
      })
    }

    arrayLength = req.session.data.siblingOrderId.length
    if (arrayLength == 1) {
      count = 0
    }
    else {
      count = req.session.data.siblingOrderId.length - 1
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.siblingOrderIncomplete = 0
        req.session.data.siblingOrderDay[count] = req.body['sibling-day']
        req.session.data.siblingOrderMonth[count] = req.body['sibling-month']
        req.session.data.siblingOrderYear[count] = req.body['sibling-year']
        req.session.data.siblingOrderCompleted[count] = "Yes"
        res.redirect('/research-8/children/sibling-summary')
//        req.session.data.siblingOrderCount = req.session.data.siblingOrderCount + 1

      }
      else {
        res.render('.//research-8/children/sibling-order-date', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/children/sibling-change-order-date', function(req, res) {
    var errors = []
    if (req.body['sibling-day'] === '' || req.body['sibling-month'] === '' || req.body['sibling-year'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-281 for different error messages',
      href: '#order-date'
      })
    }

    if (errors.length === 0) {
      req.session.data.siblingOrderDay[req.body['sibling-id']] = req.body['sibling-day']
      req.session.data.siblingOrderMonth[req.body['sibling-id']] = req.body['sibling-month']
      req.session.data.siblingOrderYear[req.body['sibling-id']] = req.body['sibling-year']
      res.redirect('/research-8/children/sibling-check-your-answers')
    }
    else {
      res.render('.//research-8/children/sibling-change-order-date', { errors: errors })
    }
  })


  router.post('/research-8/children/sibling-summary', function(req, res) {
    var errors = []
    if (req.body['sibling-add-another'] === undefined) {
      errors.push({
      text: 'Please select an answer',
      href: '#sibling-add-another'
      })
    }

    if (req.body['submit-button'] === 'continue') {
      res.redirect('/research-8/children/sibling-summary')
    }
    else if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['sibling-add-another'] === 'Yes') {
          res.redirect('/research-8/children/sibling-relationship')
        }
        else {
          if (req.session.data.siblingOrderIncomplete === 0) {
            req.session.data.siblingStatus = 'completed'
          }
          else {
            req.session.data.siblingStatus = 'in progress'
          }
          res.redirect('/research-8/task-list')
        }
      }
      else {
        res.render('.//research-8/children/sibling-summary', { errors: errors })
      }
    }
    else {
        res.redirect('/research-8/task-list')
    }
  })



  router.post('/research-8/children/sibling-choose-sibling', function(req, res) {
    var errors = []
    if (req.body['what-sibling'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#what-sibling'
      })
    }
    else if (req.body['what-sibling'] === 'add-new-sibling') {
      if (req.body['add-sibling-first-names'] === '') {
        errors.push({
        text: 'Enter their first names',
        href: '#first-names'
        })
      }
      if (req.body['add-sibling-last-names'] === '') {
        errors.push({
        text: 'Enter their last names',
        href: '#last-names'
        })
      }
    }

    count = req.session.data.siblingOrderId.length
    sib = req.session.data.numberOfSiblings
    id = req.body['what-sibling']

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['what-sibling'] === 'add-new-sibling') {
          console.log("new sibling")
          req.session.data.uniqueSiblingId[sib] = sib
          req.session.data.uniqueSiblingFirstNames[sib] = req.body['add-sibling-first-names']
          req.session.data.uniqueSiblingLastNames[sib] = req.body['add-sibling-last-names']
          req.session.data.siblingFirstNames[count] = req.body['add-sibling-first-names']
          req.session.data.siblingLastNames[count] = req.body['add-sibling-last-names']
          req.session.data.numberOfSiblings = req.session.data.numberOfSiblings + 1
        }
        else {
          console.log("existing sibling")
          req.session.data.siblingFirstNames[count] = req.session.data.uniqueSiblingFirstNames[id]
          req.session.data.siblingLastNames[count] = req.session.data.uniqueSiblingLastNames[id]
        }
        req.session.data.siblingOrderCompleted[count] = "No"
        req.session.data.siblingOrderId[count] = count
        res.redirect('/research-8/children/sibling-order-type')
      }
      else {
        res.render('.//research-8/children/sibling-choose-sibling', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/task-list')
    }
    console.log("Sibling array: ", req.session.data.uniqueSiblingFirstNames)
    console.log("siblingFirstNames array: ", req.session.data.siblingFirstNames)
    console.log("uniqueSiblingID array: ", req.session.data.uniqueSiblingId)
    console.log("siblingOrderId array: ", req.session.data.siblingOrderId)
    console.log("Number of siblings: ", req.session.data.numberOfSiblings)
    console.log("siblingFirstNames[id]: ", req.session.data.siblingFirstNames[id])
    console.log("count: ", count)
    console.log("id: ", id)
  })



  router.post('/research-8/children/sibling-remove-court-order', function(req, res) {
    var occ = 0
    var errors = []
    if (req.body['remove-court-order'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#remove-court-order'
      })
    }

    id = req.body['order-id']
    fn = req.session.data.siblingFirstNames[id]
    ln = req.session.data.siblingLastNames[id]
    console.log("order-id: ",id)
    console.log("count: ",req.session.data.siblingOrderCount)

    if (errors.length === 0) {
      for (let index = 0; index < req.session.data.siblingOrderId.length; index++) {
        if (req.session.data.siblingOrderId[index] == id) {
          console.log("index: ", index)
          // req.session.data.siblingOrderId.splice(index, 1);
          // req.session.data.siblingFirstNames.splice(index, 1);
          // req.session.data.siblingLastNames.splice(index, 1);
          // req.session.data.siblingOrderType.splice(index, 1);
          // req.session.data.siblingOrderNumber.splice(index, 1);
          // req.session.data.siblingOrderCourt.splice(index, 1);
          // req.session.data.siblingOrderDay.splice(index, 1);
          // req.session.data.siblingOrderMonth.splice(index, 1);
          // req.session.data.siblingOrderYear.splice(index, 1);
          // req.session.data.siblingOrderCompleted.splice(index, 1);
          delete req.session.data.siblingOrderId[index];
          delete req.session.data.siblingFirstNames[index];
          delete req.session.data.siblingLastNames[index];
          delete req.session.data.siblingOrderType[index];
          delete req.session.data.siblingOrderNumber[index];
          delete req.session.data.siblingOrderCourt[index];
          delete req.session.data.siblingOrderDay[index];
          delete req.session.data.siblingOrderMonth[index];
          delete req.session.data.siblingOrderYear[index];
          delete req.session.data.siblingOrderCompleted[index];
          req.session.data.siblingOrderCount--
        }
      }
      console.log("sibling first names orders: ", req.session.data.siblingFirstNames)
      console.log("sibling unique first names: ", req.session.data.uniqueSiblingFirstNames)
      console.log("sibling order count: ", req.session.data.siblingOrderCount)
      console.log("sibling first names: ", fn)
      for (let index2 = 0; index2 < req.session.data.uniqueSiblingId.length; index2++) {
        console.log(req.session.data.uniqueSiblingFirstNames[index2])
        if (fn == req.session.data.uniqueSiblingFirstNames[index2] && ln == req.session.data.uniqueSiblingLastNames[index2]) {
          occ++
          console.log("Occurrence inside: ", occ)
        }
      }
      console.log("Occurrence: ", occ)
      if (occ == 0) {
        for (let index3 = 0; index3 < req.session.data.uniqueSiblingId.length; index3++) {
          console.log("sibling first names orders index3: ", req.session.data.uniqueSiblingFirstNames[index3])
          console.log("sibling last names orders index3: ", req.session.data.uniqueSiblingLastNames[index3])
          if (fn == req.session.data.uniqueSiblingFirstNames[index3] && ln == req.session.data.uniqueSiblingLastNames[index3]) {
            console.log("In for: ", fn)
            console.log("In for: ", ln)
            delete req.session.data.uniqueSiblingId[index3]
            delete req.session.data.uniqueSiblingFirstNames[index3]
            delete req.session.data.uniqueSiblingLastNames[index3]
            // req.session.data.uniqueSiblingId.splice(index3, 1)
            // req.session.data.uniqueSiblingFirstNames.splice(index3, 1)
            // req.session.data.uniqueSiblingLastNames.splice(index3, 1)
          }
        }
      }
      console.log("sibling unique first names: ", req.session.data.uniqueSiblingFirstNames)

      // console.log(req.session.data.siblingOrderId)
      // console.log(req.session.data.siblingFirstNames)
      // console.log(req.session.data.siblingLastNames)
      // console.log(req.session.data.siblingOrderType)
      // console.log(req.session.data.siblingOrderNumber)
      // console.log(req.session.data.siblingOrderCourt)
      if (req.session.data.siblingOrderCount > 0) {
        res.redirect('/research-8/children/sibling-summary')
      }
      else {
        res.redirect('/research-8/children/sibling-court-order-exists')
      }
    }
    else {
      res.render('.//research-8/children/sibling-remove-order-court', { errors: errors })
    }
  })















  // ************************************* Placement and court orders ************************************* //


  router.post('/research-8/children/orders-placement-court', function(req, res) {
    var errors = []
    if (req.body['placement-court-name'] === '') {
      errors.push({
      text: 'Enter the name of the court',
      href: '#court-name'
      })
    }

    count = req.session.data.childOrderCount

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.childOrderCourt[count] = req.body['placement-court-name']
        req.session.data.childOrderCompleted[count] = "No"
        res.redirect('/research-8/children/family-court-finder')
      }
      else {
        res.render('.//research-8/children/orders-placement-court', { errors: errors })
      }
    }
    else {
      if (req.body['placement-court-name'] === '') {
        res.redirect('/research-8/task-list')
      }
      else {
        req.session.data.familyCourtStatus = 'in progress'
        res.redirect('/research-8/save-as-draft')
      }
    }
  })




// ******************************************** SECTION 4. UPLOADS ********************************************
// ************************************************************************************************************************************

  // ********************** Uploads  **********************
  router.post('/research-8/upload/applicants-documents-upload', function(req, res) {
    // var errors = []
    // if (req.body['sibling-new-court-name'] === '') {
    //   errors.push({
    //   text: 'Please answer the question',
    //   href: '#order-court-name'
    //   })
    // }

//    if (errors.length === 0) {
  if (req.body['submit-button'] === 'save-and-continue') {
      req.session.data.applicantsUpload = 1
      res.redirect('/research-8/task-list')
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })


  router.post('/research-8/upload/child-documents-upload', function(req, res) {
    // var errors = []
    // if (req.body['sibling-new-court-name'] === '') {
    //   errors.push({
    //   text: 'Please answer the question',
    //   href: '#order-court-name'
    //   })
    // }

//    if (errors.length === 0) {
  if (req.body['submit-button'] === 'save-and-continue') {
      req.session.data.childUpload = 1
      res.redirect('/research-8/task-list')
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })





// ******************************************** SECTION 5. CHECK, PAY AND SUBMIT ********************************************
// ************************************************************************************************************************************


//**************************************** Check, Pay and Submit ************************************************************

  router.post('/research-8/check-pay-and-submit/check-your-answers', function(req, res) {
    req.session.data.reviewStatus = 'in progress'
    if (req.body['submit-button'] === 'save-and-continue') {
      res.redirect('/research-8/check-pay-and-submit/declaration')
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })




//    router.post('/research-8/check-pay-and-submit/payment', function(req, res) {
  //    res.redirect('/research-8/check-pay-and-submit/confirmation')
  //      })

  router.post('/research-8/check-pay-and-submit/declaration', function(req, res) {
    var errors = []
    if (req.session.data.numberApplicants === '1') {
      if (req.body['statement-truth1'] == undefined) {
        console.log("Statement of truth: ", req.body['statement-truth1'])
        errors.push({
        text: "Confirm your statement of truth",
        href: '#statement-truth'
        })
      }
      if (req.body['your-full-name1'] === '') {
        errors.push({
        text: "Enter a full name",
        href: '#your-name'
        })
      }
    }
    else {
      if (req.body['statement-truth'] == undefined) {
        console.log("Statement of truth: ", req.body['statement-truth'])
        errors.push({
        text: "Confirm your statement of truth",
        href: '#statement-truth'
        })
      }
      if (req.body['your-full-name'] === '') {
        errors.push({
        text: "Enter a full name",
        href: '#your-name'
        })
      }
      if (req.body['authorised'] === undefined && req.body['partner-full-name'] === '') {
        errors.push({
        text: "Enter a full name",
        href: '#partner'
        })
      }
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/research-8/check-pay-and-submit/pay-and-submit')
      }
      else {
        res.render('.//research-8/check-pay-and-submit/declaration', { errors: errors })
      }
    }
    else {
      res.redirect('/research-8/save-as-draft')
    }
  })




// ******************************************** X-UI Case worker ********************************************
// ************************************************************************************************************************************


  router.post('/research-8/includes/next-steps-case-worker', function(req, res) {
    if (req.body['next-steps'] === 'notes') {
      res.redirect('/research-8/x-ui/case-worker/case-worker-notes')
    }
    else {
      res.redirect('/research-8/x-ui/case-worker/')
    }
  })


  router.post('/research-8/x-ui/case-worker/case-worker-manage-documents', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      if (req.body['document-type'] === 'Statements') {
        res.redirect('/research-8/x-ui/case-worker/case-worker-statements-select-respondent')
      }
      else {
        res.redirect('/research-8/x-ui/case-worker/case-worker-upload')
      }
    }
    else {
      res.redirect('/research-8/x-ui/case-worker/case-worker-documents')
    }
  })


  router.post('/research-8/x-ui/case-worker/case-worker-statements-select-respondent', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      // if (req.body['respondent-role'] === 'birth mother' || req.body['respondent-role'] === 'birth father' || req.body['respondent-role'] === 'person with parental responsibility') {
      //   res.redirect('/research-8/x-ui/case-worker/case-worker-intention-oppose')
      // }
      // else {
      res.redirect('/research-8/x-ui/case-worker/case-worker-upload')
    }
    // }
    else {
      res.redirect('/research-8/x-ui/case-worker/case-worker-manage-documents')
    }
  })


  router.post('/research-8/x-ui/case-worker/case-worker-intention-oppose', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      if (req.body['intend-oppose'] === 'no') {
        req.session.data.intentionOppose = 'no'
      }
      else {
        req.session.data.intentionOppose = 'yes'
      }
      res.redirect('/research-8/x-ui/case-worker/case-worker-upload')
    }
    else {
      res.redirect('/research-8/x-ui/case-worker/case-worker-statements-select-respondent')
    }
  })


  router.post('/research-8/x-ui/case-worker/case-worker-upload', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/research-8/x-ui/case-worker/case-worker-documents')
    }
    else if (req.body['add-new-button'] === 'add-new-button-top' || req.body['add-new-button'] === 'add-new-button-bottom' || req.body['remove-button'] === 'remove') {
      res.redirect('/research-8/x-ui/case-worker/case-worker-upload')
    }
    else {
      res.redirect('/research-8/x-ui/case-worker/case-worker-manage-documents')
    }
  })


  router.post('/research-8/x-ui/case-worker/case-worker-message-radios', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/research-8/x-ui/case-worker/case-worker-messages-select-person')
    }
    else {
      res.redirect('/research-8/x-ui/case-worker/case-worker-messages')
    }
  })


  router.post('/research-8/x-ui/case-worker/case-worker-messages-select-person', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/research-8/x-ui/case-worker/case-worker-send-message')
    }
    else {
      res.redirect('/research-8/x-ui/case-worker/case-worker-message-radios')
    }
  })


  router.post('/research-8/x-ui/case-worker/case-worker-send-message', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/research-8/x-ui/case-worker/case-worker-message-sent')
    }
    else {
      res.redirect('/research-8/x-ui/case-worker/case-worker-messages-select-person')
    }
  })


  router.post('/research-8/x-ui/case-worker/case-worker-message-sent', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/research-8/x-ui/case-worker/case-worker-messages')
    }
    else {
      res.redirect('/research-8/x-ui/case-worker/case-worker-send-message')
    }
  })


  router.post('/research-8/x-ui/case-worker/index', function(req, res) {
    console.log(req.body['next-steps'])
    if (req.body['next-steps'] === 'manage-documents') {
      res.redirect('/research-8/x-ui/case-worker/case-worker-manage-documents')
    }
    else if (req.body['next-steps'] === 'notes') {
      req.session.data.newNote = 'yes'
      res.redirect('/research-8/x-ui/case-worker/case-worker-add-note')
    }
    else if (req.body['next-steps'] === 'send-a-message') {
      res.redirect('/research-8/x-ui/case-worker/case-worker-message-radios')
    }
  })





// ******************************************** X-UI Judge ********************************************
// ************************************************************************************************************************************


  router.post('/research-8/includes/next-steps-judge', function(req, res) {
    if (req.body['next-steps'] === 'notes') {
      res.redirect('/research-8/x-ui/judge/judge-notes')
    }
    else {
      res.redirect('/research-8/x-ui/judge/')
    }
  })


  router.post('/research-8/x-ui/judge/judge-manage-documents', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      if (req.body['document-type'] === 'Statements') {
        res.redirect('/research-8/x-ui/judge/judge-statements-select-respondent')
      }
      else {
        res.redirect('/research-8/x-ui/judge/judge-upload')
      }
    }
    else {
      res.redirect('/research-8/x-ui/judge/judge-documents')
    }
  })


  router.post('/research-8/x-ui/judge/judge-statements-select-respondent', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      // if (req.body['respondent-role'] === 'birth mother' || req.body['respondent-role'] === 'birth father' || req.body['respondent-role'] === 'person with parental responsibility') {
      //   res.redirect('/research-8/x-ui/judge/judge-intention-oppose')
      // }
      // else {
      res.redirect('/research-8/x-ui/judge/judge-upload')
    }
    // }
    else {
      res.redirect('/research-8/x-ui/judge/judge-manage-documents')
    }
  })


  router.post('/research-8/x-ui/judge/judge-intention-oppose', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      if (req.body['intend-oppose'] === 'no') {
        req.session.data.intentionOppose = 'no'
      }
      else {
        req.session.data.intentionOppose = 'yes'
      }
      res.redirect('/research-8/x-ui/judge/judge-upload')
    }
    else {
      res.redirect('/research-8/x-ui/judge/judge-statements-select-respondent')
    }
  })


  router.post('/research-8/x-ui/judge/judge-upload', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/research-8/x-ui/judge/judge-documents')
    }
    else if (req.body['add-new-button'] === 'add-new-button-top' || req.body['add-new-button'] === 'add-new-button-bottom' || req.body['remove-button'] === 'remove') {
      res.redirect('/research-8/x-ui/judge/judge-upload')
    }
    else {
      res.redirect('/research-8/x-ui/judge/judge-manage-documents')
    }
  })


  router.post('/research-8/x-ui/judge/judge-message-radios', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/research-8/x-ui/judge/judge-messages-select-person')
    }
    else {
      res.redirect('/research-8/x-ui/judge/judge-messages')
    }
  })


  router.post('/research-8/x-ui/judge/judge-messages-select-person', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/research-8/x-ui/judge/judge-send-message')
    }
    else {
      res.redirect('/research-8/x-ui/judge/judge-message-radios')
    }
  })


  router.post('/research-8/x-ui/judge/judge-send-message', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/research-8/x-ui/judge/judge-message-sent')
    }
    else {
      res.redirect('/research-8/x-ui/judge/judge-messages-select-person')
    }
  })


  router.post('/research-8/x-ui/judge/judge-message-sent', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/research-8/x-ui/judge/judge-messages')
    }
    else {
      res.redirect('/research-8/x-ui/judge/judge-send-message')
    }
  })


  router.post('/research-8/x-ui/judge/index', function(req, res) {
    console.log(req.body['next-steps'])
    if (req.body['next-steps'] === 'manage-documents') {
      res.redirect('/research-8/x-ui/judge/judge-manage-documents')
    }
    else if (req.body['next-steps'] === 'notes') {
      req.session.data.newNote = 'yes'
      res.redirect('/research-8/x-ui/judge/judge-add-note')
    }
    else if (req.body['next-steps'] === 'send-a-message') {
      res.redirect('/research-8/x-ui/judge/judge-message-radios')
    }
  })

};
