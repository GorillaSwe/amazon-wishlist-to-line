const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { handleWebhookEvent } = require("./handlers/webhookHandler");
const lineConfig = require("../config/lineConfig");

app.use("/webhook", require("@line/bot-sdk").middleware(lineConfig));
app.post("/webhook", (req, res) => {
  Promise.all(req.body.events.map(handleWebhookEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

const server = serverless(app);
module.exports.handler = server;
