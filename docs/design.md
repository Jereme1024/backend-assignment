# Designs

Here is the document where I put the ideas of design during working on it from the very beginning of what the technologies used and selected behind the design also having many open questions to the setting the boundary of what not to do. The hierarchy of program components should be probably also can found here.

## Goal

API server - it should conform to the requests of querying the heroes' data and be able to accept the authorized connections. It should be testable.

## Open questions

-   **Which Restful API framework / library should I use?**
    This is a small project so the library we pick here is based on these properties:
    1. mature (reliable and well documented)
    2. lightweight
    3. fast to start (low learning curve)
    -   Libraries:
        -   `Express`: lightweight but everything should almost be done by self
        -   `Sails`: more like a fullstack framework
        -   `Metero`: fullstack framework and hello world is big
        -   `Loopback`: hello world is not that simple
        -   `Restify`: simple and handle the versioning but performance is beat by express
        -   `Swagger`: too heavy for small projects
    -   Reference:
        -   [The Best NodeJS Frameworks for 2020](https://rapidapi.com/blog/best-nodejs-frameworks/)
        -   [13 Node.js Frameworks to Build Web APIs](https://nordicapis.com/13-node-js-frameworks-to-build-web-apis/)
        -   [NPM trends - Restify vs Express](https://www.npmtrends.com/restify-vs-express)
        -   [express-validator](https://express-validator.github.io/docs/)
        -   [Express Typescript Boilerplate](https://github.com/w3tecch/express-typescript-boilerplate)
-   **Use docker?**
    I haven't added one here not because I don't think it's not important to have a unified environment but until we have these needs like 1. CI's build image 2. Deployment on a reliable OS. Just the priority is no that high so far.
-   **Should I separate dev and prod server?**
    Since the data is provided by outside, we don't really separate at this moment.
-   **How do I trace the log? `Raygun`?**
    It's an important question to ask while having a project. What's the level using with log? How do we collect the logs and get them when we need them? Not sure what's the best practice so far.
-   **ESLint? JSHint? TSLint?**
    Having lint is very good for the quality of the project by avoiding writing some code bad smelling.
    I chose to use `TypeScript` in this project so the selected should be able to read it.
    -   Reference:
        -   [Linting your TypeScript Codebase](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)
        -   [Prettier - Code formatter](https://www.npmjs.com/package/prettier)
-   **Testing framework?**
    Don't have any big preference here just pick one like looks good to me with `Jest`.
-   **What needs to be done before committing or merging?**
    -   Formater
    -   Lint
    -   Testing
-   **How's the CI?**
    I pick `Github Actions` just because it's free :)
-   **API versioning?**
    Versioning is important when it comes to making API especially if we have clients like APP who might allow not to upgrade to the latest version.
-   **How to handle internal connection failures?**
    It should be better to provide some kinds of ways to retry the query after it's failed to get.
-   **Profiling?**
    It should be already kinda handled during testing.
    This should be already handled in testing at sorts of levels.
-   **Somethings look good but not having in the project so far**
    The guideline of the Assertion and Code coverage tool.

## Not to do

-   **Deploy the server on a cloud**
    Reference:
    -   [Heroku with NodeJS](https://dwatow.github.io/2018/01-13-heroku-node-mvp/)
-   **Serverless?**
    -   Don't go into this field first because it requires some background knowledge of each cloud service provider (`AWS`, `GCP`) in terms of configuration formatting stuff.
    -   It seems that it can work seamlessly with existed code using `express` to deploy a Serverless REST API.

## UML

```
                    +----------+
                    |  Server  |
                    +----+-----+
                         |
                +--------+---------+
                |                  |
           +----v-----+      +-----v----+
           | RouterV1 |o+----+ RouterV2 |
           +----+-----+      +----------+
                |             (same IF with V1)
         +------+---------+
         |                |
   +-----v------+  +------v------+
   |  HeroModel |  |  UserModel  |
   +-----o------+  +----------o--+
         |                    |
    +----+----+           +---+------+
    |         |           |          |
+---+--+  +---+---+   +---+--+   +---+---+
| JSON |  | Hahow |   | JSON |   | Hahow |
+------+  +-------+   +------+   +-------+

```
