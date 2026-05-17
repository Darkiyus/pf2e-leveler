export function getBuildStateAncestryFeatTraits(buildState) {
  const hasExplicitAccessTraits = Object.prototype.hasOwnProperty.call(
    Object(buildState ?? {}),
    'ancestryFeatTraits',
  );

  if (hasExplicitAccessTraits) return normalizeTraitList(buildState?.ancestryFeatTraits);
  return normalizeTraitList(buildState?.ancestryTraits);
}

function normalizeTraitList(value) {
  const source = value instanceof Set ? [...value] : Array.isArray(value) ? value : [];
  return [
    ...new Set(
      source
        .map((trait) => String(trait ?? '').trim().toLowerCase())
        .filter((trait) => trait.length > 0),
    ),
  ];
}
