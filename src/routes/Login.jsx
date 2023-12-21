import { Avatar, Box, Center, Group, Overlay, Text } from "@mantine/core";
import { useSDK } from "@metamask/sdk-react";
import { useState, useEffect, useRef } from "react";
import NET from "vanta/src/vanta.net";
import logo from "../assets/logoWhite.png";
import { Carousel } from "@mantine/carousel";
import ConnectWallet from "./ConeectWallet";
import VerifyUser from "./VerifyUser";
import Web3 from "web3";
// var Contract = require('web3-eth-contract');

const contractABI = [
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "X",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "Y",
                type: "uint256",
              },
            ],
            internalType: "struct Pairing.G1Point",
            name: "a",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256[2]",
                name: "X",
                type: "uint256[2]",
              },
              {
                internalType: "uint256[2]",
                name: "Y",
                type: "uint256[2]",
              },
            ],
            internalType: "struct Pairing.G2Point",
            name: "b",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "X",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "Y",
                type: "uint256",
              },
            ],
            internalType: "struct Pairing.G1Point",
            name: "c",
            type: "tuple",
          },
        ],
        internalType: "struct Verifier.Proof",
        name: "proof",
        type: "tuple",
      },
    ],
    name: "addUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "submitIncidentReport",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "reportId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "reporter",
        type: "address",
      },
    ],
    name: "IncidentReportSubmitted",
    type: "event",
  },
  {
    inputs: [],
    name: "checkUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "incidentReports",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "reporter",
        type: "address",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reportCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contractAddress = "0xc973faAf7c7FF351BAF2A73Cad12Db83ccfBCCB5";

export default function Login() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  const [account, setAccount] = useState();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const [embla, setEmbla] = useState(null);

  const web3 = new Web3(window.ethereum);

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

  const onConnect = async () => {
    // try {
    //   const accounts = await sdk?.connect();
    //   console.log("Connected: ", accounts?.[0], connected, provider, chainId);
    //   setAccount(accounts?.[0]);

    //   web3.account = account;

    //   const contractInstance = new web3.eth.Contract(
    //     contractABI,
    //     contractAddress
    //   );

    //   const data = await contractInstance.methods.checkUser().call();
    //   console.log("DATA FROM CONTRACT: ", data);
    // } catch (err) {
    //   console.warn("failed to connect..", err);
    // }
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
