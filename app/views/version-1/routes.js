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
    console.log("Test")
    console.log("Error: ", req.body['child-married'])

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
        res.redirect('/version-1/registration/start1')
      }
      else {
        res.redirect('/version-1/eligibility/cannot-apply-lived-uk')
      }
    }
    else {
        res.render('.//version-1/eligibility/lived-uk', { errors: errors })
    }
  })


// ******************************************** SECTION 1. APPLICANTS ********************************************
// ************************************************************************************************************************************

  // ********************** Applicants  **********************
  router.post('/version-1/applicants/number-of-applicants', function(req, res) {
    var errors = []
    if (req.body['number-of-applicants'] === undefined) {
      errors.push({
      text: 'Select the number of people applying to adopt',
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
  })


  // ********************** First applicant personal details **********************
  router.post('/version-1/applicants/first-applicant-name', function(req, res) {
    var errors = []
    if (req.body['first-applicant-name'] === '') {
      errors.push({
      text: 'Enter your full name',
      href: '#first-applicant-name'
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
    console.log("First applicant previous names: ", req.session.data.firstApplicantPreviousNames)
    console.log("First applicant previous name radio: ", req.body['first-applicant-previous-full-name'])
    console.log("name count: ", req.session.data.firstApplicantNameCount)

    if (req.body['first-applicant-other-names'] === undefined) {
      // if (req.body['first-applicant-other-names'] === undefined && req.session.data.firstApplicantPreviousNames === '') {
      errors.push({
      text: 'Please answer the question',
      href: '#first-applicant-other-names'
      })
    }
    else if (req.body['first-applicant-other-names'] === "Yes" && req.session.data.firstApplicantNameCount === 0) {
      console.log("no name added error: ", req.session.data.firstApplicantPreviousNames)
      errors.push({
      text: 'Enter a name or choose no',
      href: '#first-applicant-no-name'
      })
    }

    count = req.session.data.firstApplicantNameCount
    if (req.body['submit-button'] === 'add') {
      if (req.body['first-applicant-previous-full-name'] !== '') {
        req.session.data.firstApplicantPreviousNames[count] = req.body['first-applicant-previous-full-name']
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
        req.session.data.firstApplicantPreviousNames[count] = req.body['first-applicant-previous-full-name']
        console.log("Previous names: ", req.session.data.firstApplicantPreviousNames[count])
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
    console.log("Day: ", req.body['day'])
    var errors = []
    if (req.body['day'] === '' || req.body['month'] === '' || req.body['year'] === '') {
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
      console.log("error")
      errors.push({
      text: 'Select if you are British, Irish or a citizen of a different country',
      href: '#first-applicant-nationality'
      })
    }
    else if (req.body['first-applicant-other'] !== undefined && req.session.data.firstApplicantNationalityCount === 0) {
      console.log("no nationality added error: ", req.session.data.firstApplicantNationalities)
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
      text: 'Enter a valid postcode',
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

    // req.session.data.firstApplicantContactCheckbox = req.body['first-applicant-contact-options']
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
    if (req.body['second-applicant-name'] === '') {
      errors.push({
      text: 'Enter your full name',
      href: '#second-applicant-name'
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
    count = req.session.data.secondApplicantNameCount
    console.log("Previous names: ", req.body['second-applicant-previous-full-name'])

    if (req.body['second-applicant-other-names'] === undefined) {
      // if (req.body['second-applicant-other-names'] === undefined && req.session.data.secondApplicantPreviousNames === '') {
      errors.push({
      text: 'Select an answer',
      href: '#second-applicant-other-names'
      })
    }
    else if (req.body['second-applicant-other-names'] === "Yes" && req.session.data.secondApplicantNameCount === 0) {
      console.log("no name added error: ", req.session.data.secondApplicantPreviousNames)
      errors.push({
      text: 'Enter a name or choose no',
      href: '#second-applicant-no-name'
      })
    }

    if (req.body['submit-button'] === 'add') {
      if (req.body['second-applicant-previous-full-name'] !== '') {
        req.session.data.secondApplicantPreviousNames[count] = req.body['second-applicant-previous-full-name']
        req.session.data.idFirstApplicant[count] = count
        req.session.data.secondApplicantNameCount = count + 1
        res.redirect('/version-1/applicants/second-applicant-other-names')
      }
      else {
        res.render('.//version-1/applicants/second-applicant-other-names', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondApplicantPreviousNames[count] = req.body['second-applicant-previous-full-name']
        console.log("Previous names: ", req.session.data.secondApplicantPreviousNames[count])
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
    console.log("Day: ", req.body['day'])
    var errors = []
    if (req.body['day'] === '' || req.body['month'] === '' || req.body['year'] === '') {
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
      console.log("error")
      errors.push({
      text: 'Select if you are British, Irish or a citizen of a different country',
      href: '#second-applicant-nationality'
      })
    }
    else if (req.body['second-applicant-other'] !== undefined && req.session.data.secondApplicantNationalityCount === 0) {
      console.log("no nationality added error: ", req.session.data.secondApplicantNationalities)
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
        console.log("Test: ",req.body['same-address'])
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
    text: 'Enter a valid postcode',
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
    if (req.body['child-name'] === '') {
      errors.push({
      text: 'Enter the child\'s full name',
      href: '#child-name'
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
    console.log("Day: ", req.body['day'])
    var errors = []
    if (req.body['day'] === '' || req.body['month'] === '' || req.body['year'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-203 for different error messages',
      href: '#child-date-birth'
      })
    }
      if (req.body['submit-button'] === 'save-and-continue') {
        if (errors.length === 0) {
          res.redirect('/version-1/children/child-time-birth')
        }
        else {
          res.render('.//version-1/children/child-date-birth', { errors: errors })
        }
      }
      else {
        res.redirect('/version-1/task-list')
      }
  })


  router.post('/version-1/children/child-time-birth', function(req, res) {
    var errors = []
    if (req.body['child-time-birth'] === '') {
      errors.push({
      text: 'Please choose an answer',
      href: '#child-time-birth'
      })
    }
      if (req.body['submit-button'] === 'save-and-continue') {
        if (errors.length === 0) {
          res.redirect('/version-1/children/child-gender')
        }
        else {
          res.render('.//version-1/children/child-time-birth', { errors: errors })
        }
      }
      else {
        res.redirect('/version-1/task-list')
      }
  })



  router.post('/version-1/children/child-gender', function(req, res) {
    var errors = []
    if (req.body['child-gender'] === undefined) {
      errors.push({
      text: 'Please select an answer',
      href: '#child-gender'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/child-nationality')
      }
      else {
        res.render('.//version-1/children/child-gender', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })

//  router.post('/version-1/children/child-nationality1', function(req, res) {
  //  var errors = []
  //  if (req.body['child-nationality'] === '') {
  //    errors.push({
  //    text: 'Enter their nationality',
  //    href: '#child-nationality'
  //    })
  //  }

  //  if (req.body['submit-button'] === 'save-and-continue') {
  //    if (errors.length === 0) {
  //      res.redirect('/version-1/task-list')
  //    }
  //    else {
  //      res.render('.//version-1/children/child-nationality', { errors: errors })
  //    }
  //  }
  //  else {
  //    res.redirect('/version-1/task-list')
  //  }
//  })

  router.post('/version-1/children/child-nationality', function(req, res) {
    var errors = []

    if (req.body['child-british'] === undefined && req.body['child-irish'] === undefined &&req.body['child-other'] === undefined && req.body['child-unsure'] === undefined) {
      console.log("error")
      errors.push({
      text: 'Select if they are British, Irish or a citizen of a different country',
      href: '#child-nationality'
      })
    }
    else if (req.body['child-other'] !== undefined && req.session.data.childNationalityCount === 0) {
      console.log("no nationality added error: ", req.session.data.childNationalities)
      errors.push({
      text: 'This is not a valid entry',
      href: '#child-no-nationality'
      })
    }

    count = req.session.data.childNationalityCount
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.childNationalities[count] = req.body['child-different-country']
        req.session.data.childCountryAdded = 1
        res.redirect('/version-1/task-list')
      }
      else {
        res.render('.//version-1/children/child-adoption-nationality', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-as-draft') {
      res.redirect('/version-1/task-list')
    }
    else {
      req.session.data.childNationalities[count] = req.body['child-different-country']
      req.session.data.childNationalityId[count] = count
      req.session.data.childNationalityCount = count + 1
      res.redirect('/version-1/children/child-nationality')
    }
  })


  // ********************** Child's adoption certificate details **********************
  router.post('/version-1/children/child-adoption-certificate', function(req, res) {
    var errors = []
    if (req.body['child-adoption-certificate'] === '') {
      errors.push({
      text: 'Enter their full name',
      href: '#child-adoption-certificate'
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
    if (req.body['mother-name'] === '') {
      errors.push({
      text: 'Enter their full name',
      href: '#mother-name'
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
    console.log("Mother alive: ", req.body['mother-alive'])
    var errors = []
    if (req.body['mother-alive'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#mother-alive'
      })
    }
    else if (req.body['mother-alive'] === 'unsure' && req.body['reason-not-sure'] === '') {
      console.log("Mother no reason")
      errors.push({
      text: 'Enter more detail',
      href: '#mother-no-reason'
      })
    }

    req.session.data.numberApplicants = req.body['mother-alive']

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
      console.log("error")
      errors.push({
      text: 'Select if they are British, Irish or a citizen of a different country',
      href: '#mother-nationality'
      })
    }
    else if (req.body['mother-other'] !== undefined && req.session.data.motherNationalityCount === 0) {
      console.log("no nationality added error: ", req.session.data.motherNationalities)
      errors.push({
      text: 'This is not a valid entry',
      href: '#mother-no-nationality'
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
    else {
      req.session.data.motherNationalities[count] = req.body['mother-different-country']
      req.session.data.motherNationalityId[count] = count
      req.session.data.motherNationalityCount = count + 1
      res.redirect('/version-1/children/mother-nationality')
    }
  })


  router.post('/version-1/children/mother-occupation', function(req, res) {
    var errors = []
    if (req.body['mother-occupation'] === '') {
      errors.push({
      text: 'Enter your occupation',
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
    if (req.body['mother-have-address'] === '') {
      errors.push({
      text: 'Enter your occupation',
      href: '#mother-have-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['mother-have-address'] == 'no') {
          res.redirect('/version-1/children/mother-why-no-address')
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


  router.post('/version-1/children/mother-why-no-address', function(req, res) {
    var errors = []
    if (req.body['mother-why-no-address'] === '') {
      errors.push({
      text: 'Enter your occupation',
      href: '#mother-why-no-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/task-list')
      }
      else {
          res.render('.//version-1/children/mother-why-no-address', { errors: errors })
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
    console.log(req.body['submit-button'])
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

  // ********************** Birth father's details **********************
  router.post('/version-1/children/father-in-certificate', function(req, res) {
    var errors = []
    if (req.body['father-in-certificate'] === '') {
      errors.push({
      text: 'Please answer the question',
      href: '#father-in-certificate'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['father-in-certificate'] == 'no') {
          res.redirect('/version-1/task-list')
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
    if (req.body['father-name'] === '') {
      errors.push({
      text: 'Enter their full name',
      href: '#father-name'
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
    console.log("father alive: ", req.body['father-alive'])
    var errors = []
    if (req.body['father-alive'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#father-alive'
      })
    }
    else if (req.body['father-alive'] === 'unsure' && req.body['reason-not-sure'] === '') {
      console.log("father no reason")
      errors.push({
      text: 'Enter more detail',
      href: '#father-no-reason'
      })
    }

    req.session.data.numberApplicants = req.body['father-alive']

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
      console.log("error")
      errors.push({
      text: 'Select if they are British, Irish or a citizen of a different country',
      href: '#father-nationality'
      })
    }
    else if (req.body['father-other'] !== undefined && req.session.data.fatherNationalityCount === 0) {
      console.log("no nationality added error: ", req.session.data.fatherNationalities)
      errors.push({
      text: 'This is not a valid entry',
      href: '#father-no-nationality'
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
    else {
      req.session.data.fatherNationalities[count] = req.body['father-different-country']
      req.session.data.fatherNationalityId[count] = count
      req.session.data.fatherNationalityCount = count + 1
      res.redirect('/version-1/children/father-nationality')
    }
  })


  router.post('/version-1/children/father-occupation', function(req, res) {
    var errors = []
    if (req.body['father-occupation'] === '') {
      errors.push({
      text: 'Enter your occupation',
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
    if (req.body['father-have-address'] === '') {
      errors.push({
      text: 'Enter your occupation',
      href: '#father-have-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['father-have-address'] == 'no') {
          res.redirect('/version-1/children/father-why-no-address')
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


  router.post('/version-1/children/father-why-no-address', function(req, res) {
    var errors = []
    if (req.body['father-why-no-address'] === '') {
      errors.push({
      text: 'Enter your occupation',
      href: '#father-why-no-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/task-list')
      }
      else {
          res.render('.//version-1/children/father-why-no-address', { errors: errors })
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
      text: 'Enter a valid postcode',
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
    console.log(req.body['submit-button'])
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



  // ********************** Adoption agency or local authority **********************
  router.post('/version-1/children/applicant-adoption-agency-name', function(req, res) {
    var errors = []
    if (req.body['applicant-adoption-agency-name'] === '') {
      errors.push({
      text: 'Enter the name of the adoption agency',
      href: '#applicant-adoption-agency-name'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/applicant-social-worker-name')
      }
      else {
        res.render('.//version-1/children/applicant-adoption-agency-name', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/applicant-social-worker-name', function(req, res) {
    var errors = []
    if (req.body['applicant-social-worker-name'] === '') {
      errors.push({
      text: 'Enter the name of the social worker',
      href: '#applicant-social-worker-name'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/applicant-social-worker-email')
      }
      else {
        res.render('.//version-1/children/applicant-social-worker-name', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/applicant-social-worker-email', function(req, res) {
    var errors = []
    if (req.body['applicant-social-worker-email'] === '') {
      errors.push({
      text: 'Enter an email address',
      href: '#applicant-social-worker-email'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/applicant-social-worker-team-email')
      }
      else {
        res.render('.//version-1/children/applicant-social-worker-email', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/applicant-social-worker-team-email', function(req, res) {
    var errors = []
    if (req.body['applicant-social-worker-team-email'] === undefined) {
      errors.push({
      text: 'Select an answer',
      href: '#no-radio-chosen'
      })
    }
    else if (req.body['team-email'] === '') {
      errors.push({
        text: 'Enter a valid email address',
        href: '#no-team-email'  
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/applicant-social-worker-number')
      }
      else {
        res.render('.//version-1/children/applicant-social-worker-team-email', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/applicant-social-worker-number', function(req, res) {
    var errors = []
    if (req.body['applicant-social-worker-number'] === '') {
      errors.push({
      text: 'Select an answer',
      href: '#applicant-social-worker-number'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/applicant-social-worker-address')
      }
      else {
        res.render('.//version-1/children/applicant-social-worker-number', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/applicant-social-worker-address', function(req, res) {
    var errors = []
    if (req.body['applicant-social-worker-address'] === "") {
      errors.push({
      text: 'Enter a valid postcode',
      href: '#applicant-social-worker-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/applicant-social-worker-find-address')
      }
      else {
        res.render('.//version-1/children/applicant-social-worker-address', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/applicant-social-worker-find-address', function(req, res) {
    var errors = []
    if (req.body['applicant-social-worker-choose-address'] === 'address-found') {
      errors.push({
      text: 'Select an address',
      href: '#applicant-social-worker-find-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/child-adoption-agency-name')
      }
      else {
        res.render('.//version-1/children/applicant-social-worker-find-address', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/applicant-social-worker-enter-address-manually', function(req, res) {
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
        res.redirect('/version-1/child-adoption-agency-name')
      }
      else {
        res.render('.//version-1/children/applicant-social-worker-enter-address-manually', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })

//************************ Child's adoption agency or local authority *****************************

router.post('/version-1/children/child-adoption-agency-name', function(req, res) {
  var errors = []
  if (req.body['child-adoption-agency-name'] === '') {
    errors.push({
    text: 'Enter the name of the adoption agency',
    href: '#child-adoption-agency-name'
    })
  }

  if (req.body['submit-button'] === 'save-and-continue') {
    if (errors.length === 0) {
      res.redirect('/version-1/children/child-social-worker-name')
    }
    else {
      res.render('.//version-1/children/child-adoption-agency-name', { errors: errors })
    }
  }
  else {
    res.redirect('/version-1/task-list')
  }
})

router.post('/version-1/children/child-social-worker-name', function(req, res) {
  var errors = []
  if (req.body['child-social-worker-name'] === '') {
    errors.push({
    text: 'Enter the name of the social worker',
    href: '#child-social-worker-name'
    })
  }

  if (req.body['submit-button'] === 'save-and-continue') {
    if (errors.length === 0) {
      res.redirect('/version-1/children/child-social-worker-email')
    }
    else {
      res.render('.//version-1/children/child-social-worker-name', { errors: errors })
    }
  }
  else {
    res.redirect('/version-1/task-list')
  }
})

router.post('/version-1/children/child-social-worker-email', function(req, res) {
  var errors = []
  if (req.body['child-social-worker-email'] === '') {
    errors.push({
    text: 'Enter the email address',
    href: '#child-social-worker-email'
    })
  }

  if (req.body['submit-button'] === 'save-and-continue') {
    if (errors.length === 0) {
      res.redirect('/version-1/children/child-social-worker-team-email')
    }
    else {
      res.render('.//version-1/children/child-social-worker-email', { errors: errors })
    }
  }
  else {
    res.redirect('/version-1/task-list')
  }
})

//TO FIX - MULTIPLE ERROR MESSAGE NEEDED
router.post('/version-1/children/child-social-worker-team-email', function(req, res) {
  var errors = []
  if (req.body['child-social-worker-team-email'] === '') {
    errors.push({
    text: 'Enter the email address',
    href: '#child-social-worker-team-email'
    })
  }

  if (req.body['submit-button'] === 'save-and-continue') {
    if (errors.length === 0) {
      res.redirect('/version-1/children/child-social-worker-number')
    }
    else {
      res.render('.//version-1/children/child-social-worker-team-email', { errors: errors })
    }
  }
  else {
    res.redirect('/version-1/task-list')
  }
})

//TO FIX - MULTIPLE ERROR MESSAGE NEEDED
router.post('/version-1/children/child-social-worker-number', function(req, res) {
  var errors = []
  if (req.body['child-social-worker-number'] === '') {
    errors.push({
    text: 'Enter the phonenumber',
    href: '#child-social-worker-team-number'
    })
  }

  if (req.body['submit-button'] === 'save-and-continue') {
    if (errors.length === 0) {
      res.redirect('/version-1/children/child-social-worker-address')
    }
    else {
      res.render('.//version-1/children/child-social-worker-number', { errors: errors })
    }
  }
  else {
    res.redirect('/version-1/task-list')
  }
})

router.post('/version-1/children/child-social-worker-address', function(req, res) {
  var errors = []
  if (req.body['child-social-worker-address'] === "") {
    errors.push({
    text: 'Enter a valid postcode',
    href: '#child-social-worker-address'
    })
  }

  if (req.body['submit-button'] === 'save-and-continue') {
    if (errors.length === 0) {
      res.redirect('/version-1/children/child-social-worker-find-address')
    }
    else {
      res.render('.//version-1/children/child-social-worker-address', { errors: errors })
    }
  }
  else {
    res.redirect('/version-1/task-list')
  }
})

router.post('/version-1/children/child-social-worker-find-address', function(req, res) {
  var errors = []
  if (req.body['child-social-worker-choose-address'] === 'address-found') {
    errors.push({
    text: 'Select an address',
    href: '#child-social-worker-find-address'
    })
  }

  if (req.body['submit-button'] === 'save-and-continue') {
    if (errors.length === 0) {
      res.redirect('/version-1/children/solicitor-helping')
    }
    else {
      res.render('.//version-1/children/child-social-worker-find-address', { errors: errors })
    }
  }
  else {
    res.redirect('/version-1/task-list')
  }
})


router.post('/version-1/children/child-social-worker-enter-address-manually', function(req, res) {
  var errors = []
  if (req.body['child-social-worker-address-line-1'] === '' || req.body['child-social-worker-postcode'] === ''){
    errors.push({
    text: 'Enter address',
    href: '#child-social-worker-manual-address'
    })
  }

  if (req.body['submit-button'] === 'save-and-continue') {
    if (errors.length === 0) {
      res.redirect('/version-1/solicitor-helping')
    }
    else {
      res.render('.//version-1/children/child-social-worker-enter-address-manually', { errors: errors })
    }
  }
  else {
    res.redirect('/version-1/task-list')
  }
})
 // ********************** Solicitor details **********************
  router.post('/version-1/children/solicitor-helping', function(req, res) {
    console.log("Mother alive: ", req.body['solicitor-helping'])
    var errors = []
    if (req.body['solicitor-helping'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#solicitor-helping'
      })
    }

    req.session.data.numberApplicants = req.body['solicitor-helping']

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['solicitor-helping'] === 'yes') {
          res.redirect('/version-1/children/solicitor-firm-name')
        }
        else {
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


  // ************************************* Placement and court orders ************************************* //
  router.post('/version-1/children/orders-placement-case-number', function(req, res) {
    var errors = []
    if (req.body['case-number'] === '') {
      errors.push({
      text: 'Enter the serial or case number',
      href: '#case-number'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/children/orders-placement-court')
      }
      else {
        res.render('.//version-1/children/orders-placement-case-number', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/children/orders-placement-court', function(req, res) {
    var errors = []
    if (req.body['court-name'] === '') {
      errors.push({
      text: 'Enter the court name',
      href: '#court-name'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
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
    if (req.body['day'] === '' || req.body['month'] === '' || req.body['year'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-XXX for different error messages',
      href: '#order-date'
      })
    }
      if (req.body['submit-button'] === 'save-and-continue') {
        if (errors.length === 0) {
          res.redirect('/version-1/children/orders-child-current-or-previous')
        }
        else {
          res.render('.//version-1/children/orders-placement-date', { errors: errors })
        }
      }
      else {
        res.redirect('/version-1/task-list')
      }
  })












// ***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************* Old functions not in use any more ************************************* //
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
//       console.log("count start", count)
//       req.session.data.dayFrom = req.body['date-from-day']
//       req.session.data.monthFrom = req.body['date-from-month']
//       req.session.data.yearFrom = req.body['date-from-year']
//       req.session.data.dayTo = req.body['date-to-day']
//       req.session.data.monthTo = req.body['date-to-month']
//       req.session.data.yearTo = req.body['date-to-year']

//       req.session.data.id[count] = count
//       req.session.data.startDate[count] = req.body['date-from-day'] + " " + req.session.data.shortMonthName[req.body['date-from-month']] + " " + req.body['date-from-year']
//       req.session.data.endDate[count] = req.body['date-to-day'] + " " + req.session.data.shortMonthName[req.body['date-to-month']] + " " + req.body['date-to-year']

//       console.log("From", req.session.data.startDate[count]);
//       console.log("unavailable", req.session.data.unavailable)

//       req.session.data.dateCount = count + 1
//       console.log("dateCount", req.session.data.dateCount)

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
//     console.log("route", req.session.data.route)
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
