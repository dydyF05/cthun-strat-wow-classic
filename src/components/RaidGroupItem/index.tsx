import { FunctionComponent, memo } from 'react';
import { Player } from '../../redux/Players';
import classes from './index.module.css';

export type Props = {
  id: number;
  playerIds: Player['id'][];
};

// @TODO create a generic InlinePlayer container+component to print a player
const RaidGroupItem: FunctionComponent<Props> = memo(({ id, playerIds }) => (
  <div className={classes.container}>
    <p>Group {id}</p>
    <div>
      {playerIds?.map(playerId => (
        <div key={`raid-group-${id}-player-${playerId}`}>{playerId}</div>
      ))}
    </div>
  </div>
));
RaidGroupItem.displayName = 'RaidGroupItem';

export default RaidGroupItem;
