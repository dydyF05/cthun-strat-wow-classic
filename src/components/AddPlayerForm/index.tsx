import { Button, Input, Select, Typography } from 'antd';
import { entries } from 'lodash/fp';
import { FunctionComponent, memo } from 'react';
import { Player } from '../../redux/Players';
import { ClassBuild, ClassName, Role } from '../../types/index.d';
import classes from './index.module.css';

type InputError = string;

export type BaseInput = {
  value?: unknown;
  type: 'text' | 'select';
  label: string;
  placeholder: string;
  error?: InputError;
  wasTouched?: boolean;
};

type TextInput = {
  value?: string;
  type: 'text';
  maxLength?: number;
  minLength?: number;
} & BaseInput;

type SelectInput<T> = {
  options: {
    value: T;
    label: string;
    image: string;
  }[];
  value?: T;
  type: 'select';
} & BaseInput;

export type Form = {
  name: TextInput;
  build: SelectInput<ClassBuild>;
  className: SelectInput<ClassName>;
  role: SelectInput<Role>;
};

export type Props = {
  isValid?: boolean;
  onChange: (prop: keyof Player, value: unknown) => void;
  onValidate: () => void;
  onCancel: () => void;
} & Form;

const AddPlayerForm: FunctionComponent<Props> = memo(
  ({ isValid, onChange, onValidate, onCancel, ...form }) => (
    <div className={classes.container}>
      <div>
        <Typography.Title underline className={classes.title}>
          Player creation
        </Typography.Title>

        <div className={classes.form}>
          {entries(form).map(([prop, item], index) => (
            <div className={classes.input} key={`input-${item.label}`}>
              <Typography.Text
                type={item.wasTouched && item.error ? 'danger' : 'secondary'}
                className={classes.label}
                strong
              >
                {item.label}
              </Typography.Text>
              {item.type === 'text' && (
                <Input
                  id={item.label}
                  value={item.value}
                  placeholder={item.placeholder}
                  maxLength={item.maxLength}
                  minLength={item.minLength}
                  autoFocus={!index}
                  allowClear
                  onChange={event => onChange(prop as keyof Player, event.target.value)}
                />
              )}
              {item.type === 'select' && (
                <Select
                  id={item.label}
                  value={item.value}
                  placeholder={item.placeholder}
                  allowClear
                  onChange={nextValue => onChange(prop as keyof Player, nextValue)}
                >
                  {item.options.map(option => (
                    <Select.Option
                      key={`select-${item.label}-option-${option.value}`}
                      value={option.value}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}
                      >
                        <img src={option.image} className={classes.optionImage} />
                        <p className={classes.optionLabel}>{option.label}</p>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              )}
              {item.wasTouched && item.error && (
                <Typography.Text type="danger">{item.error}</Typography.Text>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button.Group className={classes.buttons}>
        <Button onClick={onCancel} type="default">
          cancel
        </Button>
        <Button disabled={!isValid} onClick={onValidate} type="primary">
          create
        </Button>
      </Button.Group>
    </div>
  )
);
AddPlayerForm.displayName = 'AddPlayerForm';

export default AddPlayerForm;
