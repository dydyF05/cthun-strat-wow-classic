import { FunctionComponent } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/Zones';
import { useSelector } from '../hooks/redux';
import {
  graphHeightSelector,
  graphTopStairsHeight,
  graphWidthSelector,
} from '../redux/Settings/selectors';
import { zoneIdsSelector } from '../redux/Zones/selectors';
export type Props = Omit<ComponentProps, 'width' | 'height' | 'topStairsHeight'>;

const Zones: FunctionComponent<Props> = props => {
  const zoneIds = useSelector(zoneIdsSelector, shallowEqual);
  const height = useSelector(graphHeightSelector, shallowEqual);
  const width = useSelector(graphWidthSelector, shallowEqual);
  const topZoneHeight = useSelector(graphTopStairsHeight, shallowEqual);

  return (
    <Component
      {...props}
      width={width}
      height={height}
      topStairsHeight={topZoneHeight}
      ids={zoneIds}
    />
  );
};

export default Zones;
