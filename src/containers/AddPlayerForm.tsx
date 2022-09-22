import { compact, entries, keys, map, pipe, values } from 'lodash/fp';
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { BaseInput, Form } from '../components/AddPlayerForm';
import { useSelector } from '../hooks/redux';
import { BUILD_LABELS, CLASS_LABELS, ROLE_LABELS } from '../lib/i18n';
import { BUILD_IMAGES, CLASS_IMAGES, ROLE_IMAGES } from '../lib/player';
import { Player } from '../redux/Players';
import { allPlayerNamesSelector } from '../redux/Players/selectors';
import { BUILD_PER_CLASS, ClassBuild, ClassName, Role } from '../types/index.d';

export type Props = {
  onCancel: () => void;
  onValidate: (player: Player) => void;
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

  return errors;
};

const getInitialState = (): Form => ({
  name: {
    label: 'Name',
    type: 'text',
    placeholder: 'Character name',
  },
  role: {
    label: 'Role',
    type: 'select',
    placeholder: 'The role this character holds',
    options: keys(Role).map(roleKey => ({
      label: ROLE_LABELS[roleKey as Role],
      value: Role[roleKey as Role],
      image: ROLE_IMAGES[roleKey as Role],
    })),
  },
  className: {
    label: 'Class',
    type: 'select',
    placeholder: 'The class of this character',
    options: keys(ClassName).map(classKey => ({
      label: CLASS_LABELS[classKey as ClassName],
      value: ClassName[classKey as ClassName],
      image: CLASS_IMAGES[classKey as ClassName],
    })),
  },
  build: {
    label: 'Specialization',
    type: 'select',
    placeholder: 'The class build it has',
    options: keys(ClassBuild).map(buildKey => ({
      label: BUILD_LABELS[buildKey as ClassBuild],
      value: ClassBuild[buildKey as ClassBuild],
      image: BUILD_IMAGES[buildKey as ClassBuild],
    })),
  },
});

const getBuildsForClass = (className: ClassName): Form['build']['options'] =>
  getInitialState().build.options.filter(option =>
    BUILD_PER_CLASS[className].includes(option.value)
  );

const AddPlayerForm: FunctionComponent<Props> = ({ onCancel, onValidate }) => {
  const [state, setState] = useState<Form>(getInitialState());

  const isValid = !pipe(
    map<BaseInput, string | undefined>(formProp => formProp.error),
    compact
  )(values(state)).length;

  const _currentPlayerNames = useSelector(allPlayerNamesSelector, shallowEqual);
  const currentPlayerNames = useMemo(
    () => _currentPlayerNames.map(name => name.toLowerCase()),
    [_currentPlayerNames.length]
  );

  const handleChange = useCallback(
    (prop: keyof Player, value: unknown) => {
      const nextPropValue: BaseInput = {
        ...state[prop],
        error: undefined,
        value,
        wasTouched: true,
      };
      const nextState = {
        ...state,
        [prop]: nextPropValue,
      };

      // Handle errors
      const errors = getErrors({ form: nextState, currentPlayerNames });

      entries(errors).forEach(([_formProp, error]) => {
        const formProp = _formProp as keyof Form;

        nextState[formProp] = {
          ...nextState[formProp],
          error,
        } as any;
      });

      // Handle class builds
      if (nextState.className.value) {
        nextState.build.options = getBuildsForClass(nextState.className.value);
      } else {
        nextState.build.options = getInitialState().build.options;
      }

      // Handle class / classBuild mismatch
      if (
        nextState.className.value &&
        nextState.build.value &&
        !BUILD_PER_CLASS[nextState.className.value].includes(nextState.build.value)
      ) {
        const nextOptions = getBuildsForClass(nextState.className.value);
        nextState.build = {
          ...nextState.build,
          value: nextOptions[0].value,
          options: nextOptions,
        };
      }

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
    setState(getInitialState());
  }, [isValid, state, onValidate]);

  const handleCancel = useCallback(() => {
    onCancel();
    setState(getInitialState());
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
