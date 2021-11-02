module.exports = (router) => {

  
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
    if (req.body['previous-full-name'] === '') {
      errors.push({
      text: 'Select an answer',
      href: '#first-applicant-other-names'
      })
    }
  
    if (errors.length === 0) {
      if (req.body['submit-button'] === 'save-and-continue') {
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








  // Examples
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