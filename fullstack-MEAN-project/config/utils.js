/*
backend role check to protect routes
solution: https://www.developerhandbook.com/passport.js/passport-role-based-authorisation-authentication/
*/
const checkIsInRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.send({ success: false, msg: 'No such user!'});
  }

  const hasRole = roles.find(role => req.user.role === role)
  if (!hasRole) {
    return res.status(401).send({ success: false, msg: 'Unauthorized!'});
  }

 return next()
}

module.exports = checkIsInRole;