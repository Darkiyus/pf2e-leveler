import { SKILL_ALIASES, normalizeSkillSlug } from '../utils/skill-slugs.js';
import { getRankAfterSkillRetrain } from '../utils/skill-retrains.js';

export async function applySkillRetrains(actor, plan, level) {
  const retrains = plan?.levels?.[level]?.retrainedSkillIncreases ?? [];
  if (retrains.length === 0) return [];

  const updates = {};
  const applied = [];
  for (const retrain of retrains) {
    const originalSkill = normalizeSkillSlug(retrain?.original?.skill);
    const replacementSkill = normalizeSkillSlug(retrain?.replacement?.skill);
    const originalFromRank = Number(retrain?.original?.fromRank ?? 0);
    const originalToRank = Number(retrain?.original?.toRank ?? 0);
    const replacementRank = Number(retrain?.replacement?.toRank ?? 0);
    if (!originalSkill || !replacementSkill || !Number.isFinite(replacementRank)) continue;

    const originalKey = resolveActorSkillKey(actor, originalSkill);
    const replacementKey = resolveActorSkillKey(actor, replacementSkill);
    const currentOriginalRank = Number(actor.system?.skills?.[originalKey]?.rank ?? 0);
    const currentReplacementRank = Number(actor.system?.skills?.[replacementKey]?.rank ?? 0);
    const downgradedOriginalRank = getRankAfterSkillRetrain(currentOriginalRank, originalFromRank, originalToRank);

    if (downgradedOriginalRank < currentOriginalRank) {
      updates[`system.skills.${originalKey}.rank`] = downgradedOriginalRank;
    }
    if (currentReplacementRank < replacementRank) {
      updates[`system.skills.${replacementKey}.rank`] = replacementRank;
    }

    applied.push({
      original: { skill: originalSkill, rank: originalToRank },
      replacement: { skill: replacementSkill, rank: replacementRank },
    });
  }

  if (Object.keys(updates).length > 0) {
    await actor.update(updates);
  }

  return applied;
}

function resolveActorSkillKey(actor, skill) {
  const skills = actor?.system?.skills ?? {};
  if (Object.hasOwn(skills, skill)) return skill;

  const alias = Object.entries(SKILL_ALIASES).find(([, canonical]) => canonical === skill)?.[0];
  if (alias && Object.hasOwn(skills, alias)) return alias;

  return skill;
}
