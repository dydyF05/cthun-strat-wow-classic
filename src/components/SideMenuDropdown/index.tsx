import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { FunctionComponent, useMemo } from 'react';

type Props = {
  isAlliance: boolean;
  onFillClassicPlayers: () => void;
  onNukeAll: () => void;
  onToggleAlliance: () => void;
};

const DropdownMenu: FunctionComponent<Props> = ({
  isAlliance,
  onToggleAlliance,
  onNukeAll,
  onFillClassicPlayers,
}) => {
  const menu = useMemo(
    () => (
      <Menu
        items={[
          {
            key: '1',
            label: <p onClick={onNukeAll}>Nuke all</p>,
          },
          {
            key: '2',
            label: <p onClick={onFillClassicPlayers}>Classic config</p>,
          },
          {
            key: '3',
            label: (
              <p onClick={onToggleAlliance}>
                {isAlliance ? 'Switch to horde' : 'Switch to alliance'}
              </p>
            ),
          },
        ]}
      />
    ),
    [isAlliance, onFillClassicPlayers, onNukeAll, onToggleAlliance]
  );

  return (
    <Dropdown key="more" overlay={menu} placement="bottomRight">
      <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
    </Dropdown>
  );
};

export default DropdownMenu;
