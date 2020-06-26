import { RouterV1 } from './router-v1'
import HeroModelHahow from './hero-model-hahow'
import UserModelHaHow from './user-model-hahow'

function createRouterV2() {
    return new RouterV1(
        {
            version: 'v2',
            description: 'hahow server',
        },
        new HeroModelHahow(),
        new UserModelHaHow()
    )
}

export { createRouterV2 }
