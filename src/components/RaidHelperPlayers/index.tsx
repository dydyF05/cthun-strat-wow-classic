import { FunctionComponent, memo } from 'react';
import SideMenuPlayers from '../../containers/SideMenuPlayers';
import { CLASS_IMAGES, ROLE_IMAGES } from '../../lib/player';
import { ClassName, Role } from '../../types/index.d';

export type Props = Record<string, never>;

const SideMenu: FunctionComponent<Props> = memo(() => (
  <>
    <SideMenuPlayers
      title="Tanks"
      roles={[Role.Tank]}
      classNames={[ClassName.War, ClassName.Druid, ClassName.Paladin]}
      image={ROLE_IMAGES.Tank}
    />
    <SideMenuPlayers
      title="DD"
      roles={[Role.DpsMelee]}
      classNames={[ClassName.War]}
      image={CLASS_IMAGES.War}
    />
    <SideMenuPlayers title="Rogues" classNames={[ClassName.Rogue]} image={CLASS_IMAGES.Rogue} />
    <SideMenuPlayers
      title="Droods"
      classNames={[ClassName.Druid]}
      image={CLASS_IMAGES.Druid}
      roles={[Role.DpsDistance, Role.Heal, Role.DpsMelee]}
    />
    <SideMenuPlayers title="Priests" classNames={[ClassName.Priest]} image={CLASS_IMAGES.Priest} />
    <SideMenuPlayers title="Shamans" classNames={[ClassName.Shaman]} image={CLASS_IMAGES.Shaman} />
    <SideMenuPlayers
      title="Paladins"
      roles={[Role.DpsMelee, Role.Heal]}
      classNames={[ClassName.Paladin]}
      image={CLASS_IMAGES.Paladin}
    />
    <SideMenuPlayers title="Hunters" classNames={[ClassName.Hunt]} image={CLASS_IMAGES.Hunt} />
    <SideMenuPlayers title="Mages" classNames={[ClassName.Mage]} image={CLASS_IMAGES.Mage} />
    <SideMenuPlayers
      title="Warlocks"
      classNames={[ClassName.Warlock]}
      image={CLASS_IMAGES.Warlock}
    />
  </>
));
SideMenu.displayName = 'SideMenu';

export default SideMenu;
