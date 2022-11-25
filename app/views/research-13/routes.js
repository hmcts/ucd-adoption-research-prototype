const { uniqueSiblingFirstNames } = require("../../data/session-data-defaults");

module.exports = (router) => {


  /******************************  DSS ******************************/
  router.post('/research-13/dss/case-reference-number', function(req, res) {
    var errors = []
    if (req.body['case-reference-number'] === '') {
      errors.push({
      text: 'Enter the case reference number',
      href: '#case-reference-number'
      })
    }

    if (req.body['submit-button'] === 'continue') {
      if (req.body['case-reference-number'] === '1') {
        res.redirect('/research-13/dss/problem')
      }
      else {
        if (errors.length === 0) {
          res.redirect('/research-13/dss/child-details')
        }
        else {
            res.render('.//research-13/dss/case-reference-number', { errors: errors })
        }
      }
    }
  })


  router.post('/research-13/dss/child-details', function(req, res) {
    var errors = []
    if (req.body['child-name'] === '') {
      errors.push({
      text: 'Enter the child\'s full name',
      href: '#child-name'
      })
    }
    if (req.body['dss-child-birth-day'] === '' || req.body['dss-child-birth-month'] === '' || req.body['dss-child-birth-year'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-203 for different error messages',
      href: '#dss-child-date-birth'
      })
    }

    if (errors.length === 0) {
      res.redirect('/research-13/dss/add-information')
    }
    else {
      res.render('.//research-13/dss/child-details', { errors: errors })
      }
  })


  router.post('/research-13/dss/add-information', function(req, res) {
    res.redirect('/research-13/dss/check-your-answers')
  })


  router.post('/research-13/dss/check-your-answers', function(req, res) {
    res.redirect('/research-13/dss/confirmation')
  })




};
