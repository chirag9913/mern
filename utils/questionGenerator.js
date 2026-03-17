function generateQuestions(industry) {
  return [
    `best ${industry} tools`,
    `top ${industry} websites`,
    `most popular ${industry} platforms`,
    `recommended ${industry} software`,
    `what are the best ${industry} solutions`
  ];
}

module.exports = generateQuestions;
