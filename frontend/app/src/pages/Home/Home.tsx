import { useQuery, useSubscription } from '@apollo/client';
import { Box } from '@mui/system';
import { useEffect } from 'react';

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
  const { refetch } = useQuery<{ getPokemons: Pokemon[] }>(GET_POKEMONS);

  const { data: pokemonCreated } = useSubscription<Pokemon>(
    POKEMON_CREATED_SUBSCRIPTION,
    {},
  );

  useEffect(() => {
    void refetch();
  }, [pokemonCreated, refetch]);

  const { redCount, yellowCount } = { redCount: 50, yellowCount: 100 };
  const yellowPercentage =
    redCount + yellowCount === 0 ? 0 : yellowCount / (redCount + yellowCount);
  const value = yellowPercentage * 200 - 100;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      textAlign="center"
      height="100vh"
      maxWidth="100%"
      style={{ backgroundColor: 'green' }}
    >
      <div
        style={{
          width: '300px',
          height: '500px',
          backgroundColor: 'yellow',
          position: 'absolute',
          borderRadius: '8px',
          left: '10px',
        }}
      />
      <div
        style={{
          width: '300px',
          height: '500px',
          backgroundColor: 'red',
          clipPath: `polygon(${value}% 100%, 100% ${value}%, 100% 100%)`,
          position: 'absolute',
          borderRadius: '8px',
          left: '10px',
        }}
      />
    </Box>
  );
};

export default Home;
