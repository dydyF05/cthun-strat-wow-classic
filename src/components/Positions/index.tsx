import { FunctionComponent, memo, useEffect, useMemo, useRef, useState } from 'react';
import PlayersLine from '../PlayersLine';
import RaidMarkersLine from '../RaidMarkersLine';
import classes from './index.module.css';

export type Props = Record<string, never>;

const LINES_NUMBER = 4;

const Positions: FunctionComponent<Props> = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const [ray, setRay] = useState(0);

  const { firstLineRay, secondLineRay, thirdLineRay, fourthLineRay } = useMemo(
    () => ({
      firstLineRay: ray / LINES_NUMBER,
      secondLineRay: (ray * 2) / LINES_NUMBER,
      thirdLineRay: (ray * 3) / LINES_NUMBER,
      fourthLineRay: (ray * 4) / LINES_NUMBER,
    }),
    [ray]
  );

  useEffect(() => {
    setTimeout(() => {
      ref.current && setRay(ref.current.clientWidth);
    }, 100);
  }, []);

  return (
    <div className={classes.container} ref={ref}>
      <RaidMarkersLine ray={firstLineRay * 0.6} />
      <PlayersLine line="first" ray={firstLineRay} numberOfPlayers={8} trigoDelta={Math.PI / 8} />
      <PlayersLine line="second" ray={secondLineRay} numberOfPlayers={12} />
      <PlayersLine line="third" ray={thirdLineRay} numberOfPlayers={20} trigoDelta={Math.PI / 4} />
      <RaidMarkersLine ray={fourthLineRay} />
    </div>
  );
});
Positions.displayName = 'Positions';

export default Positions;
