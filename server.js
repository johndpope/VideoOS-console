const express = require("express");
const bodyParser = require('body-parser');
const app = express();

module.exports = (() => {
  app.use(express.static("build"));  
  app.use(bodyParser.json());
  app.use('/static', express.static(`${__dirname}/build/static`));

  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Content-Type", "application/json;charset=utf-8");
    // res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  app.get("/", (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(`${__dirname}/build/index.html`);
  });

  app.listen(process.env.OS_CONSOLE_SERVER_PORT || 8080, () => {
    console.log(`the os console hosting server is listening on port ${process.env.OS_CONSOLE_SERVER_PORT || 8080}`);  
  });
})();