import { FunctionComponent } from 'react';
import { shallowEqual } from 'react-redux';
import Component from '../components/RaidGroups';
import { useSelector } from '../hooks/redux';
import { groupIdsSelector } from '../redux/Groups/selectors';

export type Props = Record<string, never>;

const RaidGroups: FunctionComponent<Props> = () => {
  const groupIds = useSelector(groupIdsSelector, shallowEqual);

  return <Component groupIds={groupIds} />;
};
export default RaidGroups;
