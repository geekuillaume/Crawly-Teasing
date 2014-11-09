var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DBADDR + '/' + process.env.DBNAME, {
    user: process.env.DBUSER,
    pass: process.env.DBPASSWD
});

var Person = mongoose.model('Person', {
    email: String,
    websiteNb: String,
    budget: String
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "usecrawly.com");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.set('port', (process.env.PORT || 5000))

app.post('/savePerson', function(req, res) {
    Person.update({email: req.body.email}, req.body, {upsert: true}, function(err) {
        if (err)
        {
            console.error(err);
            return res.status(500).send(err);
        }
        res.send("Ok");
    })
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})

// var test = new Person({email: "coucou"});
// test.save(function (err) {
//     if (err)
//         return console.error(err);
//     console.log("saved");
// })
