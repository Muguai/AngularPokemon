export type PokemonResult = {
    count: number
    next: string
    previous: any
    results: Result[]
  }
  
  export type Result = {
    name: string
    url: string
  }
  
  export type PokemonData = {
    name: string
    sprite: string
  }