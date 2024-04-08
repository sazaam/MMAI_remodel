

var path = require('path') ;

var i18next = require('i18next') ;
var i18nextMiddleware = require('i18next-http-middleware') ;
//var Backend = require('i18next-node-fs-backend') ;

i18next
	//.use(Backend)
	.use(i18nextMiddleware.LanguageDetector)
	.init({
		debug:true,
		//backend: {
			//loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json')
		//},
		detection: {
			order: ['path', 'querystring', 'cookie'],
			// lookupHeaderRegex: /(([a-z]{2})-?([A-Z]{2})?)\s*;?\s*(q=([0-9.]+))?/gi,
			// lookupHeaderRegex: /^\/(\w{2,2})\//,
			lookupPathRegex: /^\/(\w{2,2})\//,
			caches: ['cookie']
		},
		saveMissing: false,
		fallbackLng: ['en'],
		
		//preload: ['en', 'ko']
	})


module.exports = {

  enable:()=>{
    
    return i18nextMiddleware.handle(i18next, {
      ignoreRoutes: ['/foo'], // or function(req, res, options, i18next) { /* return true to ignore */ }
      removeLngFromUrl: true
    })
	},
	i18next:i18next,
	i18nextMiddleware:i18nextMiddleware
}