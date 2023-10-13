import { FormattedMessage } from 'react-intl';

import { Wrapper } from './PokemonCard.style';

interface Props {
  name: string;
  id: string;
  height: number;
  weight: number;
}

const pokeApiBaseUrl = 'https://raw.githubusercontent.com/PokeAPI/';

const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const PokemonCard = ({
  name,
  id,
  height,
  weight,
}: Props): JSX.Element => {
  const pokemonImageLink = `${pokeApiBaseUrl}/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Wrapper>
      <p>{capitalize(name)}</p>
      <img src={pokemonImageLink} alt={name} />
      <p>
        <FormattedMessage id="pokemon.id" />: {id}
      </p>
      <p>
        <FormattedMessage id="pokemon.weight" />: {weight}{' '}
        <FormattedMessage id="measures.kilogram" />
      </p>
      <p>
        <FormattedMessage id="pokemon.height" />: {height}{' '}
        <FormattedMessage id="measures.centimeter" />
      </p>
    </Wrapper>
  );
};
