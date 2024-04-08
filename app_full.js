/*
    MMAIPure Website Remodelling entirely by sazaam
    
*/





//////////////////////////////////////// ENVIRONMENT SETTINGS
require('dotenv').config();
//////////////////////////////////////// END ENVIRONMENT SETTINGS


//////////////////////////////////////// COLORS IN NODE CONSOLE
const colors = require('colors') ;
//////////////////////////////////////// END COLORS IN NODE CONSOLE


//////////////////////////////////////// EXPRESS BASICS
const express = require('express');

/////////////////// ASYNC IMPL
//let async = require('express-async-await'); // Why is this not needed

/////////////////// ERRORS
let createError = require('http-errors');
let cookieParser = require('cookie-parser');
let path = require('path');
let fs = require('fs');

/////////////////// FETCHING
let fetch = require('node-fetch');
/////////////////// REQUESTING
let axios = require('axios');

/////////////////// TEMPLATES
const jade = require('jade');



//////////////////////////////////////// END EXPRESS BASICS

///////////////////////////////// MARKDOWN IMPLEMENTATION
const md = require('marked');


///////////////////////////////// REQUIRED FOR GOOGLE CRAWLING BOT DETECTION
const isbot = require('isbot') ;


/////////////////////////////////////////////// GRAPHQL
const { GraphQLClient } = require('graphql-request');
/////////////////////////////////////////////// END GRAPHQL



/////////////////////////////////////////////// AUTHENTICATION HEADERS
const { Headers } = require('cross-fetch'); // Might need later when on prod
global.Headers = global.Headers || Headers;
/////////////////////////////////////////////// END AUTHENTICATION HEADERS


///////////////////////////////////////// ARE WE RUNNING ON DB DATA OR ON FIXTURES
let isLive = process.env.LIVE == 1;



/////////////////// LANG
const i18 = require('./lang'); // Not sure I need this anymore
/////////////////// GRAPHQL QUERIES
const queries = require('./queries');
/////////////////// NAV FORMATTING UTILS
const UTILS = require('./utils');
/////////////////// SITE CONSTANTS
const CONSTANTS = require('./constants');




/////////////////// SERVER SETTINGS
const server = require('./server');





// STARTING EXPRESS
const app = express();


// CONFIGURE EXPRESS APP
(app => {

    // FIRST SETTINGS

    // internationalization before view engine // Needed for Routing
    app.use(i18.enable()); 

    // view engine setup to jade
    app.set('views', path.join(__dirname, 'public', 'jade'));
    app.set('view engine', 'jade');
    // app.set('view cache', true);

    // basic express setup
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    
    // access static files
    app.use(express.static(path.join(__dirname, 'public')));

})(app);



let i18nextMiddleware = i18.i18nextMiddleware ; 




/*

////////////////////////////////////////// AUTH 

//////// REMEMBER SETTING as 'localhost' fails, while '127.0.0.1' does the trick
getSiteClient = ()=>{
    return new GraphQLClient(CONSTANTS.PATH.db + CONSTANTS.PATH.db_graphql, {
        headers: { Authorization : CONSTANTS.token }
    }) ;
}

getUserClient = ()=>{
    return new GraphQLClient(CONSTANTS.PATH.db + CONSTANTS.PATH.db_graphql, {
        headers: { Authorization : CONSTANTS.MVUserAuth }
    }) ;
}



// MV USER AUTH -- Username Pwd
const userLogin = async(app) => {
    
    console.log('\n////////  LOGGING IN AS MV USER ////////')
    
    let sessiondata = await getUserClient()
        .request(queries['login'], {
            id:CONSTANTS.users.mv.identifier,
            pwd:CONSTANTS.users.mv.password
            
        })
        .catch( err => {});
    
    CONSTANTS.MVUserAuth = 'Bearer ' + sessiondata.login.jwt ;
    CONSTANTS.MVUserClient = getUserClient() ; // store UseClient
    
    delete sessiondata ;
    
    console.log('\n'+colors.bgBlue('     -->  USER LOGIN SUCCESSFULL !!!      ') + '\n');
}
const userLogout = () =>{
    delete CONSTANTS.MVUserAuth ;
    console.log(colors.red('          USER LOGGED OUT !!!        \n')) ;
}

// MV SITE AUTH -- API TOKEN
const siteLogin = async(app) => {
    console.log('\n////////  LOGGING IN AS MV CLIENT ////////') ;
    
    CONSTANTS.token = 'Bearer ' + CONSTANTS.users.mv_api.token ;
    CONSTANTS.MVClient = getSiteClient();
    
    let proof = await QUERY(queries['user'], {id:1});
    
    console.log(colors.bgBlue('     -->  SITE LOGIN SUCCESSFULL !!!      ') + '\n');
    console.log("SuperAdmin USER : ", proof.usersPermissionsUser.data.attributes) ;
}
const siteLogout = () =>{
    delete CONSTANTS.token ;
    console.log(colors.red('          SITE LOGGED OUT !!!        \n')) ;
}
////////////////////////////////////////// END AUTH 


*/


// JADESETTINGS
const {jadeparams} = (()=>{
    
    const jadebasedir = path.join(__dirname, 'public', 'jade');
    const JADESETTINGS = {
        params: {},
        excludes: {
            // settings:1,
            // language:1,
            // languageDir:1,
            // t:1,
            // exists:1,
            // i18n: 1,
            // basedir:1,
            // title:1,
            // lang:1,
            // render:1,
            // renderFile:1,
            // join:1,
            // p:1,
            _locals: 1,
            cache: 1,
            // filename:1
        }

    }
    
    let i18next = i18.i18next;
    
  
    
    
    let merge = (p, newp) => {
        for (var s in newp) p[s] = newp[s];
        return p;
    }

    let clone = (p) => {
        let cl = {},
            ex = JADESETTINGS.excludes;
        for (var s in p) {
            if (!(s in ex)) {
                cl[s] = p[s];
            }
        }
        return cl;
    }

    let p = (input, locals) => {
        return merge(clone(input), clone(locals));
    }

    let customize = (bracket, source) => {
        var customs = {};
        var module = getComponentsByTypename(bracket, 'ComponentJadeJadePage');
        if (!!module.length && module[0].jade != '') {
            customs = rfs(module[0].jade, module[0].path, source);
        }
        return customs;
    }

    let rfs = (src, filename, params) => {
        var Module = module.constructor;
        var m = new Module("", params);

        m._compile(src, filename);
        return m.exports;
    }

    let getComponentsByTypename = (list, name) => {
        let l = list.length;
        let p = [];
        for (var i = 0; i < l; i++) {
            let el = list[i];
            if (name == el.__typename)
                p[p.length] = el;
        }
        return p;
    }

    let getComponentByName = (list, name) => {
        let l = list.length;
        let right;
        for (var i = 0; i < l; i++) {
            el = list[i];
            if (name == el.name) {
                right = el;
                break;
            }
        }
        return right;
    }
    
    let params = CONSTANTS.jadeparams = {
        basedir: jadebasedir,
        title: CONSTANTS.SITE.title,
        require: require,
        render: jade.render,
        renderFile: jade.renderFile,
        compile: jade.compile,
        compileFile: jade.compileFile,
        join: path.join,
        app: app,
        md: md,
        CDN: CONSTANTS.PATH.cdn,
        customize: customize,
        getComponentsByTypename: getComponentsByTypename,
        getComponentByName: getComponentByName,
        rfs: rfs,
        p: p,
        merge: merge,
        clone: clone
    };
    
    return {
        jadeparams:params
    } ;
})() ;


////////////////////////////////////////////////// FETCHING DATAS
/////////////////////////////////////// QS FORMATTING
const qs = function(obj, prefix) {
    let str = [], p, cond;
    for (p in obj) {
        cond = true ;
        if (obj.hasOwnProperty(p)) {
            let k = prefix ? prefix + "[" + p + "]" : p,
            v = obj[p];
            str.push((v !== null && typeof v === "object") ? qs(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return cond ? '?' + str.join("&") : str.join("&");
}
/////////////////////////////////////// REST API REQUESTS
const REST = async(query, variables)=>{
    let q = (!!variables) ? CONSTANTS.PATH.db + query + qs(variables) : CONSTANTS.PATH.db + query ;
    let data = await axios.get(q, {
        headers: {
            authorization : CONSTANTS.token
        }}).catch(error => {console.error(error)}) ;
    return data ;
} ;
/////////////////////////////////////// ACTUAL QUERY
const QUERY = async(query, variables)=>{
    let data = await getSiteClient().request(query, variables);//.catch( err => {/*console.log(err)*/}) ;
    return data ;
} ;






let topsections, db_sections;

let sectionquery = async(req, res) => {
    
    let id = req.params.sectionId;
    
    let ss = await QUERY(queries['section'], {id:id});
    section = cleanup(ss, 'section') ;
    
    let pp = await QUERY(queries['page'], {id:section.page.id});
    let page = cleanup(pp.page) ;
    
    //let jadeuri = post.data.attributes.template.data.attributes.uri ;
    /*let brackets = post.data.attributes.brackets ;
    */
    
    let children ;
    
    ////////// check for children
    if(section.children){
        console.log('children', section.children.length) ;
        let ch = await QUERY(queries['children'], {parentID:2});
        children = cleanup(ch, 'sections') ;
        console.log(children) ;
    }
    
    var jadeuri = 'test' ; 
    
    
    
    return res.render(path.join(__dirname, 'public/jade/pages/', jadeuri + '.jade'), jadeparams.merge(jadeparams, {
        langs:langs,
        lang: req.i18n.language,
        t: req.t,
        params: req.params,
        section:section,
        page:page,
        children:children
    })) ;   
}
/* 
let contentquery = async(req, res) => {
    
    let id = req.params.sectionId;
    let ss = await QUERY(queries['sectionsfull']);
    
    return res.send(ss) ;
}
*/

let api = async(req, res) => {
    let q = req.url.replace(/(^\/)|(\/$)/g, '') ;
    console.log(q) ;
    let datas = await QUERY(queries[q]).catch(err => { console.log(err) });
    
    return cleanup(datas[q]) ;
}
// ERRORS
let langs ;
// MAIN PAGE

  
let normalize = (o) => {
    
    let attr = o['attributes'] ;
    
    for(let s in attr){
        let n = o[s] = attr[s] ;
        
        // normalize data
        if(n.hasOwnProperty('data')){
            if(n['data'])
                n = o[s] = cleanup(n) ;
            else delete o[s] ;
        }
        // cleanup empty arrays 
        if(n.hasOwnProperty('length') && n.length == 0){
            delete o[s] ;
        }
    }
    delete o['attributes'] ;
    return o ;
}
let cleanup = (o, base) => {
    // get rid of top object
    if(base) o = o[base] ;
    // get rid of data
    if('data' in o) o = o['data'] ;
    
    // is Array
    if('length' in o){
        let l = o.length ;
        for(let i = 0 ; i < l ; i ++){
            normalize(o[i]) ;
        }
    }else // is Single
        normalize(o) ;
    return o ;
}
let toJSON = (data) => {
    return {data:data} ;
}
//////////////// warning Opera request '/' x3 times !! while FF only once

let root = async(req, res) => {
    
    let tt = await QUERY(queries['sections']) ;
    topsections = cleanup(tt, 'sections') ;
    
    await res.render(path.join(__dirname, 'public/jade/index'), jadeparams.merge(jadeparams, {
        langs: req.langs,
        lang: req.i18n.language,
        t: req.t,
        topsections: toJSON(topsections)
    })) ;
    
}



let crawl = async(req, res) => {
    
    console.log(req.i18n.language) ;
    
    let lg = await QUERY(queries['langs']) ;
    
    let langs = cleanup(lg, 'i18NLocales') ;
    
    let tt = await QUERY(queries['sections']) ;
    topsections = cleanup(tt, 'sections') ;
    
    res.send(req.url) ;
    return ;
    await res.render(path.join(__dirname, 'public/jade/index'), jadeparams.merge(jadeparams, {
        langs: toJSON(langs),
        lang: req.i18n.language,
        t: req.t,
        topsections: toJSON(topsections)
    })) ;
    
}



app.use('/content/section/:sectionId', async(req, res) => {
    await sectionquery(req, res).catch(err => { console.log(err) });
});

/* 
app.use('/content/', async(req, res) => {
    await contentquery(req, res).catch(err => { console.log(err) });
});
 */

app.use('/api/', async(req, res) => {
    let datas = await api(req, res).catch(err => { console.log(err) });
    
    res.send(datas) ;
    return datas ;
});


////// weird favicon.ico request happening....
app.use('/favicon.ico/', async (req, res) => {
    //console.log(req.language) ;
    res.send('KAKA') ;
    
}) ;


app.use(/([a-z]{2})?(\/.*)/i, async(req, res) => {
    console.log('lang : ', req.language) ;
    
    let arr = [] ;
    for (s in req.i18n) arr.push(s) ; 
    console.log(arr)
    let arr2 = [] ;
    for (s in i18nextMiddleware) arr2.push(s) ; 
    console.log(arr2)
    // console.log(req.lng)
    // console.log(req.locale)
    // console.log(req.i18n.options)
    console.log(i18nextMiddleware)
    await res.send('tata') ;
}) ;


app.use('/', async(req, res) => {
    
    let ISBOT = isbot.isbot(req.get("user-agent")) ;
    
    console.log('lang : ', req.language) ;
    console.log(req.url) ;
    
    //console.log(req.i18n.language) ;
    
    let lg = await QUERY(queries['langs']) ;
    let langs = cleanup(lg, 'i18NLocales') ;
    req.langs = toJSON(langs) ; 
    
    console.log('CACA', langs) ;
    //console.log('is Bot', ISBOT) ;
    if(ISBOT || 1) { // should render version for bots
        
        let url = req.url ;
        let name = url.replace(url.replace(/[^\/]+\/?$/, ''), '').replace(/\/?$/, '') ;
        
        //res.send('toto') ;
        //res.redirect('/' + req.language + url) ;
        //await crawl(req, res).catch(err => { /*console.log(err)*/ }); 
        
    }else{
        
        console.log('requesting home') ;
        await root(req, res).catch(err => { /*console.log(err)*/ });   
    }
});



let DELAY_TIME = 1;
/*
if (process.env.SHOULD_DELAY == true || process.env.SHOULD_DELAY >= 1) {
    console.log('DELAYING ' + process.env.SHOULD_DELAY + 'MS SERVER START FOR STRAPI TO LOAD');
    DELAY_TIME = process.env.SHOULD_DELAY;
}
*/

setTimeout(function() {

    // SERVER LAUNCHING
    (async(app) => {
        let SUCCESS = true;
        
        if (isLive) {
            
            await siteLogin(app).catch((err) => {
                //console.log(err);
                
                console.log(colors.bgRed('     -->  SITE LOGIN FAILED !!!           '));
                
                console.log('Let us check \n'
                    + '\t1. our API Token (ENV) \n'
                    + '\t2. if url ' + colors.red(CONSTANTS.PATH.db) + ' is correct... \n'
                    + '\t3. if gql endpoint is really ' + colors.red(CONSTANTS.PATH.db_graphql) );
                
                SUCCESS = false;
            });
            
            console.log('\n' + colors[SUCCESS ? 'bgBlue' : 'bgRed']('    >>>  WILL LOAD LIVE DB DATAS !!!      '));

        } else {
            console.log('WILL LOAD LOCAL FILES')
        }
        console.log() ;
        let db = CONSTANTS.PATH.db ;
        
        console.log('\nGraphQL on \t:    ' + colors.bgMagenta(db) + colors.magenta.bold(CONSTANTS.PATH.db_graphql) + '\n'); ;
        
        if (SUCCESS) server.launchServer(app);
        else process.exit();
        
        
        
        
        //////////////// USER LOGGED CASE
        /*
        let USER_SUCCESS = true ;
        
        await userLogin(app).catch((err) => { // IF User logging in method
            console.log(colors.bgRed('     -->  USER LOGIN FAILED !!!           ')) ;
            console.log('Let us check \n'
                    + '\t1. our USER credentials (ENV) \n'
                    + '\t2. if url ' + colors.red(CONSTANTS.PATH.db) + ' is correct... \n'
                    + '\t3. if gql endpoint is really ' + colors.red(CONSTANTS.PATH.db_graphql) );
            USER_SUCCESS = false ;
        })
        
        if(USER_SUCCESS){
            
            userLogout() ;
            
            let ss = await getUserClient().request(queries['me']).catch((err) => {
                return {msg:"PERMISSION DENIED"} ;
            });
            
            console.log('ME \t\t: ', ss) ;
            
        }else{
            process.exit();
        }
        
        */
        
    })(app);




}, DELAY_TIME);




module.exports = app;