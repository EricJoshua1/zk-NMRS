import { Avatar, Box, Center, Group, Overlay, Text } from "@mantine/core";
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

// var Contract = require('web3-eth-contract');

const contractAddress = "0x8654d86f170f74ef7746bf37b2e97e9d4b0fdcb8";
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
      {
        internalType: "uint256",
        name: "role",
        type: "uint256",
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
        internalType: "uint256",
        name: "reportId",
        type: "uint256",
      },
      {
        internalType: "enum UserRegistration.ReportStatus",
        name: "newStatus",
        type: "uint8",
      },
    ],
    name: "changeReportStatus",
    outputs: [],
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
        indexed: false,
        internalType: "enum UserRegistration.ReportStatus",
        name: "newStatus",
        type: "uint8",
      },
    ],
    name: "IncidentReportStatusChanged",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "userRole",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "UserAdded",
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
      {
        internalType: "string",
        name: "",
        type: "string",
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
      {
        internalType: "enum UserRegistration.ReportStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isUserVerified",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userRole",
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

  const getNavigateTo = (role) => {
    switch (role) {
      case "reporter":
        return "myList";
      case "manager":
        return "list";
      case "supervisor":
        return "listAll";

      default:
        return "";
    }
  };

  const handleCheckUser = async () => {
    console.log(contract);

    const result = await contract.methods.checkUser().call({ from: account });
    console.log("DATA FROM CONTRACT: ", result[0], result[1]);

    const isVerified = result[0];

    if (isVerified == true) {
      const role = result[1];
      // const user = { role: "supervisor", id: "0x74****44e" };
      setUser({ id: account, role });
      navigate(`/${routeList.main}/${getNavigateTo(role)}`, {
        replace: true,
      });
    } else embla?.scrollNext();
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
