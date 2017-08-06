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
    return new Promise((resolve,reject) => {
        app.authenticate(login)
            .then((session) => {
                switch (session.statusCode){
                    case '100' //continue? upon successful authentication - forward to route
                    return
                    case '200' //OK? ok, authentication was successful
                    return
                    case '201' //Created? the session was created
                    return
                    case '401' //Unauthorized? if authentication fails the user is unauthorized
                    return
                    case '403' //Forbidden? if authentication fails the user is forbidden
                    return
                }

                if(attempt.valid){
                    console.log(`web.lost.login - success - ${login.username}`)
                    if(req.cookies.dest){
                        console.log(`web.lost.login - ${login.username} - redirecting to ${req.cookies.dest}`)
                        resolve(res.redirect(req.cookies.dest))
                    }else{
                        console.log(`web.lost.login - ${login.username} - no route requested`)
                        resolve(res.render('noRouteRequested'))
                    }
                }else{
                    reject(attempt)
                }
            })
    }).catch((err) => {
      console.log(`web.post.login ${err} ${login.username}`)
      return res.render('login',{'status':`Error: ${err}`})
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