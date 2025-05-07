'use server';

import { PER_PAGE, POKEMON_API_URL } from '@/constants/pokemon';
import { NamedAPIResource, Pagination, Pokemon } from '@/types/pokemon';

export async function fetchPokemons(page: number) {
  const res = await fetch(`${POKEMON_API_URL}/pokemon/?limit=${PER_PAGE}&offset=${(page - 1) * PER_PAGE}`);
  const data = (await res.json()) as Pagination<NamedAPIResource>;

  return data;
}

type SearchPokemonResponse = {
  data: Pokemon | undefined;
  error: Error | undefined;
};
export async function searchPokemonByName(
  _: SearchPokemonResponse,
  formData: FormData,
): Promise<SearchPokemonResponse> {
  const name = formData.get('name');

  const res = await fetch(`${POKEMON_API_URL}/pokemon/${name}/`);

  // 実際はバックエンドのエラーメッセージをそのまま表示で良さそう（poke APIには無いが）
  if (!res.ok) {
    return {
      data: undefined,
      error: new Error('ポケモンが見つかりませんでした'),
    };
  }

  const data = (await res.json()) as Pokemon;

  return { data, error: undefined };
}
