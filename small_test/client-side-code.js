// hydrate
const rootElement = document.getElementById("root");

const ClickCounter = () => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return React.createElement(
    "div",
    null,
    React.createElement(
      "p",
      null,
      `Client-rendered content. Click count: ${count}`
    ),
    React.createElement("button", { onClick: handleClick }, "Click me")
  );
};

ReactDOM.hydrate(React.createElement(ClickCounter), rootElement);
// client-side-code.js

// // render
// const rootElement = document.getElementById('root');

// const ClickCounter = () => {
//   const [count, setCount] = React.useState(0);

//   const handleClick = () => {
//     setCount(count + 1);
//   };

//   return React.createElement(
//     'div',
//     null,
//     React.createElement('p', null, `Client-rendered content. Click count: ${count}`),
//     React.createElement('button', { onClick: handleClick }, 'Click me')
//   );
// };

// ReactDOM.render(React.createElement(ClickCounter), rootElement);
