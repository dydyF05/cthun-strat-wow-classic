import { FunctionComponent, useCallback, useState } from 'react';
import Component from '../components/AddPlayerForm';
import { Player } from '../redux/Players';

export type Props = {
  onValidate: (player: Player) => void;
};

const isPlayerValid = (player: Partial<Player>): boolean => {
  return !!player.name && !!player.build && !!player.className && !!player.role;
};

const AddPlayerForm: FunctionComponent<Props> = ({ onValidate }) => {
  const [state, setState] = useState<Partial<Player>>({});

  const isValid = isPlayerValid(state);

  const handleChange = useCallback(
    (prop: keyof Player, value: unknown) => {
      setState({
        ...state,
        [prop]: value,
      });
    },
    [state]
  );

  console.log('state', state);

  const handleValidate = useCallback(() => {
    isValid && onValidate(state as Player);
  }, [isValid, state, onValidate]);

  return (
    <Component {...state} isValid={isValid} onChange={handleChange} onValidate={handleValidate} />
  );
};
export default AddPlayerForm;
