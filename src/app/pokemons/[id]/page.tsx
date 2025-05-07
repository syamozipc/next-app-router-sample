import React, { FC } from 'react';
import PokemonClientPage from '@/app/pokemons/[id]/PokemonClientPage';
import { Pokemon } from '@/types/pokemon';

interface Props {
  params: Promise<{ id: string }>;
}
const page: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = (await res.json()) as Pokemon;

  return <PokemonClientPage data={data} />;
};

export default page;
