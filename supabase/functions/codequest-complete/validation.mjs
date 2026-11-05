export function validateAttempt(input, catalog) {
  if (!input || typeof input !== 'object') throw new Error('INVALID_REQUEST');
  const mission = catalog.find(m => m.id === input.missionId);
  if (!mission) throw new Error('MISSION_NOT_FOUND');
  if (input.lessonRead !== true || input.quizAnswer !== mission.answer) throw new Error('LEARNING_STEPS_REQUIRED');
  if (typeof input.code !== 'string' || input.code.length > 20000 || !input.code.trim()) throw new Error('INVALID_CODE');
  if (!Number.isInteger(input.quizAttempts) || input.quizAttempts < 1 || input.quizAttempts > 100) throw new Error('INVALID_ATTEMPTS');
  if (!Number.isInteger(input.hints) || input.hints < 0 || input.hints > 2) throw new Error('INVALID_HINTS');
  const source = input.code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/<!--[\s\S]*?-->/g, '');
  if (!mission.checks.every(c => new RegExp(c.pattern, c.flags || '').test(source))) throw new Error('CODE_CHECKS_FAILED');
  return {missionId: mission.id, stars: input.revealed === true ? 1 : Math.max(1, 3 - (input.quizAttempts > 1 ? 1 : 0) - (input.hints > 0 ? 1 : 0))};
}
