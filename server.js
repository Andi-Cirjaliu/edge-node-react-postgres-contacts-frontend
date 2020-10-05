const express = require('express');
const path = require('path');
const hbs = require('hbs');

//The express server
const server = express();

const buildPath = path.join(__dirname, "build");
// console.log('React app build path: ', buildPath);

//Serve the static files also
server.use(express.static(buildPath, {index: 'fake_index.html'}) );
server.use("/static", express.static(path.join(buildPath, "static")));

// console.log(process.env);
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV: 'development';
console.log('NODE_ENV: ', NODE_ENV);

const {REACT_APP_SERVER_URL} = process.env;
console.log('REACT_APP_SERVER_URL: ', REACT_APP_SERVER_URL);

// server.set('view engine', 'hbs');
server.set('view engine', 'html');
server.engine('html', require('hbs').__express);
server.set('views', 'build' );

//Handle the health check
server.use('/health', (req, res, next) => {
    console.log('Health test...');
    res.status(200).json({"msg": "The application is running"});
  });

server.use('/*', (req, res) =>{
    console.log('requested ', req.url);
    // console.log('Set SERVER_URL to ', REACT_APP_SERVER_URL);
    res.render('index', {SERVER_URL: REACT_APP_SERVER_URL});
    // res.sendFile(path.join(buildPath, 'index.html'));
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});