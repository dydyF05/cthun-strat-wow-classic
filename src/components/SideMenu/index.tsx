import { MoreOutlined } from '@ant-design/icons';
import { Button, Checkbox, Dropdown, Menu, PageHeader, Tabs, Typography } from 'antd';
import { FunctionComponent, memo } from 'react';
import AddPlayerButton from '../AddPlayerButton';
import RaidGroups from '../RaidGroups';
import RaidHelperPlayers from '../RaidHelperPlayers';
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

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="#">
            tazydguefhijogkprezijuf
          </a>
        ),
      },
    ]}
  />
);

const DropdownMenu = () => (
  <Dropdown key="more" overlay={menu} placement="bottomRight">
    <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
  </Dropdown>
);

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
            <Typography.Text type="secondary">Edit</Typography.Text>
          </Checkbox>,
          <DropdownMenu key="more" />,
        ]}
      ></PageHeader>
      <Tabs
        defaultActiveKey="rh"
        style={{ width: '100%', background: 'white', overflowY: 'scroll' }}
      >
        <Tabs.TabPane tab="classes" key="rh" tabKey="rh" style={{ flex: 1 }}>
          <div className={classes.players}>
            <RaidHelperPlayers />
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
