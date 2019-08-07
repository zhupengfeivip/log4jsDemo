const log4js = require('log4js');
const fs = require('fs');
//加入log4js
log4js.configure(require("./log4js"));
var logger = log4js.getLogger();


// Import the watching library
var watchr = require('watchr')
 
// Define our watching parameters
// var path = process.cwd()
var path = "log4js.js";
function listener (changeType, fullPath, currentStat, previousStat) {
    switch ( changeType ) {
        case 'update':
            //console.log('the file', fullPath, 'was updated', currentStat, previousStat)
            console.log('the file', fullPath, 'was updated');
            log4js.shutdown(function (err) {
                if ( err )  return console.log('shutdown failed on', path, 'with error', err)
                console.log('shutdown successful')
                //jsonConfig = JSON.parse(fs.readFileSync("log4js.js"));
                log4js.configure(jsonConfig);
                logger = log4js.getLogger();
            });
            
            break
        case 'create':
            //console.log('the file', fullPath, 'was created', currentStat)
            break
        case 'delete':
            //console.log('the file', fullPath, 'was deleted', previousStat)
            break
    }
}
function next (err) {
    if ( err )  return console.log('watch failed on', path, 'with error', err)
    console.log('watch successful on', path)
}
 
// Watch the path with the change listener and completion callback
var stalker = watchr.open(path, listener, next)

// Close the stalker of the watcher
//stalker.close()


let map = { a: 1, b: 2, c: 3 };

for (e in map) {
    logger.info(map.e);
    logger.debug(map[e]);
}

var c = 0;
function testLog() {
    logger.info(c++);
    logger.debug(c++);
}
setInterval(testLog, 1000);

//logger.log(map);