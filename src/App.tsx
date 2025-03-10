import {
  createBrowserRouter,
  createHashRouter,
  RouteObject,
  RouterProvider,
} from "react-router";
import "./App.css";

import { useMemo } from "react";
import AppsScreen from "./modules/apps/Apps.screen";

function App() {
  const routes: RouteObject[] = useMemo(
    () => [
      {
        index: true,
        element: (
          <>
            <h1>🚧</h1>
            <p>Nothing here yet</p>
          </>
        ),
      },
      {
        path: "apps",
        index: true,
        element: <AppsScreen />,
      },
    ],
    []
  );
  const router = useMemo(
    () =>
      import.meta.env.VITE_ROUTER_MODE === "hash"
        ? createHashRouter(routes)
        : createBrowserRouter(routes),
    [routes]
  );

  return (
    <RouterProvider router={router} />
    // <BrowserRouter>
    //   <Routes>
    //     <Route
    //       index
    //       element={
    //         <>
    //           <h1>🚧</h1>
    //           <p>Nothing here yet</p>
    //         </>
    //       }
    //     />
    //     <Route path="apps">
    //       <Route index element={<AppsScreen />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
