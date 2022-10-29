import { FunctionComponent, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/SideMenuPlayer';
import { useDispatch, useSelector } from '../hooks/redux';
import { Player, removeManyAction } from '../redux/Players';
import { playerSelector } from '../redux/Players/selectors';
import { removePlayersFromPositionAction } from '../redux/Positions';
import { positionForPlayer } from '../redux/Positions/selectors';
import { isConfuringSelector, selectedPlayerSelector } from '../redux/Settings/selectors';

export type Props = Pick<Player, 'id'> &
  Pick<ComponentProps, 'onPosition'> & {
    onEditPlayer: (id: Player['id']) => void;
  };

const SideMenuPlayer: FunctionComponent<Props> = ({ id, onEditPlayer, ...props }) => {
  const player = useSelector(playerSelector({ id }), shallowEqual);
  const position = useSelector(positionForPlayer(id));
  const isConfiguringRoster = useSelector(isConfuringSelector, shallowEqual);
  const isPositioningSomePlayer = useSelector(selectedPlayerSelector, shallowEqual);
  const dispatch = useDispatch();

  const positionIndex = position?.index;

  const handleDelete = useCallback(() => {
    dispatch(removeManyAction([id]));
  }, [id, dispatch]);

  const handlePositionDelete = useCallback(() => {
    positionIndex && dispatch(removePlayersFromPositionAction([positionIndex]));
  }, [positionIndex, dispatch]);

  const handlePlayerEdit = useCallback(() => {
    onEditPlayer(id);
  }, [id]);

  if (!player) {
    return null;
  }

  return (
    <Component
      {...props}
      {...player}
      positionIndex={position?.index}
      positionMarker={position?.marker}
      isPreview={!isConfiguringRoster || !!isPositioningSomePlayer}
      onDeletePlayer={handleDelete}
      onPositionDelete={handlePositionDelete}
      onEditPlayer={handlePlayerEdit}
    />
  );
};
export default SideMenuPlayer;
