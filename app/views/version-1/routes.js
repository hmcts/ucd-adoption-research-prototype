const { uniqueSiblingFirstNames } = require("../../data/session-data-defaults");

module.exports = (router) => {

// ******************************************** ELIGIBILITY ********************************************
// ************************************************************************************************************************************

// ********************** Eligibility **********************
  router.post('/version-1/eligibility/under-18', function(req, res) {
    var errors = []
    if (req.body['child-under-18'] === undefined) {
      errors.push({
      text: "Please answer the question",
      href: '#under-18'
      })
    }

    if (errors.length === 0) {
      if (req.body['child-under-18'] === "Yes") {
        res.redirect('/version-1/eligibility/married')
      }
      else {
        res.redirect('/version-1/eligibility/cannot-apply-over-18')
      }
    }
    else {
        res.render('.//version-1/eligibility/under-18', { errors: errors })
    }

  })


  router.post('/version-1/eligibility/married', function(req, res) {
    var errors = []
    if (req.body['child-married'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#married'
      })
    }

    if (errors.length === 0) {
      if (req.body['child-married'] === 'Yes') {
        res.redirect('/version-1/eligibility/cannot-apply-married')
      }
      else {
        res.redirect('/version-1/eligibility/under-21')
      }
    }
    else {
        res.render('.//version-1/eligibility/married', { errors: errors })
    }

  })


  router.post('/version-1/eligibility/under-21', function(req, res) {
    var errors = []
    if (req.body['under-21'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#under-21'
      })
    }

    if (errors.length === 0) {
      if (req.body['under-21'] === "Yes") {
        res.redirect('/version-1/eligibility/lived-uk')
      }
      else {
        res.redirect('/version-1/eligibility/cannot-apply-under-21')
      }
    }
    else {
        res.render('.//version-1/eligibility/under-21', { errors: errors })
    }
  })


  router.post('/version-1/eligibility/lived-uk', function(req, res) {
    var errors = []
    if (req.body['lived-uk'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#lived-uk'
      })
    }

    if (errors.length === 0) {
      if (req.body['lived-uk'] === "Yes") {
        res.redirect('/version-1/eligibility/do-you-need-help-with-fees')
      }
      else {
        res.redirect('/version-1/eligibility/cannot-apply-lived-uk')
      }
    }
    else {
        res.render('.//version-1/eligibility/lived-uk', { errors: errors })
    }
  })


  router.post('/version-1/eligibility/do-you-need-help-with-fees', function(req, res) {
    var errors = []
    if (req.body['need-help-with-fees'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#need-help-with-fees'
      })
    }

    if (errors.length === 0) {
      if (req.body['need-help-with-fees'] === "Yes") {
        res.redirect('/version-1/eligibility/apply-for-help-with-fees')
      }
      else {
        res.redirect('/version-1/registration/start1')
      }
    }
    else {
        res.render('.//version-1/eligibility/do-you-need-help-with-fees', { errors: errors })
    }
  })






// ******************************************** SECTION 1. APPLICANTS ********************************************
// ************************************************************************************************************************************

  // ********************** Applicants  **********************
  router.post('/version-1/applicants/number-of-applicants', function(req, res) {
    var errors = []
    if (req.body['number-of-applicants'] === undefined) {
      errors.push({
      text: 'Select an option which best describes who is applying',
      href: '#number-of-applicants'
      })
    }

    req.session.data.numberApplicants = req.body['number-of-applicants']

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/applicants/number-of-applicants', { errors: errors })
      }
    }
    else {
        res.redirect('/version-1/task-list')
    }
    console.log("Applicants: ", req.session.data.numberApplicants)
  })

  router.post('/version-1/applicants/date-child-moved-in', function(req, res) {
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
          res.redirect('/version-1/task-list')
        }
        else {
          res.render('.//version-1/applicants/date-child-moved-in', { errors: errors })
        }
      }
      else {
        res.redirect('/version-1/task-list')
      }
  })




  // ********************** First applicant personal details **********************



    router.post('/version-1/applicants/first-applicant-name', function(req, res) {
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

      if (req.body['submit-button'] === 'save-and-continue') {
        if (errors.length === 0) {
          res.redirect('/version-1/applicants/first-applicant-other-names')
        }
        else {
          res.render('.//version-1/applicants/first-applicant-name', { errors: errors })
        }
      }
      else {
        res.redirect('/version-1/task-list')
      }
    })


    router.post('/version-1/applicants/first-applicant-other-names', function(req, res) {
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

      count = req.session.data.firstApplicantNameCount
      if (req.body['submit-button'] === 'add') {
        if (req.body['first-applicant-previous-first-names'] !== '' && req.body['first-applicant-previous-last-names'] !== '') {
          req.session.data.firstApplicantPreviousFirstNames[count] = req.body['first-applicant-previous-first-names']
          req.session.data.firstApplicantPreviousLastNames[count] = req.body['first-applicant-previous-last-names']
          req.session.data.idFirstApplicant[count] = count
          req.session.data.firstApplicantNameCount = count + 1
          res.redirect('/version-1/applicants/first-applicant-other-names')
        }
        else {
          res.render('.//version-1/applicants/first-applicant-other-names', { errors: errors })
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
          res.redirect('/version-1/applicants/first-applicant-date-birth')
        }
        else {
          res.render('.//version-1/applicants/first-applicant-other-names', { errors: errors })
        }
      }
      else {
        res.redirect('/version-1/task-list')
      }
    })


  router.post('/version-1/applicants/first-applicant-date-birth', function(req, res) {
    var errors = []
    if (req.body['first-applicant-day'] === '' || req.body['first-applicant-month'] === '' || req.body['first-applicant-year'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-149 for different error messages',
      href: '#first-applicant-date-birth'
      })
    }
      if (req.body['submit-button'] === 'save-and-continue') {
        if (errors.length === 0) {
          res.redirect('/version-1/applicants/first-applicant-nationality')
        }
        else {
          res.render('.//version-1/applicants/first-applicant-date-birth', { errors: errors })
        }
      }
      else {
        res.redirect('/version-1/task-list')
      }
  })


  router.post('/version-1/applicants/first-applicant-nationality', function(req, res) {
    var errors = []

    if (req.body['first-applicant-british'] === undefined && req.body['first-applicant-irish'] === undefined &&req.body['first-applicant-other'] === undefined) {
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
        res.redirect('/version-1/applicants/first-applicant-occupation')
      }
      else {
        res.render('.//version-1/applicants/first-applicant-nationality', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-as-draft') {
      res.redirect('/version-1/task-list')
    }
    else if (req.body['submit-button'] === 'add' && req.body['first-applicant-different-country'] !== '') {
      req.session.data.firstApplicantNationalities[count] = req.body['first-applicant-different-country']
      req.session.data.firstApplicantNationalityId[count] = count
      req.session.data.firstApplicantNationalityCount = count + 1
      res.redirect('/version-1/applicants/first-applicant-nationality')
    }
    else {
      res.render('.//version-1/applicants/first-applicant-nationality', { errors: errors })
    }
  })


  router.post('/version-1/applicants/first-applicant-occupation', function(req, res) {
    var errors = []
    if (req.body['first-applicant-occupation'] === '') {
      errors.push({
      text: 'Enter your occupation',
      href: '#first-applicant-occupation'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/task-list')
      }
      else {
          res.render('.//version-1/applicants/first-applicant-occupation', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })





  // ********************** First applicant contact details **********************
  router.post('/version-1/applicants/first-applicant-address', function(req, res) {
    var errors = []
    if (req.body['first-applicant-address'] === "") {
      errors.push({
      text: 'Enter a real postcode',
      href: '#first-applicant-address'
      })
    }
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/applicants/first-applicant-find-address')
      }
      else {
        res.render('.//version-1/applicants/first-applicant-address', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/applicants/first-applicant-find-address', function(req, res) {
    var errors = []
    if (req.body['first-applicant-choose-address'] === 'address-found') {
      errors.push({
      text: 'Select an address',
      href: '#first-applicant-find-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/applicants/first-applicant-contact')
      }
      else {
        res.render('.//version-1/applicants/first-applicant-find-address', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/applicants/first-applicant-enter-address-manually', function(req, res) {
    var errors = []
    if (req.body['address-line-1'] === '') {
      errors.push({
      text: 'Enter the first line of the address',
      href: '#first-line'
      })
    }
    if (req.body['address-town'] === '') {
      errors.push({
      text: 'Enter the town or city',
      href: '#town'
      })
    }
    if (req.body['address-postcode'] === '') {
      errors.push({
      text: 'Enter the postcode',
      href: '#postcode'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/applicants/first-applicant-contact')
      }
      else {
        res.render('.//version-1/applicants/first-applicant-enter-address-manually', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/applicants/first-applicant-contact', function(req, res) {
    var errors = []
    if (req.body['first-applicant-email-checkbox'] === undefined && req.body['first-applicant-phone'] === undefined) {
      errors.push({
      text: 'Enter your telephone number or email address',
      href: '#first-applicant-contact'
      })
    }
    else if (req.body['first-applicant-email-checkbox'] !== undefined && req.body['first-applicant-email-address'] === '' && req.body['first-applicant-phone'] !== undefined && req.body['first-applicant-phone-number'] === '') {
      errors.push({
        text: 'Enter an email address in the correct format, like name@example.com',
        href: '#first-applicant-email'
        })
        errors.push({
          text: 'Enter a UK telephone number',
          href: '#first-applicant-phone-number'
          })
    }
    else if (req.body['first-applicant-email-checkbox'] !== undefined && req.body['first-applicant-email-address'] === '') {
      errors.push({
        text: 'Enter an email address in the correct format, like name@example.com',
        href: '#first-applicant-email'
        })
    }
    else if (req.body['first-applicant-phone'] !== undefined && req.body['first-applicant-phone-number'] === '') {
      errors.push({
        text: 'Enter a UK telephone number',
        href: '#first-applicant-phone-number'
        })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/applicants/first-applicant-contact', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })




  // ********************** First applicant upload **********************
  router.post('/version-1/applicants/first-applicant-upload', function(req, res) {
    var errors = []
    if (req.body['first-applicant-upload'] === '') {
      errors.push({
      text: 'Error message',
      href: '#first-applicant-upload'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.upload = 1
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/applicants/first-applicant-upload', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })





  // ********************** Second applicant personal details **********************
  router.post('/version-1/applicants/second-applicant-name', function(req, res) {
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

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/applicants/second-applicant-other-names')
      }
      else {
        res.render('.//version-1/applicants/second-applicant-name', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/applicants/second-applicant-other-names', function(req, res) {
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

    count = req.session.data.secondApplicantNameCount
    if (req.body['submit-button'] === 'add') {
      if (req.body['second-applicant-previous-first-names'] !== '' && req.body['second-applicant-previous-last-names'] !== '') {
        req.session.data.secondApplicantPreviousFirstNames[count] = req.body['second-applicant-previous-first-names']
        req.session.data.secondApplicantPreviousLastNames[count] = req.body['second-applicant-previous-last-names']
        req.session.data.idSecondApplicant[count] = count
        req.session.data.secondApplicantNameCount = count + 1
        res.redirect('/version-1/applicants/second-applicant-other-names')
      }
      else {
        res.render('.//version-1/applicants/second-applicant-other-names', { errors: errors })
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
        res.redirect('/version-1/applicants/second-applicant-date-birth')
      }
      else {
        res.render('.//version-1/applicants/second-applicant-other-names', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/applicants/second-applicant-date-birth', function(req, res) {
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
          res.redirect('/version-1/applicants/second-applicant-nationality')
        }
        else {
          res.render('.//version-1/applicants/second-applicant-date-birth', { errors: errors })
        }
      }
      else {
        res.redirect('/version-1/task-list')
      }
  })


  router.post('/version-1/applicants/second-applicant-nationality', function(req, res) {
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
        res.redirect('/version-1/applicants/second-applicant-occupation')
      }
      else {
        res.render('.//version-1/applicants/second-applicant-nationality', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-as-draft') {
      res.redirect('/version-1/task-list')
    }
    else if (req.body['submit-button'] === 'add' && req.body['second-applicant-different-country'] !== '') {
      req.session.data.secondApplicantNationalities[count] = req.body['second-applicant-different-country']
      req.session.data.secondApplicantNationalityId[count] = count
      req.session.data.secondApplicantNationalityCount = count + 1
      res.redirect('/version-1/applicants/second-applicant-nationality')
    }
    else {
      res.render('.//version-1/applicants/second-applicant-nationality', { errors: errors })
    }
  })


  router.post('/version-1/applicants/second-applicant-occupation', function(req, res) {
    var errors = []
    if (req.body['second-applicant-occupation'] === '') {
      errors.push({
      text: 'Enter your occupation',
      href: '#second-applicant-occupation'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/task-list')
      }
      else {
          res.render('.//version-1/applicants/second-applicant-occupation', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })





  // ********************** Second applicant contact details **********************
router.post('/version-1/applicants/second-applicant-same-address', function(req, res) {
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
        // console.log("Test: ",req.body['same-address'])
        req.session.data.secondApplicantAddress = 1
        res.redirect('/version-1/applicants/second-applicant-contact')
      }
      else {
        res.redirect('/version-1/applicants/second-applicant-address')
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  }
  else {
      res.render('.//version-1/applicants/second-applicant-same-address', { errors: errors })
  }

})


router.post('/version-1/applicants/second-applicant-address', function(req, res) {
  var errors = []
  if (req.body['second-applicant-address'] === "") {
    errors.push({
    text: 'Enter a real postcode',
    href: '#second-applicant-address'
    })
  }
  if (req.body['submit-button'] === 'save-and-continue') {
    if (errors.length === 0) {
      res.redirect('/version-1/applicants/second-applicant-find-address')
    }
    else {
      res.render('.//version-1/applicants/second-applicant-address', { errors: errors })
    }
  }
  else {
    res.redirect('/version-1/task-list')
  }
})


router.post('/version-1/applicants/second-applicant-find-address', function(req, res) {
  var errors = []
  if (req.body['second-applicant-choose-address'] === 'address-found') {
    errors.push({
    text: 'Select an address',
    href: '#second-applicant-find-address'
    })
  }

  if (req.body['submit-button'] === 'save-and-continue') {
    if (errors.length === 0) {
      res.redirect('/version-1/applicants/second-applicant-contact')
    }
    else {
      res.render('.//version-1/applicants/second-applicant-find-address', { errors: errors })
    }
  }
  else {
    res.redirect('/version-1/task-list')
  }
})


router.post('/version-1/applicants/second-applicant-enter-address-manually', function(req, res) {
  var errors = []
  if (req.body['address-line-1'] === '') {
    errors.push({
    text: 'Enter the first line of the address',
    href: '#first-line'
    })
  }
  if (req.body['address-town'] === '') {
    errors.push({
    text: 'Enter the town or city',
    href: '#town'
    })
  }
  if (req.body['address-postcode'] === '') {
    errors.push({
    text: 'Enter the postcode',
    href: '#postcode'
    })
  }

  if (req.body['submit-button'] === 'save-and-continue') {
    if (errors.length === 0) {
      res.redirect('/version-1/applicants/second-applicant-contact')
    }
    else {
      res.render('.//version-1/applicants/second-applicant-enter-address-manually', { errors: errors })
    }
  }
  else {
    res.redirect('/version-1/task-list')
  }
})


router.post('/version-1/applicants/second-applicant-contact', function(req, res) {
  var errors = []
    if (req.body['second-applicant-email-checkbox'] === undefined && req.body['second-applicant-phone'] === undefined) {
      errors.push({
      text: 'Enter your telephone number or email address',
      href: '#second-applicant-contact'
      })
    }
    else if (req.body['second-applicant-email-checkbox'] !== undefined && req.body['second-applicant-email-address'] === '' && req.body['second-applicant-phone'] !== undefined && req.body['second-applicant-phone-number'] === '') {
      errors.push({
        text: 'Enter an email address in the correct format, like name@example.com',
        href: '#second-applicant-email'
        })
        errors.push({
          text: 'Enter a UK telephone number',
          href: '#second-applicant-phone-number'
          })
    }
    else if (req.body['second-applicant-email-checkbox'] !== undefined && req.body['second-applicant-email-address'] === '') {
      errors.push({
        text: 'Enter an email address in the correct format, like name@example.com',
        href: '#second-applicant-email'
        })
    }
    else if (req.body['second-applicant-phone'] !== undefined && req.body['second-applicant-phone-number'] === '') {
      errors.push({
        text: 'Enter a UK telephone number',
        href: '#second-applicant-phone-number'
        })
    }

    // req.session.data.secondApplicantContactCheckbox = req.body['second-applicant-contact-options']
  if (req.body['submit-button'] === 'save-and-continue') {
    if (errors.length === 0) {
      res.redirect('/version-1/task-list')
    }
    else {
      res.render('.//version-1/applicants/second-applicant-contact', { errors: errors })
    }
  }
  else {
    res.redirect('/version-1/task-list')
  }
})





// ********************** Second applicant upload **********************
router.post('/version-1/applicants/second-applicant-upload', function(req, res) {
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
      res.redirect('/version-1/task-list')
    }
    else {
      res.render('.//version-1/applicants/second-applicant-upload', { errors: errors })
    }
  }
  else {
    res.redirect('/version-1/task-list')
  }
})






// ******************************************** SECTION 2. CHILDREN ********************************************
// ************************************************************************************************************************************

// ******************************************** Child's details ********************************************
  router.post('/version-1/children/child-name', function(req, res) {
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

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/child-date-birth')
      }
      else {
        res.render('.//version-1/children/child-name', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/child-date-birth', function(req, res) {
    // console.log("Day: ", req.body['day'])
    var errors = []
    if (req.body['child-birth-day'] === '' || req.body['child-birth-month'] === '' || req.body['child-birth-year'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-203 for different error messages',
      href: '#child-date-birth'
      })
    }
      if (req.body['submit-button'] === 'save-and-continue') {
        if (errors.length === 0) {
          res.redirect('/version-1/children/child-sex')
        }
        else {
          res.render('.//version-1/children/child-date-birth', { errors: errors })
        }
      }
      else {
        res.redirect('/version-1/task-list')
      }
  })


  router.post('/version-1/children/child-sex', function(req, res) {
    var errors = []
    if (req.body['child-sex'] === undefined) {
      errors.push({
      text: 'Please select an answer',
      href: '#child-sex'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/child-nationality')
      }
      else {
        res.render('.//version-1/children/child-sex', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/child-nationality', function(req, res) {
    var errors = []

    if (req.body['child-british'] === undefined && req.body['child-irish'] === undefined && req.body['child-other'] === undefined && req.body['child-unsure'] === undefined) {
      // console.log("error")
      errors.push({
      text: 'Select a nationality or \'Not sure\'',
      href: '#checkbox-error'
      })
    }
    else if ((req.body['child-british'] !== undefined || req.body['child-irish'] !== undefined || req.body['child-other'] !== undefined) && req.body['child-unsure'] !== undefined) {
      // console.log("error")
      errors.push({
      text: 'Select a nationality or \'Not sure\'',
      href: '#checkbox-error'
      })
    }
    else if (req.body['child-other'] !== undefined && req.session.data.childNationalityCount === 0) {
      // console.log("no nationality added error: ", req.session.data.childNationalities)
      errors.push({
      text: 'This is not a valid entry',
      href: '#no-country'
      })
    }

    count = req.session.data.childNationalityCount
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.birthCertificateCompleted = 1
        req.session.data.childNationalities[count] = req.body['child-different-country']
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/children/child-nationality', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-as-draft') {
      res.redirect('/version-1/task-list')
    }
    else if (req.body['submit-button'] === 'add' && req.body['child-different-country'] !== '') {
      req.session.data.childNationalities[count] = req.body['child-different-country']
      req.session.data.childNationalityId[count] = count
      req.session.data.childNationalityCount = count + 1
      res.redirect('/version-1/children/child-nationality')
    }
    else {
      res.render('.//version-1/children/child-nationality', { errors: errors })
    }
  })





  // ********************** Child's adoption certificate details **********************
  router.post('/version-1/children/child-adoption-certificate', function(req, res) {
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
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/children/child-adoption-certificate', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })






  // ********************** Birth mother's details **********************
  router.post('/version-1/children/mother-name', function(req, res) {
    var errors = []
    if (req.body['mother-first-names'] === '') {
      errors.push({
      text: 'Enter their first names',
      href: '#first-names'
      })
    }
    if (req.body['mother-last-names'] === '') {
      errors.push({
      text: 'Enter their last names',
      href: '#last-names'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/mother-alive')
      }
      else {
        res.render('.//version-1/children/mother-name', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/mother-alive', function(req, res) {
    // console.log("Mother alive: ", req.body['mother-alive'])
    var errors = []
    if (req.body['mother-alive'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#mother-alive'
      })
    }
    else if (req.body['mother-alive'] === 'unsure' && req.body['reason-not-sure'] === '') {
      // console.log("Mother no reason")
      errors.push({
      text: 'Enter more detail',
      href: '#mother-no-reason'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['mother-alive'] === 'yes') {
          res.redirect('/version-1/children/mother-nationality')
        }
        else {
          req.session.data.birthMotherComplete = 1
          res.redirect('/version-1/task-list')
        }
      }
      else {
        res.render('.//version-1/children/mother-alive', { errors: errors })
      }
    }
    else {
        res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/mother-nationality', function(req, res) {
    var errors = []

    if (req.body['mother-british'] === undefined && req.body['mother-irish'] === undefined && req.body['mother-other'] === undefined && req.body['mother-unsure'] === undefined) {
      // console.log("error")
      errors.push({
      text: 'Select if they are British, Irish, citizen of a different country or not sure',
      href: '#checkbox-error'
      })
    }
    else if ((req.body['mother-british'] !== undefined || req.body['mother-irish'] !== undefined || req.body['mother-other'] !== undefined) && req.body['mother-unsure'] !== undefined) {
      // console.log("error")
      errors.push({
      text: 'Select a nationality or \'Not sure\'',
      href: '#checkbox-error'
      })
    }
    else if (req.body['mother-other'] !== undefined && req.session.data.motherNationalityCount === 0) {
      // console.log("no nationality added error: ", req.session.data.motherNationalities)
      errors.push({
      text: 'This is not a valid entry',
      href: '#no-country'
      })
    }

    count = req.session.data.motherNationalityCount
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.motherNationalities[count] = req.body['mother-different-country']
        res.redirect('/version-1/children/mother-occupation')
      }
      else {
        res.render('.//version-1/children/mother-nationality', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-as-draft') {
      res.redirect('/version-1/task-list')
    }
    else if (req.body['submit-button'] === 'add' && req.body['mother-different-country'] !== '') {
      req.session.data.motherNationalities[count] = req.body['mother-different-country']
      req.session.data.motherNationalityId[count] = count
      req.session.data.motherNationalityCount = count + 1
      res.redirect('/version-1/children/mother-nationality')
    }
    else {
      res.render('.//version-1/children/mother-nationality', { errors: errors })
    }
  })


  router.post('/version-1/children/mother-occupation', function(req, res) {
    var errors = []
    if (req.body['mother-occupation'] === '') {
      errors.push({
      text: 'Enter an occupation',
      href: '#mother-occupation'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/mother-have-address')
      }
      else {
          res.render('.//version-1/children/mother-occupation', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/mother-have-address', function(req, res) {
    var errors = []
    if (req.body['mother-have-address'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#mother-have-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['mother-have-address'] === 'no') {
          req.session.data.birthMotherComplete = 1
          res.redirect('/version-1/task-list')
        }
        else {
          res.redirect('/version-1/children/mother-address-postcode')
        }
      }
      else {
          res.render('.//version-1/children/mother-have-address', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/mother-address-postcode', function(req, res) {
    var errors = []
    if (req.body['mother-postcode'] === "") {
      errors.push({
      text: 'Enter a valid postcode',
      href: '#mother-address-postcode'
      })
    }
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/mother-find-address')
      }
      else {
        res.render('.//version-1/children/mother-address-postcode', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/mother-find-address', function(req, res) {
    // console.log(req.body['submit-button'])
    var errors = []
    if (req.body['mother-choose-address'] === 'address-found') {
      errors.push({
      text: 'Select an address',
      href: '#mother-find-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.motherAddress = 1
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/children/mother-find-address', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/mother-manual-address', function(req, res) {
    var errors = []
    if (req.body['address-line-1'] === '') {
      errors.push({
      text: 'Enter the first line of the address',
      href: '#first-line'
      })
    }
    if (req.body['address-town'] === '') {
      errors.push({
      text: 'Enter the town or city',
      href: '#town'
      })
    }
    if (req.body['address-postcode'] === '') {
      errors.push({
      text: 'Enter the postcode',
      href: '#postcode'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.motherAddress = 1
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/children/mother-manual-address', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })

  router.post('/version-1/children/mother-manual-address-international', function(req, res) {
    var errors = []
    if (req.body['address-line-1'] === '') {
      errors.push({
      text: 'Enter the first line of the address',
      href: '#first-line'
      })
    }
    if (req.body['country'] === '') {
      errors.push({
      text: 'Enter the country',
      href: '#country'
      })
    }


    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.motherAddress = 1
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/children/mother-manual-address-international', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })







  // ********************** Birth father's details **********************
  router.post('/version-1/children/father-in-certificate', function(req, res) {
    var errors = []
    if (req.body['father-in-certificate'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#father-in-certificate'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['father-in-certificate'] == 'no') {
          req.session.data.fatherAddress = 1
          res.redirect('/version-1/children/other-parent-exists')
        }
        else {
          res.redirect('/version-1/children/father-name')
        }
      }
      else {
          res.render('.//version-1/children/father-in-certificate', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/father-name', function(req, res) {
    var errors = []
    if (req.body['father-first-names'] === '') {
      errors.push({
      text: 'Enter their first names',
      href: '#first-names'
      })
    }
    if (req.body['father-last-names'] === '') {
      errors.push({
      text: 'Enter their last names',
      href: '#last-names'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/father-alive')
      }
      else {
        res.render('.//version-1/children/father-name', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/father-alive', function(req, res) {
    // console.log("father alive: ", req.body['father-alive'])
    var errors = []
    if (req.body['father-alive'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#father-alive'
      })
    }
    else if (req.body['father-alive'] === 'unsure' && req.body['reason-not-sure'] === '') {
      // console.log("father no reason")
      errors.push({
      text: 'Enter more details',
      href: '#father-no-reason'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['father-alive'] === 'yes') {
          res.redirect('/version-1/children/father-nationality')
        }
        else {
          req.session.data.birthfatherComplete = 1
          res.redirect('/version-1/task-list')
        }
      }
      else {
        res.render('.//version-1/children/father-alive', { errors: errors })
      }
    }
    else {
        res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/father-nationality', function(req, res) {
    var errors = []

    if (req.body['father-british'] === undefined && req.body['father-irish'] === undefined && req.body['father-other'] === undefined && req.body['father-unsure'] === undefined) {
      // console.log("error")
      errors.push({
      text: 'Select if they are British, Irish, citizen of a different country or not sure',
      href: '#checkbox-error'
      })
    }
    else if ((req.body['father-british'] !== undefined || req.body['father-irish'] !== undefined || req.body['father-other'] !== undefined) && req.body['father-unsure'] !== undefined) {
      // console.log("error")
      errors.push({
      text: 'Select a nationality or \'Not sure\'',
      href: '#checkbox-error'
      })
    }
    else if (req.body['father-other'] !== undefined && req.session.data.fatherNationalityCount === 0) {
      // console.log("no nationality added error: ", req.session.data.fatherNationalities)
      errors.push({
      text: 'This is not a valid entry',
      href: '#no-country'
      })
    }

    count = req.session.data.fatherNationalityCount
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.fatherNationalities[count] = req.body['father-different-country']
        res.redirect('/version-1/children/father-occupation')
      }
      else {
        res.render('.//version-1/children/father-nationality', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-as-draft') {
      res.redirect('/version-1/task-list')
    }
    else if (req.body['submit-button'] === 'add' && req.body['father-different-country'] !== '') {
      req.session.data.fatherNationalities[count] = req.body['father-different-country']
      req.session.data.fatherNationalityId[count] = count
      req.session.data.fatherNationalityCount = count + 1
      res.redirect('/version-1/children/father-nationality')
    }
    else {
      res.render('.//version-1/children/father-nationality', { errors: errors })
    }
  })


  router.post('/version-1/children/father-occupation', function(req, res) {
    var errors = []
    if (req.body['father-occupation'] === '') {
      errors.push({
      text: 'Enter an occupation',
      href: '#father-occupation'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/father-have-address')
      }
      else {
          res.render('.//version-1/children/father-occupation', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/father-have-address', function(req, res) {
    var errors = []
    if (req.body['father-have-address'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#father-have-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['father-have-address'] == 'no') {
          res.redirect('/version-1/task-list')
        }
        else {
          res.redirect('/version-1/children/father-address-postcode')
        }
      }
      else {
          res.render('.//version-1/children/father-have-address', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/father-address-postcode', function(req, res) {
    var errors = []
    if (req.body['father-postcode'] === "") {
      errors.push({
      text: 'Enter a real postcode',
      href: '#father-address-postcode'
      })
    }
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/father-find-address')
      }
      else {
        res.render('.//version-1/children/father-address-postcode', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/father-find-address', function(req, res) {
    // console.log(req.body['submit-button'])
    var errors = []
    if (req.body['father-choose-address'] === 'address-found') {
      errors.push({
      text: 'Select an address',
      href: '#father-find-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.fatherAddress = 1
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/children/father-find-address', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/father-manual-address', function(req, res) {
    var errors = []
    if (req.body['address-line-1'] === '') {
      errors.push({
      text: 'Enter the first line of the address',
      href: '#first-line'
      })
    }
    if (req.body['address-town'] === '') {
      errors.push({
      text: 'Enter the town or city',
      href: '#town'
      })
    }
    if (req.body['address-postcode'] === '') {
      errors.push({
      text: 'Enter the postcode',
      href: '#postcode'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.fatherAddress = 1
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/children/father-manual-address', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })

  router.post('/version-1/children/father-manual-address-international', function(req, res) {
    var errors = []
    if (req.body['address-line-1'] === '') {
      errors.push({
      text: 'Enter the first line of the address',
      href: '#first-line'
      })
    }
    if (req.body['country'] === '') {
      errors.push({
      text: 'Enter the country',
      href: '#country'
      })
    }


    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.motherAddress = 1
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/children/father-manual-address-international', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })





  // ********************** Other parent or guardian details **********************
  router.post('/version-1/children/other-parent-exists', function(req, res) {
    // console.log("father alive: ", req.body['other-parent-exists'])
    var errors = []
    if (req.body['other-parent-exists'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#other-parent'
      })
    }
    else if (req.body['other-parent-exists'] === 'unsure' && req.body['reason-not-sure'] === '') {
      // console.log("father no reason")
      errors.push({
      text: 'Enter more detail',
      href: '#other-parent-no-reason'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['other-parent-exists'] === 'yes') {
          res.redirect('/version-1/children/other-parent-name')
        }
        else {
          req.session.data.otherParentCompleted = 1
          res.redirect('/version-1/task-list')
        }
      }
      else {
        res.render('.//version-1/children/other-parent-exists', { errors: errors })
      }
    }
    else {
        res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/other-parent-name', function(req, res) {
    var errors = []
    if (req.body['other-parent-first-names'] === '') {
      errors.push({
      text: 'Enter their first names',
      href: '#first-names'
      })
    }
    if (req.body['other-parent-last-names'] === '') {
      errors.push({
      text: 'Enter their last names',
      href: '#last-names'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/other-parent-have-address')
      }
      else {
        res.render('.//version-1/children/other-parent-name', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/other-parent-have-address', function(req, res) {
    var errors = []
    if (req.body['other-parent-have-address'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#other-parent-have-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['other-parent-have-address'] == 'no') {
          req.session.data.otherParentCompleted = 1
          res.redirect('/version-1/task-list')
        }
        else {
          res.redirect('/version-1/children/other-parent-address-postcode')
        }
      }
      else {
          res.render('.//version-1/children/other-parent-have-address', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/other-parent-address-postcode', function(req, res) {
    var errors = []
    if (req.body['other-parent-postcode'] === "") {
      errors.push({
      text: 'Enter a valid postcode',
      href: '#other-parent-address-postcode'
      })
    }
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/other-parent-find-address')
      }
      else {
        res.render('.//version-1/children/other-parent-address-postcode', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/other-parent-find-address', function(req, res) {
    // console.log(req.body['submit-button'])
    var errors = []
    if (req.body['other-parent-choose-address'] === 'address-found') {
      errors.push({
      text: 'Select an address',
      href: '#other-parent-find-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.otherParentCompleted = 1
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/children/other-parent-find-address', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/other-parent-manual-address', function(req, res) {
    var errors = []
    if (req.body['address-line-1'] === '') {
      errors.push({
      text: 'Enter the first line of the address',
      href: '#first-line'
      })
    }
    if (req.body['address-town'] === '') {
      errors.push({
      text: 'Enter the town or city',
      href: '#town'
      })
    }
    if (req.body['address-postcode'] === '') {
      errors.push({
      text: 'Enter the postcode',
      href: '#postcode'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.otherParentCompleted = 1
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/children/other-parent-manual-address', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/other-parent-manual-address-international', function(req, res) {
    var errors = []
    if (req.body['address-line-1'] === '') {
      errors.push({
      text: 'Enter the first line of the address',
      href: '#first-line'
      })
    }
    if (req.body['country'] === '') {
      errors.push({
      text: 'Enter the country',
      href: '#country'
      })
    }


    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.motherAddress = 1
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/children/other-parent-manual-address-international', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })





  // ********************** Adoption agency or local authority **********************
  router.post('/version-1/children/applicant-adoption-agency-details', function(req, res) {
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
      text: 'Devs: "Enter an email address" [if left blank] or "Enter an email address in the correct format, like name@example.com" [if in the wrong format] ',
      href: '#email'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/applicant-other-adoption-agency')
      }
      else {
        res.render('.//version-1/children/applicant-adoption-agency-details', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/applicant-other-adoption-agency', function(req, res) {
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
          res.redirect('/version-1/children/applicant-adoption-agency-details-2')
        }
        else {
          res.redirect('/version-1/children/child-social-worker-details')
        }
      }
      else {
        res.render('.//version-1/children/applicant-other-adoption-agency', { errors: errors })
      }
    }
    else {
        res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/applicant-adoption-agency-details-2', function(req, res) {
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
    if (req.body['applicant-email-2'] === '') {
      errors.push({
      text: 'Devs: "Enter an email address" [if left blank] or "Enter an email address in the correct format, like name@example.com" [if in the wrong format] ',
      href: '#email'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/child-social-worker-details')
      }
      else {
        res.render('.//version-1/children/applicant-adoption-agency-details-2', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/child-social-worker-details', function(req, res) {
    var errors = []
    if (req.body['child-social-worker-name'] === '') {
      errors.push({
      text: 'Enter a name',
      href: '#name'
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

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/solicitor-helping')
      }
      else {
        res.render('.//version-1/children/child-social-worker-details', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })






 // ********************** Solicitor details **********************
  router.post('/version-1/children/solicitor-helping', function(req, res) {
    // console.log("Mother alive: ", req.body['solicitor-helping'])
    var errors = []
    if (req.body['solicitor-helping'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#solicitor-helping'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['solicitor-helping'] === 'yes') {
          res.redirect('/version-1/children/solicitor-details')
        }
        else {
          req.session.data.solicitorCompleted = 1
          res.redirect('/version-1/task-list')
        }
      }
      else {
        res.render('.//version-1/children/solicitor-helping', { errors: errors })
      }
    }
    else {
        res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/solicitor-details', function(req, res) {
    var errors = []
    if (req.body['solicitor-company-name'] === '') {
      errors.push({
      text: 'Enter a practice or company name',
      href: '#name'
      })
    }
    if (req.body['solicitor-name'] === '') {
      errors.push({
      text: 'Enter the solicitor\'s name',
      href: '#solicitorName'
      })
    }
    if (req.body['solicitor-phone-number'] === '') {
      errors.push({
      text: 'Enter a UK telephone number',
      href: '#phone'
      })
    }
    if (req.body['solicitor-email'] === '') {
      errors.push({
      text: 'Enter an email address',
      href: '#email'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.solicitorCompleted = 1
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/children/solicitor-details', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })






  // ************************************* Placement and court orders ************************************* //
  router.post('/version-1/children/orders-placement-case-number', function(req, res) {
    var errors = []
    if (req.body['placement-case-number'] === '') {
      errors.push({
      text: 'Enter the serial or case number',
      href: '#case-number'
      })
    }

    count = req.session.data.childOrderCount

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.childOrderCount = count
        req.session.data.childOrderType[count] = "Placement order"
        req.session.data.childOrderId[count] = count
        req.session.data.childOrderNumber[count] = req.body['placement-case-number']
        req.session.data.childOrderCompleted[count] = "No"
        req.session.data.childOrderInProgress = "Yes"
        res.redirect('/version-1/children/orders-placement-court')
      }
      else {
        res.render('.//version-1/children/orders-placement-case-number', { errors: errors })
      }
    }
    else {
      req.session.data.childOrderInProgress = "Yes"
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/orders-placement-court', function(req, res) {
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
        res.redirect('/version-1/children/orders-placement-date')
      }
      else {
        res.render('.//version-1/children/orders-placement-court', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/orders-placement-date', function(req, res) {
    var errors = []
    if (req.body['placement-day'] === '' || req.body['placement-month'] === '' || req.body['placement-year'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-281 for different error messages',
      href: '#order-date'
      })
    }

    count = req.session.data.childOrderCount

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.childOrderDay[count] = req.body['placement-day']
        req.session.data.childOrderMonth[count] = req.body['placement-month']
        req.session.data.childOrderYear[count] = req.body['placement-year']
        req.session.data.childOrderCompleted[count] = "Yes"
        res.redirect('/version-1/children/orders-summary')
      }
      else {
        res.render('.//version-1/children/orders-placement-date', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
    // console.log("Month: ", req.session.data.childOrderMonth[count])
  })


  router.post('/version-1/children/orders-summary', function(req, res) {
    var errors = []
    if (req.body['add-another'] === undefined) {
      errors.push({
      text: 'Please select an answer',
      href: '#add-another'
      })
    }

    if (req.body['submit-button'] === 'continue') {
      res.redirect('/version-1/children/orders-summary')
    }
    else if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['add-another'] === 'Yes') {
          res.redirect('/version-1/children/orders-order-type')
        }
        else {
          req.session.data.AddToListFinished = 1
          res.redirect('/version-1/task-list')
        }
      }
      else {
        res.render('.//version-1/children/orders-summary', { errors: errors })
      }
    }
    else {
        res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/orders-order-type', function(req, res) {
    var errors = []
    if (req.body['order-type'] === '') {
      errors.push({
      text: 'Enter the type of order',
      href: '#order-type'
      })
    }

    count = req.session.data.childOrderCount + 1
    req.session.data.childOrderCount = count

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.childOrderCount = count
        req.session.data.childOrderId[count] = count
        req.session.data.childOrderType[count] = req.body['order-type']
        req.session.data.childOrderCompleted[count] = "No"
        res.redirect('/version-1/children/orders-order-case-number')
      }
      else {
        res.render('.//version-1/children/orders-order-type', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/orders-order-case-number', function(req, res) {
    var errors = []
    if (req.body['order-case-number'] === '') {
      errors.push({
      text: 'Enter the serial or case number',
      href: '#case-number'
      })
    }

    count = req.session.data.childOrderCount

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.childOrderNumber[count] = req.body['order-case-number']
        res.redirect('/version-1/children/orders-order-court')
      }
      else {
        res.render('.//version-1/children/orders-order-case-number', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/orders-order-court', function(req, res) {
    var errors = []
    if (req.body['order-court-name'] === '') {
      errors.push({
      text: 'Enter the name of the court',
      href: '#order-court-name'
      })
    }

    count = req.session.data.childOrderCount

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.childOrderCourt[count] = req.body['order-court-name']
        res.redirect('/version-1/children/orders-order-date')
      }
      else {
        res.render('.//version-1/children/orders-order-court', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/orders-order-date', function(req, res) {
    var errors = []
    if (req.body['order-day'] === '' || req.body['order-month'] === '' || req.body['order-year'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-281 for different error messages',
      href: '#order-date'
      })
    }

    count = req.session.data.childOrderCount

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.childOrderDay[count] = req.body['order-day']
        req.session.data.childOrderMonth[count] = req.body['order-month']
        req.session.data.childOrderYear[count] = req.body['order-year']
        req.session.data.childOrderCompleted[count] = "Yes"
        res.redirect('/version-1/children/orders-summary')
      }
      else {
        res.render('.//version-1/children/orders-order-date', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })




  // ********************** Sibling details **********************
  router.post('/version-1/children/sibling-exists', function(req, res) {
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
          res.redirect('/version-1/children/sibling-court-order-exists')
        }
        else {
          req.session.data.siblingCompleted = 1
          res.redirect('/version-1/task-list')
        }
      }
      else {
        res.render('.//version-1/children/sibling-exists', { errors: errors })
      }
    }
    else {
        res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/sibling-court-order-exists', function(req, res) {
    // console.log("father alive: ", req.body['sibling-court-order-exists'])
    var errors = []
    if (req.body['sibling-court-order-exists'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#ourt-order-checkbox'
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
          res.redirect('/version-1/children/sibling-name')
        }
        else {
          req.session.data.siblingCompleted = 1
          res.redirect('/version-1/task-list')
        }
      }
      else {
        res.render('.//version-1/children/sibling-court-order-exists', { errors: errors })
      }
    }
    else {
        res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/sibling-name', function(req, res) {
    var errors = []
    if (req.body['sibling-first-names'] === '') {
      errors.push({
      text: 'Enter their first names',
      href: '#first-names'
      })
    }
    if (req.body['sibling-last-names'] === '') {
      errors.push({
      text: 'Enter their last names',
      href: '#last-names'
      })
    }

    count = req.session.data.siblingOrderCount

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.siblingOrderId[count] = count
        req.session.data.uniqueSiblingId[count] = count
        req.session.data.uniqueSiblingFirstNames[count] = req.body['sibling-first-names']
        req.session.data.uniqueSiblingLastNames[count] = req.body['sibling-last-names']
        req.session.data.siblingFirstNames[count] = req.body['sibling-first-names']
        req.session.data.siblingLastNames[count] = req.body['sibling-last-names']
        req.session.data.numberOfSiblings = 1
        res.redirect('/version-1/children/sibling-order-type')
      }
      else {
        res.render('.//version-1/children/sibling-name', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/sibling-change-name', function(req, res) {
    var errors = []
    if (req.body['sibling-first-names'] === '') {
      errors.push({
      text: 'Enter their first names',
      href: '#first-names'
      })
    }
    if (req.body['sibling-last-names'] === '') {
      errors.push({
      text: 'Enter their last names',
      href: '#last-names'
      })
    }

    count = req.session.data.siblingOrderCount
    sib = req.body['sibling-id']

    if (errors.length === 0) {
      uniqueFirstOriginal = req.session.data.uniqueSiblingFirstNames[sib]
      uniqueLastOriginal = req.session.data.uniqueSiblingLastNames[sib]
      console.log(uniqueFirstOriginal)
      console.log(uniqueLastOriginal)
      req.session.data.uniqueSiblingFirstNames[sib] = req.body['sibling-first-names']
      req.session.data.uniqueSiblingLastNames[sib] = req.body['sibling-last-names']
      console.log(req.session.data.uniqueSiblingFirstNames[sib])
      console.log(req.session.data.uniqueSiblingLastNames[sib])

      for (let index = 0; index < req.session.data.siblingOrderId.length; index++) {
        fn = req.session.data.siblingFirstNames[index]
        ln = req.session.data.siblingLastNames[index]
        console.log(fn)
        console.log(ln)
        if (fn == uniqueFirstOriginal) {
          req.session.data.siblingFirstNames[index] = req.body['sibling-first-names']
        }
        if (ln == uniqueLastOriginal) {
          req.session.data.siblingLastNames[index] = req.body['sibling-last-names']
        }
      }
      console.log(req.session.data.siblingFirstNames)
      res.redirect('/version-1/children/sibling-summary')
    }
    else {
      res.render('.//version-1/children/sibling-change-name', { errors: errors })
    }
  })


  router.post('/version-1/children/sibling-order-type', function(req, res) {
    var errors = []
    if (req.body['sibling-order-type'] === '') {
      errors.push({
      text: 'Enter the type of order',
      href: '#order-type'
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
        req.session.data.siblingOrderType[count] = req.body['sibling-order-type']
        req.session.data.siblingOrderCompleted[count] = "No"
        req.session.data.siblingOrderCount++
        res.redirect('/version-1/children/sibling-order-case-number')
      }
      else {
        res.render('.//version-1/children/sibling-order-type', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/sibling-change-order-type', function(req, res) {
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
      res.redirect('/version-1/children/sibling-check-your-answers')
    }
    else {
      res.render('.//version-1/children/sibling-change-order-type', { errors: errors })
    }
  })



  router.post('/version-1/children/sibling-order-case-number', function(req, res) {
    var errors = []
    if (req.body['sibling-order-case-number'] === '') {
      errors.push({
      text: 'Please answer the question',
      href: '#case-number'
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
        req.session.data.siblingOrderNumber[count] = req.body['sibling-order-case-number']
        res.redirect('/version-1/children/sibling-order-court')
      }
      else {
        res.render('.//version-1/children/sibling-order-case-number', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/sibling-change-order-case-number', function(req, res) {
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
      res.redirect('/version-1/children/sibling-check-your-answers')
    }
    else {
      res.render('.//version-1/children/sibling-change-case-number', { errors: errors })
    }
  })


  router.post('/version-1/children/sibling-order-court', function(req, res) {
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
        res.redirect('/version-1/children/sibling-order-date')
      }
      else {
        res.render('.//version-1/children/sibling-order-court', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/sibling-change-order-court', function(req, res) {
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
      res.redirect('/version-1/children/sibling-check-your-answers')
    }
    else {
      res.render('.//version-1/children/sibling-change-court', { errors: errors })
    }
  })


  router.post('/version-1/children/sibling-order-date', function(req, res) {
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
        req.session.data.siblingOrderDay[count] = req.body['sibling-day']
        req.session.data.siblingOrderMonth[count] = req.body['sibling-month']
        req.session.data.siblingOrderYear[count] = req.body['sibling-year']
        req.session.data.siblingOrderCompleted[count] = "Yes"
        res.redirect('/version-1/children/sibling-summary')
//        req.session.data.siblingOrderCount = req.session.data.siblingOrderCount + 1

      }
      else {
        res.render('.//version-1/children/sibling-order-date', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/sibling-change-order-date', function(req, res) {
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
      res.redirect('/version-1/children/sibling-check-your-answers')
    }
    else {
      res.render('.//version-1/children/sibling-change-order-date', { errors: errors })
    }
  })


  router.post('/version-1/children/sibling-summary', function(req, res) {
    var errors = []
    if (req.body['sibling-add-another'] === undefined) {
      errors.push({
      text: 'Please select an answer',
      href: '#sibling-add-another'
      })
    }

    if (req.body['submit-button'] === 'continue') {
      res.redirect('/version-1/children/sibling-summary')
    }
    else if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['sibling-add-another'] === 'Yes') {
          res.redirect('/version-1/children/sibling-choose-sibling')
        }
        else {
          req.session.data.siblingOrderCompleted = 1
          res.redirect('/version-1/task-list')
        }
      }
      else {
        res.render('.//version-1/children/sibling-summary', { errors: errors })
      }
    }
    else {
        res.redirect('/version-1/task-list')
    }
  })



  router.post('/version-1/children/sibling-choose-sibling', function(req, res) {
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
        res.redirect('/version-1/children/sibling-order-type')
      }
      else {
        res.render('.//version-1/children/sibling-choose-sibling', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
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



  router.post('/version-1/children/sibling-remove-court-order', function(req, res) {
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
        res.redirect('/version-1/children/sibling-summary')
      }
      else {
        res.redirect('/version-1/children/sibling-court-order-exists')
      }
    }
    else {
      res.render('.//version-1/children/sibling-remove-order-court', { errors: errors })
    }
  })


// ******************************************** SECTION 4. UPLOADS ********************************************
// ************************************************************************************************************************************

  // ********************** Uploads  **********************
  router.post('/version-1/upload/applicants-documents-upload', function(req, res) {
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
      res.redirect('/version-1/task-list')
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/upload/child-documents-upload', function(req, res) {
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
      res.redirect('/version-1/task-list')
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })





// ******************************************** SECTION 5. CHECK, PAY AND SUBMIT ********************************************
// ************************************************************************************************************************************


//**************************************** Check, Pay and Submit ************************************************************

  router.post('/version-1/check-pay-and-submit/check-your-answers', function(req, res) {
    res.redirect('/version-1/check-pay-and-submit/declaration')
  })




//    router.post('/version-1/check-pay-and-submit/payment', function(req, res) {
  //    res.redirect('/version-1/check-pay-and-submit/confirmation')
  //      })

  router.post('/version-1/check-pay-and-submit/declaration', function(req, res) {
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
        res.redirect('/version-1/check-pay-and-submit/need-help-with-fees-ref')
      }
      else {
        res.render('.//version-1/check-pay-and-submit/declaration', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })



  router.post('/version-1/check-pay-and-submit/need-help-with-fees-ref', function(req, res) {
    var errors = []
    if (req.body['help-with-fees-ref'] === undefined) {
      errors.push({
      text: "Select an option",
      href: '#help-with-fees-ref'
      })
    }
    else if (req.body['help-with-fees-ref'] === "yes" && req.body['ref'].length === 0) {
      errors.push({
        text: 'Enter your reference number',
        href: '#no-number'
      })
    }

    if (errors.length === 0) {
      if (req.body['help-with-fees-ref'] === "yes") {
        res.redirect('/version-1/check-pay-and-submit/help-with-fees-send-app')
      }
      else if (req.body['help-with-fees-ref'] === "no") {
        res.redirect('/version-1/check-pay-and-submit/get-hwf-reference')
      }
      else {
        res.redirect('/version-1/check-pay-and-submit/process-payment')
      }
    }
    else {
        res.render('.//version-1/check-pay-and-submit/need-help-with-fees-ref', { errors: errors })
    }
  })





  router.post('/version-1/check-pay-and-submit/get-hwf-reference', function(req, res) {
    var errors = []
    if (req.body['ref'] === '') {
      errors.push({
      text: "Enter your reference number",
      href: '#no-help-ref'
      })
    }
    if (req.body['continue'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/check-pay-and-submit/help-with-fees-send-app')
      }
      else {
        res.render('.//version-1/check-pay-and-submit/get-hwf-reference', { errors: errors })
      }
    }

    })




  router.post('/version-1/check-pay-and-submit/help-with-fees-send-app', function(req, res) {
    var errors = []
    if (req.body['ref'] === '') {
      errors.push({
      text: "Enter you reference number",
      href: '#no-ref'
      })
    }
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/check-pay-and-submit/confirmation')
      }
      else {
        res.render('.//version-1/check-pay-and-submit/help-with-fees-send-app', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
    })


  router.post('/version-1/check-pay-and-submit/process-payment', function(req, res) {
    res.redirect('/version-1/check-pay-and-submit/confirmation')
  })
// ***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************* Old functions not in use any more ************************************* //
  // router.post('/version-1/children/mother-why-no-address', function(req, res) {
  //   var errors = []
  //   if (req.body['mother-why-no-address'] === '') {
  //     errors.push({
  //     text: 'Enter your occupation',
  //     href: '#mother-why-no-address'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/task-list')
  //     }
  //     else {
  //         res.render('.//version-1/children/mother-why-no-address', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })


  // router.post('/version-1/children/father-why-no-address', function(req, res) {
  //   var errors = []
  //   if (req.body['father-why-no-address'] === '') {
  //     errors.push({
  //     text: 'Enter your occupation',
  //     href: '#father-why-no-address'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/task-list')
  //     }
  //     else {
  //         res.render('.//version-1/children/father-why-no-address', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })



  // router.post('/version-1/children/children/applicant-adoption-agency-details', function(req, res) {
  //   var errors = []
  //   if (req.body['agency-name'] === '') {
  //     errors.push({
  //     text: 'Enter a name',
  //     href: '#agency-name'
  //     })
  //   }
  //   if (req.body['phone-number'] === '') {
  //     errors.push({
  //     text: 'Enter a telephone number',
  //     href: '#phone-number'
  //     })
  //   }
  //   if (req.body['contact-name'] === '') {
  //     errors.push({
  //     text: 'Enter a name',
  //     href: '#contact-name'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/child-adoption-agency-name')
  //     }
  //     else {
  //       res.render('.//version-1/children/applicant-adoption-agency-details', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })


  // router.post('/version-1/children/applicant-social-worker-name', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-social-worker-name'] === '') {
  //     errors.push({
  //     text: 'Enter the name of the social worker',
  //     href: '#applicant-social-worker-name'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/applicant-social-worker-email')
  //     }
  //     else {
  //       res.render('.//version-1/children/applicant-social-worker-name', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })


  // router.post('/version-1/children/applicant-social-worker-email', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-social-worker-email'] === '') {
  //     errors.push({
  //     text: 'Enter an email address',
  //     href: '#applicant-social-worker-email'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/applicant-social-worker-team-email')
  //     }
  //     else {
  //       res.render('.//version-1/children/applicant-social-worker-email', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })


  // router.post('/version-1/children/applicant-social-worker-team-email', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-social-worker-team-email'] === undefined) {
  //     errors.push({
  //     text: 'Select an answer',
  //     href: '#no-radio-chosen'
  //     })
  //   }
  //   else if (req.body['team-email'] === '') {
  //     errors.push({
  //       text: 'Enter a valid email address',
  //       href: '#no-team-email'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/applicant-social-worker-number')
  //     }
  //     else {
  //       res.render('.//version-1/children/applicant-social-worker-team-email', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })


  // router.post('/version-1/children/applicant-social-worker-number', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-social-worker-number'] === undefined) {
  //     errors.push({
  //     text: 'Select an answer',
  //     href: '#no-radio-chosen'
  //     })
  //   }
  //   else if (req.body['applicant-social-worker-number'] === '') {
  //     errors.push({
  //       text: 'Enter a number',
  //       href: '#no-number'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/applicant-social-worker-address')
  //     }
  //     else {
  //       res.render('.//version-1/children/applicant-social-worker-number', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })


  // router.post('/version-1/children/applicant-social-worker-address', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-social-worker-address'] === "") {
  //     errors.push({
  //     text: 'Enter a valid postcode',
  //     href: '#applicant-social-worker-address'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/applicant-social-worker-find-address')
  //     }
  //     else {
  //       res.render('.//version-1/children/applicant-social-worker-address', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })


  // router.post('/version-1/children/applicant-social-worker-find-address', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-social-worker-choose-address'] === 'address-found') {
  //     errors.push({
  //     text: 'Select an address',
  //     href: '#applicant-social-worker-find-address'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/child-adoption-agency-name')
  //     }
  //     else {
  //       res.render('.//version-1/children/applicant-social-worker-find-address', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })


  // router.post('/version-1/children/applicant-social-worker-enter-address-manually', function(req, res) {
  //   var errors = []
  //   if (req.body['address-line-1'] === '') {
  //     errors.push({
  //     text: 'Enter the first line of the address',
  //     href: '#first-line'
  //     })
  //   }
  //   if (req.body['address-town'] === '') {
  //     errors.push({
  //     text: 'Enter the town or city',
  //     href: '#town'
  //     })
  //   }
  //   if (req.body['address-postcode'] === '') {
  //     errors.push({
  //     text: 'Enter the postcode',
  //     href: '#postcode'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/child-adoption-agency-name')
  //     }
  //     else {
  //       res.render('.//version-1/children/applicant-social-worker-enter-address-manually', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })

//************************ Child's adoption agency or local authority *****************************

// router.post('/version-1/children/child-adoption-agency-name', function(req, res) {
//   var errors = []
//   if (req.body['child-adoption-agency-name'] === '') {
//     errors.push({
//     text: 'Enter the name of the adoption agency',
//     href: '#child-adoption-agency-name'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/version-1/children/child-social-worker-name')
//     }
//     else {
//       res.render('.//version-1/children/child-adoption-agency-name', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/version-1/task-list')
//   }
// })



// router.post('/version-1/children/child-social-worker-name', function(req, res) {
//   var errors = []
//   if (req.body['child-social-worker-name'] === '') {
//     errors.push({
//     text: 'Enter the name of the social worker',
//     href: '#child-social-worker-name'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/version-1/children/child-social-worker-email')
//     }
//     else {
//       res.render('.//version-1/children/child-social-worker-name', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/version-1/task-list')
//   }
// })

// router.post('/version-1/children/child-social-worker-email', function(req, res) {
//   var errors = []
//   if (req.body['child-social-worker-email'] === '') {
//     errors.push({
//     text: 'Enter the email address',
//     href: '#child-social-worker-email'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/version-1/children/child-social-worker-team-email')
//     }
//     else {
//       res.render('.//version-1/children/child-social-worker-email', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/version-1/task-list')
//   }
// })

//TO FIX - MULTIPLE ERROR MESSAGE NEEDED

  // router.post('/version-1/children/child-social-worker-team-email', function(req, res) {
  //   var errors = []
  //   if (req.body['child-social-worker-team-email'] === undefined) {
  //     errors.push({
  //     text: 'Select an answer',
  //     href: '#no-radio-chosen'
  //     })
  //   }
  //   else if (req.body['team-email'] === '') {
  //     errors.push({
  //       text: 'Enter a valid email address',
  //       href: '#no-team-email'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/child-social-worker-number')
  //     }
  //     else {
  //       res.render('.//version-1/children/child-social-worker-team-email', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })


//TO FIX - MULTIPLE ERROR MESSAGE NEEDED
// router.post('/version-1/children/child-social-worker-number', function(req, res) {
//   var errors = []
//   if (req.body['child-social-worker-number'] === undefined) {
//     errors.push({
//     text: 'Select an answer',
//     href: '#no-radio-chosen'
//     })
//   }
//   else if (req.body['number'] === '') {
//     errors.push({
//       text: 'Enter a phone number',
//       href: '#no-number'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/version-1/children/child-social-worker-address')
//     }
//     else {
//       res.render('.//version-1/children/child-social-worker-number', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/version-1/task-list')
//   }
// })


// router.post('/version-1/children/child-social-worker-address', function(req, res) {
//   var errors = []
//   if (req.body['child-social-worker-address'] === "") {
//     errors.push({
//     text: 'Enter a valid postcode',
//     href: '#child-social-worker-address'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/version-1/children/child-social-worker-find-address')
//     }
//     else {
//       res.render('.//version-1/children/child-social-worker-address', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/version-1/task-list')
//   }
// })

// router.post('/version-1/children/child-social-worker-find-address', function(req, res) {
//   var errors = []
//   if (req.body['child-social-worker-choose-address'] === 'address-found') {
//     errors.push({
//     text: 'Select an address',
//     href: '#child-social-worker-find-address'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/version-1/children/solicitor-helping')
//     }
//     else {
//       res.render('.//version-1/children/child-social-worker-find-address', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/version-1/task-list')
//   }
// })


// router.post('/version-1/children/child-social-worker-enter-address-manually', function(req, res) {
//   var errors = []
//   if (req.body['child-social-worker-address-line-1'] === '' || req.body['child-social-worker-postcode'] === ''){
//     errors.push({
//     text: 'Enter address',
//     href: '#child-social-worker-manual-address'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/version-1/solicitor-helping')
//     }
//     else {
//       res.render('.//version-1/children/child-social-worker-enter-address-manually', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/version-1/task-list')
//   }
// })


  // router.post('/version-1/children/solicitor-firm-name', function(req, res) {
  //   var errors = []
  //   if (req.body['solicitor-firm-name'] === '') {
  //     errors.push({
  //     text: 'Enter the name of the practice or company',
  //     href: '#solicitor-firm-name'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/solicitor-name')
  //     }
  //     else {
  //       res.render('.//version-1/children/solicitor-firm-name', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })

  // router.post('/version-1/children/solicitor-name', function(req, res) {
  //   var errors = []
  //   if (req.body['solicitor-name'] === '') {
  //     errors.push({
  //     text: 'Enter the name of your solicitor',
  //     href: '#solicitor-name'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/solicitor-email')
  //     }
  //     else {
  //       res.render('.//version-1/children/solicitor-name', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })

  // router.post('/version-1/children/solicitor-email', function(req, res) {
  //   var errors = []
  //   if (req.body['solicitor-email'] === '') {
  //     errors.push({
  //     text: 'Enter an email address',
  //     href: '#solicitor-email'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/solicitor-number')
  //     }
  //     else {
  //       res.render('.//version-1/children/solicitor-email', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })


  // router.post('/version-1/children/solicitor-address', function(req, res) {
  //   var errors = []
  //   if (req.body['solicitor-address'] === "") {
  //     errors.push({
  //     text: 'Enter a valid postcode',
  //     href: '#solicitor-address'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/solicitor-find-address')
  //     }
  //     else {
  //       res.render('.//version-1/children/solicitor-address', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })

  // router.post('/version-1/children/solicitor-enter-address-manually', function(req, res) {
  //   var errors = []
  //   if (req.body['address-line-1'] === '') {
  //     errors.push({
  //     text: 'Enter the first line of the address',
  //     href: '#first-line'
  //     })
  //   }
  //   if (req.body['address-town'] === '') {
  //     errors.push({
  //     text: 'Enter the town or city',
  //     href: '#town'
  //     })
  //   }
  //   if (req.body['address-postcode'] === '') {
  //     errors.push({
  //     text: 'Enter the postcode',
  //     href: '#postcode'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/task-list')
  //     }
  //     else {
  //       res.render('.//version-1/children/solicitor-enter-address-manually', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })

  // router.post('/version-1/children/solicitor-find-address', function(req, res) {
  //   var errors = []
  //   if (req.body['solicitor-choose-address'] === 'address-found') {
  //     errors.push({
  //     text: 'Select an address',
  //     href: '#solicitor-find-address'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/task-list')
  //     }
  //     else {
  //       res.render('.//version-1/children/solicitor-find-address', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })


  // router.post('/version-1/children/solicitor-number', function(req, res) {
  //   var errors = []
  //   if (req.body['solicitor-number'] === undefined) {
  //     errors.push({
  //     text: 'Select an answer',
  //     href: '#no-radio-chosen'
  //     })
  //   }
  //   else if (req.body['number'] === '') {
  //     errors.push({
  //       text: 'Enter a number',
  //       href: '#no-number'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/version-1/children/solicitor-address')
  //     }
  //     else {
  //       res.render('.//version-1/children/solicitor-number', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/version-1/task-list')
  //   }
  // })


  // router.post('/version-1/children/applicant-adoption-agency-or-social-worker', function(req, res) {
  //   var errors = []
  //   if (req.body['agency'] === undefined) {
  //     errors.push({
  //     text: 'Please select an answer',
  //     href: '#agency'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       if (req.body['agency'] === 'yes') {
  //         res.redirect('/version-1/children/child-')
  //       }
  //       else {
  //         res.redirect('/version-1/children/child-social-worker-details')
  //       }
  //     }
  //     else {
  //       res.render('.//version-1/children/applicant-adoption-agency-or-social-worker', { errors: errors })
  //     }
  //   }
  //   else {
  //       res.redirect('/version-1/task-list')
  //   }
  // })










//   router.post('/version-1/eligibility/10-weeks', function(req, res) {
//     var errors = []
//     if (req.body['10-weeks'] === undefined) {
//       errors.push({
//       text: 'Select an answer',
//       href: '#10-weeks'
//       })
//     }

//     if (errors.length === 0) {
//         res.redirect('/version-1/eligibility/under-18')
//     }
//     else {
//         res.render('.//version-1/eligibility/10-weeks', { errors: errors })
//     }
//   })

//   router.post('/version-1/applicants/number-of-children', function(req, res) {
//     var errors = []
//     if (req.body['number-children'] === undefined) {
//       errors.push({
//       text: 'Select the number of children you are applying to adopt',
//       href: '#number-of-children'
//       })
//     }
//     else if (req.body['number-children'] === "3 or more" && req.body['more-than-3'] === "") {
//       errors.push({
//       text: 'Enter a number',
//       href: '#exact-number'
//       })
//     }

//     if (req.body['more-than-3'] !== "") {
//       req.session.data.numberChildren = req.body['more-than-3']
//     }
//     else {
//       req.session.data.numberChildren = req.body['number-of-children']
//     }

//     if (req.body['submit-button'] === 'save-and-continue') {
//       if (errors.length === 0) {
//         res.redirect('/version-1/applicants/number-of-applicants')
//       }
//       else {
//         res.render('.//version-1/applicants/number-of-children', { errors: errors })
//       }
//     }
//     else {
//       res.redirect('/version-1/task-list')
//     }
//   })


//   router.post('/version-1/applicants/first-applicant-gender', function(req, res) {
//     var errors = []
//     if (req.body['first-applicant-gender'] === '') {
//       errors.push({
//       text: 'Select an answer',
//       href: '#first-applicant-gender'
//       })
//     }
//       if (req.body['submit-button'] === 'save-and-continue') {
//         if (errors.length === 0) {
//           res.redirect('/version-1/applicants/first-applicant-nationality')
//         }
//         else {
//             res.render('.//version-1/applicants/first-applicant-gender', { errors: errors })
//           }
//       }
//       else {
//         res.redirect('/version-1/task-list')
//       }
//   })















// // ************************************* Examples ************************************* //

//   router.post('/damages/default-judgments/5-hearing-details', function(req, res) {
//     req.session.data.unavailable = req.body['exclusion-dates']
//     if (req.body['submit-button'] === 'add') {
//       count = req.session.data.dateCount
//       // console.log("count start", count)
//       req.session.data.dayFrom = req.body['date-from-day']
//       req.session.data.monthFrom = req.body['date-from-month']
//       req.session.data.yearFrom = req.body['date-from-year']
//       req.session.data.dayTo = req.body['date-to-day']
//       req.session.data.monthTo = req.body['date-to-month']
//       req.session.data.yearTo = req.body['date-to-year']

//       req.session.data.id[count] = count
//       req.session.data.startDate[count] = req.body['date-from-day'] + " " + req.session.data.shortMonthName[req.body['date-from-month']] + " " + req.body['date-from-year']
//       req.session.data.endDate[count] = req.body['date-to-day'] + " " + req.session.data.shortMonthName[req.body['date-to-month']] + " " + req.body['date-to-year']

//       // console.log("From", req.session.data.startDate[count]);
//       // console.log("unavailable", req.session.data.unavailable)

//       req.session.data.dateCount = count + 1
//       // console.log("dateCount", req.session.data.dateCount)

//       res.redirect('/damages/default-judgments/5-hearing-details#unavailable-dates')
//       }
//     else if (req.body['submit-button'] === 'continue') {
//       res.redirect('/damages/default-judgments/6-check-your-answers')
//     }
//     else {
//         res.redirect('/damages/default-judgments/4-make-request-judgment')
//     }
//   })















// // Examples from HMRC
// router.post('/sps/work-in-progress/how-to-verify', function(req, res) {
//     // console.log("route", req.session.data.route)
//       if (req.body['verifyOrChange'] === 'verify') {
//           res.redirect('/sps/work-in-progress/confirmation-email-sent')
//       } else {
//         if (req.session.data.route === 'external' || req.session.data.route === 'current-bouncing' || req.session.data.route === 'current-unverified') {
//           res.redirect('/sps/work-in-progress/how-to-verify')
//         }
//         else {
//         req.session.data.route = "settings"
//         res.redirect('/sps/work-in-progress/change-email')
//       }
//       }
//   })

//   // Error messages on how-to-get-tax-letters
//   router.post('/sps/work-in-progress/how-to-get-tax-letters', (req, res) => {
//       var errors = []
//       if (req.body['howContacted'] === undefined) {
//         errors.push({
//           text: 'Select how you want to get your tax letters',
//           href: '#how-to-get-tax-letters'
//         })
//       }
//       if (errors.length === 0) {
//         if (req.body['howContacted'] === 'Online') {
//           res.redirect('/sps/work-in-progress/add-email')
//         }
//       else {
//           if (req.session.data.route === 'external') {
//             res.redirect('/sps/work-in-progress/confirmation-post-alternative')
//           }
//           else {
//           res.redirect('/sps/work-in-progress/confirmation-post')
//         }
//         }
//       } else {
//         res.render('.//sps/work-in-progress/how-toget-tax-letters', { errors: errors })
//       }
// })
};
