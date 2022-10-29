import { Checkbox, PageHeader, Tabs, Typography } from 'antd';
import { FunctionComponent, memo } from 'react';
import Dropdown from '../../containers/SideMenuDropdown';
import AddPlayerButton from '../AddPlayerButton';
import RaidGroups from '../RaidGroups';
import RaidHelperPlayers, { Props as RaidHelperPlayersProps } from '../RaidHelperPlayers';
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
} & RaidHelperPlayersProps;

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
    ...props
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
            <Typography.Text type="secondary">Edit</Typography.Text>
          </Checkbox>,
          <Dropdown key="side-menu-dropdown" />,
        ]}
      ></PageHeader>
      <Tabs
        defaultActiveKey="rh"
        style={{ width: '100%', background: 'white', overflowY: 'scroll' }}
      >
        <Tabs.TabPane tab="classes" key="rh" tabKey="rh" style={{ flex: 1 }}>
          <div className={classes.players}>
            <RaidHelperPlayers {...props} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="groups" key="groups" tabKey="groups" style={{ flex: 1 }}>
          <div className={classes.raidGroups}>
            <RaidGroups />
          </div>
        </Tabs.TabPane>
      </Tabs>
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
