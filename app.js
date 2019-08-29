'use-strict'

const models = require('./models');
const fs = require('fs');
let express = require('express');
let bodyParser = require('body-parser');
var multer = require('multer');
const port = process.env.PORT || 3001;

let app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const upload = multer({
    dest: "images/"
  });

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/images', (req, res) => {
    models.Image.findOne({where:{id:2}}).then((image =>{
        let img = new Buffer(image.source).toString('base64');
        res.render('index', {image, img});
    }))
});

app.get('/images/daftar-gambar', (req, res) => {
    models.Image.findAll().then((images =>{
        images.forEach(image => {
            image.source = new Buffer(image.source).toString('base64');
        });
        res.render('daftar-gambar', {images});
    }))
});

app.get('/images/upload-gambar', (req, res) => {
    res.render('upload');
});

app.get('/images/update/:id', (req, res) => {
    models.Image.findOne({where:{id:parseInt(req.params.id)}}).then((image=>{
        res.render('update',{image});
    }))
    
});

app.post('/images/update/:id', (req, res) => {
    models.Image.update({name: req.body.nama}, {where:{id:parseInt(req.params.id)}}).then(() =>{
        models.Image.findAll().then((images =>{
            images.forEach(image => {
                image.source = new Buffer(image.source).toString('base64');
            });
            res.render('daftar-gambar', {images});
        }))
    })
});

app.get('/images/delete/:id', (req,res) => {
    models.Image.destroy({where:{id:parseInt(req.params.id)}}).then(()=>{
        models.Image.findAll().then((images =>{
            images.forEach(image => {
                image.source = new Buffer(image.source).toString('base64');
            });
            res.render('daftar-gambar', {images});
        }))
    })
});

app.post('/images/upload-gambar', upload.single('path'), (req, res) => {
    let type = req.file.mimetype.split('/')[0];
    //res.send(type);
    if (type !== 'image'){
        res.send("file is not an image!");
    } else {
        models.Image.create({
            name: req.body.nama,
            source: fs.readFileSync(req.file.path),
            createdAt : new Date(),
            updatedAt : new Date()
        }).then(() =>{
             //let img = new Buffer(image.source).toString('base64');
            //res.render('index', {image, img}); 
            models.Image.findAll().then((images =>{
                images.forEach(image => {
                    image.source = new Buffer(image.source).toString('base64');
                });
                res.render('daftar-gambar', {images});
            }))
        }) 
    }   
});

// app.get("/", express.static(path.join(__dirname, "./views")));


app.listen(port, () => console.log(`Example app listening on port ${3001}!`));