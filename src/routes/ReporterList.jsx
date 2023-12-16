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
import reports from "../data/reports";
import StatusBadge from "../components/StatusBadge";

function ReporterList() {
  const data = reports.filter((item) => item.user === "0x74****44e");
  return (
    <Box>
      <Group p="md" justify="space-between">
        <Title>REPORTED NMRs</Title>
        <Button>New report</Button>
      </Group>
      <Box p="md">
        <Table.ScrollContainer h={"calc(90vh - 200px)"}>
          <Table horizontalSpacing="sm" verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Report No.</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Created at</Table.Th>
                <Table.Th>Status</Table.Th>
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
                  <Table.Td>{moment(element.createdAt).format("LL")}</Table.Td>
                  <Table.Td>
                    <StatusBadge status={element.status} />
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
