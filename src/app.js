require("dotenv").config();
const express = require('express');
const https = require('http');
const cors = require('cors');
const cookieParse = require('cookie-parser');
const routerApi = require("./routes/router.routes");
const routerVistas = require('./routes/vistas.routes');
const path = require('path')
const app = express();
const port = process.env.APP_PORT || 3000 ;

//Vistas
//app.set("views", __dirname + "./views");

app.set("views", "src/views");
app.set("view engine", "ejs");

app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParse());


app.use('/',routerVistas);
routerApi(app);

https.createServer(app).listen(port, function (req, res) {
    console.log(`Servidor corriendo en puerto: ${port}`);  
});