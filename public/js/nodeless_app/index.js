


(function(){

var isWallet = !!(module.params.wallet) ;
trace(module)
var express = require('Express') ;

var router = require('./router') ;
 
var app = express() ;

app
	.set('view engine', 'jade')
	.set('views', '/js/jade/')
	.set('address', {
		home:isWallet?'wallet' : 'home',
		base:'undefined' !== typeof __parameters ? __parameters.base : location.protocol + '//' + location.host + location.pathname,
		useLocale:false,
		defaultLocale:document.documentElement.getAttribute('lang')
}) ;

app
	.listen('JSAddress', function(e){
		
		trace(window.Data) ;		

		app
			.createClient()
			.get('/', router(window.Data))
			.initJSAddress() ;
			
	})
	.listen('load', function(e){
		// PAGE LOAD
		app.discard('load', arguments.callee) ;
		
		trace('window Fully Loaded') ;
	}) ;

})()





	
