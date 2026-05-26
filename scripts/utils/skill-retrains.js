export function getRankAfterSkillRetrain(currentRank, fromRank, toRank) {
  if (!Number.isFinite(currentRank) || !Number.isFinite(fromRank) || !Number.isFinite(toRank)) return currentRank;
  if (currentRank <= fromRank) return currentRank;

  const removedRanks = getSkillRetrainRankDelta(fromRank, toRank);
  if (removedRanks <= 0) return currentRank;

  return Math.max(fromRank, currentRank - removedRanks);
}

export function getReplacementRankAfterSkillRetrain(currentRank, fromRank, toRank, maxRank = toRank) {
  if (!Number.isFinite(currentRank) || !Number.isFinite(fromRank) || !Number.isFinite(toRank) || !Number.isFinite(maxRank)) return currentRank;

  const gainedRanks = getSkillRetrainRankDelta(fromRank, toRank);
  if (gainedRanks <= 0 || currentRank >= maxRank) return currentRank;

  return Math.min(maxRank, currentRank + gainedRanks);
}

export function getSkillRetrainRankDelta(fromRank, toRank) {
  return Math.max(0, Number(toRank) - Number(fromRank));
}
