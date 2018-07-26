//route declaration
const user = require('./user')
const article = require('./article')
module.exports = (router) => {
    //set user route
    user(router)
    article(router)
}