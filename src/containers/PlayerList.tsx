import { FunctionComponent, memo } from 'react';
import Component from '../components/PlayerList';

export type Props = Record<string, never>;

const PlayerList: FunctionComponent<Props> = memo(() => {
  return <Component />;
});
PlayerList.displayName = 'PlayerList';

export default PlayerList;
