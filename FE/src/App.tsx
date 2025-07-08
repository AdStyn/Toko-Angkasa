import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
