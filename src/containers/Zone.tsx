import { FunctionComponent } from 'react';
import Component, { Props as ComponentProps } from '../components/Zone';
import { useSelector } from '../hooks/redux';
import { Zone as ZoneType, ZoneId } from '../redux/Zones';
import { zoneColorSelector, zoneMarkerSelector } from '../redux/Zones/selectors';

export type Props = {
  id: ZoneType['id'];
} & Pick<ComponentProps, 'svgHeight' | 'svgWidth'>;

const PROPS_PER_ID: Record<ZoneId, Pick<ComponentProps, 'horizontal' | 'position'>> = {
  [ZoneId.One]: { horizontal: 'left', position: 'up' },
  [ZoneId.Two]: { horizontal: 'left', position: 'middle-up' },
  [ZoneId.Three]: { horizontal: 'left', position: 'middle-bottom' },
  [ZoneId.Four]: { horizontal: 'left', position: 'bottom' },
  [ZoneId.Five]: { horizontal: 'right', position: 'bottom' },
  [ZoneId.Six]: { horizontal: 'right', position: 'middle-bottom' },
  [ZoneId.Seven]: { horizontal: 'right', position: 'middle-up' },
  [ZoneId.Eight]: { horizontal: 'right', position: 'up' },
};

const Zone: FunctionComponent<Props> = ({ id, ...props }) => {
  const color = useSelector(zoneColorSelector(id));
  const marker = useSelector(zoneMarkerSelector(id));

  if (!color || !marker) return null;

  return <Component {...props} color={color} marker={marker} {...PROPS_PER_ID[id]} />;
};

export default Zone;
