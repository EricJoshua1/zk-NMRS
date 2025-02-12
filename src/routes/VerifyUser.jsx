/*global chrome*/
import {
  Box,
  Button,
  FileButton,
  Stack,
  Stepper,
  Text,
  NativeSelect,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { routeList } from "./routeList";
import { UserContext } from "../context/UserContext";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { ContractContext } from "../context/ContractContext";

const EXTENSION_ID = "aohpfocfdiihlpgjjjglckkclgeninol";
const OPEN_EXTENSION = "openExtension";

const storage = new ThirdwebStorage({
  clientId: "35652609a2a228a0cd933c8727a3bab9",
});

const reporterIPFSHash =
  "ipfs://QmWAh5rZvRw2Nf4zGwR8NWLd2t6prp3a7gJEiUVM7FpLLP/proving.zip";
const managerIPFSHash =
  "ipfs://Qma5iVk9UqRe7SMw5V4d3dgbQBrZixvo99rVxQ9Fr6LqAQ/proving.zip";
const supervisorIPFSHash =
  "ipfs://QmNZNLvSKhBLkuxqjPYerAe9ihoBxJqvNcisBw5QWFaoEL/proving.zip";

export default function VerifyUser({}) {
  const [active, setActive] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [role, setRole] = useState("Reporter");
  const [proof, setProof] = useState();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const { contract } = useContext(ContractContext);

  const getArtifactsURL = () => {
    let url;
    switch (role) {
      case "Reporter":
        url =
          "https://bafybeicvhp3tecl7udzda4vavhpw7eqrijszhy5q3j3mlyamzct6jdrkx4.ipfs.cf-ipfs.com/";
        break;

      case "Manager":
        url =
          "https://bafybeigk6gw5rkvbaomyzz5xmk6uyppa2z5t56a4cikqpmbwbifs5qfpte.ipfs.cf-ipfs.com/";
        break;

      case "Supervisor":
        url =
          "https://bafybeihcr4ejtzh3sbutab5mxwurptkxfjg47xxavpaxvo5rgmt2c524cu.ipfs.cf-ipfs.com/";
        break;

      default:
        break;
    }

    return url;
  };

  const openPopup = (artifacts) => {
    const notificationId = notifications.show({
      color: "yellow",
      title: "Waiting for zkProof..",
      message: "Please input your work ID in the zkProof generator extension",
      autoClose: false,
      loading: true,
    });

    chrome.runtime.sendMessage(
      EXTENSION_ID,
      { action: OPEN_EXTENSION, data: artifacts },
      (response) => {
        if (response.ok) {
          notifications.hide(notificationId);
          setProof(response.result);
        } else {
          notifications.hide(notificationId);
          notifications.show({
            color: "red",
            title: "Verification Failed!",
            message: "Failed to generate zkProof, check your ID.",
          });
          setVerificationFailed(true);
        }
      }
    );
  };

  const handleDownload = async () => {
    const response = await fetch(getArtifactsURL());
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      result += decoder.decode(value, { stream: true });
    }

    // console.log(result);

    // open popup now
    openPopup(result);

    // let uri;
    // if (role == "Reporter") uri = reporterIPFSHash;
    // else if (role == "Manager") uri = managerIPFSHash;
    // else uri = supervisorIPFSHash;

    // const result = await storage.download(uri);

    // if (result.status == 200) {
    //   console.log(result.url);
    //   window.open(result.url, "_blank");
    //   setActive(1);
    // } else {
    //   console.log(result);
    // }
  };

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

  const handleReadProof = (file) => {
    setLoading(true);
    if (file.type != "application/json") {
      setLoading(false);
      notifications.show({
        color: "red",
        title: "Wrong File Format",
        message: "Please upload proof.json file.",
      });
      return;
    }

    let fileReader = new FileReader();

    const handleReadFile = () => {
      const content = fileReader.result;
      setProof(JSON.parse(content));
      setFile(file);
      setActive(3);
    };

    fileReader.onloadend = handleReadFile;
    fileReader.readAsText(file);
  };

  const handleVerifyingUser = async (pf) => {
    let rl;
    if (role == "Reporter") rl = 0;
    else if (role == "Manager") rl = 1;
    else rl = 2;

    let proof = [
      [
        "0x0d00ca66b99015249d168092e7c92fe0a5a3f978061ac4fcc07cc1a83e88fb62",
        "0x020cf316361fb9e1fcc8896ffe7cde1adc2cf5ad4b8ad33a51ab1838304ecbc3",
      ],
      [
        [
          "0x0812d192ef6cef21452ba308254845805aa8c6944f40c2a79fb8a1c49e7e3876",
          "0x236b9180a919ab46708ae7851e1915a04b0f6cd1f8cb89c26a5ccc4c9feabb75",
        ],
        [
          "0x1c95df08763d6b7c1d1454284ab9a3ec0b24f7cae76287b6814cc793c38f3409",
          "0x2a7c035430c7aed042e20d8d9c93aea8f84c11a9803c83485cf673c53732aa00",
        ],
      ],
      [
        "0x1e010c02d59be4c32c580924d07aa0df50fe00bc44368343282fc898391b26bf",
        "0x2cdc1e5e3ff9fd51a8a124c87f6845fac31b3c28541433702c38435386ae310a",
      ],
    ];

    let data;

    try {
      data = await contract.methods.addUser(proof, rl).send({ from: user.id });
    } catch (err) {
      setVerificationFailed(true);
      setLoading(false);
      notifications.show({
        color: "red",
        title: "Verification failed",
        message: "Please try again",
      });
      console.log(err);
    }

    if (data.events) {
      const { UserAdded: userAddedEvent } = data.events;
      console.log(userAddedEvent.returnValues[0]);
      console.log(userAddedEvent.returnValues[1]);

      const address = userAddedEvent.returnValues[0];
      const role = userAddedEvent.returnValues[1];

      setUser({ id: address, role });
      navigate(`/${routeList.main}/${getNavigateTo(role)}`, {
        replace: true,
      });
    } else {
      setVerificationFailed(true);
      setLoading(false);
      notifications.show({
        color: "red",
        title: "Verification failed",
        message: "Please try again",
      });
      console.log(data);
    }
  };

  useEffect(() => {
    if (proof) {
      let pf = [];

      pf.push(proof.proof.a);
      pf.push(proof.proof.b);
      pf.push(proof.proof.c);

      console.log(JSON.stringify(pf));
      handleVerifyingUser(pf);
    }
  }, [proof]);

  // useEffect(() => {
  //   if (file) {
  //     handleReadProof(file);
  //     setLoading(true);

  //     // setTimeout(() => {
  //     //   if (!verificationFailed) {
  //     //     //TEMP
  //     //     const user = { role: "supervisor", id: "0x74****44e" };
  //     //     setUser(user);
  //     //     navigate(`/${routeList.main}/${getNavigateTo(user?.role)}`, {
  //     //       replace: true,
  //     //     });
  //     //   } else {
  //     //     setVerificationFailed(true);
  //     //     setLoading(false);
  //     //     notifications.show({
  //     //       color: "red",
  //     //       title: "Verification failed",
  //     //       message: "Please try again",
  //     //     });
  //     //   }
  //     // }, 2000);
  //   }
  // }, [file]);

  return (
    <Stack h={"100%"} justify="space-between">
      <Box>
        <Text c="white" w={400} fz={30}>
          WELCOME BACK TO
        </Text>
        <Text c="white" w={400} fz={30}>
          zk-NMRS Reporting
        </Text>
        <Text c="white" w={400} mt="md">
          Please connect your MetaMask wallet to continue reporting anonymously
          with zk-NMRS Near-miss Reporting platform your boss will not know.
        </Text>
      </Box>
      <Box>
        <Stepper
          active={active}
          onStepClick={setActive}
          orientation="vertical"
          styles={{
            stepLabel: {
              color: "white",
            },
          }}
        >
          <Stepper.Step
            label="Step 1"
            description={"Download ZIR files with instruction"}
          />
          <Stepper.Step
            label="Step 2"
            description={"Follow instructions to generate proof"}
          />
          <Stepper.Step
            label="Step 3"
            description={
              <Box>
                <Text size="sm">Upload proof</Text>
                {file && <Text size="sm">{file.name}</Text>}
                {verificationFailed && (
                  <Text c="red" size="sm">
                    Verification failed
                  </Text>
                )}
              </Box>
            }
          />
        </Stepper>
      </Box>
      <NativeSelect
        label="Your Role"
        description="Please select your role."
        value={role}
        onChange={(event) => setRole(event.currentTarget.value)}
        data={["Reporter", "Manager", "Supervisor"]}
      />
      <Stack>
        <Button onClick={handleDownload}>Open ZKP Extension</Button>
        {/* <FileButton
          onChange={handleReadProof}
          // accept="application/JSON"
        >
          {(props) => (
            <Button {...props} disabled={loading}>
              {loading ? "Verifying..." : "Upload Proof"}
            </Button>
          )}
        </FileButton> */}
      </Stack>
    </Stack>
  );
}
