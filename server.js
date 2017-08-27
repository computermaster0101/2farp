let port = 9000;

const app = require('./src/app.js')

const express = require('express'); //https://www.npmjs.com/package/express
const httpProxy = require('http-proxy'); //https://www.npmjs.com/package/http-proxy
const bodyParser = require('body-parser'); //https://www.npmjs.com/package/body-parser
const cookieParser = require('cookie-parser'); //https://www.npmjs.com/package/cookie-parser

const web = express();
const proxy = httpProxy.createProxyServer();

web.set('views','./views');
web.set('view engine','pug');
web.use(cookieParser());
web.use(bodyParser.json());
web.use(bodyParser.urlencoded({extended:false}));

web.all('*',function(req,res,next){
    let session = {id: req.cookies.id, key: req.cookies.key, sourceIP: req.ip, sourceHostname: req.hostname}
    if(session.id){
        return app.validate(session)
            .then(() => {
                console.log(`web.post.login.200Authorized - Session: ${session.id}, Message: Successful Authentication`)
                next()
        }).catch((error) => {
            console.error(`web.post.login.401Unauthorized - Session: ${session.id}, ${error}`)
            res.statusCode=401
            res.clearCookie('id')
            res.clearCookie('key')
            res.render('login',{'status':`${error}`})
            Promise.resolve()
        })
    }else{
        next()
    }
})

web.get('/',function(req,res){res.redirect('/login')});
web.get('/login',function(req,res){res.render('login')})
web.post('/login',function(req,res){
    let login = {username: req.body.username, password: req.body.password, token: req.body.token, sourceIP: req.ip, sourceHostname: req.hostname}
    return app.authenticate(login)
        .then((session) => {
            console.log(`web.post.login.200Authorized - Username: ${login.username}, Message: Successful Authentication`)
            console.log(`web.post.login.200Authorized - Full Session Data - ${JSON.stringify(session)}`) //todo: remove when finished. (for testing only)
            res.statusCode=200
            res.cookie('id', session.id)
            res.cookie('key', session.key)
            if(req.cookies.dest){
                res.redirect(req.cookies.dest)
                Promise.resolve()
            }else{
                res.render('noRouteRequested')
                Promise.resolve()
            }
    }).catch((error) => {
        console.error(`web.post.login.401Unauthorized - Username: ${login.username}, ${error}`)
        res.statusCode=401
        res.clearCookie('id')
        res.clearCookie('key')
        res.render('login',{'status':`${error}`})
    })
})
web.get('/admin',function(req,res){res.render('admin')})





app.connectDB(function(){
    console.log(`server.start - database is connected`)
    web.listen(port,function(){
        console.log(`server.start - server is running on port ${port}`)
    })
})