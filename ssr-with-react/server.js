import "isomorphic-fetch"; // since fetch is only in fe and we need that in server also we import this here to use fetch in server also
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import path from "path";
import fs from "fs";
import { ServerStyleSheet } from "styled-components";
import App from "./src/App";
import Articles from "./src/pages/Articles";
// import Home from "./src/pages/Home";
// import { error } from "console";
import { initialDataContext } from "./src/initialDataContext";

global.window = {};
const app = express();

app.use(express.static("./build", { index: false }));

const articles = [
  { title: "Article 1", author: " Bob" },
  { title: "Article 2", author: " Bethy" },
  { title: "Article 3", author: " Frenk" },
  { title: "Article 4", author: " Tony" },
];

app.get("/api/articles", (req, res) => {
  const loadedArticles = articles; // this would be like a db req
  res.json(loadedArticles);
});

app.get("*", async (req, res) => {
  const sheet = new ServerStyleSheet();

  const contextObj = { _isServerSide: true, _request: [], _data: {} };

  renderToString(
    sheet.collectStyles(
      <initialDataContext.Provider value={contextObj}>
        <StaticRouter location={req.url}>
          <Articles />
        </StaticRouter>
      </initialDataContext.Provider>
    )
  );

  await Promise.all(contextObj._request);
  contextObj._isServerSide = false;

  delete contextObj._request;

  const reactApp = renderToString(
    <initialDataContext.Provider value={contextObj}>
      <StaticRouter location={req.url}>
        <Articles />
      </StaticRouter>
    </initialDataContext.Provider>
  );

  const templateFile = path.resolve("./build/index.html");
  fs.readFile(templateFile, "utf-8", (error, data) => {
    if (error) {
      return res.status(500).send(error);
    }

    // const loadedArticles = articles;
    const preloadedArticlesScript = `<script>window.preloadedData = ${JSON.stringify(contextObj)}</script>`;
    //this adds window.preloadedData variable that we can use in fe
    return res.send(
      data
        .replace(
          '<div id="root"></div>',
          `<div id="root">${reactApp}${preloadedArticlesScript}</div>`
        )
        .replace("{{ styles }}", sheet.getStyleTags())
    );
  });
});

app.listen(8080, () => {
  console.log("server is waiting in port 8080");
});
