let express = require("express");
const cors = require("cors");
let passport = require("passport");
let JWTStrategy = require("passport-jwt").Strategy;
let ExtractJWT = require("passport-jwt").ExtractJwt;
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header("Access-Control-Expose-Headers", "X-Auth-Token");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  next();
});
var port = process.env.port || 2410;
app.listen(port, () => console.log(`Listening on port ${port}!`));
let { userData } = require("./empCookieTask-5_2_Data.js");
// console.log(userData);
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
const { MongoClient } = require("mongodb");
let { ObjectId } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "websulTest";
const client = new MongoClient(url);

async function getData() {
  let result = await client.connect();
  let db = result.db(dbName);
  let collection = db.collection("webSultData");
  let response = await collection.find().toArray();
  console.log(response);
}
// getData();
app.use(passport.initialize());
const params = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jwtsecret23568747",
};
const jwtExpirySeconds = 3000;

let strategyAll = new JWTStrategy(params, async function (token, done) {
  console.log("In JWTStrategy", token);
  let result = await client.connect();
  let db = result.db(dbName);
  let collection = db.collection("webSultData");
  let user1 = await collection.findOne({ username: token.username });
  console.log(user1);
  // let user1 = response.find(
  //   (k) => k.username === token.username && k.password === token.password
  // );
  console.log("user1", user1);
  if (!user1)
    return done(null, false, {
      message: "Incorrect Username or Password",
    });
  else {
    return done(null, user1);
  }
});

passport.use("roleAll", strategyAll);
// passport.use("roleAdmin", strategyAdmin);
const jwt = require("jsonwebtoken");
const jwt_key = "secrectkey234759";
const jwtExpiryTime = 3000;
let cookieName = "jwtToken";

app.post("/login", async function (req, res) {
  let { username, password } = req.body;
  //   console.log(req.body);
  let result = await client.connect();
  let db = result.db(dbName);
  let collection = db.collection("webSultData");
  let response = await collection.findOne({
    $and: [{ username: username }, { password: password }],
  });
  console.log(response);
  if (response) {
    let payload = { username: response.username };
    let token = jwt.sign(payload, params.secretOrKey, {
      algorithm: "HS256",
      expiresIn: jwtExpiryTime,
    });
    res.setHeader("X-Auth-Token", token);
    console.log(token);
    res.send(payload);
  } else {
    res.sendStatus(401);
  }
});
app.post("/myDetails", async function (req, res) {
  let obj = req.body;
  console.log("In POST /user", req.user);
  let result = await client.connect();
  let db = result.db(dbName);
  let collection = db.collection("webSultData");
  let response = await collection.insertOne(obj);
  console.log(response);
  res.send("Registration SuccessFul");
});
app.put(
  "/myDetails",
  passport.authenticate("roleAll", { session: false }),
  async function (req, res) {
    let body = req.body;
    console.log("In PUT /user", req.user);
    let result = await client.connect();
    let db = result.db(dbName);
    let collection = db.collection("webSultData");
    let response = await collection.updateOne(
      { _id: req.user._id },
      { $set: body }
    );
    console.log(response);
    let user = req.user;

    res.send(user);
  }
);
app.get(
  "/myDetails",
  passport.authenticate("roleAll", { session: false }),
  function (req, res) {
    // console.log("In GET /user", req.user);
    let user = req.user;
    delete user.password;
    res.send(user);
  }
);
