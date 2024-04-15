
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
			//trace('dasdas', res.template)
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
		
		res.template = res.template || $('.fullpage').removeClass('hidden') ;
		var target_section = res.template ;
		
		
		if(res.opening){
			
			trace('OPENING', res.id) ;
			
			MMAI.home.scrollTo(0, .25) ;
			
			res.template.prependTo($('body')) ;
			$('.foot').removeClass("none") ;
			$(window).on( "scrollEnd", MMAI.home.scroll) ;
			
			MMAI.home.viz3D(true, res) ;
			$('.viewport3D').removeClass('hidden') ;
			$('.downloadwallet').removeClass('none') ;
			
			
			res.ready() ;
			
		}else{
			
			$('.foot').addClass("none") ;
			$(window).off( "scrollEnd", MMAI.home.scroll) ;
			
			MMAI.home.viz3D(false, res) ;
			$('.downloadwallet').addClass('none') ;
			$('.viewport3D').addClass('hidden') ;
			
			
			res.template.remove() ;
			
			res.ready() ;
			
			trace('CLOSING', res.id) ;
		}
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
				
				slides.css({
					// 'z-index':'1',
					// 'left':'15000px',
					// 'opacity':'0'
				}).removeClass('inited') ;
				
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
			if(res.id == "purewallet"){
				MMAI.func.slideshow_wallet(true, res) ;
			}else if(res.id == "pureseries"){
				MMAI.func.slide_partners(true, res) ;
			}
			
			res.focusReady() ;
		}else{
			
			if(res.id == "purewallet"){
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



