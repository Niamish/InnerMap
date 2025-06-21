export const calculateResult = (answers, questions) => {
  let devotionScore = 0;
  let knowledgeScore = 0;
  let actionScore = 0;

  answers.forEach((answer, index) => {
    const score = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'].indexOf(answer);
    const question = questions[index];
    if (question.category === 'Devotion') devotionScore += score;
    if (question.category === 'Knowledge') knowledgeScore += score;
    if (question.category === 'Action') actionScore += score;
  });

  const devotionPercent = Math.round((devotionScore / 40) * 100);
  const knowledgePercent = Math.round((knowledgeScore / 40) * 100);
  const actionPercent = Math.round((actionScore / 40) * 100);

  let type;
  if (devotionPercent >= 70 && devotionPercent > knowledgePercent + 15 && devotionPercent > actionPercent + 15) {
    type = 'devotee_pure';
  } else if (devotionPercent >= 55 && actionPercent >= 45 && devotionPercent > knowledgePercent) {
    type = 'devotee_doer';
  } else if (devotionPercent >= 55 && knowledgePercent >= 45 && devotionPercent > actionPercent) {
    type = 'devotee_knowledge';
  } else if (knowledgePercent >= 50 && actionPercent >= 45 && devotionPercent < 45) {
    type = 'knowledge_doer';
  } else if (actionPercent >= 70) {
    type = 'pure_doer';
  } else if (knowledgePercent >= 70) {
    type = 'pure_knowledge';
  } else {
    if (devotionPercent >= knowledgePercent && devotionPercent >= actionPercent) {
      type = 'devotee_doer';
    } else if (knowledgePercent >= actionPercent) {
      type = 'knowledge_doer';
    } else {
      type = 'pure_doer';
    }
  }

  return {
    type,
    scores: {
      devotion: devotionPercent,
      knowledge: knowledgePercent,
      action: actionPercent,
    },
  };
};

export const wrapText = (ctx, text, maxWidth) => {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const testLine = line + word + ' ';
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line.trim());
      line = word + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());
  return lines;
};
