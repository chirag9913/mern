function detectMention(response, website) {
  return response.toLowerCase().includes(website.toLowerCase());
}

module.exports = detectMention;
