import { FunctionComponent } from 'react';
import Component, { Props as ComponentProps } from '../components/Zone';
import { useSelector } from '../hooks/redux';
import { Zone as ZoneStateItem } from '../redux/Zones';
import {
  zoneColorSelector,
  zoneIsLeftSelector,
  zoneMarkerSelector,
  zonePositionSelector,
} from '../redux/Zones/selectors';

export type Props = {
  id: ZoneStateItem['id'];
} & Pick<ComponentProps, 'svgHeight' | 'svgWidth'>;

const Zone: FunctionComponent<Props> = props => {
  const { id } = props;
  const color = useSelector(zoneColorSelector(id));
  const marker = useSelector(zoneMarkerSelector(id));
  const position = useSelector(zonePositionSelector(id));
  const isLeft = useSelector(zoneIsLeftSelector(id));

  if (!color || !marker || !position) return null;

  return (
    <Component
      {...props}
      color={color}
      marker={marker}
      horizontal={isLeft ? 'left' : 'right'}
      position={position}
    />
  );
};

export default Zone;
