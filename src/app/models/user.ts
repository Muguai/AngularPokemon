import { PokemonData } from "./pokemonComponentData"

export interface User {
    id: number
    username: string
    pokemon: PokemonData[]
}