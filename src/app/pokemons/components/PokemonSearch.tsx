'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import Image from 'next/image';
import Link from 'next/link';
import React, { useActionState } from 'react';
import { z } from 'zod';
import Loading from '@/app/components/Loading';
import { searchPokemonByName } from '@/app/pokemons/actions';

const schema = z.object({
  name: z.string({ message: 'ポケモン名を入力してください' }),
});

const PokemonSearch = () => {
  const [{ data, error }, formAction, isPending] = useActionState(searchPokemonByName, {
    data: undefined,
    error: undefined,
  });
  const [form, fields] = useForm({
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  return isPending ? (
    <Loading />
  ) : (
    <div className="flex flex-col items-center">
      <form action={formAction} id={form.id} onSubmit={form.onSubmit} className="flex flex-col items-center">
        <label>
          名前：
          <input
            type="text"
            key={fields.name.id}
            name="name"
            placeholder="ポケモン名で検索"
            className="border-2 border-gray-300 rounded-md p-2 m-4"
          />
        </label>
        {fields.name.errors?.length && <div className="text-center text-red-500">エラー：{fields.name.errors}</div>}
        <button type="submit" className="text-center bg-blue-500 text-white rounded-md p-2 m-4 cursor-pointer">
          送信
        </button>
      </form>
      {error?.message && <div className="text-center text-red-500">{error.message}</div>}
      {data && (
        <Link
          href={`/pokemons/${data.id}`}
          className="text-center border-2 border-gray-300 rounded-lg p-4 m-4 hover:bg-gray-200 transition-colors duration-200"
        >
          <h2 className="text-xl font-bold">{data.name}</h2>
          <Image src={data.sprites.front_default ?? ''} alt={data.name} width={100} height={100} />
        </Link>
      )}
    </div>
  );
};

export default PokemonSearch;

// formのactionを使わないとこんな感じ
// Tanstack Query使うなり、React Hook Form使うなり、Zodのvalidateを使う等

// const PokemonSearch = () => {
//   const [error, setError] = React.useState<Error>();
//   const [data, setData] = React.useState<Pokemon>();

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const result = await searchPokemonByName({ data: undefined, error: undefined }, formData);

//     if (result.error) {
//       setData(undefined);
//       setError(result.error);
//     } else {
//       setData(result.data);
//       setError(undefined);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-center">
//         <label>
//           名前：
//           <input
//             type="text"
//             name="name"
//             placeholder="ポケモン名で検索"
//             className="border-2 border-gray-300 rounded-md p-2 m-4"
//           />
//         </label>
//         {error && <div className="text-center text-red-500">エラー：{error.message}</div>}
//         <button type="submit" className="text-center bg-blue-500 text-white rounded-md p-2 m-4 cursor-pointer">
//           送信
//         </button>
//       </form>
//       {data && (
//         <Link href={`/pokemons/${data.id}`} className="text-center border-2 border-gray-300 rounded-lg p-4 m-4">
//           <h2 className="text-xl font-bold">{data.name}</h2>
//           <Image src={data.sprites.front_default ?? ''} alt={data.name} width={100} height={100} />
//         </Link>
//       )}
//     </div>
//   );
// };

// export default PokemonSearch;
