import { FunctionComponent, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/Zones';
import { useSelector } from '../hooks/redux';
import {
  bossZoneSizeRatioSelector,
  graphHeightSelector,
  graphTopStairsHeight,
  graphWidthSelector,
} from '../redux/Settings/selectors';
import { zoneIdsSelector } from '../redux/Zones/selectors';

export type Props = Omit<ComponentProps, 'width' | 'height' | 'topStairsHeight' | 'bossZoneSize'>;

const Zones: FunctionComponent<Props> = props => {
  const zoneIds = useSelector(zoneIdsSelector, shallowEqual);
  const height = useSelector(graphHeightSelector, shallowEqual);
  const width = useSelector(graphWidthSelector, shallowEqual);
  const centerZoneSizeRatio = useSelector(bossZoneSizeRatioSelector, shallowEqual);
  const topZoneHeight = useSelector(graphTopStairsHeight, shallowEqual);

  const centerZoneSize = useMemo<number>(
    () => centerZoneSizeRatio * (width - 20),
    [centerZoneSizeRatio, width]
  );

  return (
    <Component
      {...props}
      width={width}
      height={height}
      bossZoneSize={centerZoneSize}
      topStairsHeight={topZoneHeight}
      ids={zoneIds}
    />
  );
};

export default Zones;
