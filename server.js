const express = require('express');
const path = require('path');
// const ejs = require('ejs');
const hbs = require('hbs');

//The express server
const server = express();

const buildPath = path.join(__dirname, "build");
// console.log('React app build path: ', buildPath);

server.use(express.static(buildPath, {index: 'fake_index.html'}) );
server.use("/static", express.static(path.join(buildPath, "static")));

// console.log(process.env);
let {NODE_ENV} = process.env;
const {REACT_APP_SERVER_URL, SERVER_URL} = process.env;
console.log('NODE_ENV: ', NODE_ENV);
if ( ! NODE_ENV ) {
    NODE_ENV = 'development';
}
console.log('NODE_ENV: ', NODE_ENV);
console.log('REACT_APP_SERVER_URL: ', REACT_APP_SERVER_URL, ', SERVER_URL:', SERVER_URL);
const BACKEND_URL = NODE_ENV === 'development' ? REACT_APP_SERVER_URL : SERVER_URL;
console.log('Backend URL: ', BACKEND_URL);

// server.set('view engine', 'ejs');
// server.engine('html', ejs.renderFile);
// server.set('views', 'build');

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
    res.render('index', {SERVER_URL});
    // res.sendFile(path.join(buildPath, 'index.html'));
});

//Serve the static files also
// server.use(express.static(buildPath));
// server.use("/static", express.static(path.join(buildPath, "static")));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});