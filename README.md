# 2farp
Two Factor Authentication Reverse Proxy written in Nodejs

## WHAT
two factor authentication also known as 2FA,  is an extra layer of security that requires not only a password and username but also something that the user has on them, i.e. a piece of information only they should know or have immediately in hand - such as a physical token.
a reverse proxy is a type of proxy server that retrieves resources on behalf of a client from one or more servers. These resources are then returned to the client as if they originated from the Web server itself.

## WHY
solutions such as nginx and tomcat can provide basic auth before proxying to a backend server and there are options for oauth with facebook, google, etc. but I could not find a standalone option to place in front of a web service/web site to enable two factor authentication.

## PURPOSE
provide two factor authentication for any web service or web site by acting as reverse proxy. application will get route for path, if route is authenticated the user session is validated then the request will be proxied. if route is not authenticated the request will be proxied.
