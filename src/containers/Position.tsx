import { FunctionComponent, useEffect, useLayoutEffect, useRef } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/Position';
import { useDispatch, useSelector } from '../hooks/redux';
import { playerSelector } from '../redux/Players/selectors';
import { computePositionsNeihborsAction, removePlayerFromPositionAction } from '../redux/Positions';
import { positionMarkerSelector, positionPlayerSelector } from '../redux/Positions/selectors';
import { selectedPlayerSelector } from '../redux/Zones/selectors';
import { RESIZE_DEBOUNCE_TRIGGER_GRAPH_MEASURES } from '../types/index.d';

export type Props = Omit<ComponentProps, 'marker' | 'containerRef'>;

let timeoutId: ReturnType<typeof setTimeout>;

let positionsPerId: Record<ComponentProps['id'], { top: number; left: number }> = {};

const Position: FunctionComponent<Props> = props => {
  const ref = useRef<HTMLDivElement>(null);
  const { id, line } = props;

  const dispatch = useDispatch();
  const selectedPlayer = useSelector(selectedPlayerSelector, shallowEqual);

  const marker = useSelector(positionMarkerSelector({ index: id, line }), shallowEqual);
  const positionPlayerName = useSelector(positionPlayerSelector({ index: id, line }), shallowEqual);

  const positionPlayer = useSelector(
    playerSelector({ name: positionPlayerName || '' }),
    shallowEqual
  );

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
      isChoosingPositionForPlayer={!!selectedPlayer}
      hasPlayer={hasPlayer}
      ref={ref}
    />
  );
};
export default Position;
