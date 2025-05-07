'use client';

import React, { FC } from 'react';
import Pokemon from '@/app/pokemons/components/Pokemon';
import { NamedAPIResource } from '@/types/pokemon';

interface Props {
  pokemons: NamedAPIResource[];
}

/**
 * クライアントコンポーネントのエントリーポイント（ページネーションや検索はここで）
 */
const PokemonsClientPage: FC<Props> = ({ pokemons }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-8 m-12">
        {pokemons.map((pokemon) => (
          <Pokemon key={pokemon.name} data={pokemon} />
        ))}
      </div>
    </>
  );
};

export default PokemonsClientPage;
