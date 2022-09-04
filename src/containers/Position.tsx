import { FunctionComponent } from 'react';
import Component, { Props as ComponentProps } from '../components/Position';
import { useSelector } from '../hooks/redux';
import { positionMarkerSelector } from '../redux/Positions/selectors';

export type Props = Omit<ComponentProps, 'marker'>;

const Position: FunctionComponent<Props> = props => {
  const { id, line } = props;

  const marker = useSelector(positionMarkerSelector({ index: id, line }));

  return <Component {...props} marker={marker} />;
};
export default Position;
