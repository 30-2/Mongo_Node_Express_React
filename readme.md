https://www.youtube.com/watch?v=k_0ZzvHbNBQ&list=PLillGF-RfqbYRpji8t4SxUkMxfowG4Kqp&index=1
Mongodb (Nosql database)
Express (one of Nodejs most popular Framework)
ReactJs (The most popular frontend javascript framework powered by facebook)
NodeJs (Javascript server side language, most popular and most attractive salary language in nowadays)


Software Requirements
1. Node Js https://nodejs.org/en/download/
2. MongoDb https://www.mongodb.com/download-center
3. Robo Mongo (A kind of GUI for MongoDb) https://robomongo.org/download


Initial dependencies Installation
In command line, under your folder create server folder
- npm install mongoose express cors body-parser
mongoose (MongoDb ORM package)
express (Express Framework)
cors (Cross Origin Allow package)
body-parser (Request Parameter Management package)let to get parameters from our POST requests

- node_module and package-lock.json will create.

1# CRUD including relation tables
1. Firstly, create server folder and create app.js in server which is index of our application folder 
2. create routes
	- create folder routes in server and also controller
	- In routes folder, we need to create seprate module for route
	For example, if we want to create route for user module, it should be routes/user
	but there are other ways, but I think this is very suitable way.
3. create controllers
4. create model
5. run mongodb C:\Program Files\MongoDB\Server\4.0\bin  Open cmd, run mongod
	and create database, we dont need to create tables, because mongodb not need, it create tables within insert
4. run server "node server/app.js" in command
http://localhost:5000
References from this https://codeburst.io/build-simple-medium-com-on-node-js-and-react-js-a278c5192f47
5. Now we can test using postman
sent raw data in body
 {
  "name" :"name"
  "email":"name@name.com"
 }
----------------------------------------------------------------------------

https://docs.mongodb.com/manual/tutorial/query-documents/
https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/
https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/
https://docs.mongodb.com/manual/reference/sql-comparison/
About MongoDB
- Select All Documents in a Collection
	const cursor = db.collection('inventory').find({});
	SELECT * FROM inventory

- Specify Equality Condition
	const cursor = db.collection('inventory').find({ status: 'D' });
	SELECT * FROM inventory WHERE status = "D"

- Specify Conditions Using Query Operators
	const cursor = db.collection('inventory').find({
	status: { $in: ['A', 'D'] }
	});
	SELECT * FROM inventory WHERE status in ("A", "D")

- Specify AND Conditions
	const cursor = db.collection('inventory').find({
	status: 'A',
	qty: { $lt: 30 }
	});
	SELECT * FROM inventory WHERE status = "A" AND qty < 30

- Specify OR Conditions
	const cursor = db.collection('inventory').find({
	$or: [{ status: 'A' }, { qty: { $lt: 30 } }]
	});
	SELECT * FROM inventory WHERE status = "A" OR qty < 30

- Specify AND as well as OR Conditions
	const cursor = db.collection('inventory').find({
	status: 'A',
	$or: [{ qty: { $lt: 30 } }, { item: { $regex: '^p' } }]
	});
	SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%")

- Update a Single Document
	- to update the first document where item equals "paper":
	await db.collection('inventory').updateOne(
	{ item: 'paper' },
	{
		$set: { 'size.uom': 'cm', status: 'P' },
		$currentDate: { lastModified: true }
	}
	);
- Update Multiple Documents
	- to update all documents where qty is less than 50
	await db.collection('inventory').updateMany(
	{ qty: { $lt: 50 } },
	{
		$set: { 'size.uom': 'in', status: 'P' },
		$currentDate: { lastModified: true }
	}
	);

- Delete All Documents that Match a Condition
	await db.collection('inventory').deleteMany({ status: 'A' });

- Delete Only One Document that Matches a Condition
	await db.collection('inventory').deleteOne({ status: 'D' });

- Return All But the Excluded Fields
to exclude specific fields. The following example which returns all fields except for the status and the instock fields in the matching documents:
const cursor = db
  .collection('inventory')
  .find({
    status: 'A'
  })
  .project({ status: 0, instock: 0 });

2# Create Article
  1. Create articel model
  2. Create route
  3. Declare route in route/index.js
  4. Create Contoller
  Raw data to test with postman
	{
	"text" :"article",
	"title": "articel title",
	"description": "description",
	"claps": "1",
	"feature_img": "",
	"image": ""
	}
3# Create Authentication with Json Web Token
 Install morgan and jsonwebtoken
 - npm install morgan jsonwebtoken --save
 morgan will log requests to the console so we can see what is happening
 jsonwebtoken is how we create and verify our JSON Web Tokens
 - npm install bcryptjs --save
 bcryptjs password encryption
 - create config.js file under project foler to store secret value
 module.exports = {
    'secret': 'ilovescotchyscotch',
};
- In Model\User.js Add new column password under email
 password: String
- modify User COntroller
 * declare bcryptjs
   const bcrypt = require('bcryptjs')
 * encrypt password using bcrypt
 bcrypt.hashSync(req.body.password, 8);
 * protect password from field when diplay user
 * create auth.js in route folder
 * create AuthController
 References from https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
----------------------------------------------------------------------------

4# Introduce with Middleware 
1. Actually it's adding a function, in front of calling controller function
router
    .route('/users/')
    .get(function(req, res, next){   // this is a middleware function to check auth
        if(!req.headers){
			return res.status(401).send({ auth: false, message: 'No token provided.' });
		}
		var token = req.headers['x-access-token'];
		if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err){
				return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });			
			}		 
			next();
		});					        
    },usercontroller.getAllUsers);    


2. But we need to make common isn't it?
To make common middleware
make a new folder Middlewares and move code to right here and save as JwtAuthMiddleware.js
module.exports = function (req, res, next) {    
    if(!req.headers){
		return res.status(401).send({ auth: false, message: 'No token provided.' });
	}
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
	jwt.verify(token, config.secret, function(err, decoded) {
		if (err){
			return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });			
		}		 
		next();
	});					        
};

3. Now require this middleware and just change route like this
var JwtAuthMiddleware = require("./Middlewares/JwtAuthMiddleware"),

router
    .route('/users/')
    .get(JwtAuthMiddleware,usercontroller.getAllUsers);   

Reference from this
https://expressjs.com/en/guide/writing-middleware.html
https://stackoverflow.com/questions/41263787/setting-up-a-middleware-in-router-route-in-nodejs-express
https://hackernoon.com/middleware-the-core-of-node-js-apps-ab01fee39200
https://medium.com/@agoiabeladeyemi/a-simple-explanation-of-express-middleware-c68ea839f498


https://medium.freecodecamp.org/how-to-write-beautiful-node-js-apis-using-async-await-and-the-firebase-database-befdf3a5ffee