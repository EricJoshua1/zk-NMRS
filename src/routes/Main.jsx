import {
  Avatar,
  Center,
  Group,
  Overlay,
  Text,
  Box,
  Tabs,
  Menu,
  rem,
  Button,
} from "@mantine/core";
import { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/logoWhite.png";
import NET from "vanta/src/vanta.net";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { IconWallet, IconWalletOff } from "@tabler/icons-react";
import { UserContext } from "../context/UserContext";
import { routeList } from "./routeList";

export default function Main() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("MAIN USER: ", user);
      navigate(`/${routeList.login}`, { replace: true });
    }
  }, []);

  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  const { pathname } = useLocation();
  const getDefaultTab = () => {
    let current = pathname.split("/")?.[2];
    return current;
  };
  const [tab, setTab] = useState(getDefaultTab());

  const tabs = [
    {
      label: "Reporter's Page",
      role: ["reporter"],
      value: "myList",
    },
    {
      label: "Manager's Page",
      role: ["manager"],
      value: "list",
    },
    {
      label: "Supervisor's Page",
      role: ["supervisor"],
      value: "listAll",
    },
    {
      label: "NMR Book",
      role: ["reporter", "manager", "supervisor"],
      value: "nmrBook",
    },
  ];

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          scale: 0.5,
          scaleMobile: 1.0,
          color: 0xfffafc,
          backgroundColor: 0x403357,
          points: 16.0,
          maxDistance: 26.0,
          spacing: 20.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const setActiveTab = (value) => {
    setTab(value);
    navigate(value, { replace: true });
  };

  return (
    <div
      ref={myRef}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Group gap={"xs"} style={{ position: "absolute" }} py={"md"} px={"xl"}>
        <Avatar src={logo} size={28} radius={0} />
        <Text c="white" fw={500} fz={25}>
          iNMRS
        </Text>
      </Group>
      <Center h={"100vh"}>
        <Box
          miw={"60vw"}
          mih={"90vh"}
          style={{ position: "relative", backgroundColor: "transparent" }}
        >
          <Overlay backgroundOpacity={0.35} blur={10}>
            <Box p="sm">
              <Tabs defaultValue={tab} onChange={setActiveTab}>
                <Tabs.List>
                  {tabs.map(
                    (item) =>
                      item.role.includes(user?.role) && (
                        <Tabs.Tab value={item.value} key={item.value}>
                          {item.label}
                        </Tabs.Tab>
                      )
                  )}
                  <Menu shadow="md" width={200} ml="auto" mb="xs">
                    <Menu.Target>
                      <Button
                        color="gray"
                        variant="transparent"
                        styles={{
                          label: {
                            fontWeight: "unset",
                          },
                        }}
                        leftSection={
                          <Avatar radius="xl">
                            <IconWallet
                              style={{ width: rem(18), height: rem(18) }}
                              stroke={1.5}
                            />
                          </Avatar>
                        }
                      >
                        {user?.id}
                      </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item
                        onClick={() => {
                          setUser();
                          navigate(`/${routeList.login}`);
                        }}
                        leftSection={
                          <IconWalletOff
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                      >
                        Disconnect Wallet
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Tabs.List>
              </Tabs>
              <Outlet />
            </Box>
          </Overlay>
        </Box>
      </Center>
    </div>
  );
}
