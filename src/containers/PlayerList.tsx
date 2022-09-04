import { FunctionComponent, memo, useCallback, useState } from 'react';
import Component from '../components/PlayerList';

export type Props = Record<string, never>;

const PlayerList: FunctionComponent<Props> = memo(() => {
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  return <Component isVisible={isVisible} onToggle={handleToggle} />;
});
PlayerList.displayName = 'PlayerList';

export default PlayerList;
