import { FC } from 'react';
import { fetchPokemons } from '@/app/pokemons/actions';
import Pagination from '@/app/pokemons/components/Pagination';
import PokemonSearch from '@/app/pokemons/components/PokemonSearch';
import PokemonsClientPage from '@/app/pokemons/PokemonsClientPage';

interface Props {
  searchParams: { page?: string };
}

/**
 * データフェッチ用サーバーコンポーネント
 */
export const page: FC<Props> = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const data = await fetchPokemons(page);

  return (
    <>
      <PokemonSearch />
      <Pagination page={page} totalCount={data.count} />
      <PokemonsClientPage pokemons={data.results} />
    </>
  );
};

export default page;

// 変更がある場合はdynamic routingにするのもあり（以下の方法もしくはfetchにcache: no-storeやnext: {revalidate: 0}を渡す）
// export const dynamic = 'force-dynamic';
