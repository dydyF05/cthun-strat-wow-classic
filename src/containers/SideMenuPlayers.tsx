import { FunctionComponent, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import ModalPlayerPositionChoosing, {
  Props as ModalProps,
} from '../components/ModalPlayerPositionChoosing';
import Component, { Props as ComponentProps } from '../components/SideMenuPlayers';
import { useDispatch, useSelector } from '../hooks/redux';
import { filteredPlayersSelector, PlayersSelectorFilters } from '../redux/Players/selectors';
import { setPlayerPositionAction } from '../redux/Positions';
import { setSelectedPlayerAction } from '../redux/Zones';
import { selectedPlayerSelector } from '../redux/Zones/selectors';

export type Props = PlayersSelectorFilters & Pick<ComponentProps, 'image' | 'title'>;

const DEFAULT_PLAYERS: ComponentProps['players'] = [];

const SideMenuPlayers: FunctionComponent<Props> = ({ role, className, ...props }) => {
  const selectedPlayer = useSelector(selectedPlayerSelector, shallowEqual);
  const players = useSelector(filteredPlayersSelector({ role, className }), shallowEqual);
  const dispatch = useDispatch();

  const handlePlayerPress = useCallback<ComponentProps['onPlayerPress']>(
    name => {
      dispatch(setSelectedPlayerAction(name));
    },
    [dispatch]
  );

  const handleCancelPress = useCallback(() => {
    dispatch(setSelectedPlayerAction());
  }, [dispatch]);

  const handleChoosePosition = useCallback<ModalProps['onSelect']>(
    ({ index }) => {
      dispatch(
        setPlayerPositionAction({
          index: index,
          player: selectedPlayer,
        })
      );
      handleCancelPress();
    },
    [dispatch, selectedPlayer, handleCancelPress]
  );

  return (
    <>
      <ModalPlayerPositionChoosing
        isVisible={!!selectedPlayer}
        onCancel={handleCancelPress}
        onSelect={handleChoosePosition}
      />
      <Component
        {...props}
        players={players || DEFAULT_PLAYERS}
        onPlayerPress={handlePlayerPress}
      />
    </>
  );
};
export default SideMenuPlayers;
