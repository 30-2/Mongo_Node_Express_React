//import route for user

//create userController
const usercontroller = require('./../controllers/UserController')  

module.exports = (router) => {

    /**
     * get a user
     * localhost:5000/api/user/id with get action
     */
    router
        .route('/user/:id') 
        .get(usercontroller.getUser)

    /**
     * adds a user
     * localhost:5000/api/user/ with post action
     * {
     * "name" :"name"
     * "email":"name@name.com"
     * }
     */
    router
        .route('/user')
        .post(usercontroller.addUser)

    /**
     * select all user
     * localhost:5000/api/users with get action
     */    
	router
        .route('/users/')
        .get(usercontroller.getAllUsers)    
}