import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dropzone/styles.css";
import "./App.css";

import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useState } from "react";
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
import NewReport from "./routes/NewReport";
import NmrBook from "./routes/NmrBook";
import ManagerList from "./routes/ManagerList";
import { UserProvider } from "./context/UserContext";
import SupervisorList from "./routes/SupervisorList";
import { ContractProvider } from "./context/ContractContext";
import { ThirdwebProvider } from "@thirdweb-dev/react";

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
        <Route path={routeList.newReport} element={<NewReport />} />
        <Route path={routeList.detail} element={<ReportDetail />} />
        <Route path={routeList.nmrBook} element={<NmrBook />} />
        <Route path={routeList.managerList} element={<ManagerList />} />
        <Route path={routeList.supervisorList} element={<SupervisorList />} />
      </Route>
    </Route>
  )
);

export default function App() {
  return (
    <ThirdwebProvider clientId={"35652609a2a228a0cd933c8727a3bab9"}>
      <ContractProvider>
        <UserProvider>
          <MantineProvider
            theme={theme}
            defaultColorScheme="dark"
            forceColorScheme="dark"
          >
            <Notifications />
            <RouterProvider router={router} />
          </MantineProvider>
        </UserProvider>
      </ContractProvider>
    </ThirdwebProvider>
  );
}
