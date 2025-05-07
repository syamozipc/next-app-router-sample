import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { NEXT_PUBLIC_POKEMON_IMAGE_URL } from '@/constants/pokemon';
import { NamedAPIResource } from '@/types/pokemon';

interface Props {
  data: NamedAPIResource;
}

const getIdFromUrl = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

/**
 * 個々のアイテム
 */
const Pokemon: FC<Props> = ({ data }) => {
  const id = getIdFromUrl(data.url);

  return (
    <Link
      href={`/pokemons/${getIdFromUrl(data.url)}`}
      className="flex flex-col items-center border-2 border-gray-300 rounded-lg p-4 hover:bg-gray-200 transition-colors duration-200"
    >
      <Image src={`${NEXT_PUBLIC_POKEMON_IMAGE_URL}/${id}.png`} alt={data.name} width={100} height={100} />
      <p>{data.name}</p>
    </Link>
  );
};

export default Pokemon;
