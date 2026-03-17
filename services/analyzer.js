const detectMention = require("./mentionDetector");
const extractDomains = require("../utils/domainExtractor");

function analyzeResponses(responses, website) {
  let mentions = 0;
  let competitors = new Set();
  let mentionedQuestions = [];

  responses.forEach((response, index) => {
    if (detectMention(response, website)) {
      mentions++;
      mentionedQuestions.push(index + 1);
    }
    
    const domains = extractDomains(response);
    domains.forEach(domain => {
      if (!domain.includes(website.toLowerCase())) {
        competitors.add(domain);
      }
    });
  });

  const score = (mentions / responses.length) * 100;

  return {
    score,
    mentions,
    totalQuestions: responses.length,
    mentionedQuestions,
    competitors: Array.from(competitors),
    responses
  };
}

function calculateScore(mentions, total) {
  return (mentions / total) * 100;
}

module.exports = { analyzeResponses, calculateScore };
