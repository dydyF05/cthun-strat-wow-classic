import { FunctionComponent, useEffect, useRef } from 'react';
import Component, { Props as ComponentProps, ZONES_CONTAINER_ID } from '../components/BossRoom';
import { useDispatch } from '../hooks/redux';
import log from '../lib/log';
import { setGraphMeasuresAction } from '../redux/Zones';
import { RESIZE_DEBOUNCE_TRIGGER_GRAPH_MEASURES } from '../types/index.d';

export type Props = Omit<ComponentProps, 'graphContainerRef'>;

const INIT_LOAD_DELAY = 200;

const BossRoom: FunctionComponent<Props> = props => {
  const ref = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const dispatch = useDispatch();

  // Watch over graph width/height on resize to warn redux
  useEffect(() => {
    const updateWidth = () => {
      const width = ref.current?.offsetWidth;
      const height = ref.current?.offsetHeight;

      const zoneDiv = Array.from(ref.current?.children || []).find(
        element => element.id === ZONES_CONTAINER_ID
      ) as HTMLDivElement | undefined;

      if (!height || !width || !zoneDiv) {
        return log({
          message: 'Prevent falsy measure update',
          context: { width, height, node: ref.current, zoneDiv },
        });
      }

      dispatch(setGraphMeasuresAction({ height, width, topStairsHeight: zoneDiv.offsetTop }));
    };

    const handleResize = () => {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(updateWidth, RESIZE_DEBOUNCE_TRIGGER_GRAPH_MEASURES);
    };

    setTimeout(updateWidth, INIT_LOAD_DELAY);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Component {...props} ref={ref} />;
};
export default BossRoom;
