import { FunctionComponent, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/Position';
import { useDispatch, useSelector } from '../hooks/redux';
import { playerSelector } from '../redux/Players/selectors';
import {
  computePositionsNeihborsAction,
  removePlayerFromPositionAction,
  setPlayerPositionAction,
} from '../redux/Positions';
import { positionMarkerSelector, positionPlayerSelector } from '../redux/Positions/selectors';
import { setSelectedPlayerAction } from '../redux/Settings';
import { isConfuringSelector, selectedPlayerSelector } from '../redux/Settings/selectors';
import { RESIZE_DEBOUNCE_TRIGGER_GRAPH_MEASURES } from '../types/index.d';

export type Props = Omit<ComponentProps, 'marker' | 'containerRef' | 'onPress'>;

let timeoutId: ReturnType<typeof setTimeout>;

let positionsPerId: Record<ComponentProps['id'], { top: number; left: number }> = {};

const Position: FunctionComponent<Props> = props => {
  const ref = useRef<HTMLDivElement>(null);
  const { id, line } = props;

  const dispatch = useDispatch();
  const selectedPlayer = useSelector(selectedPlayerSelector, shallowEqual);
  const isEditing = useSelector(isConfuringSelector, shallowEqual);

  const marker = useSelector(positionMarkerSelector({ index: id, line }), shallowEqual);
  const positionPlayerName = useSelector(positionPlayerSelector({ index: id, line }), shallowEqual);

  const positionPlayer = useSelector(
    playerSelector({ name: positionPlayerName || '' }),
    shallowEqual
  );

  const handlePress = useCallback(() => {
    if (selectedPlayer) {
      dispatch(
        setPlayerPositionAction({
          index: id,
          player: selectedPlayer,
        })
      );
      dispatch(setSelectedPlayerAction(undefined));
    }
  }, [id, selectedPlayer, dispatch]);

  const shouldDeletePlayerIdFromPosition = !!positionPlayerName && !positionPlayer;

  useEffect(() => {
    if (shouldDeletePlayerIdFromPosition) {
      dispatch(removePlayerFromPositionAction(id));
    }
  }, [shouldDeletePlayerIdFromPosition, id, dispatch]);

  const hasPlayer = !!positionPlayerName;

  useLayoutEffect(() => {
    const triggerComputePosition = () => {
      if (!ref.current?.offsetLeft || !ref.current?.offsetTop) {
        return;
      }

      positionsPerId[id] = {
        top: ref.current.offsetTop,
        left: ref.current.offsetLeft,
      };

      // Prevent redux spam
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(computePositionsNeihborsAction(positionsPerId));
        positionsPerId = {};
      }, RESIZE_DEBOUNCE_TRIGGER_GRAPH_MEASURES + 10);
    };
    triggerComputePosition();

    window.addEventListener('resize', triggerComputePosition);

    return () => {
      delete positionsPerId[id];
      window.removeEventListener('resize', triggerComputePosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Component
      {...props}
      {...(positionPlayer || {})}
      marker={marker}
      hasPlayer={hasPlayer}
      isEditing={isEditing}
      ref={ref}
      onPress={selectedPlayer ? handlePress : undefined}
    />
  );
};
export default Position;
