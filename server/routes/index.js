//route declaration
const user = require('./user')
const article = require('./article')
const auth = require('./auth')
module.exports = (router) => {
    //set user route
    user(router)
    article(router)
    auth(router)
}