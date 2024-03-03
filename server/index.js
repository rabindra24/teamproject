const OpenAI = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const openai = new OpenAI({
  apiKey: "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",
});

app.get("/", (req, res) => {
  res.json({ result: 400 });
});

app.post("/query", async (req, res) => {
  console.log(req.query);
  console.log(req.body);
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Work Like a professional developer , provide Content in sort answers. Keep it simple. If user ask code then give In Js. User Question in these "+req.body.question }],
    model: "gpt-3.5-turbo",
  });
  console.log(completion.choices[0].message.content);

  res.json({ data: completion.choices[0].message.content });
});

app.listen(3000, () => {
  console.log("application is running on port 3000");
});

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "What is apple?" }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0].message.content);
// }

// main();
