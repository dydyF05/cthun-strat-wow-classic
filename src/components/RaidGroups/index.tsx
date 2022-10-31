import { FunctionComponent, memo } from 'react';
import RaidGroupItem from '../../containers/RaidGroupItem';
import classes from './index.module.css';

export type Props = {
  groupIds?: number[];
};

const RaidGroups: FunctionComponent<Props> = memo(({ groupIds }) => (
  <div className={classes.container}>
    {groupIds?.map(id => (
      <div key={`group-${id}`}>
        <RaidGroupItem id={id} />
      </div>
    ))}
  </div>
));
RaidGroups.displayName = 'RaidGroups';

export default RaidGroups;
