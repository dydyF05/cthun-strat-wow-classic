import { FunctionComponent, memo } from 'react';
import classes from './index.module.css';

export type Props = Record<string, never>;

const CenterZone: FunctionComponent<Props> = memo(() => {
  return (
    <div className={classes.container}>
      <p>Boss</p>
    </div>
  );
});
CenterZone.displayName = 'CenterZone';

export default CenterZone;
