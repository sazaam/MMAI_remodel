
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
var toggle_on = 0 ;
MMAI.home.patentsToggle = function(cond){
	var zone = $('.patentszone') ;
	
	if(cond){
		zone.removeClass('none') ;
	}else{
		zone.addClass('none') ;
	}
	toggle_on = cond ;
}

MMAI.home.patents = function(e){
	MMAI.home.patentsToggle(!toggle_on) ;
}

MMAI.home.scrollTo = function(top, time, cb){
	var args = [].concat.apply(arguments, arguments);
	args = args.splice(1, args.length);
	
	top = args.shift() ;
	time = args.shift() ;
	cb = args.shift() || function(){} ;
	
	BetweenJS.create({
		target:$('body'),
		to:{
			scrollTop:top
		},
		time:time,
		ease:Expo.easeOut,
		onComplete:cb,
		onCompleteParams:args
	}).play() ;	
}


MMAI.home.viz3D = function(cond, res, cb, args){
	var viewport3D = $('.viewport3D') ; 
	trace('VIZ3D :: ENABLED', cond) ;
	return threeFX.viz3D.enable(cond, viewport3D, res, cb, args) ;
}

MMAI.home.getScrollPageIndex = function() {
	var ww = $(window) ;
	var wh = ww.height() >> 1 ;
	var body = $('body') ;
	// var body = $('html') ;
	var top = body.scrollTop() ;
	var pages = $('.fullpage') ;
	var n = 0 ;
	// TODO here fix for inter pages
	
	pages.each((i, el)=>{
		var h = $(el).height() >> 1 ;
		var added = top + h ;
		var pagetop = $(el).offset().top + top ;
		n = (added > pagetop) ? i : n ;
	}) ;
	// trace(n)
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
			$('#global_'+res.name).addClass('purecolor') ;
			res.focusReady() ;
		}else{
			$('#global_'+res.name).removeClass('purecolor') ;
			res.focusReady() ;
		}

	},
	top_section_toggle : top_section_toggle = function(e){
		
		var res = e.target ;
		
		
		
		
		
		if(res.opening){
			var togglein = function(){
					
				////////////////////////// BASE HOME / OTHER SECTIONS VISUAL SETTINGS
				var ww = $(window) ;
				var body = $('body') ;
				
				var top = body.scrollTop() ;
				
				res.template.prependTo($('.universe')) ;
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
				
				
				//////////////////////////////////////// END VARIOUS TOGGLES IN PAGES


				/////////////////////////////////////////////////////////////////////////////////////////// SPECIAL JS ACTIVITY
				if(!res.sectionData.hidefrommenu){


					MMAI.func.various_toggles(true, res) ;
					MMAI.func.toggle_patents(true, res) ;



					if(!MMAI.home.viz3Drunning) {
						MMAI.home.SCI = MMAI.home.viz3D(true, res, function(cond){
							
							this.morphInto(res.index) ;
							
						}, [true]) ;
						MMAI.home.viz3Drunning = true ;
						$('#mainloader').removeClass('none') ;
					}else{
						MMAI.home.SCI.morphInto(res.index) ;
					}

				}else{



				}
				
				
				
				//////////////////////// FIRE READY EVENT
				// if(!top){
					// trace("RESREADY Top=0")
				res.ready() ;	
				// }
			}
			
			
			
			trace('OPENING', res.id)
			
			//////////////////////////// GENERATE PAGE TEMPLATE IF DOES NOT EXIST YET
			if(!!!res.template){ 
				
				// JADE RENDER SECTION
				$('#mainloader').removeClass('none') ;
				res.render('/content/section/' + res.sectionId, {}, function(){
					
					// HACK IN ORDER TO HAVE ALL TEMPLATES AS usual jQuery DOMElement Obj
					var saz = $('<div>') ;
					res.template.appendTo(saz) ;
					res.template = saz.find('.extractable') ;
					
					
					// END HACK	
					
					togglein() ;
				}) ; 
				
				
			}else{
				togglein() ;
			}
		
		
		
		
			


			/////////////////////////// 404 SPECIAL CASE
			// 404 case
			/* if(res.id == '404'){
				res.template.appendTo(all) ;
				return res.ready() ;
			} */
			/////////////////////////// END 404 SPECIAL CASE
			
			
			
		}else{
			
			//trace('CLOSING', res.id)


			////////////////////////// BASE HOME / OTHER SECTIONS VISUAL SETTINGS
			
			if(!res.sectionData.hidefrommenu){
				MMAI.func.various_toggles(false, res) ;
				MMAI.func.toggle_patents(false, res) ;
			}
			
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
		
		
		
		
		
		if(res.opening){
			
			res.template = res.template || $('.extractable').removeClass('hidden') ;
			// trace(res.template)
			
			trace('OPENING', res.id) ;
			
			////////////////////////// BASE HOME / OTHER SECTIONS VISUAL SETTINGS
			
			
			
			res.template.prependTo($('.universe')) ; // ADD TEMPLATE
			
			
			////////////////////////// END BASE HOME / OTHER SECTIONS VISUAL SETTINGS
			
			//////////////////////////////////////////////////////// HOME SCROLL EVENT ADD
			//trace('should add SCROLL Evt') ;
			
			//////////////////////////////////////////////////////// END HOME SCROLL EVENT ADD

			
			///////////////////////////////////// HOME 3D VIZUALIZATION
			if(!MMAI.home.viz3Drunning) {
				MMAI.home.SCI = MMAI.home.viz3D(true, res, function(){
					this.morphInto(0) ;
				}, [true]) ;
				MMAI.home.viz3Drunning = true ;
				$('#mainloader').removeClass('none') ;
			}else{
				MMAI.home.SCI.morphInto(0) ;
			}
			
			$('.foot').removeClass("none") ;
			// $('.viewport3D').removeClass('hidden') ;
			///////////////////////////////////// END HOME 3D VIZUALIZATION
			
			
			
			//////////////////////////////////////////////////////// EVENTS
			//////////////////////// MAIN SCROLL EVENT
			$(window).on( "scrollEnd", MMAI.home.scroll) ;
			
			// $('.page.purechain').on('click', MMAI.home.SCI.clk) ;
			
			//////////////////////// FIRE READY EVENT
			res.ready() ;	
		
			
			
		}else{

			

			//////////////////////////////////////////////////////// HOME SCROLL EVENT REMOVE
			// trace('should remove SCROLL Evt')
			$(window).off( "scrollEnd", MMAI.home.scroll) ;
			
			// $('.page.purechain').off('click', MMAI.home.SCI.clk) ;
			
			//////////////////////////////////////////////////////// END HOME SCROLL EVENT REMOVE

			///////////////////////////////////// HOME 3D VIZUALIZATION
			// MMAI.home.viz3D(false, res) ;
			// $('.viewport3D').addClass('hidden') ;
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
			
		MMAI.home.togglePanels_click = MMAI.home.togglePanels_click || function(e){
			e.preventDefault() ;
			e.stopPropagation() ;
			var toggler = $(e.currentTarget) ;
			toggler.data('hide')() ;
		} 
		
		if(cond){
			
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
					})
				})
				toggler.on('click', MMAI.home.togglePanels_click) ;	
			}) ;
			
		}else{
			
			$('.paneltoggle').each(function(i, el){
				var toggler = $(el).find('.paneltoggler') ;
				toggler.off('click', MMAI.home.togglePanels_click) ;	
			}) ;
			
		}
		
	},
	slideshow_wallet : slideshow_wallet = function(cond, res){
		
		var id = res.id ;
		var name = res.name ;
		var rt = $('#'+ name +' .'+id) ;
		
		var slidenav = rt.find('.slidenav ol li a') ;
		var slideshow = rt.find('.slides') ;
		
		var slides = slideshow.find('.slide') ;
		
		
		var next = rt.find('.arrowright') ;
		var prev = rt.find('.arrowleft') ;
		
		
		
		
		
		
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
			var TIME = 8000 ;

			sl.arrowgo = function(e){
				e.preventDefault() ;
				e.stopPropagation() ;
				
				var a = $(e.currentTarget) ;
				
				/////////////////////////////// UNCOMMENT TO CANCEL LOOP ON CLICK (if there is an active loop)
				
				if(sl.cy.index == -1){
					sl.cy.index = 0 ;
				}
				
				if(a.hasClass('arrowright')){
					if(sl.cy.index < sl.cy.commands.length - 1) sl.cy.next() ;
				}else{
					if(sl.cy.index > 0) sl.cy.prev() ;
				}
				
			}
			
			sl.navgo = function(e){
				e.preventDefault() ;
				e.stopPropagation() ;
				
				var a = $(e.target) ;
				
				/////////////////////////////// UNCOMMENT TO CANCEL LOOP ON CLICK (if there is an active loop)
				// sl.halt() ;
				
				sl.cy.go(a.data('index')) ;
			}
			
			slides.each(function(i, el){
				
				var li = $(el) ;
				
				sl.cy.push(new Command(null, function(el, i){
					var c = this ;
					var li = $(el) ;
					var a = li.data('navitem') ;
					var n = a.data('index') ;
					slidenav.removeClass('walletcolor') ;
					a.addClass('walletcolor') ;
					
					if(n == 0){
						prev.find('.inside').removeClass('blackBG').addClass('foggyBG') ;
					}else{
						prev.find('.inside').addClass('blackBG').removeClass('foggyBG') ;
					}
					if(n == slides.length - 1){
						next.find('.inside').removeClass('blackBG').addClass('foggyBG') ;
					}else{
						next.find('.inside').addClass('blackBG').removeClass('foggyBG') ;
					}
					
					var tw = MMAI.home.walletslideTW ;
					if(tw && tw.isPLaying) tw.stop() ;
					
					var xxx = -100 * a.data('index') ;
					
					tw = MMAI.home.walletslideTW = BJS.create({
						target: slideshow,
						to:{
							'left::%': xxx
						},
						time:.45,
						ease:Expo.easeOut
					})
					
					tw.play() ;
					return this ;

				}, el, i))
			})
			
			sl.clear = function(){
				// something if clear needed here
			}

			sl.enable = function(cond){
				
				
				if(cond){
					slidenav.on('click', sl.navgo) ;
					next.on('click', sl.arrowgo) ;
					prev.on('click', sl.arrowgo) ;
				}else{
					slidenav.off('click', sl.navgo) ;
					next.off('click', sl.arrowgo) ;
					prev.off('click', sl.arrowgo) ;
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
			
			///////////////////// uncomment to Launch Loop By Default
			/*
			if(sl.cy.index == -1 ) sl.launch() ;
			else{
				sl.cy.index -- ;
				sl.launch() ;
			}
			*/
		}else{
			
			sl.clear() ;
			
			sl.enable(false) ;
			
			sl.halt() ;
			
		}
		
	},
	slideshow_series : slideshow_series = function(cond, res){
		
		var id = res.id ;
		var name = res.name ;
		var rt = $('#'+ name) ;
		
		
		var slidewholenav = rt.find('.eco ol') ;
		var slidenav = rt.find('.eco ol li a') ;
		var slideshow = rt.find('.slides') ;
		
		var slides = slideshow.find('.slide') ;
		
		slides.each(function(i, el){
			var li = $(el) ;
			var a = $(slidenav.get(i)) ;
			
			a.data('index', i) ;
			li.data('navitem', a) ;
		})
		
		
		var sl ;
		
		if(!MMAI.home.slidesseries){
			
			sl = MMAI.home.slidesseries = {} ;
			
			var commands = [] ;
			sl.cy = new Cyclic(commands) ;
			var TIME = 8000 ;

			sl.arrowgo = function(e){
				
				e.preventDefault() ;
				e.stopPropagation() ;
				
				var a = $(e.currentTarget) ;
				
				if(a.hasClass('up')){
					if(sl.cy.index > 0) sl.cy.prev() ;
				}else{
					if(sl.cy.index == -1){ sl.cy.index = 0 }
					if(sl.cy.index < sl.cy.commands.length - 1) sl.cy.next() ;
				}
				
			}
			
			sl.navgo = function(e){
			
				e.preventDefault() ;
				e.stopPropagation() ;
				
				var a = $(e.currentTarget) ;
				
				/////////////////////////////// UNCOMMENT TO CANCEL LOOP ON CLICK (if there is an active loop)
				// sl.halt() ;
				
				sl.cy.go(a.data('index')) ;
			}
			
			var firstblock = $(slides.get(0)) ;
			var other = firstblock.find('.othertextes') ;
			var bh = other.height() ;
			
			var up = rt.find('.up').data('way', 'up') ;
			var down = rt.find('.down').data('way', 'down') ;
			
			slides.each(function(i, el){
				
				sl.cy.push(new Command(null, function(el, i){
					var c = this ;
					var li = $(el) ;
					var a = li.data('navitem') ;
					var n = a.data('index') ;
					
					slidenav.removeClass('dark') ;
					if(n != 0) a.addClass('double') ;
					a.addClass('dark') ;
					
					
					slidenav.each(function(i, el){
						var aa = $(el) ;	
						aa.css({
							opacity: 1 - (Math.abs(n - i) * .2)
						}) ;
					})
					
					slidewholenav.css({
						'top':-(a.height() * n) + 'px'
					}) ;
					
					
					if(sl.tw && sl.tw.isPlaying){
						sl.tw.stop() ;
						//sl.tw.destroy() ;
					}
					
					var tw ;
					if(n == 0){
						slides.addClass('none')
						firstblock.removeClass('none') ;
						firstblock.removeClass('purecolor')  ;//.find('.othertextes').show() ;
						if(other.height() != bh){
							tw = BJS.create({
								target:other,
								to:{
									"height::PX":bh,
								},
								time:.25,
								ease:Expo.easeOut
							}) ;
								
						}
						firstblock.find('h4').removeClass('sizeR TmarXLg').addClass('sizeXXXLg') ;
						firstblock.find('.catchphrase').removeClass('floatL TmarXXXXLg Tpad RmarLg') ;
						
						firstblock.find('.browseeco a .txt').text('Browse Ecosystem') ;
						
					}else{
						slides.addClass('none')
						firstblock.removeClass('none') ;
						firstblock.addClass('purecolor') ;//.find('.othertextes').hide() ;
						
						var partw = [] ;
						
						if(other.height() != 0){
							
							partw.push(BJS.create({
								target:other,
								to:{
									"height::PX":0,
								},
								time:.25,
								ease:Expo.easeOut
							})) ;
							
						}
						
						firstblock.find('h4').removeClass('sizeXXXLg').addClass('sizeR TmarXLg') ;
						firstblock.find('.catchphrase').addClass('floatL TmarXXXXLg Tpad RmarLg') ;
						firstblock.find('.browseeco a .txt').text('Browse') ;
						var block = $(slides.get(n)) ;
						block.css({opacity:0}) ;
						block.removeClass('none') ;
						
						partw.push(BJS.create({
							target:block,
							from:{
								opacity:0,
								"left::PX":150
							},
							to:{
								"left::PX":0,
								opacity:100
							},
							time:.25,
							ease:Expo.easeOut
						})) ;
						
						tw = BJS.parallelTweens(partw);
						tw.play() ;
					}
					
					if(n == 0){
						up.removeClass('white') ;	
					}else{
						up.addClass('white') ;	
					}
					if(n == slides.length - 1){
						down.removeClass('white') ;	
					}else{
						down.addClass('white') ;	
					}
					
					
					sl.tw = tw ;
					if(tw){
						tw.play() ;	
						tw.onComplete = function(){
							//this.destroy() ;
						}	
					} 
					
					return this ;

				}, el, i)) ;

			})
			
			sl.clear = function(){
				// something if clear needed here
			}

			sl.enable = function(cond){
				
				
				if(cond){
					slidenav.each(function(i, el){
						$(el).on('click', sl.navgo) ;
					})
					
					up.on('click', sl.arrowgo)
					down.on('click', sl.arrowgo)
					
				}else{
					slidenav.each(function(i, el){
						$(el).off('click', sl.navgo) ;
					})
					
					up.off('click', sl.arrowgo)
					down.off('click', sl.arrowgo)
					
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
		
		sl = MMAI.home.slidesseries ;
		
		if(cond){
			
			sl.clear() ;

			sl.enable(true) ;
			
			///////////////////// uncomment to Launch Loop By Default
			/*
			if(sl.cy.index == -1 ) sl.launch() ;
			else{
				sl.cy.index -- ;
				sl.launch() ;
			}
			*/
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
				to:{'margin-left::PX':-150*12},
				from:{'margin-left::PX':0},
				time:15,
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
	toggle_patents: toggle_patents = function(cond, res){
		var toggler = $('.patenttoggler a') ;
		
		if(!toggler.length) return ;
		if(cond){
			toggler.on('click', MMAI.home.patents) ;
		}else{
			MMAI.home.patentsToggle(false) ;
			toggler.off('click', MMAI.home.patents) ;
		}
	},
	////////////////////////// HOME SUB SECTIONS
	home_children_focus : home_children_focus = function(e){
		var res = e.target ;
		if(e.type == "focusIn"){
			
			trace(res.id) ;
			if(res.id == "purechain"){
				if(!MMAI.home.viz3Drunning) {
					
				}else{
					MMAI.home.SCI.morphInto(0) ;
				}
			}else if(res.id == "purewallet"){
				MMAI.func.slideshow_wallet(true, res) ;
			}else if(res.id == "pureseries"){
				MMAI.func.slideshow_series(true, res) ;
				MMAI.func.slide_partners(true, res) ;
			}else if(res.id == "pureworld"){
				trace(MMAI.home.SCI)
				if(!MMAI.home.viz3Drunning) {
					
				}else{
					MMAI.home.SCI.morphInto(1) ;
				}
			}
			
			res.focusReady() ;
		}else{
			
			if(res.id == "purechain"){
				// $('.viewport3D').removeClass('abs').addClass('fixed') ;
			}else if(res.id == "purewallet"){
				MMAI.func.slideshow_wallet(false, res) ;
			}else if(res.id == "pureseries"){
				MMAI.func.slideshow_series(false, res) ;
				MMAI.func.slide_partners(false, res) ;
			}else if(res.id == "pureworld"){
				
			}
			
			//trace("Focusout >>", res.id) ;
			
			res.focusReady() ;
		}
	},
	home_children_toggle : home_children_toggle = function(e){
		var res = e.target ;
		
		if(res.opening){
			trace('OPENING SUB', res.id) ;
			
			var parent = res.parentStep ;
			var ind = parent.getIndexOfChild(res) ;
			
			var pages = $('.fullpage') ;
			var page = pages[ind] ;
			
			var n = MMAI.home.getScrollPageIndex() ;
			
			
			
			if(n != ind){
				var body = $('body') ; 
				// var body = $('html') ; 
				var tt = body.scrollTop() + $(page).position().top ;
				
				MMAI.home.scrollTo(tt, .45, function(){
					res.ready() ;
				}) ;
				
			}else{
				
				res.ready() ;	
			}
			
			
		}else{
			//trace('CLOSING SUB', res.id) ;
			res.ready() ;
		}
	}
}



