
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
    id: number 
    sprite: string 
    height: number
    heightAlt: number
    weight: number
    weightAlt: number
    abilities: Ability[]
    type: Type[]
    additionalInfoUrl: string
  }

  // Very ugly to copy in these twice. need to fix later
  export type Ability = {
    ability: Ability2
    is_hidden: boolean
    slot: number
  }
  
  export type Ability2 = {
    name: string
    url: string
  }
  
  export type Type = {
    slot: number
    type: Type2
  }
  
  export type Type2 = {
    name: string
    url: string
  }

 export const defaultPokemonData: PokemonData = {
    name: "MissingNo" ,
    id: -1,
    sprite:  "assets/images/MissingNo.png",
    height: 0,
    heightAlt: 0,
    weight: 0,
    weightAlt: 0,
    abilities: [],
    type: [],
    additionalInfoUrl: ""
  };

  const defaultAblity: Ability = {
    ability: {
      name: "Default",
      url: "",
    },
    is_hidden: false,
    slot: 1,
  };

  const defaultType: Type = {
    slot: 1,
    type: {
      name: "Normal",
      url: "",
    },
  };
  
  defaultPokemonData.abilities.push(defaultAblity);
  defaultPokemonData.type.push(defaultType);