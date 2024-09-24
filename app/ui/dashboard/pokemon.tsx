'use client';

import Image from 'next/image';
import React, { Suspense, useEffect, useState } from 'react';
import { fetchPokemon } from '@/app/lib/data';
import { pokemonStore } from '@/app/lib/zustand/pokemon_store';
import { PokemonSkeleton } from '../skeletons';

// const Pokemon = async () => {
//   const pokemon = await fetchPokemon('pikachu');

//   return (
//     <div className="h-[100px] w-full bg-gray-100 rounded-lg flex justify-center items-center mb-4">
//       <Image
//         src={pokemon.sprites.front_default}
//         width={100}
//         height={100}
//         alt="A pokemon image"
//       />
//     </div>
//   );
// };

// export default Pokemon;

const Pokemon = () => {
  const { setPokemon, pokemon } = pokemonStore((state) => state);

  const handleFetchPokemon = async (pokemon: string) => {
    const resp = await fetchPokemon(pokemon);
    setPokemon(resp);
  };

  useEffect(() => {
    const storedState = sessionStorage.getItem('pokemon-storage');
    let parsedState;
    if (storedState) {
      parsedState = JSON.parse(storedState);
      if (parsedState.state.pokemon === null) {
        handleFetchPokemon('pikachu');
      }
    } else {
      handleFetchPokemon('pikachu');
    }
  }, [pokemon]);

  return (
    <>
      {pokemon ? (
        <div className="h-[100px] w-full bg-gray-100 rounded-lg flex justify-center items-center mb-4">
          <Image
            src={pokemon.sprites.front_default}
            width={100}
            height={100}
            alt="A pokemon image"
          />
        </div>
      ) : (
        <PokemonSkeleton />
      )}
    </>
  );
};

export default Pokemon;
