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
    getHeroes(): Promise<{ heroes: Hero[] }>
    getHero(id: string): Promise<Hero>
    getProfile(id: string): Promise<Profile>
}

export { Hero, Profile, HeroModel }
