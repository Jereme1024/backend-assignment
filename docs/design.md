# Goal

-   API server - it should conform to the requests of querying the heroes' data and be able to accept the authorized connections. It should be testable.

# Open questions

-   Which restful api framework / library should I use?
    This is a small project so the library we pick here are based on these properties:
    1. mature (reliable and well documentized)
    2. lightweight
    3. fast to start (low learning curve)
    -   Libraries:
        -   Express: lightweight but everthing should almost be done by self
        -   Sails: more like a fullstack framework
        -   Metero: fullstack framework and hello world is big
        -   Loopback: hello world is not that simple
        -   Restify: simple and handle the versioning but preformance is beat by express
        -   Swagger: too heavy for small projects
    -   Reference:
        -   [The Best NodeJS Frameworks for 2020](https://rapidapi.com/blog/best-nodejs-frameworks/)
        -   [13 Node.js Frameworks to Build Web APIs](https://nordicapis.com/13-node-js-frameworks-to-build-web-apis/)
        -   [NPM trends - Restify vs Express](https://www.npmtrends.com/restify-vs-express)
        -   [express-validator](https://express-validator.github.io/docs/)
        -   [Express Typescript Boilerplate](https://github.com/w3tecch/express-typescript-boilerplate)
-   Use docker?
-   Should I separate dev and prod server?
-   How do I trace the log? Raygun?
-   ESLint? JSHint? TSLint?
    **Reference:**
    -   [Linting your TypeScript Codebase](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)
    -   [Prettier - Code formatter](https://www.npmjs.com/package/prettier)
-   Testing framework?
    -   Jest
-   Code coverage?
-   Assertion?
-   Profiling?
-   What need to be done before commiting or merging?
    -   Coding style
    -   Lint
    -   Testing
-   CI?
    -   Github actions
-   API versioning?

# Not to do

-   Depoly the server on a cloud
    Reference:
    -   [Heroku with NodeJS](https://dwatow.github.io/2018/01-13-heroku-node-mvp/)
-   Serverless?
    -   Don't go into this field first becasue it requires some background knowledges of each cloud service providers (AWS, GCP) in terms of configuration formatting stuffs.
    -   It seems that it can work seamlessly with existed code using express to deploy a Serverless REST API
