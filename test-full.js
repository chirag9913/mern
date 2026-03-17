require("dotenv").config();
const askAI = require("./services/aiService");

const questions = [
  "best project management tools",
  "top productivity platforms",
  "recommended team collaboration software"
];

async function test() {
  let responses = [];
  
  for (let q of questions) {
    console.log(`Asking: ${q}`);
    const res = await askAI(q);
    responses.push(res);
    console.log(`Response: ${res}\n`);
  }
  
  console.log("All responses:");
  console.log(responses);
}

test();
