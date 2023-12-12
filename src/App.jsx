import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dropzone/styles.css";
import "./App.css";

import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import { routeList } from "./routes/routeList";
import Main from "./routes/Main";
import ReporterList from "./routes/ReporterList";
import ReportDetail from "./routes/ReportDetail";

const theme = createTheme({
  primaryColor: "blue",
  fontFamily: "Barlow, sans-serif",
  fontFamilyMonospace: "Barlow, sans-serif",
  headings: { fontFamily: "Barlow, sans-serif" },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routeList.root} element={<Root />}>
      <Route path={routeList.login} element={<Login />} />
      <Route path={routeList.main} element={<Main />}>
        <Route path={routeList.reporterList} element={<ReporterList />} />
        <Route path={routeList.newReport} element={<ReportDetail />} />
        <Route path={routeList.detail} element={<ReportDetail />} />
      </Route>
      {/* 
      <Route path={routeList.appShell} element={<MyAppShell />}>
        <Route path={routeList.map} element={<MapView />} />
        <Route path={routeList.site} element={<Site />} />
        <Route path={routeList.feeds} element={<Feeds />} />
        <Route path={routeList.settings} element={<DeviceSettings />} />
        <Route path={routeList.profile} element={<MyProfile />} />
      </Route> */}
    </Route>
  )
);

export default function App() {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      forceColorScheme="dark"
    >
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
