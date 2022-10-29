import { FunctionComponent, memo } from 'react';
import SideMenuPlayers, { Props as SideMenuPlayersProps } from '../../containers/SideMenuPlayers';
import { CLASS_IMAGES, ROLE_IMAGES } from '../../lib/player';
import { ClassName, Role } from '../../types/index.d';

export type Props = {
  isAlliance?: boolean;
} & Pick<SideMenuPlayersProps, 'onEditPlayer'>;

const SideMenu: FunctionComponent<Props> = memo(({ isAlliance = false.valueOf, ...props }) => (
  <>
    <SideMenuPlayers
      {...props}
      title="Tanks"
      roles={[Role.Tank]}
      classNames={[ClassName.War, ClassName.Druid, ClassName.Paladin]}
      image={ROLE_IMAGES.Tank}
    />
    <SideMenuPlayers
      {...props}
      title="DD"
      roles={[Role.DpsMelee]}
      classNames={[ClassName.War]}
      image={CLASS_IMAGES.War}
    />
    <SideMenuPlayers
      {...props}
      title="Rogues"
      classNames={[ClassName.Rogue]}
      image={CLASS_IMAGES.Rogue}
    />
    <SideMenuPlayers
      {...props}
      title="Droods"
      classNames={[ClassName.Druid]}
      image={CLASS_IMAGES.Druid}
      roles={[Role.DpsDistance, Role.Heal, Role.DpsMelee]}
    />
    <SideMenuPlayers
      {...props}
      title="Priests"
      classNames={[ClassName.Priest]}
      image={CLASS_IMAGES.Priest}
    />
    {!isAlliance && (
      <SideMenuPlayers
        {...props}
        title="Shamans"
        classNames={[ClassName.Shaman]}
        image={CLASS_IMAGES.Shaman}
      />
    )}
    {isAlliance && (
      <SideMenuPlayers
        {...props}
        title="Paladins"
        roles={[Role.DpsMelee, Role.Heal]}
        classNames={[ClassName.Paladin]}
        image={CLASS_IMAGES.Paladin}
      />
    )}
    <SideMenuPlayers
      {...props}
      title="Hunters"
      classNames={[ClassName.Hunt]}
      image={CLASS_IMAGES.Hunt}
    />
    <SideMenuPlayers
      {...props}
      title="Mages"
      classNames={[ClassName.Mage]}
      image={CLASS_IMAGES.Mage}
    />
    <SideMenuPlayers
      {...props}
      title="Warlocks"
      classNames={[ClassName.Warlock]}
      image={CLASS_IMAGES.Warlock}
    />
  </>
));
SideMenu.displayName = 'SideMenu';

export default SideMenu;
