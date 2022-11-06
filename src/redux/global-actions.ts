import { omit } from 'lodash/fp';
import { useDispatch } from '../hooks/redux';
import { addPlayersToGroupAction, resetAction as resetGroupsAction } from './Groups';
import {
  addManyAction as addManyPlayersAction,
  resetAction as _resetPlayersAction,
} from './Players';
import { typicalRosterFactory } from './Players/mock';
import {
  resetAction as resetPositionsAction,
  setPlayerPositionAction,
  setPositionsPlayersAction,
} from './Positions';
import { resetAction as resetSettingsAction } from './Settings';

/** Nuke in state everything related to players, positions, settings and groups */
export const resetPlayersAction = (dispatch: ReturnType<typeof useDispatch>) => {
  dispatch(resetSettingsAction());
  dispatch(resetGroupsAction());
  dispatch(resetPositionsAction());
  dispatch(_resetPlayersAction());
};

export const createClassicConfigAction = (dispatch: ReturnType<typeof useDispatch>) => {
  resetPlayersAction(dispatch);

  const roster = typicalRosterFactory();
  dispatch(addManyPlayersAction(roster.map(player => omit(['positionId'], player))));

  dispatch(
    setPositionsPlayersAction(
      roster
        .filter(player => !!player.positionId)
        .map(player =>
          setPlayerPositionAction({
            index: player.positionId as NonNullable<typeof player['positionId']>,
            player: player.id,
          })
        )
    )
  );

  dispatch(
    addPlayersToGroupAction(
      roster
        .filter(player => player.groupId !== undefined && player.groupIndex !== undefined)
        .map(player => ({
          playerId: player.id,
          groupId: player.groupId as number,
          index: player.groupIndex as number,
          playerName: player.name,
        }))
    )
  );
};
