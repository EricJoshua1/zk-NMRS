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

export default function VerifyUser({}) {
  const [active, setActive] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [role, setRole] = useState("Reporter");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDownload = () => {
    const role = prompt(
      "Please enter your role. i.e: reporter, manager, supervisor"
    );
    // setActive(1);
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

  useEffect(() => {
    console.log(role);
  }, [role]);

  useEffect(() => {
    if (file) {
      setActive(3);
      setLoading(true);
      setTimeout(() => {
        if (!verificationFailed) {
          //TEMP
          const user = { role: "supervisor", id: "0x74****44e" };
          setUser(user);
          navigate(`/${routeList.main}/${getNavigateTo(user?.role)}`, {
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
        }
      }, 2000);
    }
  }, [file]);

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
          with iSafe Reporting platform your boss will not know.
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
          <Stepper.Step label="Step 1" description={"Download something"} />
          <Stepper.Step label="Step 2" description={"Witness whatever"} />
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
          onChange={setFile}
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
