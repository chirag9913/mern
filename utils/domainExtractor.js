const domainRegex = /\b([a-z0-9-]+\.(com|io|ai|co|so|app|dev|tools))\b/g;

function extractDomains(text) {
  return text.match(domainRegex) || [];
}

module.exports = extractDomains;
