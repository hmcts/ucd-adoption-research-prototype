module.exports = (router) => {

  // ********************** Eligibility **********************
  router.post('/screening-questions/10-weeks', function(req, res) {
    var errors = []
    if (req.body['10-weeks'] === undefined) {
      errors.push({
      text: 'Select an answer',
      href: '#10-weeks'
      })
    }

    if (errors.length === 0) {
        res.redirect('/alpha-tidy-up/screening-questions/under-18')
    }
    else {
        res.render('.//alpha-tidy-up/screening-questions/10-weeks', { errors: errors })
    }
  })

  router.post('/screening-questions/under-18', function(req, res) {
    var errors = []
    if (req.body['child-under-18'] === undefined) {
      errors.push({
      text: 'Select an answer',
      href: '#under-18'
      })
    }

    if (errors.length === 0) {
      if (req.body['child-under-18'] === "Yes") {
        res.redirect('/alpha-tidy-up/screening-questions/married')
      }
      else {
        res.redirect('/alpha-tidy-up/screening-questions/cannot-apply')
      }
    }
    else {
        res.render('.//alpha-tidy-up/screening-questions/under-18', { errors: errors })
    }

  })

  router.post('/screening-questions/married', function(req, res) {
    var errors = []
    if (req.body['child-married'] === undefined) {
      errors.push({
      text: 'Select an answer',
      href: '#married'
      })
    }

    if (errors.length === 0) {
      if (req.body['child-married'] === 'Yes') {
        res.redirect('/alpha-tidy-up/screening-questions/cannot-apply')
      }
      else {
        res.redirect('/alpha-tidy-up/screening-questions/child-can-be-adopted')
      }
    }
    else {
        res.render('.//alpha-tidy-up/screening-questions/married', { errors: errors })
    }

  })

  router.post('/screening-questions/under-21', function(req, res) {
    var errors = []
    if (req.body['under-21'] === undefined) {
      errors.push({
      text: 'Select an answer',
      href: '#under-21'
      })
    }

    if (errors.length === 0) {
        res.redirect('/alpha-tidy-up/screening-questions/lived-uk')
    }
    else {
        res.render('.//alpha-tidy-up/screening-questions/under-21', { errors: errors })
    }
  })

  router.post('/screening-questions/lived-uk', function(req, res) {
    var errors = []
    if (req.body['lived-uk'] === undefined) {
      errors.push({
      text: 'Select an answer',
      href: '#lived-uk'
      })
    }

    if (errors.length === 0) {
      if (req.body['lived-uk'] === "Yes") {
        res.redirect('/alpha-tidy-up/screening-questions/can-apply')
      }
      else {
        res.redirect('/alpha-tidy-up/screening-questions/cannot-apply')
      }
    }
    else {
        res.render('.//alpha-tidy-up/screening-questions/lived-uk', { errors: errors })
    }

  })


  // ********************** Application details  **********************
  router.post('/about-application/number-of-children', function(req, res) {
    var errors = []
    if (req.body['number-children'] === undefined) {
      errors.push({
      text: 'Select an answer',
      href: '#number-of-children'
      })
    }
    if (errors.length === 0) {
        res.redirect('/alpha-tidy-up/about-application/number-of-applicants')
    }
    else {
        res.render('.//alpha-tidy-up/about-application/number-of-children', { errors: errors })
    }
  })

  router.post('/about-application/number-of-applicants', function(req, res) {
    var errors = []
    if (req.body['number-of-applicants'] === undefined) {
      errors.push({
      text: 'Select an answer',
      href: '#number-of-applicants'
      })
    }
    if (errors.length === 0) {
        res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
    else {
        res.render('.//alpha-tidy-up/about-application/number-of-applicants', { errors: errors })
    }
  })





  // ********************** First applicant personal details **********************
  router.post('/two-applicants/about-you/first-applicant-name', function(req, res) {
    var errors = []
    if (req.body['first-applicant-name'] === '') {
      errors.push({
      text: 'Select an answer',
      href: '#first-applicant-name'
      })
    }
    if (errors.length === 0) {
      if (req.body['submit-button'] === 'save-and-continue') {
        res.redirect('/alpha-tidy-up/two-applicants/about-you/first-applicant-other-names')
      }
      else {
        res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
      }
    }
    else {
        res.render('.//alpha-tidy-up/two-applicants/about-you/first-applicant-name', { errors: errors })
    }
  })

  router.post('/two-applicants/about-you/first-applicant-other-names', function(req, res) {
    var errors = []
    if (req.body['first-applicant-previous-full-name'] === '' && req.session.firstApplicantPreviousNames === '') {
      errors.push({
      text: 'Select an answer',
      href: '#first-applicant-other-names'
      })
    }
    if (errors.length === 0) {
      count = req.session.data.firstApplicantNameCount
      if (req.body['submit-button'] === 'add') {
        req.session.data.firstApplicantPreviousNames[count] = req.body['first-applicant-previous-full-name']
        req.session.data.idFirstApplicant[count] = count
        req.session.data.firstApplicantNameCount = count + 1
        res.redirect('/alpha-tidy-up/two-applicants/about-you/first-applicant-other-names')
      }
      else if (req.body['submit-button'] === 'save-and-continue') {
        req.session.data.firstApplicantPreviousNames[count] = req.body['first-applicant-previous-full-name']
        console.log("Previous names: ", req.session.data.firstApplicantPreviousNames[count])
        res.redirect('/alpha-tidy-up/two-applicants/about-you/first-applicant-date-birth')
      }
      else {
        res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
      }
    }
    else {
        res.render('.//alpha-tidy-up/two-applicants/about-you/first-applicant-other-names', { errors: errors })
    }

  })

  router.post('/two-applicants/about-you/first-applicant-date-birth', function(req, res) {
    console.log("Day: ", req.body['day'])
    var errors = []
    if (req.body['day'] === '' || req.body['month'] === '' || req.body['year'] === '') {
      errors.push({
      text: 'Select an answer',
      href: '#first-applicant-date-birth'
      })
    }
    if (errors.length === 0) {
      if (req.body['submit-button'] === 'save-and-continue') {
        res.redirect('/alpha-tidy-up/two-applicants/about-you/first-applicant-gender')
      }
      else {
        res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
      }
    }
    else {
        res.render('.//alpha-tidy-up/two-applicants/about-you/first-applicant-date-birth', { errors: errors })
    }
  })

  router.post('/two-applicants/about-you/first-applicant-gender', function(req, res) {
    var errors = []
    if (req.body['first-applicant-gender'] === '') {
      errors.push({
      text: 'Select an answer',
      href: '#first-applicant-gender'
      })
    }
    if (errors.length === 0) {
      if (req.body['submit-button'] === 'save-and-continue') {
        res.redirect('/alpha-tidy-up/two-applicants/about-you/first-applicant-nationality')
      }
      else {
        res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
      }
    }
    else {
        res.render('.//alpha-tidy-up/two-applicants/about-you/first-applicant-gender', { errors: errors })
    }
  })

  router.post('/two-applicants/about-you/first-applicant-nationality', function(req, res) {
    var errors = []
    if (req.body['first-applicant-nationality'] === '') {
      errors.push({
      text: 'Select an answer',
      href: '#first-applicant-nationality'
      })
    }
    if (errors.length === 0) {
      if (req.body['submit-button'] === 'save-and-continue') {
        res.redirect('/alpha-tidy-up/two-applicants/about-you/first-applicant-occupation')
      }
      else {
        res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
      }
    }
    else {
        res.render('.//alpha-tidy-up/two-applicants/about-you/first-applicant-nationality', { errors: errors })
    }
  })

  router.post('/two-applicants/about-you/first-applicant-occupation', function(req, res) {
    var errors = []
    if (req.body['first-applicant-occupation'] === '') {
      errors.push({
      text: 'Select an answer',
      href: '#first-applicant-occupation'
      })
    }
    if (errors.length === 0) {
      if (req.body['submit-button'] === 'save-and-continue') {
        res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
      }
      else {
        res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
      }
    }
    else {
        res.render('.//alpha-tidy-up/two-applicants/about-you/first-applicant-occupation', { errors: errors })
    }
  })

// ********************** First applicant contact details **********************
router.post('/two-applicants/about-you/first-applicant-address', function(req, res) {
  var errors = []
  if (req.body['first-applicant-address'] === '') {
    errors.push({
    text: 'Enter a valid postcode',
    href: '#first-applicant-address'
    })
  }
  if (errors.length === 0) {
    if (req.body['submit-button'] === 'save-and-continue') {
      res.redirect('/alpha-tidy-up/two-applicants/about-you/first-applicant-address2')
    }
    else {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
  }
  else {
      res.render('.//alpha-tidy-up/two-applicants/about-you/first-applicant-address', { errors: errors })
  }
})

router.post('/two-applicants/about-you/first-applicant-address2', function(req, res) {
  var errors = []
  if (req.body['first-applicant-address2'] === '') {
    errors.push({
    text: 'Select and address',
    href: '#first-applicant-address2'
    })
  }
  if (errors.length === 0) {
    if (req.body['submit-button'] === 'save-and-continue') {
      res.redirect('/alpha-tidy-up/two-applicants/about-you/first-applicant-contact')
    }
    else {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
  }
  else {
      res.render('.//alpha-tidy-up/two-applicants/about-you/first-applicant-address2', { errors: errors })
  }
})

router.post('/two-applicants/about-you/first-applicant-find-address', function(req, res) {
  var errors = []
  if (req.body['first-applicant-find-address'] === '') {
    errors.push({
    text: 'Enter address',
    href: '#first-applicant-find-address'
    })
  }
  if (errors.length === 0) {
    if (req.body['submit-button'] === 'save-and-continue') {
      res.redirect('/alpha-tidy-up/two-applicants/about-you/first-applicant-contact')
    }
    else {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
  }
  else {
      res.render('.//alpha-tidy-up/two-applicants/about-you/first-applicant-find-address', { errors: errors })
  }
})

router.post('/two-applicants/about-you/first-applicant-contact', function(req, res) {
  var errors = []
  if (req.body['first-applicant-contact'] === '') {
    errors.push({
    text: 'Select an answer',
    href: '#first-applicant-contact'
    })
  }
  if (errors.length === 0) {
    if (req.body['submit-button'] === 'save-and-continue') {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
    else if (req.body['submit-button'] === 'save-as-draft') {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
  }
  else {
      res.render('.//alpha-tidy-up/two-applicants/about-you/first-applicant-contact', { errors: errors })
  }
})

// ********************** Second applicant personal details **********************
router.post('/two-applicants/about-you/second-applicant-name', function(req, res) {
  var errors = []
  if (req.body['second-applicant-name'] === '') {
    errors.push({
    text: 'Select an answer',
    href: '#second-applicant-name'
    })
  }
  if (errors.length === 0) {
    if (req.body['submit-button'] === 'save-and-continue') {
      res.redirect('/alpha-tidy-up/two-applicants/about-you/second-applicant-other-names')
    }
    else {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
  }
  else {
      res.render('.//alpha-tidy-up/two-applicants/about-you/second-applicant-name', { errors: errors })
  }
})

router.post('/two-applicants/about-you/second-applicant-other-names', function(req, res) {
  var errors = []
  if (req.body['second-applicant-previous-full-name'] === '' && req.session.secondApplicantPreviousNames === '') {
    errors.push({
    text: 'Select an answer',
    href: '#second-applicant-other-names'
    })
  }
  if (errors.length === 0) {
    count = req.session.data.secondApplicantNameCount
    if (req.body['submit-button'] === 'add') {
      req.session.data.secondApplicantPreviousNames[count] = req.body['second-applicant-previous-full-name']
      req.session.data.idSecondApplicant[count] = count
      req.session.data.secondApplicantNameCount = count + 1
      res.redirect('/alpha-tidy-up/two-applicants/about-you/second-applicant-other-names')
    }
    else if (req.body['submit-button'] === 'save-and-continue') {
      req.session.data.secondApplicantPreviousNames[count] = req.body['second-applicant-previous-full-name']
      console.log("Previous names: ", req.session.data.secondApplicantPreviousNames[count])
      res.redirect('/alpha-tidy-up/two-applicants/about-you/second-applicant-date-birth')
    }
    else {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
  }
  else {
      res.render('.//alpha-tidy-up/two-applicants/about-you/second-applicant-other-names', { errors: errors })
  }

})

router.post('/two-applicants/about-you/second-applicant-date-birth', function(req, res) {
  console.log("Day: ", req.body['2day'])
  var errors = []
  if (req.body['2day'] === '' || req.body['2month'] === '' || req.body['2year'] === '') {
    errors.push({
    text: 'Select an answer',
    href: '#second-applicant-date-birth'
    })
  }
  if (errors.length === 0) {
    if (req.body['submit-button'] === 'save-and-continue') {
      res.redirect('/alpha-tidy-up/two-applicants/about-you/second-applicant-gender')
    }
    else {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
  }
  else {
      res.render('.//alpha-tidy-up/two-applicants/about-you/second-applicant-date-birth', { errors: errors })
  }
})

router.post('/two-applicants/about-you/second-applicant-gender', function(req, res) {
  var errors = []
  if (req.body['second-applicant-gender'] === '') {
    errors.push({
    text: 'Select an answer',
    href: '#second-applicant-gender'
    })
  }
  if (errors.length === 0) {
    if (req.body['submit-button'] === 'save-and-continue') {
      res.redirect('/alpha-tidy-up/two-applicants/about-you/second-applicant-nationality')
    }
    else {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
  }
  else {
      res.render('.//alpha-tidy-up/two-applicants/about-you/second-applicant-gender', { errors: errors })
  }
})

router.post('/two-applicants/about-you/second-applicant-nationality', function(req, res) {
  var errors = []
  if (req.body['second-applicant-nationality'] === '') {
    errors.push({
    text: 'Select an answer',
    href: '#second-applicant-nationality'
    })
  }
  if (errors.length === 0) {
    if (req.body['submit-button'] === 'save-and-continue') {
      res.redirect('/alpha-tidy-up/two-applicants/about-you/second-applicant-occupation')
    }
    else {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
  }
  else {
      res.render('.//alpha-tidy-up/two-applicants/about-you/second-applicant-nationality', { errors: errors })
  }
})

router.post('/two-applicants/about-you/second-applicant-occupation', function(req, res) {
  var errors = []
  if (req.body['second-applicant-occupation'] === '') {
    errors.push({
    text: 'Select an answer',
    href: '#second-applicant-occupation'
    })
  }
  if (errors.length === 0) {
    if (req.body['submit-button'] === 'save-and-continue') {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
    else {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
  }
  else {
      res.render('.//alpha-tidy-up/two-applicants/about-you/second-applicant-occupation', { errors: errors })
  }
})



// ********************** Second applicant contact details **********************


router.post('/two-applicants/about-you/second-applicant-same-address', function(req, res) {
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
        res.redirect('/alpha-tidy-up/two-applicants/about-you/second-applicant-contact')
      }
      else {
        res.redirect('/alpha-tidy-up/two-applicants/about-you/second-applicant-address')
      }
    }
    else {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
  }
  else {
      res.render('.//alpha-tidy-up/two-applicants/about-you/second-applicant-same-address', { errors: errors })
  }

})

router.post('/two-applicants/about-you/second-applicant-address', function(req, res) {
  var errors = []
  if (req.body['address'] === undefined) {
    errors.push({
    text: 'Enter a valid postcode',
    href: '#second-applicant-address'
    })
  }

  if (errors.length === 0) {
   if (req.body['submit-button'] === 'save-and-continue') {
        res.redirect('/alpha-tidy-up/two-applicants/about-you/second-applicant-address2')
    }
    else {
      res.redirect('/alpha-tidy-up/two-applicants/task-list-2-multiple')
    }
  }
  else {
      res.render('.//alpha-tidy-up/two-applicants/about-you/second-applicant-address', { errors: errors })
  }

})


//router.post('/two-applicants/about-you/second-applicant-same-address', function(req, res) {
  //var errors = []
  //if (req.body['second-applicant-same-address'] === undefined) {
    //errors.push({
    //text: 'Select an answer',
    //href: '#second-applicant-same-address'
  //  })
  //}

//  if (errors.length === 0) {
  //  if (req.body['submit-button'] === 'save-and-continue') {
    //if (req.body['second-applicant-same-address'] === "Yes") {
  //    res.redirect('/alpha-tidy-up/two-applicants/about-you/second-applicant-contact')
  //  }
  //  else {
    //  res.redirect('/alpha-tidy-up/two-applicants/about-you/second-applicant-address')
  //  }
//}
  //else {
    //  res.render('.//alpha-tidy-up/stwo-applicants/about-you/second-applicant-same-address', { errors: errors })
  //}

//})







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









  // router.post('/screening-questions/10-weeks', function(req, res) {
  //   res.redirect('/alpha-tidy-up/screening-questions/under-18')
  // })










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
