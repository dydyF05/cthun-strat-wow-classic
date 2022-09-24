import { FunctionComponent, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/SideMenuPlayers';
import { useDispatch, useSelector } from '../hooks/redux';
import { filteredPlayersSelector, PlayersSelectorFilters } from '../redux/Players/selectors';
import { positionWithPlayersCountSelector } from '../redux/Positions/selectors';
import { setSelectedPlayerAction } from '../redux/Settings';

export type Props = PlayersSelectorFilters & Pick<ComponentProps, 'image' | 'title'>;

const DEFAULT_PLAYERS: ComponentProps['players'] = [];

const SideMenuPlayers: FunctionComponent<Props> = ({ roles, classNames, ...props }) => {
  const players = useSelector(filteredPlayersSelector({ roles, classNames }), shallowEqual);
  const playersPositionedCount = useSelector(
    positionWithPlayersCountSelector(players),
    shallowEqual
  );
  const dispatch = useDispatch();

  const handlePositionPlayer = useCallback<ComponentProps['onPositionPlayer']>(
    name => {
      dispatch(setSelectedPlayerAction(name));
    },
    [dispatch]
  );

  return (
    <Component
      {...props}
      playerPlacedCount={playersPositionedCount}
      players={players || DEFAULT_PLAYERS}
      onPositionPlayer={handlePositionPlayer}
    />
  );
};
export default SideMenuPlayers;
