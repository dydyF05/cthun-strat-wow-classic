import { omit } from 'lodash/fp';
import { FunctionComponent, useCallback, useLayoutEffect, useRef } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/Position';
import { useDispatch, useSelector } from '../hooks/redux';
import { playerSelector } from '../redux/Players/selectors';
import { computePositionsNeihborsAction, setPlayerPositionAction } from '../redux/Positions';
import { positionMarkerSelector, positionPlayerSelector } from '../redux/Positions/selectors';
import { setSelectedPlayerAction } from '../redux/Settings';
import { selectedPlayerSelector } from '../redux/Settings/selectors';
import { RESIZE_DEBOUNCE_TRIGGER_GRAPH_MEASURES } from '../types/index.d';

export type Props = Omit<ComponentProps, 'marker' | 'containerRef' | 'onPress'>;

let timeoutId: ReturnType<typeof setTimeout>;

let positionsPerId: Record<ComponentProps['id'], { top: number; left: number }> = {};

const Position: FunctionComponent<Props> = props => {
  const ref = useRef<HTMLDivElement>(null);
  const { id, line } = props;

  const dispatch = useDispatch();
  const selectedPlayerId = useSelector(selectedPlayerSelector, shallowEqual);

  const marker = useSelector(positionMarkerSelector({ index: id, line }), shallowEqual);
  const positionPlayerId = useSelector(positionPlayerSelector({ index: id, line }), shallowEqual);

  const positionPlayer = useSelector(playerSelector({ id: positionPlayerId || '' }), shallowEqual);

  const handlePress = useCallback(() => {
    if (selectedPlayerId) {
      dispatch(
        setPlayerPositionAction({
          index: id,
          player: selectedPlayerId,
        })
      );
      dispatch(setSelectedPlayerAction(undefined));
    }
  }, [id, selectedPlayerId, dispatch]);

  const hasPlayer = !!positionPlayerId;

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
      {...omit(['id'], positionPlayer || {})}
      marker={marker}
      hasPlayer={hasPlayer}
      ref={ref}
      onPress={selectedPlayerId ? handlePress : undefined}
    />
  );
};
export default Position;
