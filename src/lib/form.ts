import { keys } from 'lodash/fp';
import { Form } from '../components/UpsertPlayerForm';
import { Player } from '../redux/Players';
import {
  BUILD_PER_CLASS,
  BUILD_PER_ROLE,
  ClassBuild,
  ClassName,
  CLASS_PER_ROLE,
  Role,
} from '../types/index.d';
import { BUILD_LABELS, CLASS_LABELS, ROLE_LABELS } from './i18n';
import { BUILD_IMAGES, CLASS_IMAGES, ROLE_IMAGES } from './player';

export const getInitialAddPlayer = (player?: Omit<Player, 'id'>): Form => ({
  name: {
    value: player?.name,
    label: 'Name',
    type: 'text',
    placeholder: 'Character name',
  },
  role: {
    value: player?.role,
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
    value: player?.className,
    label: 'Class',
    type: 'select',
    placeholder: 'The class of this character',
    options: keys(ClassName).map(classKey => ({
      label: CLASS_LABELS[classKey as ClassName],
      value: ClassName[classKey as ClassName],
      image: CLASS_IMAGES[classKey as ClassName],
    })),
    isDisabled: !player,
  },
  build: {
    value: player?.build,
    label: 'Specialization',
    type: 'select',
    placeholder: 'The class build it has',
    options: keys(ClassBuild).map(buildKey => ({
      label: BUILD_LABELS[buildKey as ClassBuild],
      value: ClassBuild[buildKey as ClassBuild],
      image: BUILD_IMAGES[buildKey as ClassBuild],
    })),
    isDisabled: !player,
  },
});

export const getClassesForRole = (role: Role): Form['className']['options'] =>
  getInitialAddPlayer().className.options.filter(option =>
    CLASS_PER_ROLE[role].includes(option.value)
  );

export const getBuildsForClass = (role: Role, className: ClassName): Form['build']['options'] =>
  getInitialAddPlayer().build.options.filter(option =>
    BUILD_PER_CLASS[className].filter(b => BUILD_PER_ROLE[role].includes(b)).includes(option.value)
  );

const adjustToNewRole = (form: Form): void => {
  // User change role to a truthy one
  if (form.role.value) {
    const nextClasses = getClassesForRole(form.role.value);
    form.className.value = nextClasses
      .map(({ value }) => value)
      .includes(form.className.value as ClassName)
      ? (form.className.value as ClassName)
      : undefined;
    form.className.options = nextClasses;
    form.className.isDisabled = false;
    form.className.error = undefined;

    form.build.value = undefined;
    form.build.options = [];
    form.build.isDisabled = true;
  } else {
    // User removed role, we should reset everything
    form.className.value = undefined;
    form.className.options = [];
    form.className.isDisabled = true;

    form.build.value = undefined;
    form.build.options = [];
    form.build.isDisabled = true;
  }
};

const adjustToNewClass = (form: Form): void => {
  if (form.className.value) {
    // user set class before role, find the appropriate role
    if (!form.role.value) {
      const availableRole = keys(CLASS_PER_ROLE).find(roleKey =>
        CLASS_PER_ROLE[roleKey as Role].includes(form.className.value as ClassName)
      );

      availableRole && (form.role.value = Role[availableRole as Role]);
    }

    form.build.options = getBuildsForClass(form.role.value as Role, form.className.value);
    form.build.value = form.build.options[0].value;
    form.build.error = undefined;
    form.build.isDisabled = false;
  } else {
    form.build.options = getInitialAddPlayer().build.options;
    form.build.value = undefined;
    form.build.isDisabled = true;
  }
};

/**
 * A dps melee can't be a priest, a priest can't be a tank
 * This function knows and will adjust the form values accordingly
 */
export const correctAddPlayer = (form: Form, previousForm: Form): void => {
  // Role changed, we should reset className and build
  if (form.role.value !== previousForm.role.value) {
    adjustToNewRole(form);
  } else if (form.className.value !== previousForm.className.value) {
    adjustToNewClass(form);
  }
};
