import { FunctionComponent } from 'react';
import Component from '../components/Zones';
import { useSelector } from '../hooks/redux';
import { zoneIdsSelector } from '../redux/Zones/selectors';

export type Props = Record<string, never>;

const Zones: FunctionComponent<Props> = () => {
  const zoneIds = useSelector(zoneIdsSelector);

  return <Component ids={zoneIds} />;
};

export default Zones;
