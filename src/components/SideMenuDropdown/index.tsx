import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { FunctionComponent, useMemo } from 'react';

type Props = {
  onFillClassicPlayers: () => void;
  onNukeAll: () => void;
};

const DropdownMenu: FunctionComponent<Props> = ({ onNukeAll, onFillClassicPlayers }) => {
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
        ]}
      />
    ),
    [onFillClassicPlayers, onNukeAll]
  );

  return (
    <Dropdown key="more" overlay={menu} placement="bottomRight">
      <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
    </Dropdown>
  );
};

export default DropdownMenu;
