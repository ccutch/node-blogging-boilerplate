var mkdir = require('mkdirp')

exports.isNotError = function(err, res, message) {
  message || (message = { status: 500, error: 'ERROR: ' + err })
  if(err) {
    res.status(message.status)
    res.send(message.error)
    return false
  }
  return true
}

exports.initPath = function(dir) {
  mkdir(dir, function(err) {
    if(err) console.error(err)
  })
}
