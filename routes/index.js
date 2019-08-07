var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
const log4js = require('log4js');
var logger = log4js.getLogger(path.basename(__filename));


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/log', function (req, res, next) {
  logger.info("info");
  logger.debug("debug");
  logger.error("error");
  // delete require.cache['../log4js.js'];
  // logger.info(requireUncached("../log4js"));
  res.json(logger);
});

/**
 * 清除缓存请求文件
 * @param {*} module 
 */
function requireUncached(module){
  delete require.cache[require.resolve(module)]
  return require(module)
}

router.get('/reload', function (req, res, next) {
  log4js.shutdown(function (err) {
    if (err) return console.log('shutdown failed on', path, 'with error', err)
    console.log('shutdown successful')

  });

  // var jsonConfig = JSON.parse(fs.readFileSync("log4js.json"));
  // log4js.configure(jsonConfig);

  log4js.configure(requireUncached("../log4js"));
  logger = log4js.getLogger(path.basename(__filename));
  logger.info("info");
  logger.debug("debug");
  logger.error("error");
  res.json(logger);
});

module.exports = router;
