export const SOLDIER = {
  slug: 'soldier',
  nameKey: 'Soldier',
  compendiumUuid: 'Compendium.sf2e-anachronism.classes.Item.sGupLSC7oqsN18sI',
  keyAbility: ['con'],
  hp: 10,

  featSchedule: {
    class: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
    skill: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
    general: [3, 7, 11, 15, 19],
    ancestry: [5, 9, 13, 17],
  },
  skillIncreaseSchedule: [3, 5, 7, 9, 11, 13, 15, 17, 19],
  abilityBoostSchedule: [5, 10, 15, 20],

  classFeatures: [
    { level: 3, name: 'Fearsome Bulwark', key: 'fearsome-bulwark' },
    { level: 3, name: 'Reflex Expertise', key: 'reflex-expertise' },
    { level: 5, name: 'Perception Expertise', key: 'perception-expertise' },
    { level: 5, name: 'Soldier Weapon Expert', key: 'soldier-weapon-expert' },
    { level: 7, name: 'Armor Expertise', key: 'armor-expertise' },
    { level: 7, name: 'Soldier Expertise', key: 'soldier-expertise' },
    { level: 7, name: 'Tough as Nails', key: 'tough-as-nails' },
    { level: 7, name: 'Weapon Specialization', key: 'weapon-specialization' },
    { level: 11, name: "Soldier's Resolution", key: 'soldier-s-resolution' },
    { level: 13, name: 'Armor Mastery', key: 'armor-mastery' },
    { level: 15, name: 'Soldier Weapon Mastery', key: 'soldier-weapon-mastery' },
    { level: 15, name: 'Unshakable Juggernaut', key: 'unshakable-juggernaut' },
    { level: 17, name: 'Legendary Armor', key: 'legendary-armor' },
    { level: 19, name: 'Legendary Soldier', key: 'legendary-soldier' },
  ],

  spellcasting: null,
};
