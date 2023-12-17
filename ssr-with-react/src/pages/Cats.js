import React, { useEffect, useState } from "react";

function Cats() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    fetch("https://catfact.ninja/facts")
      .then((response) => response.json())
      .then((data) => setCats(data.data));
  },[]);
  return (
    <div>
        <b>test if we have a static template or note</b>
      {cats.map((cat) => (
        <p>{cat.fact}</p>
      ))}
    </div>
  );
}

export default Cats;
