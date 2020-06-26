import { RouterV1 } from './router-v1'
import express from 'express'
import HeroModelHahow from './hero-model-hahow'
import UserModelHaHow from './user-model-hahow'

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

export { createRouterV2 }
