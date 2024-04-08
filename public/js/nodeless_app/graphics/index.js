
require('../strawnode_modules/strawnode_modules/jquery-1.8.1.min.js') ;
require('../strawnode_modules/strawnode_modules/jquery.ba-hashchange.min.js') ;
require('../strawnode_modules/betweenjs.js') ;


//var Physics = require('../tests/physicstests.js') ;


require('../events/index.js', {arrows:1, touch:{mobile:1}}) ;


// retrieve lang from document 
window.lang = $('html').attr('lang') ;

module.exports = {
	
	////////////////////////// LANGUAGES
	langchange: langchange = function(e){
		e.preventDefault() ;
		e.stopPropagation() ;
		
		var tg = $(this) ;
		var a = $(tg.children(0)[0]) ;
		
		/* 
		var req = new AjaxRequest().load('/en/products/', function(jxhr, req){
			
			trace(req.response)
			
		}) ;
		
		
		return ;
		 */
		
		var language = a.attr('lang') ;
		
		if(language == window.lang) return ;
		var req = new AjaxRequest().load('/?lng='+language+'', function(jxhr, req){
			// console.log(req.response)
			
			var h = location.hash.replace(/^#\/\w{2}/, function(l){
				
				// trace(arguments)
				return '#/'+language+'' ;
			}) ;
			
			document.location.hash = h ;
			
			document.location.reload() ;
			
		}, 'POST' ) /* */
		
		// var h = location.hash.replace(/^#\/\w{2}/, function(l){
			
			// trace(arguments)
			// return '#/'+language+'' ;
		// }) ;
		// window.lang = language ;
	},
	languages: languages = function(e, cond){
		
		if(cond){
			$('.lang').on('click', langchange)
		}else{
			$('.lang').off('click', langchange)
		}
	},
	
	lazyload:lazyload = function(e){
		var res = e.target ;
		var id = res.id ;
		
		var tg = $('#' + id) ;

		var lazys = tg.find('[lazy]') ;
		lazys.each(function(i, el){
			var el = $(el) ;
			
			el.css({'background-image': 'url(' + el.attr('lazy') + ')'}) ;
		})
		

	},
	
	////////////////////////// FOCUS
	top_section_focus : top_section_focus = function(e){
		var res = e.target ;
		var id = res.id ;
				
		if(e.type == 'focusIn'){
			
			res.focusReady() ;
			
		}else{
			
			res.focusReady() ;

		}

	},
	
	////////////////////////// TOGGLE
	top_section_toggle : top_section_toggle = function(e){
		
		var res = e.target ;
		
		var noID 									= res.id == '' ;
		var id 										= noID ? res.parentStep.id : res.id ;
		var ind 									= noID ? res.parentStep.index : res.index ;
		
		id = id == '@' ? 'home' : id ;
		var target_section ;
		
		if(!!!res.template){
			trace('/content/section/' + res.sectionId)
			res.render('/content/section/' + res.sectionId) ;
		}
		
		target_section = res.template ;
		
		
		var all 							= $('.all') ;
		var continent 						= $('.continent') ;
		
		
		if(res.opening){
			trace('OPENING', res.id)
			
			// 404 case
			if(res.id == '404'){
				target_section.appendTo(all) ;
				return res.ready() ;
			}
			
			
			target_section.appendTo(all) ;

			if(!res.userData.lazyLoaded){
				lazyload(e, true) ;
				res.userData.lazyLoaded = true ;
			}

			res.ready() ;
			
		}else{
			trace('CLOSING', res.id)
			// 404 case
			if(res.id == '404'){
				target_section.appendTo(continent) ;
				return res.ready() ;
			}


			target_section.appendTo(continent) ;
			res.ready() ;
		
		}

	}
}



