import { RootState } from '../store';

export const groupsSelector = (state: RootState): RootState['groups'] => state.groups;
