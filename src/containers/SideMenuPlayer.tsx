import { FunctionComponent, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/SideMenuPlayer';
import { useDispatch, useSelector } from '../hooks/redux';
import { Player, removeManyAction } from '../redux/Players';
import { playerSelector } from '../redux/Players/selectors';
import { removePlayersFromPositionAction } from '../redux/Positions';
import { positionForPlayer } from '../redux/Positions/selectors';
import { isConfuringSelector, selectedPlayerSelector } from '../redux/Settings/selectors';

export type Props = Pick<Player, 'name'> & Pick<ComponentProps, 'onPosition'>;

const SideMenuPlayer: FunctionComponent<Props> = ({ name, ...props }) => {
  const player = useSelector(playerSelector({ name }), shallowEqual);
  const position = useSelector(positionForPlayer(name));
  const isEditing = useSelector(isConfuringSelector, shallowEqual);
  const isPositioningSomePlayer = useSelector(selectedPlayerSelector, shallowEqual);
  const dispatch = useDispatch();

  const positionIndex = position?.index;

  const handleDelete = useCallback(() => {
    player && dispatch(removeManyAction([player.name]));
  }, [player, dispatch]);

  const handlePositionDelete = useCallback(() => {
    positionIndex && dispatch(removePlayersFromPositionAction([positionIndex]));
  }, [positionIndex, dispatch]);

  if (!player) {
    return null;
  }

  return (
    <Component
      {...props}
      {...player}
      positionIndex={position?.index}
      positionMarker={position?.marker}
      areActionsHidden={!isEditing || !!isPositioningSomePlayer}
      onDeletePlayer={handleDelete}
      onPositionDelete={handlePositionDelete}
    />
  );
};
export default SideMenuPlayer;
