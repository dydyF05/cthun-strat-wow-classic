import { FunctionComponent, memo } from 'react';
import SideMenuPlayers from '../../containers/SideMenuPlayers';
import { CLASS_IMAGES, ROLE_IMAGES } from '../../lib/player';
import { ClassName, Role } from '../../types/index.d';
import AddPlayerButton from '../AddPlayerButton';
import classes from './index.module.css';

export type Props = {
  totalCount: number;
  tankCount: number;
  healCount: number;
  dpsMeleeCount: number;
  dpsDistanceCount: number;
  isEditing: boolean;
  onAddPlayer: () => void;
  onToggleConfiguring: () => void;
};

const SideMenu: FunctionComponent<Props> = memo(
  ({
    totalCount,
    tankCount,
    healCount,
    dpsMeleeCount,
    dpsDistanceCount,
    isEditing,
    onToggleConfiguring,
    onAddPlayer,
  }) => {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>
            Players({totalCount}) <br />
            <span>
              tank({tankCount}), heal({healCount}), melee({dpsMeleeCount}
              ), distance({dpsDistanceCount})
            </span>
            <div className={classes.addPlayer}>
              <AddPlayerButton onPress={onAddPlayer} />
            </div>
          </h2>

          <div className={classes.configuring}>
            <p onClick={onToggleConfiguring}>Editing</p>
            <input type="checkbox" checked={isEditing} onChange={onToggleConfiguring} />
          </div>
        </div>
        <div className={classes.players}>
          <SideMenuPlayers
            title="Tanks"
            role={[Role.Tank]}
            className={[ClassName.War, ClassName.Druid, ClassName.Paladin]}
            image={ROLE_IMAGES.Tank}
          />
          <SideMenuPlayers
            title="DD"
            role={[Role.DpsMelee]}
            className={[ClassName.War]}
            image={CLASS_IMAGES.War}
          />
          <SideMenuPlayers
            title="Rogues"
            className={[ClassName.Rogue]}
            image={CLASS_IMAGES.Rogue}
          />
          <SideMenuPlayers
            title="Droods"
            className={[ClassName.Druid]}
            image={CLASS_IMAGES.Druid}
            role={[Role.DpsDistance, Role.Heal, Role.DpsMelee]}
          />
          <SideMenuPlayers
            title="Priests"
            className={[ClassName.Priest]}
            image={CLASS_IMAGES.Priest}
          />
          <SideMenuPlayers
            title="Shamans"
            className={[ClassName.Shaman]}
            image={CLASS_IMAGES.Shaman}
          />
          <SideMenuPlayers
            title="Paladins"
            role={[Role.DpsMelee, Role.Heal]}
            className={[ClassName.Paladin]}
            image={CLASS_IMAGES.Paladin}
          />
          <SideMenuPlayers title="Hunters" className={[ClassName.Hunt]} image={CLASS_IMAGES.Hunt} />
          <SideMenuPlayers title="Mages" className={[ClassName.Mage]} image={CLASS_IMAGES.Mage} />
          <SideMenuPlayers
            title="Warlocks"
            className={[ClassName.Warlock]}
            image={CLASS_IMAGES.Warlock}
          />
        </div>
      </div>
    );
  }
);
SideMenu.displayName = 'SideMenu';

export default SideMenu;
