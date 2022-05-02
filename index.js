const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { open } = require('sqlite');

const sqlite3 = require('sqlite3');

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

const messages = [
    'hey',
    'hello'
]

app.get('/', function(req, res) {
    res.render("Home", { messages })
});

app.post('/message', (req, res) => {
    const messageText = req.body.messageText
    messages.push(messageText)
    res.redirect('/')
});

const setup = async () => {
    const db = await dbPromise
    await db.migrate()
    app.listen(PORT, () => {
    console.log(`App Running at port ${PORT}`)
});
}
setup();


