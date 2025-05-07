import Link from 'next/link';
import React, { FC } from 'react';
import { PER_PAGE } from '@/constants/pokemon';

interface Props {
  page: number;
  totalCount: number;
}
const Pagination: FC<Props> = ({ page, totalCount }) => {
  const lastPage = Math.ceil(totalCount / PER_PAGE);

  return (
    <div className="flex justify-center items-center gap-4 m-12 overflow-auto">
      {page !== 1 && (
        <Link
          href={`/pokemons?page=${page - 1}`}
          className="p-2 border-b-2 border-blue-300  hover:bg-blue-100 transition-colors duration-200"
        >
          前へ
        </Link>
      )}
      {page !== lastPage && (
        <Link
          href={`/pokemons?page=${page + 1}`}
          className="p-2 border-b-2 border-blue-300  hover:bg-blue-100 transition-colors duration-200"
        >
          次へ
        </Link>
      )}
    </div>
  );
};

export default Pagination;
