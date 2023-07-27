
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
    altSprite: string
    additionalInfoUrl: string
  }

  export type AdditionalPokemonData = {
    height: number
    weight: number
    abilities: Ability[]
    type: Type[]
    pokeDexEntry: string
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
    altSprite:  "assets/images/MissingNo.png",
    additionalInfoUrl: ""
  };

  export const defaultAdditionalPokemonData: AdditionalPokemonData = {
    height: -1,
    weight: -1,
    abilities: [],
    type: [],
    pokeDexEntry: ""
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
      name: "normal",
      url: "",
    },
  };
  
  defaultAdditionalPokemonData.abilities.push(defaultAblity);
  defaultAdditionalPokemonData.type.push(defaultType);