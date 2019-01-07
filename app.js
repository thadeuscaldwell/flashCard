const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

let db
let triviaCards = []
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}))

MongoClient.connect('mongodb://Thadeusc:3501Bogan@ds117128.mlab.com:17128/flashcard', (err, database) => {
    if (err) return console.log(err)
    db = database.db('flashcard')
    console.log("listening on port 8080")
})
app.get('/', function (req, res) {
    let cursor = db.collection("flashcard").find().toArray(function (err, results) {
        if (err) return console.log(err)
        triviaCards = results
        console.log(results)
        res.render('index.pug', {
            flashcard: results
        })
    })
    app.get('/flashcard', (req, res) => {
        res.send(triviaCards)
    })
})
app.get('/quesCard', (req, res) => {
    res.render('quesCard.pug')
})


app.post('/flashcard', (req, res) => {
    // console.log(req.body)
    db.collection('flashcard').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('save to database :)')
        res.redirect('/')
    })

    // $(".card").click(function () {
    //     $(this).find(".cardInner").toggleClass("flipped");
    // });
    //quesCard page//////////////////////////////////////////////////////////
    // app.get('/', function (req, res) {
    //     let cursor = db.collection("flashcard").find().toArray(function (err, results) {
    //         if (err) return console.log(err)
    //         console.log(results)
    //         res.render('index.pug', {flashcard: results}) 
    //         })
    //     })

    // app.post('/flashcard', (req, res) => {
    //     // console.log(req.body)
    //     db.collection('flashcard').save(req.body, (err, result) => {
    //         if (err) return console.log(err)

    //         console.log('save to database :)')
    //         res.redirect('/')
    //     })
    // })
})
app.listen(8080, function () {})