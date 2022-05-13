var express = require("express");
var app = express();
var jwt = require('jsonwebtoken');
var cors = require('cors');
var multer = require('multer'),
  bodyParser = require('body-parser'),
  path = require('path');
var mongoose = require("mongoose");
var fs = require('fs');

const { login } = require("./controllers/login.js");
const { register } = require("./controllers/register.js");
const { addTask, updateTask, deleteTask, getTask } = require("./controllers/task.js");


var dir = './uploads';
// var upload = multer({
//   storage: multer.diskStorage({

//     destination: function (req, file, callback) {
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);
//       }
//       callback(null, './uploads');
//     },
//     filename: function (req, file, callback) { callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }

//   }),

//   fileFilter: function (req, file, callback) {
//     var ext = path.extname(file.originalname)
//     if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
//       return callback(/*res.end('Only images are allowed')*/ null, false)
//     }
//     callback(null, true)
//   }
// });

app.use(cors());


const mongoUri = `mongodb+srv://jjnanthakumar:nandy@123@cluster.iy4ad.mongodb.net/task-app?retryWrites=true&w=majority`;
// "mongodb://cosmosdbsdp:m@cosmosdbsdp.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmosdbsdp@"

mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(express.static('uploads'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

const base = (req, res, next) => {
  try {
    if (req.path === "/login" || req.path === "/register" || req.path === "/") {
      next();
    } else {
      /* decode jwt token if authorized*/
      jwt.verify(req.headers.token, 'shhhhh11111', function (err, decoded) {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            errorMessage: 'User unauthorized!',
            status: false
          });
        }
      })
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
}
app.use("/", base)

const status = (req, res) => {
  res.status(200).json({
    status: true,
    title: 'Apis'
  });
}
app.get("/sitestatus", status);

/* login api */
app.post("/login", login);

/* register api */
app.post("/register", register);



/* Api to add Product */
app.post("/add-task", addTask);

/* Api to update Product */
app.post("/update-task", updateTask);

/* Api to delete Product */
app.post("/delete-task", deleteTask);

/*Api to get and search product with pagination and search by name*/
app.get("/get-task", getTask);

app.listen(process.env.PORT || 2000, () => {
  console.log(`Server is Runing On port ${process.env.PORT || 2000}`);
});
