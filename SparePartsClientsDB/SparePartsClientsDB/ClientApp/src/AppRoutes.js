import { Home } from "./components/Home";
import { DriversUi } from "./components/DriversUi";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/driversui',
    element: <DriversUi />
  }
];

export default AppRoutes;
