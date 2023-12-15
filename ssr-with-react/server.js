import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import path from "path";
import fs from "fs";
import { ServerStyleSheet } from "styled-components";
import App from "./src/App";
// import Home from "./src/pages/Home";
// import { error } from "console";

const app = express();

app.use(express.static("./build", { index: false }));
app.get("*", (req, res) => {
  const sheet = new ServerStyleSheet();

  const reactApp = renderToString(
    sheet.collectStyles(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    )
  );

  const templateFile = path.resolve("./build/index.html");
  fs.readFile(templateFile, "utf-8", (error, data) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
      .replace('{{ styles }}',sheet.getStyleTags())
    );
  });

});

app.listen(8080, () => {
  console.log("server is waiting in port 8080");
});
