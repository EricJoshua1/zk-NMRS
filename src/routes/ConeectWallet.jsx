import { Box, Button, Center, Image, Stack, Text } from "@mantine/core";
import { IconWallet } from "@tabler/icons-react";
import metamask from "../assets/metamask.png";
import { useState } from "react";

export default function ConnectWallet({ onConnect }) {
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      onConnect();
    }, 1000);
  };

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
      <Center>
        <Image src={metamask} w={100} style={{ opacity: 0.6 }} />
      </Center>
      <Button
        onClick={handleConnect}
        leftSection={
          <IconWallet
            style={{
              width: "1rem",
              height: "1rem",
            }}
          />
        }
        disabled={loading}
      >
        {loading ? "CONNECTING..." : "CONNECT WALLET"}
      </Button>
    </Stack>
  );
}
