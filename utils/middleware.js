const flash = require('connect-flash');

let middlewareObj = {};

// Check if user is logged in; redirect if not
middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You must be logged in to do that.');
  res.redirect('/mealapp/login');
}

module.exports = middlewareObj;
