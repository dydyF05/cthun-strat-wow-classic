import { State, Zone } from '.';
import { RootState } from '../store';

export const zonesSelector = (state: RootState): RootState['zones'] => state.zones;

export const zoneIdsSelector = (state: RootState): Zone['id'][] =>
  zonesSelector(state).slices.map(({ id }) => id);

const zoneSelector =
  (id: Zone['id']) =>
  (state: RootState): Zone | undefined =>
    zonesSelector(state).slices.find(zone => id === zone.id);

export const zoneColorSelector =
  (id: Zone['id']) =>
  (state: RootState): Zone['color'] | undefined =>
    zoneSelector(id)(state)?.color;

export const zoneMarkerSelector =
  (id: Zone['id']) =>
  (state: RootState): Zone['marker'] | undefined =>
    zoneSelector(id)(state)?.marker;

export const zoneIsLeftSelector =
  (id: Zone['id']) =>
  (state: RootState): Zone['isLeft'] | undefined =>
    zoneSelector(id)(state)?.isLeft;

export const zonePositionSelector =
  (id: Zone['id']) =>
  (state: RootState): Zone['position'] | undefined =>
    zoneSelector(id)(state)?.position;

export const firstLineDistanceSelector = (state: RootState): State['firstLineDistance'] =>
  zonesSelector(state).firstLineDistance;

export const secondLineDistanceSelector = (state: RootState): State['secondLineDistance'] =>
  zonesSelector(state).secondLineDistance;

export const thirdLineDistanceSelector = (state: RootState): State['thirdLineDistance'] =>
  zonesSelector(state).thirdLineDistance;

export const graphWidthSelector = (state: RootState): State['graphWidth'] =>
  zonesSelector(state).graphWidth;

export const graphHeightSelector = (state: RootState): State['graphHeight'] =>
  zonesSelector(state).graphHeight;

export const graphTopStairsHeight = (state: RootState): State['topStairsHeight'] =>
  zonesSelector(state).topStairsHeight;

export const selectedPlayerSelector = (state: RootState): State['selectedPlayer'] =>
  zonesSelector(state).selectedPlayer;

export const isConfuringSelector = (state: RootState): State['isConfiguring'] =>
  zonesSelector(state).isConfiguring;
