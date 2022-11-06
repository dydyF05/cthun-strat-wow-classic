import { Card, Checkbox, Typography } from 'antd';
import { FunctionComponent, memo } from 'react';
import RaidGroupItemIndex from '../../containers/RaidGroupItemIndex';
import { Group } from '../../redux/Groups';
import classes from './index.module.css';

export type Props = {
  id: Group['id'];
  color?: string;
  isConfigurable?: boolean;
  isShining?: boolean;
  slots?: Group['playerIds'];
  onToggleShine: () => void;
};

const RaidGroupItem: FunctionComponent<Props> = memo(
  ({ id, isShining = false, isConfigurable = false, color, slots, onToggleShine }) => (
    <Card
      className={classes.container}
      title={
        <div>
          <Card.Meta title={`Group ${id}`} />
          {isConfigurable && (
            <Checkbox onChange={onToggleShine} checked={isShining}>
              <Typography.Text type="secondary">Shine</Typography.Text>
            </Checkbox>
          )}
        </div>
      }
      headStyle={
        isConfigurable && color
          ? {
              backgroundColor: color,
            }
          : undefined
      }
    >
      {slots?.map((slot, index) => (
        <div key={`raid-group-${id}-player-${index}`} className={classes.item}>
          <RaidGroupItemIndex groupId={id} groupIndex={index} playerId={slot} />
        </div>
      ))}
    </Card>
  )
);
RaidGroupItem.displayName = 'RaidGroupItem';

export default RaidGroupItem;
