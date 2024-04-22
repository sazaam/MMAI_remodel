
let http = require('http') ;
let colors = require('colors') ;
let port = process.env.PORT || '80' ;
let server ;

module.exports = {
  launchServer: (app) =>{

    app.set('port', port) ;
    
    server = http.createServer(app) ;
  
    server.on('listening', () => {
      console.log('-->', colors.yellow.bold('Listening on ' + port)) ;
      console.log(colors.blue.bold('http://localhost:'+port+'/')) 
    }) ;
    
    server.listen(port) ;
  },
  server:server
}
