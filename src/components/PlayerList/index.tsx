import { FunctionComponent, memo } from 'react';
import { Player } from '../../redux/Players';
import classes from './index.module.css';

export type Props = {
  ids?: Player['name'][];
};

const PlayerList: FunctionComponent<Props> = memo(({ ids }) => {
  if (!ids?.length) {
    return (
      <div className={classes.emptyContainer}>
        <h2>No Players yet</h2>
      </div>
    );
  }

  return null;
});
PlayerList.displayName = 'PlayerList';

export default PlayerList;
