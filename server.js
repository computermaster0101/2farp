let port = 9000;

const app = require('./src/app.js')

const express = require('express');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const web = express();
const proxy = httpProxy.createProxyServer();

web.set('views','./views');
web.set('view engine','pug');
web.use(cookieParser());
web.use(bodyParser.json());
web.use(bodyParser.urlencoded({extended:false}));

web.get('/',function(req,res){res.redirect('/login')});
web.get('/login',function(req,res){res.render('login')})
web.post('/login',function(req,res){
    login = {username: req.body.username, password: req.body.password, token: req.body.token}
    return app.authenticate(login)
        .then((session) => {
            console.log(`web.post.login.200Authorized - Username: ${session.username}, Message: Successful Authentication`)
            console.log(`web.post.login.200Authorized - Full Session Data - ${JSON.stringify(session)}`)
            res.statusCode=200
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
        res.render('login',{'status':`${error}`})
    })
})
web.get('/admin',function(req,res){res.render('admin')})

/*
web.all('*',function(req,res){
    path='/'+req.path.split('/').slice(1)[0]
    session= {sessionId: req.cookies.sessionId, key: req.cookies.key}
    return new Promise((resolve,reject) => {
        app.getTargetForPath(path,session)
            .then((target) => {
                switch(target.type){
                    case 'proxy':
                    return
                    case 'render':
                    return
                    case 'redirect':
                    return
                    case 'err':
                    return

                }
            })
    }).catch((err) => {
        if(err.invalidSession){something}
        if(err.requireRedirect){something}
        // something incase theres an unexpected err
    })
})
*/
app.connectDB(function(){
    console.log(`server.start - database is connected`)
    web.listen(port,function(){
        console.log(`server.start - server is running on port ${port}`)
    })
})