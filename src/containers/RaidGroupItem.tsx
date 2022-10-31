import { FunctionComponent } from 'react';
import { shallowEqual } from 'react-redux';
import Component from '../components/RaidGroupItem';
import { useSelector } from '../hooks/redux';
import { Group } from '../redux/Groups';
import { groupSlotsSelector } from '../redux/Groups/selectors';

export type Props = {
  id: Group['id'];
};

const RaidGroupItem: FunctionComponent<Props> = ({ id }) => {
  const slots = useSelector(groupSlotsSelector(id), shallowEqual);

  return <Component id={id} slots={slots} />;
};
export default RaidGroupItem;
