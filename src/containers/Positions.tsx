import { FunctionComponent } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/Positions';
import { useSelector } from '../hooks/redux';
import {
  bossZoneSizeRatioSelector,
  graphHeightSelector,
  graphTopStairsHeight,
  graphWidthSelector,
  minimalPixelDistanceBetweenPlayersSelector,
} from '../redux/Settings/selectors';

export type Props = Omit<
  ComponentProps,
  | 'firstLineDistance'
  | 'secondLineDistance'
  | 'thirdLineDistance'
  | 'graphWidth'
  | 'graphHeight'
  | 'graphTopStairsHeight'
  | 'bossZoneRatio'
>;

const Positions: FunctionComponent<Props> = props => {
  const minimalPixelDistanceBetweenPlayers = useSelector(
    minimalPixelDistanceBetweenPlayersSelector,
    shallowEqual
  );
  const graphWidth = useSelector(graphWidthSelector, shallowEqual);
  const graphHeight = useSelector(graphHeightSelector, shallowEqual);
  const graphTopZoneHeight = useSelector(graphTopStairsHeight, shallowEqual);
  const bossZoneRatio = useSelector(bossZoneSizeRatioSelector, shallowEqual);

  return (
    <Component
      {...props}
      graphWidth={graphWidth}
      graphHeight={graphHeight}
      graphTopStairsHeight={graphTopZoneHeight}
      minimalPixelDistanceBetweenPlayers={minimalPixelDistanceBetweenPlayers}
      bossZoneRatio={bossZoneRatio}
    />
  );
};
export default Positions;
