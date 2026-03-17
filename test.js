require("dotenv").config();
const askAI = require("./services/aiService");

async function test() {
  const res = await askAI("What are the best project management tools?");
  console.log(res);
}

test();
