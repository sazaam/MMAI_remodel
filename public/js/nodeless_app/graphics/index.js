
require('../strawnode_modules/strawnode_modules/jquery-1.8.1.min.js') ;
require('../strawnode_modules/strawnode_modules/jquery.ba-hashchange.min.js') ;
require('../strawnode_modules/betweenjs.js') ;


//var Physics = require('../tests/physicstests.js') ;


require('../events/index.js', {
	resize:0,
	arrows:0, 
	touch:{
		mobile:0,
		pc:0
	},
	scroll:1
}) ;


// retrieve lang from document 
window.lang = $('html').attr('lang') ;

window.MMAI = MMAI = {
	home:{}
} ;

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
	
	////////////////////////// TOP SECTIONS
	top_section_focus : top_section_focus = function(e){
		var res = e.target ;
				
		if(e.type == 'focusIn'){
			res.focusReady() ;
		}else{
			res.focusReady() ;
		}

	},
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

	},
	////////////////////////// HOME SECTION
	home_focus : home_focus = function(e){
		var res = e.target ;
		if(e.type == "focusIn"){
			res.focusReady() ;
		}else{
			res.focusReady() ;
		}
	},
	home_toggle : home_toggle = function(e){
		var res = e.target ;
		
		MMAI.home.getScrollPageIndex = MMAI.home.getScrollPageIndex || function() {
			var ww = $(window) ;
			var top = ww.scrollTop() ;
			var h = ww.height() >> 1 ;
			var added = top + h ;
			var pages = $('.fullpage') ;
			var n = 0 ;
			pages.each((i, el)=>{
				n = (added > $(el).position().top) ? i : n ;
			}) ;
			return n ;
		}
		
		MMAI.home.scroll = MMAI.home.scroll || function(e, top) {
			
			var n = MMAI.home.getScrollPageIndex() ;
			
			var path = res.children[n].path ;
			var hier = Unique.getInstance().hierarchy ; 
			var ch = hier.changer ;
			var hash = ch.getValue() ;
			
			if(path != hier.currentStep.path){
				ch.setValue('#'+path + '/') ;	
			}
			
		}
		
		if(res.opening){
			
			trace('OPENING', res.id) ;
			
			$(window).on( "scrollEnd", MMAI.home.scroll) ;
			
			res.ready() ;
		}else{
			
			$(window).off( "scrollEnd", MMAI.home.scroll) ;
			
			trace('CLOSING', res.id) ;
			res.ready() ;
		}
	},
	
	////////////////////////// HOME SUB SECTIONS
	home_children_focus : home_children_focus = function(e){
		var res = e.target ;
		if(e.type == "focusIn"){
			
			trace(res.id) ;
			
			res.focusReady() ;
		}else{
			
			//trace("Focusout >>", res.id) ;
			
			res.focusReady() ;
		}
	},
	home_children_toggle : home_children_toggle = function(e){
		var res = e.target ;
		
		if(res.opening){
			//trace('OPENING SUB', res.id) ;
			
			var parent = res.parentStep ;
			var ind = parent.getIndexOfChild(res) ;
			
			var pages = $('.fullpage') ;
			var page = pages[ind] ;
			
			var n = MMAI.home.getScrollPageIndex() ;
			
			if(n != ind){
				BetweenJS.create({
					target:$('html'),
					to:{
						scrollTop:$(page).position().top
					},
					time:.45,
					ease:Expo.easeOut,
					onComplete:function(){
						res.ready() ;
					}
				}).play() ;
				trace('should animate')
			}else{
				res.ready() ;	
			}
			
			
		}else{
			//trace('CLOSING SUB', res.id) ;
			res.ready() ;
		}
	}
}



