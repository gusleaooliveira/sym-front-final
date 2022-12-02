import {
  AppShell,
  Aside,
  Avatar,
  Burger,
  Button,
  createStyles,
  Footer,
  Group,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  ScrollArea,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Login } from "./pages";
import { RootState } from "./stores";
import {
  IconAlertCircle,
  IconCardboards,
  IconCardboardsOff,
  IconCards,
  IconChartArcs,
  IconChartArea,
  IconChartArrows,
  IconChevronRight,
  IconCreditCard,
  IconCreditCardOff,
  IconDashboardOff,
  IconHome2,
  IconLayoutDashboard,
} from "@tabler/icons";

import { useDispatch, useSelector } from "react-redux";
import { SET_TOKEN, SET_USER } from "./stores/actions";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Revenues from "./pages/Revenue";
import Expenses from "./pages/Expense";
import Page404 from "./pages/Page404";
import { IconDashboard } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

function App() {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.clickState);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const router = [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "revenues",
      element: <Revenues />,
    },
    {
      path: "expenses",
      element: <Expenses />,
    },
    {
      errorElement: <Page404 />,
    },
  ];

  const listOfRoutes = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <IconChartArrows />,
    },
    {
      path: "/revenues",
      label: "Recebimentos",
      icon: <IconCreditCard />,
    },
    {
      path: "/expenses",
      label: "Gastos",
      icon: <IconCreditCardOff />,
    },
    {
      path: "/alerts",
      label: "Alert",
      icon: <IconAlertCircle />
    }
  ];

  return (
    <>
      {token === "" ? (
        <Login />
      ) : (
        <BrowserRouter>
          <AppShell
            styles={{
              main: {
                background:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
              <Navbar
                p="md"
                hiddenBreakpoint="sm"
                hidden={!opened}
                width={{ sm: 200, lg: 300 }}
              >
                <Navbar.Section mt="xs">
                  {/* Header with logo */}
                </Navbar.Section>

                <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                  {listOfRoutes.map((route) => {
                    return (
                      <NavLink
                        label={route.label}
                        to={route.path}
                        component={Link}
                        icon={route.icon}
                      />
                    );
                  })}
                </Navbar.Section>

                <Navbar.Section>
                  <UnstyledButton
                    className={classes.user}
                    onClick={() => {
                      dispatch({ type: SET_TOKEN, token: "" });
                      dispatch({ type: SET_USER, user: "" });
                    }}
                  >
                    <Group>
                      <Avatar src={"image"} radius="xl" />

                      <div style={{ flex: 1 }}>
                        <Text size="sm" weight={500}>
                          {user?.name}
                        </Text>

                        <Text color="dimmed" size="xs">
                          {user?.email}
                        </Text>
                      </div>

                      <IconChevronRight size={14} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Navbar.Section>
              </Navbar>
            }
            footer={
              <Footer height={60} p="md">
                <Text align="center"> Criado por Gustavo Leão e Érik</Text>
              </Footer>
            }
            header={
              <Header height={{ base: 50, md: 70 }} p="md">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </MediaQuery>

                  <Text>Schedule Your Month</Text>
                </div>
              </Header>
            }
          >
            <Routes>
              {router.map((chave) => {
                return <Route path={chave.path} element={chave.element} />;
              })}
            </Routes>
          </AppShell>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
