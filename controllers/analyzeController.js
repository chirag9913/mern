const generateQuestions = require("../utils/questionGenerator");
const askAI = require("../services/aiService");
const { analyzeResponses } = require("../services/analyzer");
const generateKeywords = require("../services/keywordGenerator");
const Analysis = require("../models/Analysis");

async function analyzeSite(req, res) {
  try {
    const { website, industry } = req.body;

    const questions = generateQuestions(industry);

    let responses = [];

    for (let q of questions) {
      const aiAnswer = await askAI(q);
      responses.push(aiAnswer);
    }

    const analysisResult = analyzeResponses(responses, website);
    
    const keywords = await generateKeywords(website, industry);

    const finalResult = {
      ...analysisResult,
      keywords,
      website,
      industry,
      timestamp: new Date()
    };

    // Try to save to database, but don't fail if it's not connected
    try {
      const analysis = new Analysis({
        website,
        industry,
        score: analysisResult.score,
        mentions: analysisResult.mentionedQuestions,
        competitors: analysisResult.competitors,
        keywords
      });
      await analysis.save();
      console.log("Analysis saved to database");
    } catch (dbError) {
      console.log("Could not save to database, but continuing...");
      console.log(dbError.message);
    }

    res.json(finalResult);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
}

module.exports = analyzeSite;
