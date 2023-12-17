import { useContext, useState } from "react";
import { initialDataContext } from "./initialDataContext";
export const useDataSSR = (resourceName, loadFunc) => {
  const context = useContext(initialDataContext);
  const [data, setData] = useState(context._data[resourceName]);

  if (context._isServerSide) {
    context._request.push(
      loadFunc().then((result) => (context._data[resourceName] = result))
    );
  } else if (!data) {
    loadFunc().then((result) => {
      setData(result);
      context._data[resourceName] = result;
    });
  }
  return data;
};

/*
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
*/
