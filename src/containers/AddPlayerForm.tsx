import { compact, entries, map, pipe, some, values } from 'lodash/fp';
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { BaseInput, Form } from '../components/AddPlayerForm';
import { useSelector } from '../hooks/redux';
import { correctAddPlayer, getInitialAddPlayer } from '../lib/form';
import { Player } from '../redux/Players';
import { allPlayerNamesSelector } from '../redux/Players/selectors';

export type Props = {
  onCancel: () => void;
  onValidate: (player: Omit<Player, 'id'>) => void;
};

type ValidityParams = {
  form: Form;
  currentPlayerNames: Player['name'][];
};

const getNameError = (name: string, names: ValidityParams['currentPlayerNames']): string => {
  if (!name) return 'Name is required';
  return names.includes(name.toLowerCase()) ? 'Name is already used' : '';
};

const getErrors = ({
  form,
  currentPlayerNames,
}: ValidityParams): Partial<Record<keyof Form, string>> => {
  const errors: Partial<Record<keyof Form, string>> = {};
  const nameError = getNameError(form.name.value || '', currentPlayerNames);

  if (nameError) {
    errors.name = nameError;
  }

  if (!form.className.value) {
    errors.className = 'Class is required';
  }

  if (!form.build.value) {
    errors.build = 'Build is required';
  }

  return errors;
};

const AddPlayerForm: FunctionComponent<Props> = ({ onCancel, onValidate }) => {
  const [state, setState] = useState<Form>(getInitialAddPlayer());

  const isValid = useMemo<boolean>(() => {
    const _isValid = !pipe(
      map<BaseInput, string | undefined>(formProp => formProp.error),
      compact
    )(values(state)).length;

    return _isValid && pipe(some<BaseInput>(formProp => !!formProp.wasTouched))(values(state));
  }, [state]);

  const _currentPlayerNames = useSelector(allPlayerNamesSelector, shallowEqual);
  // Make sure there is no useless reload of the whole handleChange function
  const currentPlayerNames = useMemo(
    () => _currentPlayerNames.map(name => name.toLowerCase()),
    [_currentPlayerNames.length]
  );

  const handleChange = useCallback(
    (prop: keyof Omit<Player, 'id'>, value: unknown) => {
      const nextPropValue: BaseInput = {
        ...state[prop],
        error: undefined,
        value,
        wasTouched: true,
      };
      const nextState: typeof state = {
        ...state,
        [prop]: nextPropValue,
      };

      correctAddPlayer(nextState, state);

      // Handle errors
      const errors = getErrors({ form: nextState, currentPlayerNames });

      entries(errors).forEach(([_formProp, error]) => {
        const formProp = _formProp as keyof Form;
        const nextItemValue = nextState[formProp];
        nextItemValue.error = error;
      });

      setState(nextState);
    },
    [state, currentPlayerNames]
  );

  const handleValidate = useCallback(() => {
    isValid &&
      onValidate({
        build: state.build.value as NonNullable<typeof state.build.value>,
        className: state.className.value as NonNullable<typeof state.className.value>,
        name: state.name.value as NonNullable<typeof state.name.value>,
        role: state.role.value as NonNullable<typeof state.role.value>,
      });
    setState(getInitialAddPlayer());
  }, [isValid, state, onValidate]);

  const handleCancel = useCallback(() => {
    onCancel();
    setState(getInitialAddPlayer());
  }, [onCancel]);

  return (
    <Component
      {...state}
      isValid={isValid}
      onChange={handleChange}
      onValidate={handleValidate}
      onCancel={handleCancel}
    />
  );
};
export default AddPlayerForm;
