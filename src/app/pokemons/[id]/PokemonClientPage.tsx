import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { Pokemon } from '@/types/pokemon';

interface Props {
  data: Pokemon;
}
const PokemonClientPage: FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col items-center m-12 gap-8">
      <Link
        href="/pokemons"
        className="p-2 border-b-2 border-blue-300  hover:bg-blue-100 transition-colors duration-200"
      >
        戻る
      </Link>
      <div>
        <dl className="grid grid-cols-[auto_1fr] gap-4">
          <dt>図鑑No：</dt>
          <dd>{data.id}</dd>
          <dt>名前：</dt>
          <dd>{data.name}</dd>
          <dt>タイプ：</dt>
          <dd className="flex gap-2">
            {data.types.map((type) => (
              <span key={type.type.name}>{type.type.name}</span>
            ))}
          </dd>
        </dl>

        <Image src={data.sprites.front_default ?? ''} alt={data.name} width={200} height={200} />
      </div>
    </div>
  );
};

export default PokemonClientPage;
