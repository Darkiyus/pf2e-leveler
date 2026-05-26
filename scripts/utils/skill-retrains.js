export function getRankAfterSkillRetrain(currentRank, fromRank, toRank) {
  if (!Number.isFinite(currentRank) || !Number.isFinite(fromRank) || !Number.isFinite(toRank)) return currentRank;
  if (currentRank <= fromRank) return currentRank;

  const removedRanks = Math.max(0, toRank - fromRank);
  if (removedRanks <= 0) return currentRank;

  return Math.max(fromRank, currentRank - removedRanks);
}
