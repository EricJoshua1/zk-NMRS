import React, { useContext, useEffect, useState } from "react";
import { Group, Box, Table, Title, Button } from "@mantine/core";
import moment from "moment";
import reports from "../data/reports";
import StatusBadge from "../components/StatusBadge";
import { useNavigate } from "react-router-dom";
import { routeList } from "./routeList";
import PendingTime from "../components/PendingTime";
import { ContractContext } from "../context/ContractContext";
import { UserContext } from "../context/UserContext";

function SupervisorList() {
  const { contract } = useContext(ContractContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  // const data = reports;
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("Use effect from supervisor list.");
    fetchReports();
  }, []);

  const decodeStatus = (status) => {
    const intStatus = Number.parseInt(status);
    if (intStatus == 0) return "accepted";
    if (intStatus == 2) return "pending";
    return "rejected";
  };

  const fetchReports = async () => {
    const reports = await contract.methods.getReports().call({ from: user.id });
    console.log(reports);
    setData(reports);
  };

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
                  <Table.Td>{element.title}</Table.Td>
                  <Table.Td>
                    {moment(Number.parseInt(element.dateOfEvent) * 1000).format(
                      "LL"
                    )}
                    {/* {Number.parseInt(element.dateOfEvent)} */}
                  </Table.Td>
                  <Table.Td>
                    {decodeStatus(element.status) === "pending" ? (
                      <PendingTime
                        time={Number.parseInt(element.dateOfEvent) * 1000}
                      />
                    ) : (
                      ""
                    )}
                  </Table.Td>
                  <Table.Td>
                    <StatusBadge status={decodeStatus(element.status)} />
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
