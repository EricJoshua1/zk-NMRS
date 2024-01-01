import React, { useContext, useEffect, useState } from "react";
import { Group, Box, Table, Title, Button } from "@mantine/core";
import moment from "moment";
import reports from "../data/reports";
import StatusBadge from "../components/StatusBadge";
import { useNavigate } from "react-router-dom";
import { routeList } from "./routeList";
import { category } from "../data/options";
import { ContractContext } from "../context/ContractContext";
import { UserContext } from "../context/UserContext";

function NmrBook() {
  const { contract } = useContext(ContractContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // const data = reports.filter((item) => item.status === "accepted");

  const fetchReports = async () => {
    try {
      const reports = await contract.methods
        .getAcceptedReports()
        .call({ from: user.id });
      console.log(reports);
      setData(reports);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

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
                  key={Number.parseInt(element.id)}
                  onClick={() =>
                    navigate(
                      `/${routeList.main}/report/${Number.parseInt(
                        element.id
                      )}`,
                      { state: element }
                    )
                  }
                >
                  <Table.Td>{Number.parseInt(element.id)}</Table.Td>
                  <Table.Td>
                    {category.find((item) => item.value === element.category)
                      ?.label ?? ""}
                  </Table.Td>
                  <Table.Td>{element.title}</Table.Td>
                  <Table.Td>
                    {moment(Number.parseInt(element.dateOfEvent) * 1000).format(
                      "LL"
                    )}
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
