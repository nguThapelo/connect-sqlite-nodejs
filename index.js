const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

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

app.listen(PORT, () => {
    console.log(`App Running at port ${PORT}`)
});