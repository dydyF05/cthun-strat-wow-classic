import { FunctionComponent } from 'react';
import { shallowEqual } from 'react-redux';
import Component from '../components/SideMenuPlayer';
import { useSelector } from '../hooks/redux';
import { Player } from '../redux/Players';
import { playerSelector } from '../redux/Players/selectors';

export type Props = Pick<Player, 'name'>;

const SideMenuPlayer: FunctionComponent<Props> = ({ name }) => {
  const player = useSelector(playerSelector({ name }), shallowEqual);

  if (!player) {
    return null;
  }
  return <Component {...player} />;
};
export default SideMenuPlayer;
