import { compact } from 'lodash/fp';
import { parse } from 'papaparse';
import { Player } from '../redux/Players';
import { ClassBuild, ClassName, Role } from '../types/index.d';
import log from './log';

const ROXOR_IDENTIFIER = '⚡';

const LAST_IGNORED_INDEX = 3;

const ABS = 'Absence' as const;
// const LATE = 'Late' as const;
// const ATTEMPT = 'Tentative' as const;
// const TANK = 'Tank' as const;
// type CSVClass =
//   | 'Mage'
//   | 'Warrior'
//   | 'Shaman'
//   | 'Rogue'
//   | 'Paladin'
//   | 'Priest'
//   | 'Warlock'
//   | 'Druid'
//   | 'Hunter';
type CSVBuild =
  | 'Fury' // WarFury
  | 'Restoration1' // ShamRestauHeal
  | 'Combat' // RogueCombatDps
  | 'Holy' // PriestHolyHeal
  | 'Guardian' // DroodFeralTank
  | 'Retribution' // PalretDps
  | 'Discipline' // PriestDisciHeal
  | 'Destruction' // DemoDestruDps
  | 'Dreamstate' // DroodEquiDps
  | 'Balance' // DroodEquiHeal
  | 'Shadow' // PriestShadowDps
  | 'Marksman' // HuntPreciDps
  | 'Frost' // MageFrostDps
  | 'Enhancement' // ShamAmelioDps
  | 'Fire' // MageFireDps
  | 'Protection' // WarProtTank
  | 'Feral' // DroodFeralDps
  | 'Subtlety' // RogueSubtletyDps
  | 'Restoration'; // DroodRestauHeal
// type CSVRole = typeof ABS | typeof ATTEMPT | typeof LATE | typeof TANK | CSVClass;
type CSVSpec = typeof ABS | CSVBuild;

const BUILD_PER_CSV_BUILD: Record<CSVBuild, ClassBuild> = {
  Balance: ClassBuild.DroodEqui,
  Combat: ClassBuild.RogueCombat,
  Destruction: ClassBuild.WarlockDestruction,
  Discipline: ClassBuild.PriestDiscipline,
  Dreamstate: ClassBuild.DroodEqui,
  Enhancement: ClassBuild.ShamAmelio,
  Feral: ClassBuild.DroodFeral,
  Fire: ClassBuild.MageFire,
  Frost: ClassBuild.MageFrost,
  Fury: ClassBuild.WarFury,
  Guardian: ClassBuild.DroodFeral,
  Holy: ClassBuild.PriestHoly,
  Marksman: ClassBuild.HuntPrecision,
  Protection: ClassBuild.WarProt,
  Restoration: ClassBuild.DroodRestau,
  Restoration1: ClassBuild.ShamResto,
  Retribution: ClassBuild.PalaVindic,
  Shadow: ClassBuild.PriestShadow,
  Subtlety: ClassBuild.RogueSubtelty,
};

const CLASSNAME_PER_CSV_BUILD: Record<CSVBuild, ClassName> = {
  Balance: ClassName.Druid,
  Combat: ClassName.Rogue,
  Destruction: ClassName.Warlock,
  Discipline: ClassName.Priest,
  Dreamstate: ClassName.Druid,
  Enhancement: ClassName.Shaman,
  Feral: ClassName.Druid,
  Fire: ClassName.Mage,
  Frost: ClassName.Mage,
  Fury: ClassName.War,
  Guardian: ClassName.Druid,
  Holy: ClassName.Priest,
  Marksman: ClassName.Hunt,
  Protection: ClassName.War,
  Restoration: ClassName.Druid,
  Restoration1: ClassName.Shaman,
  Retribution: ClassName.Paladin,
  Shadow: ClassName.Priest,
  Subtlety: ClassName.Rogue,
};

const ROLE_PER_CSV_BUILD: Record<CSVBuild, Role> = {
  Balance: Role.DpsDistance,
  Combat: Role.DpsMelee,
  Destruction: Role.DpsDistance,
  Discipline: Role.Heal,
  Dreamstate: Role.DpsDistance,
  Enhancement: Role.DpsDistance,
  Feral: Role.DpsMelee,
  Fire: Role.DpsDistance,
  Frost: Role.DpsDistance,
  Fury: Role.DpsMelee,
  Guardian: Role.Tank,
  Holy: Role.Heal,
  Marksman: Role.DpsDistance,
  Protection: Role.Tank,
  Restoration: Role.Heal,
  Restoration1: Role.Heal,
  Retribution: Role.DpsMelee,
  Shadow: Role.DpsDistance,
  Subtlety: Role.DpsMelee,
};

const mapDataToPlayers = (players: string[][]): Player[] => {
  if (players.length <= LAST_IGNORED_INDEX + 1) return [];

  const absentPlayers = [];

  const mappedPlayers = players
    .slice(LAST_IGNORED_INDEX + 1)
    .filter(values => {
      const hasMinimalindexes = values.length >= 4;
      if (!hasMinimalindexes) return false;
      if (
        typeof values[1] !== 'string' ||
        !values[1] ||
        typeof values[2] !== 'string' ||
        !values[2] ||
        typeof values[3] !== 'string' ||
        !values[3]
      ) {
        log({
          message:
            'Encountered bad csv line format. Expecting truthy string for first four indexes',
          context: { csvPlayer: values },
        });
        return false;
      }

      return true;
    })
    .map(values => values.slice(0, 4))
    .map<undefined | Player>(values => {
      const csvSpec = values[1] as CSVSpec;
      const name = values[2];
      const id = values[3];

      if (csvSpec === ABS) {
        absentPlayers.push(name || 'unknown');
        return undefined;
      }

      const build = BUILD_PER_CSV_BUILD[csvSpec];
      if (!build) {
        log({
          message: 'Encountered unknown csv spec for player',
          context: { csvPlayer: values, mappedBuild: build, csvBuild: csvSpec },
        });
        return undefined;
      }

      const className = CLASSNAME_PER_CSV_BUILD[csvSpec];
      if (!className) {
        log({
          message: 'Encountered unknown csv spec for player',
          context: { csvPlayer: values, mappedClass: className, csvBuild: csvSpec },
        });
        return undefined;
      }

      const role = ROLE_PER_CSV_BUILD[csvSpec];
      if (!role) {
        log({
          message: 'Encountered unknown csv role for player',
          context: { csvPlayer: values, mappedRole: role, csvBuild: csvSpec },
        });
        return undefined;
      }

      return {
        id,
        name: name.replace(ROXOR_IDENTIFIER, '').trim(),
        build,
        className,
        role,
      };
    });

  const compactPlayers = compact(mappedPlayers);

  console.log(`${compactPlayers.length} players imported`);
  console.log(`${absentPlayers.length} absents ignored`);
  console.groupEnd();

  return compactPlayers;
};

const parser = (file: File, onParsePlayers: (players: Player[]) => void) => {
  parse<unknown, File>(file, {
    delimiter: ',',
    complete: results => {
      console.group('Import');
      console.groupCollapsed('raw result');
      console.log('results', results);
      console.groupEnd();

      if (Array.isArray(results?.data) && results?.data.length) {
        const players = mapDataToPlayers(results.data);
        console.groupEnd();

        if (players?.length) {
          onParsePlayers(players);
        }
      }
    },
  });
};

export default parser;
