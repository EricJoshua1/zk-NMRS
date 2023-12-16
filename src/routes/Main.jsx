import { Avatar, Center, Group, Overlay, Text, Box, Tabs } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/logoWhite.png";
import NET from "vanta/src/vanta.net";
import { Outlet, useNavigate } from "react-router-dom";
import { IconWallet } from "@tabler/icons-react";

const currentUserRole = "reporter";

export default function Main() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  const [tab, setTab] = useState("accidentBook");
  const navigate = useNavigate();

  const tabs = [
    {
      label: "Reporter's Page",
      role: ["reporter"],
      value: "myList",
    },
    {
      label: "Home",
      role: ["manager"],
      value: "list",
    },
    {
      label: "Home",
      role: ["supervisor"],
      value: "listAll",
    },
    {
      label: "NMR Book",
      role: ["reporter", "manager", "supervisor"],
      value: "accidentBook",
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
          iSafe RS
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
                      item.role.includes(currentUserRole) && (
                        <Tabs.Tab value={item.value} key={item.value}>
                          {item.label}
                        </Tabs.Tab>
                      )
                  )}
                  <Tabs.Tab value="account" ml="auto">
                    <Group gap={"xs"}>
                      <Avatar radius="xl">
                        <IconWallet />
                      </Avatar>
                      0x74****44e
                    </Group>
                  </Tabs.Tab>
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
