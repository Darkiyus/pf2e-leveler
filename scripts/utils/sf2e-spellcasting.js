const VARIABLE_TRADITIONS = {
  connection: {
    actorFlag: 'mystic',
    itemTag: 'mystic-connection',
    rulePath: 'flags.system.mystic.tradition',
  },
  paradox: {
    actorFlag: 'witchwarper',
    itemTag: 'witchwarper-paradox',
    rulePath: 'flags.system.witchwarper.tradition',
  },
};

export const SF2E_VARIABLE_SPELL_TRADITIONS = new Set(Object.keys(VARIABLE_TRADITIONS));

export function resolveSf2eSpellcastingTradition(actor, tradition) {
  const config = VARIABLE_TRADITIONS[tradition];
  if (!config) return null;

  const flagTradition = normalizeSpellTradition(
    actor?.flags?.system?.[config.actorFlag]?.tradition ??
      actor?.flags?.pf2e?.[config.actorFlag]?.tradition ??
      readActorFlag(actor, 'system', `${config.actorFlag}.tradition`) ??
      readActorFlag(actor, 'pf2e', `${config.actorFlag}.tradition`),
  );
  if (flagTradition) return flagTradition;

  const subclassItem = getActorItems(actor).find((item) => hasOtherTag(item, config.itemTag));
  const itemTradition = inferSf2eSpellcastingTraditionFromItem(subclassItem);
  if (itemTradition) return itemTradition;

  return null;
}

export function inferSf2eSpellcastingTraditionFromItem(item) {
  for (const config of Object.values(VARIABLE_TRADITIONS)) {
    if (!hasOtherTag(item, config.itemTag)) continue;

    const ruleTradition = normalizeSpellTradition(
      item?.system?.rules?.find(
        (rule) =>
          rule?.key === 'ActiveEffectLike' && String(rule?.path ?? '').trim() === config.rulePath,
      )?.value,
    );
    if (ruleTradition) return ruleTradition;

    const flagTradition = normalizeSpellTradition(
      item?.flags?.system?.[config.actorFlag]?.tradition ??
        item?.flags?.pf2e?.[config.actorFlag]?.tradition,
    );
    if (flagTradition) return flagTradition;
  }

  return normalizeSpellTradition(
    String(item?.system?.description?.value ?? '').match(
      /<strong>\s*Tradition\s*<\/strong>\s*([^<;]+)/iu,
    )?.[1],
  );
}

export function normalizeSpellTradition(value) {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase();
  return ['arcane', 'divine', 'occult', 'primal'].includes(normalized) ? normalized : null;
}

function hasOtherTag(item, tag) {
  if (!item || item.type !== 'feat') return false;
  const otherTags = item.system?.traits?.otherTags ?? item.otherTags ?? [];
  return otherTags.map((entry) => String(entry).toLowerCase()).includes(tag);
}

function readActorFlag(actor, scope, key) {
  if (typeof actor?.getFlag !== 'function') return null;
  try {
    return actor.getFlag(scope, key);
  } catch {
    return null;
  }
}

function getActorItems(actor) {
  const items = actor?.items;
  if (!items) return [];
  if (Array.isArray(items)) return items;
  if (Array.isArray(items.contents)) return items.contents;
  if (typeof items.filter === 'function') return items.filter(() => true);
  return Array.from(items);
}
