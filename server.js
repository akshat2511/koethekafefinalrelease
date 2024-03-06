const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const path =require("path");
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, '/views'));

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const connectionString = 'mongodb+srv://adm:adm@akshatbhaika.ftmgts2.mongodb.net/';
mongoose.connect('mongodb+srv://adm:adm@akshatbhaika.ftmgts2.mongodb.net/');
const photoforhero = mongoose.model('photoforhero',{text1:String,text2:String,text3:String,imageurl:String});
const speciality = mongoose.model('special',{text1:String,text2:String,text3:String,imageurl:String});

app.get('/', async (req, res) => {
  let sp =await speciality.find({});
 let m= await photoforhero.find({});
 res.render('index.ejs',{m:m,sp:sp});
});
const cafeSchema = new mongoose.Schema({
  n1: String,
  email: String,
});
const bookingSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  person: String,
  date: String,
  time: String,
  message: String
});

const Cafe = mongoose.model('Cafe', cafeSchema);
const Booking = mongoose.model("Booking", bookingSchema);
app.post('/signup', async (req, res) => {
  try {
    const { n1, email } = req.body;
    console.log(req.body);
    const newCafe = new Cafe({ n1, email });
    await newCafe.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
app.post('/adm', async (req, res) => {
  if (req.body.n1 == 'akshat' && req.body.pass == 'cafe') {
    const { n1, pass } = req.body;
    console.log(req.body);
    app.set('view engine', 'ejs');
    
    Cafe.find({}).then((x) => { res.render('loged', { x }); });

  } else {
    res.send('<h1>incorrect</h1>');
  }});
  app.post('/adm2', async (req, res) => {
    if (req.body.n1 == 'akshat' && req.body.pass == 'cafe') {
     
      console.log(req.body);
      app.set('view engine', 'ejs');
      
      Booking.find({}).then((m) => { res.render('loged2', { m }); });
  
    } else {
      res.send('<h1>incorrect</h1>');
    }
});
app.post('/del', async (req, res) => {

  await Cafe.deleteOne({ n1: req.body.n1 });

  console.log(req.body);
  await Cafe.find({}).then((x) => { res.render('loged', { x }); });





});
app.post('/book', async (req, res) => {

  await Booking.deleteOne({ name: req.body.n1 });

  console.log(req.body);
 await  Booking.find({}).then((m) => { res.render('loged2', { m }); });





});
app.post('/booking', async (req, res) => {
  // const newCafe = new Cafe({ n1, email });
  //   await newCafe.save();
  const name = req.body.name;
  const phone = req.body.phone;
  const person = req.body.person[0];
  const time = req.body.person[1];
  const date = req.body.reservationdate;
  const message = req.body.message;
  const newbooking = new Booking({name,phone,person,date,time,message});
await newbooking.save();
  console.log(req.body);
  res.redirect('/');






});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





