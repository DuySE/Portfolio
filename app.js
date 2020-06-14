const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.set('view engine', 'pug');

app.use('/public/css', express.static(__dirname + '/public/css'));

app.use('/images', express.static(__dirname + '/images'));


app.get('/', (req, res) => {
    try {
        let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        res.render('index', data);
    } catch (err) {
        throw (err);
    }
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res) => {
    try {
        let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        let project = data.projects.filter(project => project.id === parseInt(req.params.id));
        res.render('project', project[0]);
    } catch (err) {
        throw (err);
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
