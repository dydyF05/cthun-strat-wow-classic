import { Zone } from '.';
import { RootState } from '../store';

const zonesSelector = (state: RootState): RootState['zones'] => state.zones;

export const zoneIdsSelector = (state: RootState): Zone['id'][] =>
  zonesSelector(state).map(({ id }) => id);

const zoneSelector =
  (id: Zone['id']) =>
  (state: RootState): Zone | undefined =>
    zonesSelector(state).find(zone => id === zone.id);

export const zoneColorSelector =
  (id: Zone['id']) =>
  (state: RootState): Zone['color'] | undefined =>
    zoneSelector(id)(state)?.color;

export const zoneMarkerSelector =
  (id: Zone['id']) =>
  (state: RootState): Zone['marker'] | undefined =>
    zoneSelector(id)(state)?.marker;
