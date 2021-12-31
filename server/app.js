require('dotenv').config({
	path: `${__dirname}/../.env.local`
});

const express = require('express');

const app = express();

const port = process.env.PORT || 80;

const server = app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})

require('./module/socket.io')(server)