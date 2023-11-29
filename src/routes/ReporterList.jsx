import React from "react";
import {
  Avatar,
  Center,
  Group,
  Overlay,
  Text,
  Box,
  Table,
  Title,
  Button,
  ScrollArea,
  Badge,
} from "@mantine/core";
import moment from "moment";

const data = [
  {
    reportNumber: 16,
    title: "Water Leakage in Basement",
    date: new Date("2024-02-16"),
    description:
      "Discovered water leakage in the basement, potentially compromising the foundation. Urgently recommend a thorough inspection to identify and address the source of the leakage.",
    progress: "rejected",
    user: "0x74****44e",
  },
  {
    reportNumber: 15,
    title: "Missing Hard Hats",
    date: new Date("2024-02-15"),
    description:
      "Several workers observed without proper head protection (hard hats) on the construction site. Enforce strict adherence to safety gear requirements to mitigate the risk of head injuries.",
    progress: "accepted",
    user: "0x74****44e",
  },
  {
    reportNumber: 14,
    title: "Faulty Scaffolding",
    date: new Date("2024-02-14"),
    description:
      "Noticed unstable scaffolding on the exterior of the building. This poses a serious risk to workers and the public. Immediate inspection and repair are necessary to prevent accidents and injuries.",
    progress: "pending",
    user: "0x74****44e",
  },
  {
    reportNumber: 13,
    title: "Blocked Emergency Exit",
    date: new Date("2024-02-13"),
    description:
      "Discovered the emergency exit on the third floor obstructed by construction materials. This is a violation of safety regulations. Urgently request clearing the exit route to ensure quick and safe evacuation in case of an emergency.",
    progress: "rejected",
    user: "0x74****44e",
  },
  {
    reportNumber: 12,
    title: "Inadequate Lighting in Stairwell",
    date: new Date("2024-02-12"),
    description:
      "Observed poor lighting conditions in the stairwell, posing a safety risk for workers and visitors. Suggest installing additional lighting fixtures to improve visibility and prevent accidents.",
    progress: "accepted",
    user: "0x74****44e",
  },
  {
    reportNumber: 11,
    title: "Cracked Support Beam",
    date: new Date("2024-02-11"),
    description:
      "Identified a crack in one of the support beams on the second floor. The structural integrity may be compromised. Recommend immediate structural assessment and reinforcement to ensure the safety of the building.",
    progress: "pending",
    user: "0x74****44e",
  },
  {
    reportNumber: 10,
    title: "Manager Not Wearing Safety Gear",
    date: new Date("2024-02-10"),
    description:
      "Witnessed a site manager not wearing the required safety gear while overseeing construction activities. This sets a poor example for other workers. Request immediate action to enforce safety protocols for all personnel on-site.",
    progress: "pending",
    user: "0x74****44e",
  },
  {
    reportNumber: 3,
    title: "Missing Safety Signage",
    date: new Date("2024-02-03"),
    description:
      "Noticed the absence of proper safety signage near the construction zone. Lack of clear warnings may lead to accidents. Suggest placing prominent signs indicating potential hazards and safety protocols.",
    progress: "accepted",
    user: "0x74****44e",
  },
  {
    reportNumber: 2,
    title: "Unsafe Electrical Wiring",
    date: new Date("2024-02-02"),
    description:
      "Observed unsafe electrical wiring near the construction site's temporary office. Exposed wires are a serious safety concern. Urgently recommend an electrician to inspect and rectify the issue to avoid electrical hazards.",
    progress: "pending",
    user: "0x74****44e",
  },
  {
    reportNumber: 1,
    title: "Broken Tile in Lobby",
    date: new Date("2024-02-01"),
    description:
      "While conducting a routine inspection, discovered a broken tile in the lobby area near the entrance. The broken tile poses a potential safety hazard for foot traffic. Recommend immediate replacement to prevent accidents.",
    progress: "pending",
    user: "0x74****44e",
  },
];

function ReporterList() {
  return (
    <Box>
      <Group p="md" justify="space-between">
        <Title>Reported Issues</Title>
        <Button>New report</Button>
      </Group>
      <Box p="md">
        <Table.ScrollContainer h={"calc(80vh - 200px)"}>
          <Table horizontalSpacing="sm" verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Report No.</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Progress</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {!data.length && (
                <Table.Tr>
                  <Table.Td colSpan={4}>No reported issue</Table.Td>
                </Table.Tr>
              )}
              {data.map((element) => (
                <Table.Tr key={element.reportNumber}>
                  <Table.Td>{element.reportNumber}</Table.Td>
                  <Table.Td>{element.title}</Table.Td>
                  <Table.Td>{moment(element.date).format("LL")}</Table.Td>
                  <Table.Td>
                    <Badge
                      w="80"
                      size="md"
                      color={
                        element.progress === "accepted"
                          ? "green"
                          : element.progress === "rejected"
                          ? "red"
                          : "yellow"
                      }
                    >
                      {element.progress}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Box>
    </Box>
  );
}

export default ReporterList;
