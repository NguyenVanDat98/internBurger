
// import { query, where } from "firebase/firestore";
// const query = require("firebase/firestore")
// const where = require("firebase/firestore")
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors')


const  express = require('express');
const { v4 } = require("uuid");
// const { query } = require("express");
// const qr= query()
// const wh= where()
const  app = express()
app.use(cors())

admin.initializeApp ({
    credential:  admin.credential.cert("./internburger.json"),
    databaseURL :'https://internburger-6dd37.firebaseio.com'
})
const db = admin.firestore()

app.get("/users" , async (req , res)=>{
    try {
        const d = db.collection('users')
        // const filt= await d.
        
        const q = await d.get()
        const v = q.docs
       const bb =  v.map((i)=>{
            return i.data() 
        })
       return res.status(200).json(bb)
    } catch (error) {
        return res.status(500).json()
    }
})
app.get("/users/:email" , async (req , res)=>{
    try {
        const d = db.collection('users')
        const {email} = req.params
        
        const q = await d.where("email","==", `${email}`).get()
        const v = q.docs
       const bb =  v.map((i)=>{
            return i.data() 
        })
       return res.status(200).json(bb)
    } catch (error) {
        return res.status(500).json()
    }
})
app.post("/addUser" , async (req , res)=>{
    try {
        const id = v4()
        db.collection("users").doc(`/${id}/`).create(req.body)
       

       return res.status(200).json(id)
    } catch (error) {
        return res.status(500).json()
    }
})
app.get("/burgers" , async (req , res)=>{
    try {
        const d = db.collection('burgers')
        const q = await d.get()
        const v = q.docs
       const bb =  v.map((i)=>{
            return i.data() 
        })
       return res.status(200).json(bb)
    } catch (error) {
        return res.status(500).json()
    }
})
app.post("/addOrder" , async (req , res)=>{
    try {
        const id = v4()
        db.collection("burgers").doc(`/${id}/`).create(req.body)
       

       return res.status(200).json(id)
    } catch (error) {
        return res.status(500).json()
    }
})
exports.app = functions.https.onRequest(app)


