import { FunctionComponent, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import ModalPlayerPositionChoosing, {
  Props as ModalProps,
} from '../components/ModalPlayerPositionChoosing';
import Component, { Props as ComponentProps } from '../components/SideMenuPlayers';
import { useDispatch, useSelector } from '../hooks/redux';
import { filteredPlayersSelector, PlayersSelectorFilters } from '../redux/Players/selectors';
import { setPlayerPositionAction } from '../redux/Positions';
import { positionWithPlayersCountSelector } from '../redux/Positions/selectors';
import { setSelectedPlayerAction } from '../redux/Settings';
import { selectedPlayerSelector } from '../redux/Settings/selectors';

export type Props = PlayersSelectorFilters & Pick<ComponentProps, 'image' | 'title'>;

const DEFAULT_PLAYERS: ComponentProps['players'] = [];

const SideMenuPlayers: FunctionComponent<Props> = ({ roles, classNames, ...props }) => {
  const selectedPlayer = useSelector(selectedPlayerSelector, shallowEqual);
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
        playerPlacedCount={playersPositionedCount}
        players={players || DEFAULT_PLAYERS}
        onPositionPlayer={handlePositionPlayer}
      />
    </>
  );
};
export default SideMenuPlayers;
