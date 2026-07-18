import { CharacterWizard } from '../../../scripts/ui/character-wizard/index.js';

describe('CharacterWizard reset', () => {
  test('clears in-progress selections and returns to the first step after confirmation', async () => {
    foundry.applications.api.DialogV2.confirm.mockResolvedValueOnce(true);

    const wizard = new CharacterWizard(createMockActor());
    wizard.actor.setFlag = jest.fn(() => Promise.resolve());
    wizard.data.class = { slug: 'rogue', name: 'Rogue' };
    wizard.data.equipment = [{ uuid: 'Item.rapier', name: 'Rapier', quantity: 1 }];
    wizard.currentStep = 5;
    wizard._visitedSteps.add('equipment');
    wizard.render = jest.fn();

    await wizard._resetCreationData();

    expect(wizard.data.class).toBeNull();
    expect(wizard.data.equipment).toEqual([]);
    expect(wizard.currentStep).toBe(0);
    expect(wizard._visitedSteps.size).toBe(0);
    expect(wizard.render).toHaveBeenCalledWith(true);
    expect(ui.notifications.info).toHaveBeenCalledWith('PF2E_LEVELER.NOTIFICATIONS.CREATION_RESET');
  });

  test('does nothing when the confirmation dialog is dismissed', async () => {
    foundry.applications.api.DialogV2.confirm.mockResolvedValueOnce(false);

    const wizard = new CharacterWizard(createMockActor());
    wizard.data.equipment = [{ uuid: 'Item.rapier', name: 'Rapier', quantity: 1 }];
    wizard.render = jest.fn();

    await wizard._resetCreationData();

    expect(wizard.data.equipment).toEqual([{ uuid: 'Item.rapier', name: 'Rapier', quantity: 1 }]);
    expect(wizard.render).not.toHaveBeenCalled();
  });
});
