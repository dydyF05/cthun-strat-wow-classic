import { FunctionComponent, memo } from 'react';
import classes from './index.module.css';

export type Props = {
  bottom: number;
  left: number;
};

const Position: FunctionComponent<Props> = memo(({ bottom, left }) => {
  return <div className={classes.container} style={{ bottom, left }} />;
});
Position.displayName = 'Position';

export default Position;
