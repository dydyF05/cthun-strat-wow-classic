import DpsDistance from '../assets/images/dps-distance.webp';
import DpsMelee from '../assets/images/dps-melee.webp';
import Druid from '../assets/images/druid.png';
import Healer from '../assets/images/healer.webp';
import Hunt from '../assets/images/hunt.png';
import Mage from '../assets/images/mage.png';
import Paladin from '../assets/images/paladin.jpg';
import Priest from '../assets/images/priest.png';
import Rogue from '../assets/images/rogue.png';
import Shaman from '../assets/images/shaman.png';
import Tank from '../assets/images/tank.webp';
import War from '../assets/images/war.png';
import Warlock from '../assets/images/warlock.png';
import { ClassBuild, ClassName, Role } from '../types/index.d';

export const ROLE_IMAGES: Record<Role, string> = {
  [Role.DpsDistance]: DpsDistance,
  [Role.DpsMelee]: DpsMelee,
  [Role.Heal]: Healer,
  [Role.Tank]: Tank,
};

export const CLASS_IMAGES: Record<ClassName, string> = {
  [ClassName.Druid]: Druid,
  [ClassName.Hunt]: Hunt,
  [ClassName.Mage]: Mage,
  [ClassName.Paladin]: Paladin,
  [ClassName.Priest]: Priest,
  [ClassName.Rogue]: Rogue,
  [ClassName.Shaman]: Shaman,
  [ClassName.War]: War,
  [ClassName.Warlock]: Warlock,
};

// @TODO add images
export const BUILD_IMAGES: Record<ClassBuild, string> = {
  [ClassBuild.Fury]: '',
  [ClassBuild.Prot]: '',
  [ClassBuild.TwoHands]: '',
  [ClassBuild.Assassination]: '',
  [ClassBuild.Combat]: '',
  [ClassBuild.Hemo]: '',
  [ClassBuild.Affli]: '',
  [ClassBuild.Demono]: '',
  [ClassBuild.Destruction]: '',
  [ClassBuild.Feral]: '',
  [ClassBuild.Equi]: '',
  [ClassBuild.Restau]: '',
  [ClassBuild.Discipline]: '',
  [ClassBuild.Holy]: '',
  [ClassBuild.Shadow]: '',
  [ClassBuild.Frost]: '',
  [ClassBuild.Fire]: '',
  [ClassBuild.Arcanum]: '',
  [ClassBuild.Vindic]: '',
  [ClassBuild.Elem]: '',
  [ClassBuild.Amelio]: '',
  [ClassBuild.Beast]: '',
  [ClassBuild.Precision]: '',
  [ClassBuild.Survival]: '',
};
