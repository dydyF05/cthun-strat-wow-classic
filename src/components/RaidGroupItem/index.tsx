import { FunctionComponent, memo } from 'react';
import { Group } from '../../redux/Groups';
import classes from './index.module.css';

export type Props = {
  id: Group['id'];
  slots?: Group['playerIds'];
};

// @TODO create a generic InlinePlayer container+component to print a player
const RaidGroupItem: FunctionComponent<Props> = memo(({ id, slots }) => (
  <div className={classes.container}>
    <p>Group {id}</p>
    <div>
      {slots?.map((slot, index) => (
        <div key={`raid-group-${id}-player-${index}`}>{index}</div>
      ))}
    </div>
  </div>
));
RaidGroupItem.displayName = 'RaidGroupItem';

export default RaidGroupItem;
