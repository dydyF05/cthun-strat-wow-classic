import { FunctionComponent, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/SideMenuPlayer';
import { useDispatch, useSelector } from '../hooks/redux';
import { Player, removeManyAction } from '../redux/Players';
import { playerSelector } from '../redux/Players/selectors';
import { removePlayerFromPositionAction } from '../redux/Positions';
import { positionForPlayer } from '../redux/Positions/selectors';
import { isConfuringSelector } from '../redux/Settings/selectors';

export type Props = Pick<Player, 'name'> & Pick<ComponentProps, 'onPosition'>;

const SideMenuPlayer: FunctionComponent<Props> = ({ name, ...props }) => {
  const player = useSelector(playerSelector({ name }), shallowEqual);
  const position = useSelector(positionForPlayer(name));
  const isEditing = useSelector(isConfuringSelector, shallowEqual);
  const dispatch = useDispatch();

  const positionIndex = position?.index;

  const handleDelete = useCallback(() => {
    player && dispatch(removeManyAction([player.name]));
  }, [player, dispatch]);

  const handlePositionDelete = useCallback(() => {
    positionIndex && dispatch(removePlayerFromPositionAction(positionIndex));
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
      isEditing={isEditing}
      onDeletePlayer={handleDelete}
      onPositionDelete={handlePositionDelete}
    />
  );
};
export default SideMenuPlayer;
