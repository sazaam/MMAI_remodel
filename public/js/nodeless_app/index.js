
(function(){

var express = require('Express') ;

var router = require('./router') ;
 
var app = express() ;

app
	.set('view engine', 'jade')
	.set('views', '/js/jade/')
	.set('address', {
		home:'home',
		base:'undefined' !== typeof __parameters ? __parameters.base : location.protocol + '//' + location.host + location.pathname,
		useLocale:true,
		defaultLocale:document.documentElement.getAttribute('lang')
}) ;

app
	.listen('JSAddress', function(e){
		
		console.log(window.Data) ;
		
		app
			.createClient()
			.get('/', router(window.Data))
			.initJSAddress() ;
			
	})
	.listen('load', function(e){
		// PAGE LOAD
		app.discard('load', arguments.callee) ;
		
		console.log('window Fully Loaded') ;
	}) ;

})()





	
