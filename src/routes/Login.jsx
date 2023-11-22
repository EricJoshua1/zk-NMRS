import { Avatar, Box, Center, Group, Overlay, Text } from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import NET from "vanta/src/vanta.net";
import logo from "../assets/logoWhite.png";
import { Carousel } from "@mantine/carousel";
import ConnectWallet from "./ConeectWallet";
import VerifyUser from "./VerifyUser";

export default function Login() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  const [embla, setEmbla] = useState(null);

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

  const onConnect = () => {
    embla?.scrollNext();
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
          miw={500}
          mih={"80vh"}
          style={{ position: "relative", backgroundColor: "transparent" }}
        >
          <Overlay backgroundOpacity={0.35} blur={10}>
            <Carousel
              height={"80vh"}
              draggable={false}
              withControls={false}
              getEmblaApi={setEmbla}
              initialSlide={0}
            >
              <Carousel.Slide p={50}>
                <ConnectWallet onConnect={onConnect} />
              </Carousel.Slide>

              <Carousel.Slide p={50}>
                <VerifyUser />
              </Carousel.Slide>
            </Carousel>
          </Overlay>
        </Box>
      </Center>
    </div>
  );
}
