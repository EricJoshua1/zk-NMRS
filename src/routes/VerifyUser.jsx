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

  const handleDownload = async () => {
    let uri;
    if (role == "Reporter") uri = reporterIPFSHash;
    else if (role == "Manager") uri = managerIPFSHash;
    else uri = supervisorIPFSHash;

    const result = await storage.download(uri);

    if (result.status == 200) {
      console.log(result.url);
      window.open(result.url, "_blank");
      setActive(1);
    } else {
      console.log(result);
    }
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

    let data;

    try {
      data = await contract.methods.addUser(pf, rl).send({ from: user.id });
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
          iSafe Reporting
        </Text>
        <Text c="white" w={400} mt="md">
          Please connect your MetaMask wallet to continue reporting anonymously
          with iSafe Near-miss Reporting platform your boss will not know.
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
        <Button onClick={handleDownload}>Download</Button>
        <FileButton
          onChange={handleReadProof}
          // accept="application/JSON"
        >
          {(props) => (
            <Button {...props} disabled={loading}>
              {loading ? "Verifying..." : "Upload Proof"}
            </Button>
          )}
        </FileButton>
      </Stack>
    </Stack>
  );
}
