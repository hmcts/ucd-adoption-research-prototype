module.exports = (router) => {

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
      text: 'Select an answer',
      href: '#first-applicant-other-names'
      })
    }
    else if (req.body['first-applicant-other-names'] === "Yes" && req.session.data.firstApplicantNameCount === 0) {
      console.log("no name added error: ", req.session.data.firstApplicantPreviousNames)
      errors.push({
      text: 'Enter a name or choose No',
      href: '#first-applicant-no-name'
      })
    }

    count = req.session.data.firstApplicantNameCount
    if (req.body['submit-button'] === 'add') {
      req.session.data.firstApplicantPreviousNames[count] = req.body['first-applicant-previous-full-name']
      req.session.data.idFirstApplicant[count] = count
      req.session.data.firstApplicantNameCount = count + 1
      res.redirect('/version-1/applicants/first-applicant-other-names')
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


  router.post('/version-1/applicants/first-applicant-nationality-old', function(req, res) {
    var errors = []
    if (req.body['first-applicant-nationality'] === '') {
      errors.push({
      text: 'Select an answer',
      href: '#first-applicant-nationality'
      })
    }
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/applicants/first-applicant-occupation')
      }
      else {
          res.render('.//version-1/applicants/first-applicant-nationality', { errors: errors })
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
      href: '#first-applicant-no-name'
      })
    }

    count = req.session.data.firstApplicantNationalityCount
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.firstApplicantNationalities[count] = req.body['first-applicant-additional-country']
        res.redirect('/version-1/applicants/first-applicant-occupation')
      }
      else {
        res.render('.//version-1/applicants/first-applicant-nationality', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-as-draft') {
      res.redirect('/version-1/task-list')
    }
    else {
      req.session.data.firstApplicantNationalities[count] = req.body['first-applicant-additional-country']
      req.session.data.firstApplicantNationalityId[count] = count
      req.session.data.firstApplicantNationalityCount = count + 1
      res.redirect('/version-1/applicants/first-applicant-nationality')
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
  if (req.body['first-applicant-address-line-1'] === '' || req.body['first-applicant-postcode'] === ''){
    errors.push({
    text: 'Enter address',
    href: '#first-applicant-manual-address'
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
    console.log("First applicant previous names: ", req.session.data.secondApplicantPreviousNames)
    console.log("First applicant previous name radio: ", req.body['second-applicant-previous-full-name'])
    console.log("name count: ", req.session.data.secondApplicantNameCount)

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
      text: 'Enter a name or choose No',
      href: '#second-applicant-no-name'
      })
    }

    count = req.session.data.secondApplicantNameCount
    if (req.body['submit-button'] === 'add') {
      req.session.data.secondApplicantPreviousNames[count] = req.body['second-applicant-previous-full-name']
      req.session.data.idFirstApplicant[count] = count
      req.session.data.secondApplicantNameCount = count + 1
      res.redirect('/version-1/applicants/second-applicant-other-names')
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


  router.post('/version-1/applicants/second-applicant-nationality-old', function(req, res) {
    var errors = []
    if (req.body['second-applicant-nationality'] === '') {
      errors.push({
      text: 'Select an answer',
      href: '#second-applicant-nationality'
      })
    }
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/applicants/second-applicant-occupation')
      }
      else {
          res.render('.//version-1/applicants/second-applicant-nationality', { errors: errors })
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
      href: '#second-applicant-no-name'
      })
    }

    count = req.session.data.secondApplicantNationalityCount
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondApplicantNationalities[count] = req.body['second-applicant-additional-country']
        res.redirect('/version-1/applicants/second-applicant-occupation')
      }
      else {
        res.render('.//version-1/applicants/second-applicant-nationality', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-as-draft') {
      res.redirect('/version-1/task-list')
    }
    else {
      req.session.data.secondApplicantNationalities[count] = req.body['second-applicant-additional-country']
      req.session.data.secondApplicantNationalityId[count] = count
      req.session.data.secondApplicantNationalityCount = count + 1
      res.redirect('/version-1/applicants/second-applicant-nationality')
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
    text: 'Select an answer',
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
  if (req.body['second-applicant-address-line-1'] === '' || req.body['second-applicant-postcode'] === ''){
    errors.push({
    text: 'Enter address',
    href: '#second-applicant-manual-address'
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












// ********************** Second applicant personal details **********************
// router.post('/version-1/applicants/second-applicant-name', function(req, res) {
//   var errors = []
//   if (req.body['second-applicant-name'] === '') {
//     errors.push({
//     text: 'Select an answer',
//     href: '#second-applicant-name'
//     })
//   }
//   if (errors.length === 0) {
//     if (req.body['submit-button'] === 'save-and-continue') {
//       res.redirect('/version-1/applicants/second-applicant-other-names')
//     }
//     else {
//       res.redirect('/version-1/task-list')
//     }
//   }
//   else {
//       res.render('.//version-1/applicants/second-applicant-name', { errors: errors })
//   }
// })


// router.post('/version-1/applicants/second-applicant-other-names', function(req, res) {
//   var errors = []
//   if (req.body['second-applicant-previous-full-name'] === '' && req.session.secondApplicantPreviousNames === '') {
//     errors.push({
//     text: 'Select an answer',
//     href: '#second-applicant-other-names'
//     })
//   }
//   if (errors.length === 0) {
//     count = req.session.data.secondApplicantNameCount
//     if (req.body['submit-button'] === 'add') {
//       req.session.data.secondApplicantPreviousNames[count] = req.body['second-applicant-previous-full-name']
//       req.session.data.idSecondApplicant[count] = count
//       req.session.data.secondApplicantNameCount = count + 1
//       res.redirect('/version-1/applicants/second-applicant-other-names')
//     }
//     else if (req.body['submit-button'] === 'save-and-continue') {
//       req.session.data.secondApplicantPreviousNames[count] = req.body['second-applicant-previous-full-name']
//       console.log("Previous names: ", req.session.data.secondApplicantPreviousNames[count])
//       res.redirect('/version-1/applicants/second-applicant-date-birth')
//     }
//     else {
//       res.redirect('/version-1/task-list')
//     }
//   }
//   else {
//       res.render('.//version-1/applicants/second-applicant-other-names', { errors: errors })
//   }
// })


// router.post('/version-1/applicants/second-applicant-date-birth', function(req, res) {
//   console.log("Day: ", req.body['2day'])
//   var errors = []
//   if (req.body['2day'] === '' || req.body['2month'] === '' || req.body['2year'] === '') {
//     errors.push({
//     text: 'Please refer to ADOP-149 for different error messages',
//     href: '#second-applicant-date-birth'
//     })
//   }
//   if (errors.length === 0) {
//     if (req.body['submit-button'] === 'save-and-continue') {
//       res.redirect('/version-1/applicants/second-applicant-gender')
//     }
//     else {
//       res.redirect('/version-1/task-list')
//     }
//   }
//   else {
//       res.render('.//version-1/applicants/second-applicant-date-birth', { errors: errors })
//   }
// })


// router.post('/version-1/applicants/second-applicant-gender', function(req, res) {
//   var errors = []
//   if (req.body['second-applicant-gender'] === '') {
//     errors.push({
//     text: 'Select an answer',
//     href: '#second-applicant-gender'
//     })
//   }
//   if (errors.length === 0) {
//     if (req.body['submit-button'] === 'save-and-continue') {
//       res.redirect('/version-1/applicants/second-applicant-nationality')
//     }
//     else {
//       res.redirect('/version-1/task-list')
//     }
//   }
//   else {
//       res.render('.//version-1/applicants/second-applicant-gender', { errors: errors })
//   }
// })


// router.post('/version-1/applicants/second-applicant-nationality', function(req, res) {
//   var errors = []
//   if (req.body['second-applicant-nationality'] === '') {
//     errors.push({
//     text: 'Select an answer',
//     href: '#second-applicant-nationality'
//     })
//   }
//   if (errors.length === 0) {
//     if (req.body['submit-button'] === 'save-and-continue') {
//       res.redirect('/version-1/applicants/second-applicant-occupation')
//     }
//     else {
//       res.redirect('/version-1/task-list')
//     }
//   }
//   else {
//       res.render('.//version-1/applicants/second-applicant-nationality', { errors: errors })
//   }
// })


// router.post('/version-1/applicants/second-applicant-occupation', function(req, res) {
//   var errors = []
//   if (req.body['second-applicant-occupation'] === '') {
//     errors.push({
//     text: 'Select an answer',
//     href: '#second-applicant-occupation'
//     })
//   }
//   if (errors.length === 0) {
//     if (req.body['submit-button'] === 'save-and-continue') {
//       res.redirect('/version-1/task-list')
//     }
//     else {
//       res.redirect('/version-1/task-list')
//     }
//   }
//   else {
//       res.render('.//version-1/applicants/second-applicant-occupation', { errors: errors })
//   }
// })



// // ********************** Second applicant contact details **********************
// router.post('/version-1/applicants/second-applicant-same-address', function(req, res) {
//   var errors = []
//   if (req.body['same-address'] === undefined) {
//     errors.push({
//     text: 'Select an answer',
//     href: '#second-applicant-same-address'
//     })
//   }

//   if (errors.length === 0) {
//    if (req.body['submit-button'] === 'save-and-continue') {
//       if (req.body['same-address'] === "Yes") {
//         console.log("Test: ",req.body['same-address'])
//         res.redirect('/version-1/applicants/second-applicant-contact')
//       }
//       else {
//         res.redirect('/version-1/applicants/second-applicant-address')
//       }
//     }
//     else {
//       res.redirect('/version-1/task-list')
//     }
//   }
//   else {
//       res.render('.//version-1/applicants/second-applicant-same-address', { errors: errors })
//   }

// })


// router.post('/version-1/applicants/second-applicant-address', function(req, res) {
//   var errors = []
//   if (req.body['second-applicant-address'] === "") {
//     errors.push({
//     text: 'Enter a valid postcode',
//     href: '#second-applicant-address'
//     })
//   }

//   if (errors.length === 0) {
//    if (req.body['submit-button'] === 'save-and-continue') {
//       console.log("Test: ", req.body['submit-button'])
//       res.redirect('/version-1/applicants/second-applicant-find-address')
//     }
//     else {
//       res.redirect('/version-1/task-list')
//     }
//   }
//   else {
//       res.render('.//version-1/applicants/second-applicant-address', { errors: errors })
//   }

// })


// router.post('/version-1/applicants/second-applicant-find-address', function(req, res) {
//   var errors = []
//   if (req.body['second-applicant-choose-address'] === 'address-found') {
//     errors.push({
//     text: 'Select an address',
//     href: '#second-applicant-find-address'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/version-1/applicants/second-applicant-contact')
//     }
//     else {
//       res.render('.//version-1/applicants/second-applicant-find-address', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/version-1/task-list')
//   }
// })




// router.post('/version-1/applicants/second-applicant-contact', function(req, res) {
//   var errors = []
//   if (req.body['second-applicant-contact-options'] === undefined) {
//     errors.push({
//     text: 'Select an answer',
//     href: '#second-applicant-contact'
//     })
//   }
//   // req.session.data.firstApplicantContactCheckbox = req.body['first-applicant-contact-options']
//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/version-1/task-list')
//     }
//     else {
//       res.render('.//version-1/applicants/second-applicant-contact', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/version-1/task-list')
//   }
// })










// ************************************* Old functions not in use any more ************************************* //
  router.post('/version-1/eligibility/10-weeks', function(req, res) {
    var errors = []
    if (req.body['10-weeks'] === undefined) {
      errors.push({
      text: 'Select an answer',
      href: '#10-weeks'
      })
    }

    if (errors.length === 0) {
        res.redirect('/version-1/eligibility/under-18')
    }
    else {
        res.render('.//version-1/eligibility/10-weeks', { errors: errors })
    }
  })

  router.post('/version-1/applicants/number-of-children', function(req, res) {
    var errors = []
    if (req.body['number-children'] === undefined) {
      errors.push({
      text: 'Select the number of children you are applying to adopt',
      href: '#number-of-children'
      })
    }
    else if (req.body['number-children'] === "3 or more" && req.body['more-than-3'] === "") {
      errors.push({
      text: 'Enter a number',
      href: '#exact-number'
      })
    }

    if (req.body['more-than-3'] !== "") {
      req.session.data.numberChildren = req.body['more-than-3']
    }
    else {
      req.session.data.numberChildren = req.body['number-of-children']
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/version-1/applicants/number-of-applicants')
      }
      else {
        res.render('.//version-1/applicants/number-of-children', { errors: errors })
      }
    }
    else {
      res.redirect('/version-1/task-list')
    }
  })


  router.post('/version-1/applicants/first-applicant-gender', function(req, res) {
    var errors = []
    if (req.body['first-applicant-gender'] === '') {
      errors.push({
      text: 'Select an answer',
      href: '#first-applicant-gender'
      })
    }
      if (req.body['submit-button'] === 'save-and-continue') {
        if (errors.length === 0) {
          res.redirect('/version-1/applicants/first-applicant-nationality')
        }
        else {
            res.render('.//version-1/applicants/first-applicant-gender', { errors: errors })
          }
      }
      else {
        res.redirect('/version-1/task-list')
      }
  })







// ************************************* Examples ************************************* //

  router.post('/damages/default-judgments/5-hearing-details', function(req, res) {
    req.session.data.unavailable = req.body['exclusion-dates']
    if (req.body['submit-button'] === 'add') {
      count = req.session.data.dateCount
      console.log("count start", count)
      req.session.data.dayFrom = req.body['date-from-day']
      req.session.data.monthFrom = req.body['date-from-month']
      req.session.data.yearFrom = req.body['date-from-year']
      req.session.data.dayTo = req.body['date-to-day']
      req.session.data.monthTo = req.body['date-to-month']
      req.session.data.yearTo = req.body['date-to-year']

      req.session.data.id[count] = count
      req.session.data.startDate[count] = req.body['date-from-day'] + " " + req.session.data.shortMonthName[req.body['date-from-month']] + " " + req.body['date-from-year']
      req.session.data.endDate[count] = req.body['date-to-day'] + " " + req.session.data.shortMonthName[req.body['date-to-month']] + " " + req.body['date-to-year']

      console.log("From", req.session.data.startDate[count]);
      console.log("unavailable", req.session.data.unavailable)

      req.session.data.dateCount = count + 1
      console.log("dateCount", req.session.data.dateCount)

      res.redirect('/damages/default-judgments/5-hearing-details#unavailable-dates')
      }
    else if (req.body['submit-button'] === 'continue') {
      res.redirect('/damages/default-judgments/6-check-your-answers')
    }
    else {
        res.redirect('/damages/default-judgments/4-make-request-judgment')
    }
  })



// Examples from HMRC
router.post('/sps/work-in-progress/how-to-verify', function(req, res) {
    console.log("route", req.session.data.route)
      if (req.body['verifyOrChange'] === 'verify') {
          res.redirect('/sps/work-in-progress/confirmation-email-sent')
      } else {
        if (req.session.data.route === 'external' || req.session.data.route === 'current-bouncing' || req.session.data.route === 'current-unverified') {
          res.redirect('/sps/work-in-progress/how-to-verify')
        }
        else {
        req.session.data.route = "settings"
        res.redirect('/sps/work-in-progress/change-email')
      }
      }
  })

  // Error messages on how-to-get-tax-letters
  router.post('/sps/work-in-progress/how-to-get-tax-letters', (req, res) => {
      var errors = []
      if (req.body['howContacted'] === undefined) {
        errors.push({
          text: 'Select how you want to get your tax letters',
          href: '#how-to-get-tax-letters'
        })
      }
      if (errors.length === 0) {
        if (req.body['howContacted'] === 'Online') {
          res.redirect('/sps/work-in-progress/add-email')
        }
      else {
          if (req.session.data.route === 'external') {
            res.redirect('/sps/work-in-progress/confirmation-post-alternative')
          }
          else {
          res.redirect('/sps/work-in-progress/confirmation-post')
        }
        }
      } else {
        res.render('.//sps/work-in-progress/how-toget-tax-letters', { errors: errors })
      }
})
};
