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
    console.log("Test: ", req.body['child-under-18'])
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
        res.redirect('/alpha-tidy-up/screening-questions/under-21')
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
       res.redirect('/alpha-tidy-up/screening-questions/cannot-apply-applicant')
     }
   }
   else {
       res.render('.//alpha-tidy-up/screening-questions/lived-uk', { errors: errors })
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
