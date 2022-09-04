import { FunctionComponent, memo, useEffect, useMemo, useRef, useState } from 'react';
import PlayersLine from '../../containers/PlayersLine';
import classes from './index.module.css';

export type Props = Record<string, never>;

const LINES_NUMBER = 4;

const Positions: FunctionComponent<Props> = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const [ray, setRay] = useState(0);

  const { firstLineRay, secondLineRay, thirdLineRay } = useMemo(
    () => ({
      firstLineRay: ray / LINES_NUMBER,
      secondLineRay: (ray * 2.3) / LINES_NUMBER,
      thirdLineRay: (ray * 3.6) / LINES_NUMBER,
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
      <PlayersLine line="first" ray={firstLineRay} numberOfPlayers={8} trigoDelta={Math.PI / 8} />
      <PlayersLine line="second" ray={secondLineRay} numberOfPlayers={12} />
      <PlayersLine line="third" ray={thirdLineRay} numberOfPlayers={20} trigoDelta={Math.PI / 4} />
    </div>
  );
});
Positions.displayName = 'Positions';

export default Positions;
