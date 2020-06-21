require('dotenv').config()
const withTM = require('next-transpile-modules')([
  'gsap'
])

module.exports = withTM({
  // Avoid "no exported configuration found" warning
  env: {}
})