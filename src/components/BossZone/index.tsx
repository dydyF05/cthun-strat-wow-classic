import { FunctionComponent, memo } from 'react';
import classes from './index.module.css';

export type Props = Record<string, never>;

const BossZone: FunctionComponent<Props> = memo(() => {
  return (
    <div className={classes.container}>
      <p>Boss</p>
    </div>
  );
});
BossZone.displayName = 'BossZone';

export default BossZone;
