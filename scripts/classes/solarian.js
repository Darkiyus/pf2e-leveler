export const SOLARIAN = {
  slug: 'solarian',
  nameKey: 'Solarian',
  compendiumUuid: 'Compendium.sf2e-anachronism.classes.Item.zAI2ugYWzbUnmaez',
  keyAbility: ['str'],
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
    { level: 3, name: 'Stellar Resilience', key: 'stellar-resilience' },
    { level: 5, name: 'Solar Weapon Expertise', key: 'solar-weapon-expertise' },
    { level: 7, name: 'Stellar Senses', key: 'stellar-senses' },
    { level: 7, name: 'Weapon Specialization', key: 'weapon-specialization' },
    { level: 9, name: 'Solarian Expertise', key: 'solarian-expertise' },
    { level: 9, name: 'Stellar Partition', key: 'stellar-partition' },
    { level: 11, name: 'Armor Expertise', key: 'armor-expertise' },
    { level: 13, name: 'Solarian Weapon Mastery', key: 'solarian-weapon-mastery' },
    { level: 15, name: 'Gravitas', key: 'gravitas' },
    { level: 15, name: 'Greater Weapon Specialization', key: 'greater-weapon-specialization' },
    { level: 17, name: 'Armor Mastery', key: 'armor-mastery' },
    { level: 17, name: 'Solarian Mastery', key: 'solarian-mastery' },
    { level: 19, name: 'Stellar Paragon', key: 'stellar-paragon' },
  ],

  spellcasting: null,
};
