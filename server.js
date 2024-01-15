// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/studentdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Set up view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use body-parser middleware to parse JSON and url-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const students = await Student.find();
    res.render('index', { students });
});

// Handle student deletion
app.delete('/delete/:id', async (req, res) => {
    const studentId = req.params.id;

    try {
        await Student.findByIdAndDelete(studentId);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.post('/save', async (req, res) => {
    const { rollno, name, degree, city, studentId } = req.body;
  
    try {
      if (studentId) {
        // Update existing student
        const student = await Student.findByIdAndUpdate(studentId, {
          rollno,
          name,
          degree,
          city
        }, { new: true });
        res.redirect('/');
      } else {
        // Create new student
        const student = new Student({ rollno, name, degree, city });
        await student.save();
        res.redirect('/');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving student data');
    }
  });

app.listen(PORT, () => console.log(`Server on port No: ${PORT}`));
