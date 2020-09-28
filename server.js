const express = require('express');
const path = require('path');

const server = express();

const buildPath = path.join(__dirname, "build");
console.log('React app build path: ', buildPath);
server.use(express.static( buildPath));

//Handle the health check
server.use('/health', (req, res, next) => {
    console.log('Health test...');
    res.status(200).json({"msg": "The application is running"});
  });

server.use("/*", (req, res) =>{
    console.log('requested ', req.url);
    res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});