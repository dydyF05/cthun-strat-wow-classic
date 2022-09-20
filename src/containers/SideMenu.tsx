import { FunctionComponent, memo, useCallback, useState } from 'react';
import Component from '../components/SideMenu';

export type Props = Record<string, never>;

const SideMenu: FunctionComponent<Props> = memo(() => {
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  return <Component isVisible={isVisible} onToggle={handleToggle} />;
});
SideMenu.displayName = 'SideMenu';

export default SideMenu;
