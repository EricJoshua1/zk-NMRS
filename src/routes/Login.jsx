/*global chrome*/
import {
  Avatar,
  Box,
  Center,
  Group,
  Overlay,
  Text,
  Button,
} from "@mantine/core";
import { useSDK } from "@metamask/sdk-react";
import { useState, useEffect, useRef, useContext } from "react";
import NET from "vanta/src/vanta.net";
import logo from "../assets/logoWhite.png";
import { Carousel } from "@mantine/carousel";
import { useNavigate } from "react-router-dom";
import ConnectWallet from "./ConeectWallet";
import VerifyUser from "./VerifyUser";
import Web3 from "web3";
import { ContractContext } from "../context/ContractContext";
import { UserContext } from "../context/UserContext";
import { routeList } from "./routeList";
import { contractABI, contractAddress } from "../data/contract";
import { getNavigateTo } from "../utils/ViewSupport";

// var Contract = require('web3-eth-contract');

const web3 = new Web3(window.ethereum);

export default function Login() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const { contract, setContract } = useContext(ContractContext);
  const [account, setAccount] = useState();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

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

  useEffect(() => {
    if (contract) {
      handleCheckUser();
    }
  }, [contract]);

  const handleCheckUser = async () => {
    embla?.scrollNext();
    // const result = await contract.methods.checkUser().call({ from: account });
    // console.log("DATA FROM CONTRACT: ", result[0], result[1]);

    // const isVerified = result[0];

    // console.log("ACCOUNT: ", account);
    // setUser({ id: account });

    // if (isVerified == true) {
    //   const role = result[1];
    //   setUser({ id: account, role });
    //   navigate(`/${routeList.main}/${getNavigateTo(role)}`, {
    //     replace: true,
    //   });
    // } else embla?.scrollNext();
  };

  const onConnect = async () => {
    try {
      const accounts = await sdk?.connect();
      // console.log("Connected: ", accounts?.[0], connected, provider, chainId);
      setAccount(accounts?.[0]);
      setUser({ id: accounts?.[0] });

      web3.account = account;
      const contractInstance = new web3.eth.Contract(
        contractABI,
        contractAddress
      );

      setContract(contractInstance);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
    // embla?.scrollNext();
  };

  const openPopup = () => {
    const extensionId = "plbmoalkockmingpgmbflopgjcigdhoe";
    const message = { action: "openExtension", data: "hello mom" };

    chrome.runtime.sendMessage(extensionId, message, (response) => {
      console.log("Response:", response);
    });
  };

  useEffect(() => {
    window.addEventListener(
      "message",
      function (event) {
        if (event.data.action === "processedData") {
          console.log("Processed data from extension:", event.data.data);
          // Handle the processed data here
        }

        // Only accept messages from the same frame
        if (
          event.source == window &&
          event.data.type &&
          event.data.type == "FROM_EXTENSION"
        ) {
          console.log("Page received:", event.data);
        }
      },
      false
    );

    // window.addEventListener("message", (event) => {
    //   // Always check the origin and source for security!
    //   if (event.data.action === "processedData") {
    //     console.log("Processed data from extension:", event.data.data);
    //     // Handle the processed data here
    //   }
    // });
  }, []);

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
                {/* <Button id="something" onClick={openPopup}>
                  ZKP
                </Button> */}
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
