import { useQuery, useSubscription } from '@apollo/client';
import { Box } from '@mui/system';
import { useEffect } from 'react';

import { PokemonCard } from 'components';
import { graphql } from 'graphql';
import { Pokemon } from 'graphql/graphql';

const GET_POKEMONS = graphql(/* GraphQL */ `
  query Get {
    getPokemons {
      id
      name
      weight
      height
    }
  }
`);

const POKEMON_CREATED_SUBSCRIPTION = graphql(`
  subscription OnPokemonCreated {
    onPokemonCreated {
      id
      name
    }
  }
`);

const Home = (): JSX.Element => {
  const { data, refetch } = useQuery<{ getPokemons: Pokemon[] }>(GET_POKEMONS);

  const { data: pokemonCreated } = useSubscription<Pokemon>(
    POKEMON_CREATED_SUBSCRIPTION,
    {},
  );

  useEffect(() => {
    void refetch();
  }, [pokemonCreated, refetch]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      textAlign="center"
      height="100vh"
      maxWidth="100%"
    >
      {(data?.getPokemons ?? []).map(pokemon => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </Box>
  );
};

export default Home;
