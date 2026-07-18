import { CharacterWizard } from '../../../scripts/ui/character-wizard/index.js';

describe('CharacterWizard auto-advance', () => {
  function makeWizard() {
    const wizard = new CharacterWizard(createMockActor());
    wizard.actor.setFlag = jest.fn(() => Promise.resolve());
    wizard.render = jest.fn(() => Promise.resolve());
    wizard._nextStep = jest.fn();
    return wizard;
  }

  test('queues an auto-advance the moment the active step flips from incomplete to complete', () => {
    const wizard = makeWizard();

    wizard._trackStepCompletionForAutoAdvance([{ id: 'ancestry', complete: false }]);
    expect(wizard._pendingAutoAdvance).toBe(false);

    wizard._trackStepCompletionForAutoAdvance([{ id: 'ancestry', complete: true }]);
    expect(wizard._pendingAutoAdvance).toBe(true);
  });

  test('does not queue an auto-advance just from navigating into an already-complete step', () => {
    const wizard = makeWizard();

    wizard._trackStepCompletionForAutoAdvance([{ id: 'ancestry', complete: true }]);

    expect(wizard._pendingAutoAdvance).toBe(false);
  });

  test('does not queue an auto-advance while a creation apply is in progress', () => {
    const wizard = makeWizard();
    wizard.isApplying = true;

    wizard._trackStepCompletionForAutoAdvance([{ id: 'ancestry', complete: false }]);
    wizard._trackStepCompletionForAutoAdvance([{ id: 'ancestry', complete: true }]);

    expect(wizard._pendingAutoAdvance).toBe(false);
  });

  test('does not re-trigger on every subsequent render while the step stays complete', () => {
    const wizard = makeWizard();

    wizard._trackStepCompletionForAutoAdvance([{ id: 'ancestry', complete: false }]);
    wizard._trackStepCompletionForAutoAdvance([{ id: 'ancestry', complete: true }]);
    wizard._pendingAutoAdvance = false;

    wizard._trackStepCompletionForAutoAdvance([{ id: 'ancestry', complete: true }]);

    expect(wizard._pendingAutoAdvance).toBe(false);
  });

  test('_saveAndRender advances to the next step once a pending auto-advance is queued', async () => {
    const wizard = makeWizard();
    wizard._pendingAutoAdvance = true;

    await wizard._saveAndRender();

    expect(wizard._nextStep).toHaveBeenCalled();
    expect(wizard._pendingAutoAdvance).toBe(false);
  });

  test('_saveAndRender does not advance when nothing newly completed', async () => {
    const wizard = makeWizard();

    await wizard._saveAndRender();

    expect(wizard._nextStep).not.toHaveBeenCalled();
  });
});
