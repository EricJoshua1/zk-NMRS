import React from "react";
import { Group, Box, Table, Title, Button } from "@mantine/core";
import moment from "moment";
import reports from "../data/reports";
import StatusBadge from "../components/StatusBadge";
import { useNavigate } from "react-router-dom";
import { routeList } from "./routeList";
import PendingTime from "../components/PendingTime";

function SupervisorList() {
  const navigate = useNavigate();
  const data = reports;

  return (
    <Box>
      <Group p="md" justify="space-between">
        <Title>REPORTED NMRs</Title>
      </Group>
      <Box p="md">
        <Table.ScrollContainer h={"calc(90vh - 200px)"}>
          <Table horizontalSpacing="sm" verticalSpacing="sm" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Report No.</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Reported at</Table.Th>
                <Table.Th>Pending Time</Table.Th>
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
                <Table.Tr
                  key={element.reportNumber}
                  onClick={() =>
                    navigate(
                      `/${routeList.main}/report/${element.reportNumber}`
                    )
                  }
                >
                  <Table.Td>{element.reportNumber}</Table.Td>
                  <Table.Td>{element.title}</Table.Td>
                  <Table.Td>{moment(element.createdAt).format("LL")}</Table.Td>
                  <Table.Td>
                    {element.status === "pending" ? (
                      <PendingTime time={element.createdAt} />
                    ) : (
                      ""
                    )}
                  </Table.Td>
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

export default SupervisorList;
