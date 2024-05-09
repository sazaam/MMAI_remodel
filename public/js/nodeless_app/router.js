


// what steps are going to do graphically , extracted from './graphics.js'
// on toggle (both opening / closing) and focus events

var graphics = require('./graphics/index.js') ;

var defaultFunction = function(node, exp){

	var hasChildren = !!node.children ;
	var l = hasChildren ? node.children.length : 0 ;
	var name = node.name ;
	var first = hasChildren ? node.children[0] : null ;
	
	var sectionId = node['sectionId'] ;
	
	var data = node['data'] ;
	
	delete node['data'] ;

	var focus = node['@focus'] ;
	var toggle = node['@toggle'] ;
	
	var f ;
	var jade, json ;
	
	if(!!node['index'] || (!!first && first.name == 'index')){
		
		f = function(req, res){ return res.ready() }

		f.index = function index (req, res){
			if(res.opening){
				res.sectionData = data || {} ;
				
				// res.userData.parameters = {response:res.parentStep} ;
			}
			return res ;
		} ;
		f.index['@focus'] = focus ;
		f.index['@toggle'] = toggle ;
	}else{

		f = function (req, res){
			if(res.opening){
				res.sectionData = data || {} ;
				// res.userData.parameters = {response:res} ;
			}
			return res ;
		} ;
		f['@focus'] = focus ;
		f['@toggle'] = toggle ;
	}
	
	f.name = name ;
	f.sectionId = sectionId ;
	if(!!data) f.data = data ;
	for(var i = 0 ; i < l ; i++){
		var child = node.children[i] ;
		if(child.name != 'index'){
			arguments.callee(child, f) ;
		}
	}

	exp[name] = f ;

	return node ;
}

var Router = function(routes){
	
	if(!!routes && routes.length){
		var sections = window.Data ;
		
		var sects = (function(sections){
			
			var items = [] ;
			var l = sections.length ;
			
			for(var i = 0 ; i < l ; i ++){
				
				var section = sections[i] ;
				
				var page = section.page ;
				var template = page.template ;
				var behavior = template?.behavior ;
				var data = section.data ;
				var children = section.children ;
				
				items[items.length] = {
					"sectionId":section.id,
					"name":section.name,
					"data":section.data,
					"@focus": graphics[behavior['@focus']],
					"@toggle": graphics[behavior['@toggle']],
					"children": !!children ? arguments.callee(children) : undefined
				} ;
			}
			
			return items ;
	
		})(sections) ;
	
		
	}else{
		throw 'No Datas... window.Data is null'
	}
	
	var exp = {} ;
	var l = sects.length ;
	
	for(var i = 0 ; i < l ; i ++ ){
		var node = sects[i] ;
		defaultFunction(node, exp) ;
	}
	
	return exp ;
}


module.exports = Router ;

