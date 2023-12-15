**1. Installation:**

Open a terminal in your project directory and run the following command to install required dependencies:

```
npm install
```

This will install all of the dependencies listed in your `package.json` file.

**2. Client-Side Rendering:**

To run the application in client-side rendering mode, follow these steps:

a. Modify the `index.js` file to use `ReactDOM.render` instead of `ReactDOM.hydrate` (if it's currently using the latter).
b. Run the following command to start the development server:

```
npm start
```

This will start a server that serves the application files and allows you to view it in your browser at http://localhost:3000 (or whatever port you have configured).

**3. Server-Side Rendering:**

To run the application in server-side rendering mode, follow these steps:

a. **Build:**

Run the following command to build the server-side code:

```
npm run build
```

This will create a `build` folder containing the optimized server-side code.

b. **Run:**

There are two options for running the server:

* **Node:**

```
npx babel-node server.js
```

This will run the server directly using the `babel-node` script defined in `package.json`.

* **Nodemon (optional):**

```
npx nodemon --exec npx babel-node server.js
```

This will run the server using `nodemon`, which automatically restarts the server whenever you make changes to the code.

