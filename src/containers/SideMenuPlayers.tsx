import { FunctionComponent } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/SideMenuPlayers';
import { useSelector } from '../hooks/redux';
import { filteredPlayersSelector, PlayersSelectorFilters } from '../redux/Players/selectors';

export type Props = PlayersSelectorFilters & Pick<ComponentProps, 'image' | 'title'>;

const SideMenuPlayers: FunctionComponent<Props> = ({ role, className, ...props }) => {
  const players = useSelector(filteredPlayersSelector({ role, className }), shallowEqual);

  if (!players?.length) {
    return null;
  }
  return <Component {...props} players={players} />;
};
export default SideMenuPlayers;
