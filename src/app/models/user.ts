import { PokemonData } from "./pokemonResult"

export interface User {
    id: number
    username: string
    pokemon: PokemonData[]
}