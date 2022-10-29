import { isEmpty } from 'lodash/fp';
import { FunctionComponent, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/SideMenuPlayers';
import { useDispatch, useSelector } from '../hooks/redux';
import { filteredPlayersSelector, PlayersSelectorFilters } from '../redux/Players/selectors';
import { positionWithPlayersCountSelector } from '../redux/Positions/selectors';
import { setSelectedPlayerAction } from '../redux/Settings';
import { isConfuringSelector } from '../redux/Settings/selectors';

export type Props = PlayersSelectorFilters & Pick<ComponentProps, 'image' | 'title'>;

const DEFAULT_PLAYERS: ComponentProps['players'] = [];

const SideMenuPlayers: FunctionComponent<Props> = ({ roles, classNames, ...props }) => {
  const isEditing = useSelector(isConfuringSelector, shallowEqual);
  const isPreview = !isEditing;
  const players = useSelector(filteredPlayersSelector({ roles, classNames }), shallowEqual);
  const playersPositionedCount = useSelector(
    positionWithPlayersCountSelector(players),
    shallowEqual
  );
  const dispatch = useDispatch();

  const handlePositionPlayer = useCallback<ComponentProps['onPositionPlayer']>(
    id => {
      dispatch(setSelectedPlayerAction(id));
    },
    [dispatch]
  );

  if (isPreview && isEmpty(players)) {
    return null;
  }

  return (
    <Component
      {...props}
      playerPlacedCount={playersPositionedCount}
      isPreview={isPreview}
      players={players || DEFAULT_PLAYERS}
      onPositionPlayer={handlePositionPlayer}
    />
  );
};
export default SideMenuPlayers;
