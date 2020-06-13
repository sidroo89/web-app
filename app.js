const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'));
require('dotenv').config();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port=process.env.PORT || 3000;



app.get('/', (req, res) =>{
res.render('index');
})

    

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = process.env.MONGOLAB_URI;

const articleSchema = new mongoose.Schema({
    title: String,
    articleText: String,
    fullName: String
});
    
const Article = mongoose.model('database', articleSchema);



mongoose.connect(uri, {  useNewUrlParser: true,  useUnifiedTopology: true}).then(() => 
{  console.log('MongoDB Connected…')}).catch(err => console.log(err))






app.post('/addArticle', function (req, res) {
    // res.send('Got a POST request')
 const myData = new Article(req.body);
 myData.save()
 .then(item => {
 res.send(`<h2>item with title:<span><i>'${req.body.title}'</i>       </span> saved to database</h2>  
 <a style='font-size:25px' href='/..'>Home page</a>`);
 })
 .catch(err => {
 res.status(400).send('unable to save to database');
});})


app.get('/articles', function (req, response) {
    Article.find({}, { _id: 0, title: 1, articleText: 1, fullName: 1 }).limit(5).exec(function (err, articles) {
    if (err) return console.error(err);
    response.render('articles', { articles: articles });
   })
})


app.listen(port, () => console.log('Example app listening on port 3000!'));