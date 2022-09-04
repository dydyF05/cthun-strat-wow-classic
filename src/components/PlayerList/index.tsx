import { FunctionComponent, memo } from 'react';
import classes from './index.module.css';

export type Props = {
  isVisible: boolean;
  onToggle: () => void;
};

const PlayerList: FunctionComponent<Props> = memo(({ isVisible, onToggle }) => {
  return (
    <div className={classes.container} data-visible={isVisible}>
      <div className={classes.title}>
        {isVisible && <h2>Players</h2>}
        <div className={classes.burger} onClick={onToggle}>
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
});
PlayerList.displayName = 'PlayerList';

export default PlayerList;
