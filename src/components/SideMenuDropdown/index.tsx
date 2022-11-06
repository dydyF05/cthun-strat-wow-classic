import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { FunctionComponent, useMemo } from 'react';

export type Props = {
  isAlliance: boolean;
  onFillClassicPlayers: () => void;
  onNukeAll: () => void;
  onToggleAlliance: () => void;
  onInputCsv: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
};

const DropdownMenu: FunctionComponent<Props> = ({
  isAlliance,
  onToggleAlliance,
  onNukeAll,
  onFillClassicPlayers,
  onInputCsv,
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
          {
            key: '4',
            label: <input type="file" accept=".csv" multiple={false} onChange={onInputCsv} />,
          },
        ]}
      />
    ),
    [isAlliance, onFillClassicPlayers, onNukeAll, onToggleAlliance, onInputCsv]
  );

  return (
    <Dropdown key="more" overlay={menu} placement="bottomRight">
      <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
    </Dropdown>
  );
};

export default DropdownMenu;
