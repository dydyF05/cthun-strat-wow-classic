import { FunctionComponent } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/Positions';
import { useSelector } from '../hooks/redux';
import {
  firstLineDistanceSelector,
  graphWidthSelector,
  secondLineDistanceSelector,
  thirdLineDistanceSelector,
} from '../redux/Zones/selectors';

export type Props = Omit<
  ComponentProps,
  'firstLineDistance' | 'secondLineDistance' | 'thirdLineDistance' | 'graphWidth'
>;

const Positions: FunctionComponent<Props> = props => {
  const firstLine = useSelector(firstLineDistanceSelector, shallowEqual);
  const secondLine = useSelector(secondLineDistanceSelector, shallowEqual);
  const thirdLine = useSelector(thirdLineDistanceSelector, shallowEqual);
  const graphWidth = useSelector(graphWidthSelector, shallowEqual);

  return (
    <Component
      {...props}
      graphWidth={graphWidth}
      firstLineDistance={firstLine}
      secondLineDistance={secondLine}
      thirdLineDistance={thirdLine}
    />
  );
};
export default Positions;
