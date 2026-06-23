import { readFileSync } from 'node:fs';

describe('LevelPlanner template', () => {
  function readTemplate() {
    return readFileSync('templates/level-planner.hbs', 'utf8');
  }

  it('places plan actions above the level list', () => {
    const template = readTemplate();
    const actionIndex = template.indexOf('class="sidebar-actions"');
    const levelsIndex = template.indexOf('class="sidebar-levels"');

    expect(actionIndex).toBeGreaterThan(-1);
    expect(levelsIndex).toBeGreaterThan(-1);
    expect(actionIndex).toBeLessThan(levelsIndex);
  });

  it('renders visible labels for import and export actions', () => {
    const template = readTemplate();
    const actions = template.slice(
      template.indexOf('class="sidebar-actions"'),
      template.indexOf('class="sidebar-levels"'),
    );

    expect(actions).toContain('{{localize "PF2E_LEVELER.UI.EXPORT"}}');
    expect(actions).toContain('{{localize "PF2E_LEVELER.UI.IMPORT"}}');
  });
});
