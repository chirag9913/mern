const askAI = require("./aiService");

async function generateKeywords(website, industry) {
  const prompt = `Suggest SEO keywords for ${website} about ${industry} to appear in AI answers. Return only keywords separated by commas.`;
  
  const response = await askAI(prompt);
  return response.split(',').map(k => k.trim()).filter(k => k.length > 0);
}

module.exports = generateKeywords;
