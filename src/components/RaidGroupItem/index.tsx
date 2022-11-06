import { Card } from 'antd';
import { FunctionComponent, memo } from 'react';
import RaidGroupItemIndex from '../../containers/RaidGroupItemIndex';
import { Group } from '../../redux/Groups';
import classes from './index.module.css';

export type Props = {
  id: Group['id'];
  slots?: Group['playerIds'];
};

const RaidGroupItem: FunctionComponent<Props> = memo(({ id, slots }) => (
  <Card className={classes.container} title={`Group ${id}`}>
    {slots?.map((slot, index) => (
      <div key={`raid-group-${id}-player-${index}`} className={classes.item}>
        <RaidGroupItemIndex groupId={id} groupIndex={index} playerId={slot} />
      </div>
    ))}
  </Card>
));
RaidGroupItem.displayName = 'RaidGroupItem';

export default RaidGroupItem;
