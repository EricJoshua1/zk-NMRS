import React from "react";
import { Group, Box, Table, Title, Button } from "@mantine/core";
import moment from "moment";
import reports from "../data/reports";
import StatusBadge from "../components/StatusBadge";
import { useNavigate } from "react-router-dom";
import { routeList } from "./routeList";
import { category } from "../data/options";

function NmrBook() {
  const navigate = useNavigate();
  const data = reports.filter((item) => item.status === "accepted");
  return (
    <Box>
      <Group p="md" justify="space-between">
        <Title>NMR History</Title>
      </Group>
      <Box p="md">
        <Table.ScrollContainer h={"calc(90vh - 200px)"}>
          <Table horizontalSpacing="sm" verticalSpacing="sm" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Report No.</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Date of Event</Table.Th>
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
                  <Table.Td>
                    {category.find((item) => item.value === element.category)
                      ?.label ?? ""}
                  </Table.Td>
                  <Table.Td>{element.title}</Table.Td>
                  <Table.Td>
                    {moment(element.dateOfEvent).format("LL")}
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

export default NmrBook;
