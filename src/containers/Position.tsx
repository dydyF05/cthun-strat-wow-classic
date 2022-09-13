import { FunctionComponent, useLayoutEffect, useRef } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/Position';
import { useDispatch, useSelector } from '../hooks/redux';
import { computePositionsNeihborsAction } from '../redux/Positions';
import { positionMarkerSelector } from '../redux/Positions/selectors';
import { RESIZE_DEBOUNCE_TRIGGER_GRAPH_MEASURES } from '../types/index.d';

export type Props = Omit<ComponentProps, 'marker' | 'containerRef'>;

let timeoutId: ReturnType<typeof setTimeout>;

let positionsPerId: Record<ComponentProps['id'], { top: number; left: number }> = {};

const Position: FunctionComponent<Props> = props => {
  const ref = useRef<HTMLDivElement>(null);
  const { id, line } = props;

  const dispatch = useDispatch();

  const marker = useSelector(positionMarkerSelector({ index: id, line }), shallowEqual);

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

  return <Component {...props} marker={marker} ref={ref} />;
};
export default Position;
