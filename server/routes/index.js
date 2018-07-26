//route declaration
const user = require('./user')

module.exports = (router) => {
    //set user route
    user(router)
}