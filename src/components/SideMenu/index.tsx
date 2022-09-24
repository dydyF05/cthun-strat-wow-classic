import { Checkbox, PageHeader } from 'antd';
import { FunctionComponent, memo } from 'react';
import SideMenuPlayers from '../../containers/SideMenuPlayers';
import { CLASS_IMAGES, ROLE_IMAGES } from '../../lib/player';
import { ClassName, Role } from '../../types/index.d';
import AddPlayerButton from '../AddPlayerButton';
import classes from './index.module.css';

export type Props = {
  totalCount: number;
  playerPositionedCount: number;
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
    playerPositionedCount,
    tankCount,
    healCount,
    dpsMeleeCount,
    dpsDistanceCount,
    isEditing,
    onToggleConfiguring,
    onAddPlayer,
  }) => (
    <div className={classes.container}>
      <PageHeader
        ghost={false}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className={classes.header}
        title={`Players (${playerPositionedCount} / ${totalCount})`}
        subTitle={`tank(${tankCount}), heal(${healCount}), melee(${dpsMeleeCount}), distance(${dpsDistanceCount})`}
        extra={[
          <Checkbox onChange={onToggleConfiguring} checked={isEditing} key="title-edition-checkbox">
            Edit
          </Checkbox>,
        ]}
      ></PageHeader>
      <div className={classes.players}>
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
        <SideMenuPlayers
          title="Priests"
          classNames={[ClassName.Priest]}
          image={CLASS_IMAGES.Priest}
        />
        <SideMenuPlayers
          title="Shamans"
          classNames={[ClassName.Shaman]}
          image={CLASS_IMAGES.Shaman}
        />
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
      </div>
      {isEditing && (
        <div className={classes.addPlayer}>
          <AddPlayerButton onPress={onAddPlayer} />
        </div>
      )}
    </div>
  )
);
SideMenu.displayName = 'SideMenu';

export default SideMenu;
