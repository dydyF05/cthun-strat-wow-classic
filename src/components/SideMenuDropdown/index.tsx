import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { FunctionComponent, useCallback, useMemo, useRef } from 'react';

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
  const inputRef = useRef<HTMLInputElement>();

  const handleImportClick = useCallback(() => {
    inputRef?.current?.click();
  }, []);

  const menu = useMemo(
    () => (
      <Menu
        items={[
          {
            key: '1',
            label: <Button onClick={onNukeAll}>Nuke all</Button>,
          },
          {
            key: '2',
            label: <Button onClick={onFillClassicPlayers}>Classic config</Button>,
          },
          {
            key: '3',
            label: (
              <Button onClick={onToggleAlliance}>
                {isAlliance ? 'Switch to horde' : 'Switch to alliance'}
              </Button>
            ),
          },
          {
            key: '4',
            label: (
              <>
                <input
                  ref={inputRef as any}
                  style={{ display: 'none' }}
                  type="file"
                  accept=".csv"
                  multiple={false}
                  onChange={onInputCsv}
                />
                ,<Button onClick={handleImportClick}>Import roster</Button>
              </>
            ),
          },
        ]}
      />
    ),
    [isAlliance, onFillClassicPlayers, onNukeAll, onToggleAlliance, onInputCsv, handleImportClick]
  );

  return (
    <Dropdown key="more" overlay={menu} placement="bottomRight">
      <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
    </Dropdown>
  );
};

export default DropdownMenu;
