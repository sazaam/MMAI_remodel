
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
MMAI.home.scrollTo = MMAI.home.scrollTo || function(top, time, cb){
	BetweenJS.create({
		target:$('html'),
		to:{
			scrollTop:top
		},
		time:time,
		ease:Expo.easeOut,
		onComplete:cb
	}).play() ;	
} 
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
		
		if(!!!res.template){
			trace('/content/section/' + res.id) ;
			res.render('/content/section/' + res.sectionId) ;
			
			var saz = $('<div>') ;
			res.template.appendTo(saz) ;
			res.template = saz.find('.fullpage') ;
			trace('dasdas', res.template)
		}
		
		
		
		target_section = res.template ;
		
		
		if(res.opening){
			trace('OPENING', res.id)
			
			// 404 case
			/* if(res.id == '404'){
				target_section.appendTo(all) ;
				return res.ready() ;
			} */
			
			MMAI.home.scrollTo(0, .25) ;
			target_section.prependTo($('body')) ;
			$('.foot').removeClass("none") ;
			
			
			if(!res.userData.lazyLoaded){
				lazyload(e, true) ;
				res.userData.lazyLoaded = true ;
			}
			/* 
			BJS.create({
				target:target_section,
				to:{
					opacity:100
				},
				from:{
					opacity:0
				},
				time:.45,
				ease:Expo.easeOut,
				onComplete:function(){
					
					res.ready() ;
					$('.foot').removeClass("none") ;
				}
			}).play() ;
			 */
			res.ready() ;
			
		}else{
			
			
			trace('CLOSING', res.id)
			$('.foot').addClass("none") ;
			target_section.remove() ;
			
			// 404 case
			/* if(res.id == '404'){
				target_section.appendTo(continent) ;
				return res.ready() ;
			} */
			
			/* $('.foot').addClass("none") ;
			BJS.create({
				target:target_section,
				to:{
					opacity:0
				},
				time:.45,
				ease:Expo.easeOut,
				onComplete:function(){
					res.ready() ;
					
					target_section.remove() ;
				}
			}).play() ;
			 */
			res.ready() ;
		
		}

	},
	////////////////////////// HOME SECTION
	home_focus : home_focus = function(e){
		var res = e.target ;
		if(e.type == "focusIn"){
			res.focusReady() ;
			$(window).trigger("scrollEnd") ;
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
		
		res.template = res.template || $('.fullpage') ;
		var target_section = res.template ;
		
		
		if(res.opening){
			
			trace('OPENING', res.id) ;
			
			MMAI.home.scrollTo(0, .25) ;
			
			res.template.prependTo($('body')) ;
			$('.foot').removeClass("none") ;
			$(window).on( "scrollEnd", MMAI.home.scroll) ;
			
			/* BJS.create({
				target:target_section,
				to:{
					opacity:100
				},
				from:{
					opacity:0
				},
				time:.45,
				ease:Expo.easeOut,
				onComplete:function(){
					
					res.ready() ;
					$('.foot').removeClass("none") ;
				}
			}).play() ;
			 */
			
			res.ready() ;
			
		}else{
			$('.foot').addClass("none") ;
			$(window).off( "scrollEnd", MMAI.home.scroll) ;
			
			
			/* $('.foot').addClass("none") ;
			BJS.create({
				target:target_section,
				to:{
					opacity:0
				},
				time:.45,
				ease:Expo.easeOut,
				onComplete:function(){
					
					res.ready() ;
					target_section.remove() ;
				}
			}).play() ;
			 */
			
			res.template.remove() ;
			
			res.ready() ;
			
			trace('CLOSING', res.id) ;
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
				
				MMAI.home.scrollTo($(page).position().top, .45, function(){
					res.ready() ;
				}) ;
				
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



