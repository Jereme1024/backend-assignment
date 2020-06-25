type Profile = {
    str: number
    int: number
    agi: number
    luk: number
}

type Hero = {
    id: string
    name: string
    image: string
    profile?: Profile
}

interface HeroModel {
    getHeroes(showProfile: boolean): Hero[]
    getHero(id: string, showProfile: boolean): Hero | null
}

export { Hero, Profile, HeroModel }
