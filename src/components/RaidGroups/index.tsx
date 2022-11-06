import { Checkbox, Typography } from 'antd';
import { FunctionComponent, memo } from 'react';
import RaidGroupItem from '../../containers/RaidGroupItem';
import classes from './index.module.css';

export type Props = {
  isConfigurable?: boolean;
  areAllGroupsSelected?: boolean;
  groupIds?: number[];
  onToggleShine: () => void;
};

const RaidGroups: FunctionComponent<Props> = memo(
  ({ isConfigurable = false, areAllGroupsSelected = false, groupIds, onToggleShine }) => (
    <div className={classes.container}>
      {isConfigurable && (
        <div className={classes.filters}>
          <Checkbox onChange={onToggleShine} checked={areAllGroupsSelected}>
            <Typography.Text type="secondary">All shine</Typography.Text>
          </Checkbox>
        </div>
      )}

      <div className={classes.groups}>
        {groupIds?.map(id => (
          <div key={`group-${id}`}>
            <RaidGroupItem id={id} />
          </div>
        ))}
      </div>
    </div>
  )
);
RaidGroups.displayName = 'RaidGroups';

export default RaidGroups;
