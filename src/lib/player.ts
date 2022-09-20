import DroodEqui from '../assets/images/build_drood_equi.webp';
import DroodFeral from '../assets/images/build_drood_feral.webp';
import DroodHeal from '../assets/images/build_drood_heal.webp';
import HuntBeast from '../assets/images/build_hunt_beast.webp';
import HuntPreci from '../assets/images/build_hunt_preci.webp';
import HuntSurvi from '../assets/images/build_hunt_survival.webp';
import MageArca from '../assets/images/build_mage_arcane.webp';
import MageFire from '../assets/images/build_mage_fire.webp';
import MageFrost from '../assets/images/build_mage_frost.webp';
import PalHeal from '../assets/images/build_pala_holy.webp';
import PalTank from '../assets/images/build_pala_prot.webp';
import PalRet from '../assets/images/build_pala_ret.webp';
import PriestDisci from '../assets/images/build_priest_disci.webp';
import PriestHoly from '../assets/images/build_priest_holy.webp';
import PriestShadow from '../assets/images/build_priest_shadow.webp';
import RogueAss from '../assets/images/build_rogue_ass.webp';
import RogueCombat from '../assets/images/build_rogue_combat.webp';
import RogueSubt from '../assets/images/build_rogue_subt.webp';
import ShamAmelio from '../assets/images/build_sham_amelio.webp';
import ShamElem from '../assets/images/build_sham_elem.webp';
import ShamResto from '../assets/images/build_sham_restau.webp';
import WarlockAffli from '../assets/images/build_warlock_affli.webp';
import WarlockDemono from '../assets/images/build_warlock_demono.webp';
import WarlockDestru from '../assets/images/build_warlock_destru.webp';
import WarArms from '../assets/images/build_war_arms.webp';
import WarFury from '../assets/images/build_war_fury.webp';
import WarProt from '../assets/images/build_war_prot.webp';
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

export const BUILD_IMAGES: Record<ClassBuild, string> = {
  [ClassBuild.WarArms]: WarArms,
  [ClassBuild.WarFury]: WarFury,
  [ClassBuild.WarProt]: WarProt,
  [ClassBuild.DroodEqui]: DroodEqui,
  [ClassBuild.DroodFeral]: DroodFeral,
  [ClassBuild.DroodRestau]: DroodHeal,
  [ClassBuild.HuntBeast]: HuntBeast,
  [ClassBuild.HuntPrecision]: HuntPreci,
  [ClassBuild.HuntSurvival]: HuntSurvi,
  [ClassBuild.MageArcanum]: MageArca,
  [ClassBuild.MageFire]: MageFire,
  [ClassBuild.MageFrost]: MageFrost,
  [ClassBuild.PalaHoly]: PalHeal,
  [ClassBuild.PalaProt]: PalTank,
  [ClassBuild.PalaVindic]: PalRet,
  [ClassBuild.PriestDiscipline]: PriestDisci,
  [ClassBuild.PriestHoly]: PriestHoly,
  [ClassBuild.PriestShadow]: PriestShadow,
  [ClassBuild.WarlockAffliction]: WarlockAffli,
  [ClassBuild.WarlockDemonology]: WarlockDemono,
  [ClassBuild.WarlockDestruction]: WarlockDestru,
  [ClassBuild.RogueAssass]: RogueAss,
  [ClassBuild.RogueCombat]: RogueCombat,
  [ClassBuild.RogueSubtelty]: RogueSubt,
  [ClassBuild.ShamAmelio]: ShamAmelio,
  [ClassBuild.ShamElem]: ShamElem,
  [ClassBuild.ShamResto]: ShamResto,
};
