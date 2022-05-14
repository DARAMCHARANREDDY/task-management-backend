import express from "express";
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyparser from 'body-parser';
import mongoose from "mongoose";
import taskRoutes from './Routes/task.js';
import userRoutes from './Routes/user.js';

var app = express();

app.use(cors());


// const mongoUri = `mongodb+srv://admin:admin@123@cluster0.popxs.mongodb.net/task-app?retryWrites=true&w=majority`;
const mongoUri = 'mongodb://cosmosdbsdp:mURyN3E1EzC2pNlU2rxtpXG1wUFoUREunCLexgKmqMtpYEh7hwSCl3xmwPUWE3kDa1h5ec0JIb3wYxK1ZnUD9g==@cosmosdbsdp.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmosdbsdp@'
// "mongodb://cosmosdbsdp:m@cosmosdbsdp.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmosdbsdp@"

// connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(bodyparser.json());       // to support JSON-encoded bodies
app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
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
// app.use("/", base)

const status = (req, res) => {
  res.status(200).json({
    status: true,
    title: 'Apis'
  });
}
app.get("/sitestatus", status);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

const DATABASE_URL = process.env.DATABASE_URL || mongoUri
const PORT = process.env.PORT || 5000;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
  .catch((err) => console.log(err.message));
