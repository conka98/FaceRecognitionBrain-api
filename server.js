const express = require('express');
const cors = require('cors');
const knex = require('knex')
const bcrypt=require('bcrypt-nodejs')

const register=require('./controller/register')
const profile=require('./controller/profile')
const signin=require('./controller/signin')
const image=require('./controller/image')

const app = express();


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'facerecognitionbrain'
  }
});


app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/',(req,res)=>{res.send(database.users)})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put('/image',(req,res)=>image.handleImage(req,res,db))
app.post('/imageurl',(req,res)=>image.handleImageurl(req,res))
app.listen(3000,()=>{
	console.log("Server listening at 300")
})