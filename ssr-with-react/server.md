<!-- # Server-Side Rendering with Express and React

## Overview

This is a server-side rendering (SSR) setup using Express, React, and styled-components. The primary goal is to render a React application on the server, handle data fetching, and then send the pre-rendered HTML to the client.

## Dependencies

### isomorphic-fetch

The `isomorphic-fetch` library is imported to enable fetch functionality on both the server and the client. This is necessary because the `fetch` API is typically available only on the client side.

### express

The Express.js framework is used to handle server-side logic and routing.

### react and react-dom/server

These modules are part of the React library and are used for server-side rendering.

### react-router-dom/server

This module provides server-side rendering support for React Router.

### path and fs

The `path` module is used for working with file and directory paths, while the `fs` module is used to read files.

### styled-components

This library is employed for styling React components with tagged template literals.

## Server Setup

```javascript
import express from "express";
const app = express();
```

The Express application is created, and static files from the "./build" directory are served.

```javascript
app.use(express.static("./build", { index: false }));
```

The `express.static` middleware is used to serve static files, and the option `{ index: false }` is set to disable serving the default "index.html" file when accessing the root URL.

## API Endpoint for Articles

```javascript
const articles = [
  { title: "Article 1", author: " Bob" },
  { title: "Article 2", author: " Bethy" },
  { title: "Article 3", author: " Frenk" },
  { title: "Article 4", author: " Tony" },
];

app.get("/api/articles", (req, res) => {
  const loadedArticles = articles;
  res.json(loadedArticles);
});
```

An API endpoint is defined at "/api/articles" to simulate fetching articles from a database.

## Server-Side Rendering

```javascript
app.get("*", async (req, res) => {
  // ...
});
```

For any route (`*`), including the root, this route is triggered for server-side rendering.

### First Render

```javascript
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
```

- `ServerStyleSheet` is used to collect styles during rendering.
- A server-side context (`contextObj`) is initialized to manage rendering information.
- `renderToString` renders the React component (`<Articles />`) to a string, and any data-fetching requests are added to the `_request` array in the context.

### Asynchronous Data Fetching

```javascript
await Promise.all(contextObj._request);
contextObj._isServerSide = false;
delete contextObj._request;
```

- The server waits for all asynchronous requests in the `_request` array to complete.
- `_isServerSide` is set to `false` in the context to indicate subsequent rendering on the client side.
- The `_request` array is deleted from the context.

### Second Render

```javascript
const reactApp = renderToString(
  <initialDataContext.Provider value={contextObj}>
    <StaticRouter location={req.url}>
      <Articles />
    </StaticRouter>
  </initialDataContext.Provider>
);
```

A second `renderToString` is performed to generate the final HTML, now including the data fetched during the server-side data-fetching phase.

### HTML Template Modification and Response

```javascript
const templateFile = path.resolve("./build/index.html");
fs.readFile(templateFile, "utf-8", (error, data) => {
  // ...

  return res.send(
    data
      .replace(
        '<div id="root"></div>',
        `<div id="root">${reactApp}${preloadedArticlesScript}</div>`
      )
      .replace("{{ styles }}", sheet.getStyleTags())
  );
});
```

- The HTML template file is read, and placeholders are replaced with the rendered React app and preloaded data script.
- The modified HTML is sent as the response to the client.

## Server Start

```javascript
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
```

The Express server is started on port 8080.

```
#############################################
so with simple words what does the renderToString , it means that it generates all the code of the compoentns inside it so we understand what we need to fetch is that or not ?

and the the second time of renderToString what we do is the generated string of code we save in a variable and then the second time render we send that variable to the client ....

so it means the first render we do not see anything at client side ,,,
so what happens 
-the firtst render generates all html code and the server understands what to fetch ....
-it fetches all the data and pushes to the context ....
-so we need the context to not loose the data during the rerenders or not ???/
-then the saved data in context are rendered second time and rendered the code with the data
-then this code with data all render is send to the client ... 
#############################################

1. **`useContext` and State:**
   - The hook uses the `useContext` hook to access the server-side context (`initialDataContext`).
   - It also uses the `useState` hook to manage the local state for the fetched data (`data`).

2. **Server-Side Rendering (`context._isServerSide`):**
   - If `_isServerSide` is true, it means it's the first server-side render.
   - In this case, a promise to fetch data (`loadFunc()`) is added to the `_request` array in the server-side context (`context._request`).
   - The fetched data is then stored in the server-side context under the corresponding `resourceName`.

3. **Client-Side Rendering (`!context._isServerSide`):**
   - If `_isServerSide` is false (client-side) and the data is not available locally (`!data`), it means the first render hasn't received the data yet.
   - On the client, the data is fetched using `loadFunc()` (the same function used on the server).
   - The local state (`data`) is updated with the fetched result, and the server-side context's data is also updated.

4. **Return Data:**
   - The hook returns the data, whether it's the locally stored data on the client or the initial data fetched during server-side rendering.

In summary, the `useDataSSR` custom hook efficiently manages data fetching based on whether it's 
the first server-side render or subsequent client-side renders. 
It abstracts away the complexities of handling data fetching and storage, 
making it easier to implement server-side rendering with React.

 -->
# Server-Side Rendering with Express and React

## Overview

This setup utilizes Express, React, and styled-components for server-side rendering (SSR). The primary objective is to render a React application on the server, manage data fetching, and then dispatch the pre-rendered HTML to the client.

## Dependencies

### isomorphic-fetch

The `isomorphic-fetch` library is imported to enable fetch functionality on both the server and the client. This is crucial because the `fetch` API is typically available only on the client side.

### express

Express.js is employed to handle server-side logic and routing.

### react and react-dom/server

These modules, part of the React library, are used for server-side rendering.

### react-router-dom/server

This module provides server-side rendering support for React Router.

### path and fs

The `path` module works with file and directory paths, while `fs` is used to read files.

### styled-components

This library is used for styling React components with tagged template literals.

## Server Setup

```javascript
import express from "express";
const app = express();
```

The Express application is created, and static files from the "./build" directory are served.

```javascript
app.use(express.static("./build", { index: false }));
```

The `express.static` middleware is used to serve static files, and the option `{ index: false }` disables serving the default "index.html" file when accessing the root URL.

## API Endpoint for Articles

```javascript
const articles = [
  { title: "Article 1", author: " Bob" },
  { title: "Article 2", author: " Bethy" },
  { title: "Article 3", author: " Frenk" },
  { title: "Article 4", author: " Tony" },
];

app.get("/api/articles", (req, res) => {
  const loadedArticles = articles;
  res.json(loadedArticles);
});
```

An API endpoint at "/api/articles" simulates fetching articles from a database.

## Server-Side Rendering

```javascript
app.get("*", async (req, res) => {
  // ...
});
```

For any route (`*`), including the root, this route is triggered for server-side rendering.

### First Render

```javascript
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
```

- `ServerStyleSheet` is used to collect styles during rendering.
- A server-side context (`contextObj`) is initialized to manage rendering information.
- `renderToString` renders the React component (`<Articles />`) to a string, and any data-fetching requests are added to the `_request` array in the context.

### Asynchronous Data Fetching

```javascript
await Promise.all(contextObj._request);
contextObj._isServerSide = false;
delete contextObj._request;
```

- The server waits for all asynchronous requests in the `_request` array to complete.
- `_isServerSide` is set to `false` in the context to indicate subsequent rendering on the client side.
- The `_request` array is deleted from the context.

### Second Render

```javascript
const reactApp = renderToString(
  <initialDataContext.Provider value={contextObj}>
    <StaticRouter location={req.url}>
      <Articles />
    </StaticRouter>
  </initialDataContext.Provider>
);
```

A second `renderToString` is performed to generate the final HTML, now including the data fetched during the server-side data-fetching phase.

### HTML Template Modification and Response

```javascript
const templateFile = path.resolve("./build/index.html");
fs.readFile(templateFile, "utf-8", (error, data) => {
  // ...

  return res.send(
    data
      .replace(
        '<div id="root"></div>',
        `<div id="root">${reactApp}${preloadedArticlesScript}</div>`
      )
      .replace("{{ styles }}", sheet.getStyleTags())
  );
});
```

- The HTML template file is read, and placeholders are replaced with the rendered React app and preloaded data script.
- The modified HTML is sent as the response to the client.

## Server Start

```javascript
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
```

The Express server is started on port 8080.

```
## Understanding `renderToString`

`renderToString` is a function that converts React components to HTML strings during server-side rendering. It doesn't trigger or execute logic related to data fetching; instead, it generates the HTML representation of React components.

1. **First Render (Server-Side):**
   - During the first `renderToString`, the server generates the HTML code for React components, like `<Articles />`.
   - The `useDataSSR` hook within components identifies data to fetch based on the server-side context (`_isServerSide`).
   - Data-fetching requests are initiated and added to the `_request` array in the context.

2. **Asynchronous Data Fetching:**
   - The server waits for all asynchronous data-fetching promises in the `_request` array to resolve.
   - This ensures the server has the necessary data before completing the render.

3. **Second Render (Server-Side):**
   - A second `renderToString` is performed, now including the fetched data.
   - The `useDataSSR` hook, based on the server-side context, doesn't initiate additional data fetching since `_isServerSide` is now `false`.

4. **HTML Template Modification and Response:**
   - The server modifies the HTML template, replacing placeholders with the rendered React app and preloaded data script.
   - The modified HTML is sent as the response to the client.

5. **Client-Side Interaction:**
   - The client receives the pre-rendered HTML with the React component and preloaded data.
   - Subsequent interactions and renders happen on the client side.

In summary, `renderToString` is a critical step in the server-side rendering process, where React components are converted into HTML strings. The logic for data fetching and manipulation is embedded in the components being rendered, determining what data to fetch based on the context of the rendering process.
```