import React from "react";
import { useDataSSR } from "../useDataSSR";
function Articles() {
  const articles = useDataSSR("articles", () => {
    return fetch("http://localhost:8080/api/articles").then((response) =>
      response.json()
    );
  });

  return (
    <>
      <p>Articles Page</p>
      {articles &&
        articles.map((article) => (
          <div key={article.title}>
            <h3>{article.title}</h3>
            <p>By: {article.author}</p>
          </div>
        ))}
    </>
  );
}

export default Articles;
