import { FunctionComponent, memo } from 'react';
import { Player } from '../../redux/Players';
import classes from './index.module.css';

export type Props = {
  isValid?: boolean;
  onChange: (prop: keyof Player, value: unknown) => void;
  onValidate: () => void;
} & Partial<Player>;

const AddPlayerForm: FunctionComponent<Props> = memo(
  ({ isValid, onChange, onValidate, ...props }) => {
    return (
      <div className={classes.container}>
        <h4>Player creation {isValid ? 'valid' : 'missing data'}</h4>

        <div className={classes.form}>
          <div className={classes.input}>
            <p className={classes.label}>Name</p>
            <input
              name="player-name"
              value={props.name}
              onChange={event => onChange('name', event.target.value)}
            />
          </div>

          <div className={classes.input}>
            <p className={classes.label}>Class</p>
            <input
              name="player-class"
              value={props.className}
              onChange={event => onChange('className', event.target.value)}
            />
          </div>

          <div className={classes.input}>
            <p className={classes.label}>Build</p>
            <input
              name="player-build"
              value={props.build}
              onChange={event => onChange('build', event.target.value)}
            />
          </div>

          <div className={classes.input}>
            <p className={classes.label}>Role</p>
            <input
              name="player-role"
              value={props.role}
              onChange={event => onChange('role', event.target.value)}
            />
          </div>

          <button disabled={!isValid} onClick={onValidate}>
            Create
          </button>
        </div>
      </div>
    );
  }
);
AddPlayerForm.displayName = 'AddPlayerForm';

export default AddPlayerForm;
