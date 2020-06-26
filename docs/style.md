# Styles

## Coding style

This project is with the help of `eslint` and `prettier` to imporve the code quality.
The `eslint` setting applying in this project

```
'eslint:recommended',
'plugin:@typescript-eslint/recommended'
```

The `prettier` setting tend to use in this project

```
{
    "tabWidth": 4,
    "semi": false,
    "singleQuote": true,
    "bracketSpacing": true,
    "arrowParens": "always"
}
```

## The guideline of using Comment in code

I feel like it's better that the code should be able to reflect itself directly so the comments should be used as less as possible.

### The timing not to have a comment

If the comment is just trying to explain it's intention directly.
For example,

```javascript {.line-numbers}
const data = JSON.parse(res.data)
if (data.id && data.name && data.image) {
    doSomething()
}
```

It's better to extract to a well-named variable,

```javascript {.line-numbers}
const data = JSON.parse(res.data)
const isHero = data.id && data.name && data.image
if (isHero) {
    doSomething()
}
```

Or a helper method if it's widely used

```javascript {.line-numbers}
const data = JSON.parse(res.data)
if (!isHero(data)) {
    doSomething()
}
```

### The timing good to have a comment

When the parameters are not trivial to read

```javascript {.line-numbers}
const bmi = calculateBmi(/* height */ 123, /* weight */ 45)
```

When do something that is against a trivial idea and not easy to rewite using code

```javascript {.line-numbers}
const directlyPassThrough = error.response && error.response.status != 1000
if (directlyPassThrough) {
    res.status(error.response.status).send(error.response.data)
} else {
    // it will get a [ERR_HTTP_INVALID_STATUS_CODE] error when send with status code 1000
    res.status(200).send(BackendError)
}
```

When readers might get confused whether it's a typo (V2 and V1) or not

```javascript {.line-numbers}
function createRouterV2(): express.Router {
    return new RouterV1( // keeping using v1 is because the IF is the same
        {
            version: 'v2',
            description: 'hahow server',
        },
        new HeroModelHahow(),
        new UserModelHaHow()
    ).handle
}
```
