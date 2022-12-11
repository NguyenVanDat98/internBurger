// import { query, where } from "firebase/firestore";
// const query = require("firebase/firestore")
// const where = require("firebase/firestore")

const functions = require("firebase-functions");
var FCM = require("fcm-node");
const admin = require("firebase-admin");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const { v4 } = require("uuid");
const webpush = require("web-push");
const path = require("path");
var serverKey =
  "AAAAl2A_-_M:APA91bF2r4y2Y8ICFCgCDJa13rKxUMU-huGq16jq0b7bCEsSJ584GqUK5cjuTmUiqJgW3i6Ck_010qNvkHphLAfbszViVwGxCxiJ1NKq78IgpoiLcyKReHv75hQ_6XkHCz5k5jNipcSJ";
var fcm = new FCM(serverKey);
const publicKey =
  "BEy4dRrE5Oez6PiPhXAj2HnFlsgcniJSHtiqMLbSNDVH3HTVHl99MsyeE0Fgh1LBKDfXzmEq6m1q4R6llX6xErA";
const privateKey = "FMD4Q3Xw2Fw7EDtQLE6N8twcGfbJZspXahTYgQXaqTk";

const app = express();
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

webpush.setVapidDetails("mailto:test@test.com", publicKey, privateKey);
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert("./internburger.json"),
  databaseURL: "https://internburger-6dd37.firebaseio.com",
});
const db = admin.firestore();

app.get("/users", async (req, res) => {
  try {
    const d = db.collection("users");
    // const filt= await d.

    const q = await d.get();
    const v = q.docs;
    const bb = v.map((i) => {
      return i.data();
    });
    return res.status(200).json(bb);
  } catch (error) {
    return res.status(500).json();
  }
});
app.get("/users/:email", async (req, res) => {
  try {
    const d = db.collection("users");
    const { email } = req.params;

    const q = await d.where("email", "==", `${email}`).get();
    const v = q.docs;
    const bb = v.map((i) => {
      return i.data();
    });
    return res.status(200).json(bb);
  } catch (error) {
    return res.status(500).json();
  }
});

app.post("/fcm", (req, res) => {
    if(!req.body.token){
        return res.json({})
    }
  let message = {
    // to: req.body.token,
     
    operation: "create",
   notification_key_name: "appUser-Chris",
   registration_ids: [...req.body.token,"fer1PlOP-G9SRKhbCnOjBa:APA91bG4a3gIbK2BaaOD2w7jcWr9mPhva9n25e0yVvSxgqznMnjJV3z_tPv969X5oTF2DHjQ3l6i7_xQNQJBV7GPr2__62lWPjQUVP0e5vpqgU0gHc39njyHZ6YlHYtPWXAPJz9QB63h"],
    notification: {
      title: "Title of your push notification",
      body: "Body of your push notification",
    },

    data: {
      //you can send only notification or only data(or include both)
      my_key: "my value",
      my_another_key: "my another value",
    },
  };
  fcm.send(message,(err,resp)=>{
    
  });
  res.json(req.body)
});

app.post("/addUser", async (req, res) => {
  try {
    const id = v4();
    db.collection("users").doc(`/${id}/`).create(req.body);

    return res.status(200).json(id);
  } catch (error) {
    return res.status(500).json();
  }
});
app.get("/burgers", async (req, res) => {
  try {
    const d = db.collection("burgers");
    const q = await d.get();
    const v = q.docs;
    const bb = v.map((i) => {
      return i.data();
    });
    return res.status(200).json(bb);
  } catch (error) {
    return res.status(500).json();
  }
});
app.post("/addOrder", async (req, res) => {
  try {
    const id = v4();
    db.collection("burgers").doc(`/${id}/`).create(req.body);

    return res.status(200).json(id);
  } catch (error) {
    return res.status(500).json();
  }
});
exports.app = functions.https.onRequest(app);
