const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');

const dbPromise = open({
    filename: 'data.db',
    driver: sqlite3.Database
  })

const app = express();

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const PORT = process.env.PORT || 3025;

app.use(express.static('public'));

app.get('/', async (req, res) => {
    const db = await dbPromise;
    const messages = await db.all('SELECT * FROM Message;')
    res.render("Home", { messages })
});

app.get('/register', async (req, res) => {
    res.render('register')
})

app.post('/message', async (req, res) => {
    const db = await dbPromise
    const messageText = req.body.messageText
   await db.run('INSERT INTO Message (text) VALUES (?);', messageText)
    res.redirect('/')
});

app.post('/register', async (req, res) => {
const details = {
    name,
    email,
    password,
    confirmPassword
} = req.body;

 console.log(details)
 
const passwordHash = await bcrypt.hash(password, 10)
console.log(passwordHash)
res.redirect('/')
})

const setup = async () => {
    const db = await dbPromise;
    await db.migrate();
    app.listen(PORT, () => {
    console.log(`App Running at port ${PORT}`)
});
}
setup();


