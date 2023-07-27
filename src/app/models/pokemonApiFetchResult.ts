export interface Pokemon {
    abilities: Ability[]
    base_experience: number
    forms: any[]
    game_indices: any[]
    height: number
    held_items: any[]
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: any[]
    name: string
    order: number
    past_types: any[]
    species: Species
    sprites: any
    stats: any[]
    types: Type[]
    weight: number;
  }

  export interface PokemonSpecies {
    base_happiness: number
    capture_rate: number
    color: any
    egg_groups: any[]
    evolution_chain: any
    evolves_from_species: any
    flavor_text_entries: FlavorTextEntry[]
    form_descriptions: any[]
    forms_switchable: boolean
    gender_rate: number
    genera: any[]
    generation: any
    growth_rate: any
    habitat: any
    has_gender_differences: any
    hatch_counter: any
    id: any
    is_baby: any
    is_legendary: any
    is_mythical: any
    name: any
    names: any[]
    order: any
    pal_park_encounters: any[]
    pokedex_numbers: any[]
    shape: any
    varieties: any[]
  }

  export interface FlavorTextEntry {
    flavor_text: string
    language: Language
    version: any
  }

  export interface Language {
    name: string
    url: string
  }
  
  export interface Ability {
    ability: Ability2
    is_hidden: boolean
    slot: number
  }
  
  export interface Ability2 {
    name: string
    url: string
  }
  
  export interface Species {
    name: string
    url: string
  }
  
  export interface Type {
    slot: number
    type: Type2
  }
  
  export interface Type2 {
    name: string
    url: string
  }
  