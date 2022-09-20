import { FunctionComponent, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/ModalPositions';
import { useSelector } from '../hooks/redux';
import { playerSelector } from '../redux/Players/selectors';
import { positionsSelector } from '../redux/Positions/selectors';
import { selectedPlayerSelector } from '../redux/Zones/selectors';

export type Props = Pick<ComponentProps, 'onSelect'>;

const ModalPositions: FunctionComponent<Props> = props => {
  const selectedPlayer = useSelector(selectedPlayerSelector, shallowEqual);
  const player = useSelector(playerSelector({ name: selectedPlayer || '' }), shallowEqual);
  const positions = useSelector(positionsSelector, shallowEqual);

  const items = useMemo<ComponentProps['items']>(() => {
    return positions.map<ComponentProps['items'][0]>(position => ({
      index: position.index,
      marker: position.marker,
      playerName: position.playerId,
    }));
  }, [positions]);

  if (!player) return null;

  return <Component {...props} {...player} items={items} />;
};
export default ModalPositions;
