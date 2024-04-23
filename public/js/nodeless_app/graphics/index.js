
require('../strawnode_modules/strawnode_modules/jquery-1.8.1.min.js') ;
require('../strawnode_modules/strawnode_modules/jquery.ba-hashchange.min.js') ;
require('../strawnode_modules/betweenjs.js') ;


//var Physics = require('../tests/physicstests.js') ;

var threeFX = require('./three/index.js', {viz3D:"viz3D"}) ;


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


MMAI.home.viz3D = function(cond, res){
	var viewport3D = $('.viewport3D') ; 
	threeFX.viz3D.enable(cond, viewport3D, res) ;
}

MMAI.home.getScrollPageIndex = function() {
	var ww = $(window) ;
	var top = ww.scrollTop() ;
	var h = ww.height() >> 1 ;
	var added = top + h ;
	var pages = $('.fullpage') ;
	var n = 0 ;
	// TODO here fix for inter pages 
	pages.each((i, el)=>{
		n = (added > $(el).position().top) ? i : n ;
	}) ;
	return n ;
}

MMAI.home.scroll = function(e) {
	
	var n = MMAI.home.getScrollPageIndex() ;
	var hier = Unique.getInstance().hierarchy ;
	var res = hier.currentStep ;
	
	res = res.depth == 1 ? res : res.parentStep ;
	var path = res.children[n].path ;
	var ch = hier.changer ;
	var hash = ch.getValue() ;
	
	if(path != hier.currentStep.path){
		ch.setValue('#'+path + '/') ;	
	}
	
}

module.exports = MMAI.func = {
	
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
	////////////////////////// LAZYLOADINGS OF IMAGES (NOT IN USE YET)
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
		
		//////////////////////////// GENERATE PAGE TEMPLATE IF DOES NOT EXIST YET
		if(!!!res.template){ 
			
			res.render('/content/section/' + res.sectionId) ; // JADE RENDER SECTION
			// HACK IN ORDER TO HAVE ALL TEMPLATES AS usual jQuery DOMElement Obj
			var saz = $('<div>') ;
			res.template.appendTo(saz) ;
			res.template = saz.find('.extractable') ;
			// END HACK

		}
		
		
		
		if(res.opening){
			//trace('OPENING', res.id)
			


			/////////////////////////// 404 SPECIAL CASE
			// 404 case
			/* if(res.id == '404'){
				res.template.appendTo(all) ;
				return res.ready() ;
			} */
			/////////////////////////// END 404 SPECIAL CASE


			////////////////////////// BASE HOME / OTHER SECTIONS VISUAL SETTINGS

			MMAI.home.scrollTo(0, .25) ;
			res.template.prependTo($('body')) ;
			$('.foot').removeClass("none") ;
			$('#mainloader').addClass('none') ;
			
			////////////////////////// END BASE HOME / OTHER SECTIONS VISUAL SETTINGS

			/////////////////////////////////////////////////////////////////////////////////////////// SPECIAL JS ACTIVITY

			//////////////////////////////////////// LAZY LOADINGS IF REQUIRED
			if(!res.userData.lazyLoaded){
				lazyload(e, true) ;
				res.userData.lazyLoaded = true ;
			}
			//////////////////////////////////////// END LAZY LOADINGS IF REQUIRED


			//////////////////////////////////////// VARIOUS TOGGLES IN PAGES
			if($('.paneltoggle').size()){
				
				MMAI.home.togglePanels_click = MMAI.home.togglePanels_click || function(e){
					e.preventDefault() ;
					e.stopPropagation() ;
					var toggler = $(e.currentTarget) ;
					toggler.data('hide')() ;
				} 

				$('.paneltoggle').each(function(i, el){
					var panels = $(el).find('.panel') ;
					var toggler = $(el).find('.paneltoggler') ;
					var BGs = $(el).find('.togglerBG') ;
					toggler.each(function(i, el){
						var panel = $(panels.get(i)) ;
						var BG = $(BGs.get(i)) ;
						var tog = $(el) ;
						tog.data('hide', function(){
							panels.addClass('none') ;
							panel.removeClass('none') ;
							var highlightedClass = BG.prop("tagName") == 'A' ? 'pureblueBG white' : 'purelightestblueBG' ; 
							BGs.removeClass(highlightedClass) ;
							BG.addClass(highlightedClass) ;
							trace(BG.prop("tagName"))
						})
					})
					toggler.on('click', MMAI.home.togglePanels_click) ;	
				})

			}

			//////////////////////////////////////// END VARIOUS TOGGLES IN PAGES


			/////////////////////////////////////////////////////////////////////////////////////////// SPECIAL JS ACTIVITY


			//////////////////////// FIRE READY EVENT
			res.ready() ;
			
		}else{
			
			//trace('CLOSING', res.id)


			////////////////////////// BASE HOME / OTHER SECTIONS VISUAL SETTINGS
			$('.foot').addClass("none") ;
			res.template.remove() ;
			////////////////////////// END BASE HOME / OTHER SECTIONS VISUAL SETTINGS


			/////////////////////////// 404 SPECIAL CASE
			// 404 case
			/* if(res.id == '404'){
				res.template.appendTo(continent) ;
				return res.ready() ;
			} */
			/////////////////////////// END 404 SPECIAL CASE
			

			//////////////////////// FIRE READY EVENT
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
		
		
		
		res.template = res.template || $('.extractable').removeClass('hidden') ;
		
		if(res.opening){
			
			//trace('OPENING', res.id) ;
			
			
			////////////////////////// BASE HOME / OTHER SECTIONS VISUAL SETTINGS
			MMAI.home.scrollTo(0, .25) ; // SHOULD JUST RESET SCROLL JUST IN CASE
			res.template.prependTo($('body')) ; // ADD TEMPLATE
			$('.foot').removeClass("none") ;
			
			////////////////////////// END BASE HOME / OTHER SECTIONS VISUAL SETTINGS
			
			//////////////////////////////////////////////////////// HOME SCROLL EVENT ADD
			//trace('should add SCROLL Evt') ;
			$(window).on( "scrollEnd", MMAI.home.scroll) ;
			//////////////////////////////////////////////////////// END HOME SCROLL EVENT ADD


			///////////////////////////////////// HOME 3D VIZUALIZATION
			MMAI.home.viz3D(true, res) ;
			$('.viewport3D').removeClass('hidden') ;
			$('#mainloader').removeClass('none') ;
			///////////////////////////////////// END HOME 3D VIZUALIZATION

			//////////////////////// FIRE READY EVENT
			res.ready() ;
			
		}else{

			

			//////////////////////////////////////////////////////// HOME SCROLL EVENT REMOVE
			// trace('should remove SCROLL Evt')
			$(window).off( "scrollEnd", MMAI.home.scroll) ;
			//////////////////////////////////////////////////////// END HOME SCROLL EVENT REMOVE

			///////////////////////////////////// HOME 3D VIZUALIZATION
			MMAI.home.viz3D(false, res) ;
			$('.viewport3D').addClass('hidden') ;
			$('#mainloader').addClass('none') ;
			///////////////////////////////////// END HOME 3D VIZUALIZATION
			
			////////////////////////// BASE HOME / OTHER SECTIONS VISUAL SETTINGS
			$('.foot').addClass("none") ;
			res.template.remove() ;
			////////////////////////// END BASE HOME / OTHER SECTIONS VISUAL SETTINGS
			

			//////////////////////// FIRE READY EVENT
			res.ready() ;
			
			// trace('CLOSING', res.id) ;
		}
	},
	various_toggles:various_toggles = function (cond, res){
		trace('launching toggles') ;
	},
	slideshow_wallet : slideshow_wallet = function(cond, res){
		
		var id = res.id ;
		
		var rt = $('.'+id) ;
		var slidenav = rt.find('.slidenav ol li a') ;
		var slideshow = rt.find('.slides') ;
		
		var slides = slideshow.find('.slide') ;
		
		
		slides.each(function(i, el){
			var li = $(el) ;
			var a = $(slidenav.get(i)) ;
			a.data('index', i) ;
			li.data('navitem', a) ;
			
		})
		
		var sl ;
		
		if(!MMAI.home.slideswallet){
			
			sl = MMAI.home.slideswallet = {} ;
			
			var commands = [] ;
			sl.cy = new Cyclic(commands) ;
			var TIME = 2000 ;

			sl.navgo = function(e){
				e.preventDefault() ;
				e.stopPropagation() ;
				
				var a = $(e.target) ;
				
				sl.halt() ;
				sl.cy.go(a.data('index')) ;
			}
			
			slides.each(function(i, el){
				
				var li = $(el) ;
				
				sl.cy.push(new Command(null, function(el, i){
					var c = this ;
					var li = $(el) ;
					var a = li.data('navitem') ;
					
					slidenav.removeClass('walletcolor') ;
					a.addClass('walletcolor') ;
					
					var tw = MMAI.home.walletslideTW ;
					if(tw && tw.isPLaying) tw.stop() ;
					
					tw = MMAI.home.walletslideTW = BJS.create({
						target: slideshow,
						to:{
							'left::%':-100 * a.data('index')
						},
						time:.45,
						ease:Expo.easeOut
					})
					
					tw.play() ;
					return this ;

				}, el, i))
			})
			
			sl.clear = function(){
				
				/* ////////////// SEEMS UNNECESSARY HERE 
				slides.css({
					// 'z-index':'1',
					// 'left':'15000px',
					// 'opacity':'0'
				}).removeClass('inited') ;
				*/
				
				slideshow.find('.flex-control-nav li').removeClass('active') ;
			}

			sl.enable = function(cond){
				
				
				if(cond){
					slidenav.on('click', sl.navgo) ;
				}else{
					slidenav.off('click', sl.navgo) ;
				}
				
			}
			

			
		
			sl.launch = function(){
				clearTimeout(sl.UID) ;
				sl.cy.next() ;
				
				sl.UID = setTimeout(sl.launch, TIME) ;
				
				sl.launched = true ;
			}

			
			sl.halt = function(){
				
				sl.UID = clearTimeout(sl.UID) ;
				sl.cy.go(0) ;
				sl.launched = false ;
				
			}
		}
		
		sl = MMAI.home.slideswallet ;
		
		if(cond){
			
			sl.clear() ;

			sl.enable(true) ;
			
			if(sl.cy.index == -1 ) sl.launch() ;
			else{
				sl.cy.index -- ;
				sl.launch() ;
			}
			
		}else{
			
			sl.clear() ;
			
			sl.enable(false) ;
			
			sl.halt() ;
			
		}
		
	},
	slide_partners: slide_partners = function(cond, res){
		
		var partners = $('.partnerscont') ;
		var tw ;
		if(!res.userData.tw_partners){
			res.userData.tw_partners = BJS.create({
				target:partners,
				to:{'margin-left::PX':-150*4},
				from:{'margin-left::PX':0},
				time:5,
				ease:Linear.easeOut
			}) ;
			res.userData.tw_partners.stopOnComplete = false ;	
		}
		tw = res.userData.tw_partners ;
		
		if(cond){
			tw.play() ;
		}else{
			tw.stop() ;
		}
		
	},
	////////////////////////// HOME SUB SECTIONS
	home_children_focus : home_children_focus = function(e){
		var res = e.target ;
		if(e.type == "focusIn"){
			
			trace(res.id) ;
			if(res.id == "purechain"){
				// $('.viewport3D').removeClass('fixed').addClass('abs') ;
			}else if(res.id == "purewallet"){
				MMAI.func.slideshow_wallet(true, res) ;
			}else if(res.id == "pureseries"){
				MMAI.func.slide_partners(true, res) ;
			}
			
			res.focusReady() ;
		}else{
			
			if(res.id == "purechain"){
				// $('.viewport3D').removeClass('abs').addClass('fixed') ;
			}else if(res.id == "purewallet"){
				MMAI.func.slideshow_wallet(false, res) ;
			}else if(res.id == "pureseries"){
				MMAI.func.slide_partners(false, res) ;
			}
			
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



