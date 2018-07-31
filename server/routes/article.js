// server/routes/article.js
var JwtAuthMiddleware = require("./../Middleware/JwtAuthMiddleware")
const articleController = require('./../controllers/articleController.js')
// file upload
//const multipart = require('connect-multiparty')
//const multipartWare = multipart()
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/articles')
        .get(JwtAuthMiddleware,articleController.getAll)
    /**
     * add an article
     */
    router
        .route('/article')
        .post(JwtAuthMiddleware,articleController.addArticle)
    /**
     * clap on an article
     */
    router
        .route('/article/clap')
        .post(JwtAuthMiddleware,articleController.clapArticle)
    /**
     * comment on an article
     */
    router
        .route('/article/comment')
        .post(JwtAuthMiddleware,articleController.commentArticle)
    /**
     * get a particlular article to view
     */
    router
        .route('/article/:id')
        .get(JwtAuthMiddleware,articleController.getArticle)
}