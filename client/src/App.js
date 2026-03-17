import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const analyzeSite = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/analyze', {
        website,
        industry
      });
      setResult(response.data);
    } catch (err) {
      setError('Analysis failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>🔍 AI Visibility Analyzer</h1>
        <p>Check how visible your website is in AI search results</p>
        
        <form onSubmit={analyzeSite} className="form">
          <div className="form-group">
            <label>Website:</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="e.g., notion.so"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Industry:</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., productivity tools"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="analyze-btn">
            {loading ? 'Analyzing...' : 'Analyze Visibility'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {result && (
          <div className="results">
            <h2>📊 Analysis Results</h2>
            
            <div className="score-card">
              <h3>AI Visibility Score</h3>
              <div className="score">{result.score.toFixed(1)}%</div>
              <p>Mentioned in {result.mentions} out of {result.totalQuestions} AI queries</p>
            </div>

            {result.competitors && result.competitors.length > 0 && (
              <div className="competitors">
                <h3>🏆 Competitors Found</h3>
                <div className="competitor-list">
                  {result.competitors.map((competitor, index) => (
                    <span key={index} className="competitor">{competitor}</span>
                  ))}
                </div>
              </div>
            )}

            {result.keywords && result.keywords.length > 0 && (
              <div className="keywords">
                <h3>🔑 Suggested Keywords</h3>
                <div className="keyword-list">
                  {result.keywords.map((keyword, index) => (
                    <span key={index} className="keyword">{keyword}</span>
                  ))}
                </div>
              </div>
            )}

            {result.mentionedQuestions && result.mentionedQuestions.length > 0 && (
              <div className="mentions">
                <h3>✅ Mentioned in Questions</h3>
                <p>Your website was found in AI responses to questions: {result.mentionedQuestions.join(', ')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
