// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';
import { POKEMON_API_URL } from '@/constants/pokemon';
import { NamedAPIResource, Pagination, Pokemon } from '@/types/pokemon';

export const pokemonHandlers = [
  http.get(new RegExp(`${POKEMON_API_URL}/pokemon/?(\\?.*)?$`), () => {
    return HttpResponse.json<Pagination<NamedAPIResource>>({
      count: 3,
      next: null,
      previous: null,
      results: [
        {
          name: 'bulbasaur',
          url: `${POKEMON_API_URL}/pokemon/1/`,
        },
        {
          name: 'ivysaur',
          url: `${POKEMON_API_URL}/pokemon/2/`,
        },
        {
          name: 'venusaur',
          url: `${POKEMON_API_URL}/pokemon/3/`,
        },
      ],
    });
  }),
  http.get(`${POKEMON_API_URL}/pokemon/:id/`, () => {
    const pikachu = {
      abilities: [
        {
          ability: {
            name: 'static',
            url: 'https://pokeapi.co/api/v2/ability/9/',
          },
          is_hidden: false,
          slot: 1,
        },
        {
          ability: {
            name: 'lightning-rod',
            url: 'https://pokeapi.co/api/v2/ability/31/',
          },
          is_hidden: true,
          slot: 3,
        },
      ],
      id: 25,
      name: 'ピカチュウ',
      sprites: {
        back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
        back_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/25.png',
        back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png',
        back_shiny_female:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/25.png',
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        front_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/25.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png',
        front_shiny_female:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/25.png',
      },
    } as Pokemon;

    return HttpResponse.json<Pokemon>(pikachu);
  }),
];
