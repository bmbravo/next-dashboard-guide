import { PokemonResponse } from '../definitions';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type PokemonStore = {
  pokemon: PokemonResponse | null;
  setPokemon: (pokemon: PokemonResponse) => void;
};

export const pokemonStore = create<PokemonStore>()(
  persist(
    (set) => ({
      pokemon: null,
      setPokemon: (pokemon: PokemonResponse) => set({ pokemon }),
    }),
    {
      name: 'pokemon-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
