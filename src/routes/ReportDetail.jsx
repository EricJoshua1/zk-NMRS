import React, { useContext, useMemo, useState } from "react";
import {
  Group,
  Box,
  Title,
  Button,
  ActionIcon,
  TextInput,
  Text,
} from "@mantine/core";
// import reports from "../data/reports";
import { IconArrowLeft } from "@tabler/icons-react";
import StatusBadge from "../components/StatusBadge";
import { useForm } from "@mantine/form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReportForm from "../components/ReportForm";
import { DateTimePicker } from "@mantine/dates";
import { UserContext } from "../context/UserContext";

const ReportDetail = () => {
  const { user } = useContext(UserContext);

  // const { id } = useParams();
  const navigate = useNavigate();
  const { state: report } = useLocation();

  const decodeStatus = (status) => {
    const intStatus = Number.parseInt(status);
    if (intStatus == 1) return "accepted";
    if (intStatus == 2) return "pending";
    return "rejected";
  };

  // const data = reports.find((item) => item.reportNumber.toString() === id);
  const data = {
    status: decodeStatus(report?.status) ?? "",
    category: report?.category ?? "",
    dateOfEvent: new Date(Number.parseInt(report?.dateOfEvent)) ?? "",
    locationOfEvent: report?.locationOfEvent ?? "",
    severity: report?.severity ?? "",
    title: report?.title ?? "",
    description: report?.description ?? "",
    involvedObject: report?.involvedObject ?? "",
    files: report?.files ?? [],
    id: Number.parseInt(report?.id) ?? "",
    reporter: report?.reporter ?? "",
  };

  const form = useForm({
    initialValues: {
      // dateOfEvent: report?.dateOfEvent ?? "",
      reporter: data.reporter,
      status: data.status,
      category: data.category,
      dateOfEvent: data.dateOfEvent,
      locationOfEvent: data.locationOfEvent,
      severity: data.severity,
      title: data.title,
      description: data.description,
      involvedObject: data.involvedObject,
      files: data.files,
    },

    validate: {},
  });

  return (
    <Box>
      <Group p="md" justify="space-between">
        <Group>
          <ActionIcon variant="transparent" onClick={() => navigate(-1)}>
            <IconArrowLeft
              style={{ width: "100%", height: "100%" }}
              color="rgba(255, 255, 255, 0.8)"
            />
          </ActionIcon>

          <Title order={3}>
            (#{Number.parseInt(report.id)}) {report.title}
          </Title>
        </Group>
        {user?.role === "supervisor" &&
          decodeStatus(report.status) === "pending" && (
            <Group gap={"xs"}>
              <Button color="red">Reject</Button>
              <Button color="green">Accept</Button>
            </Group>
          )}
      </Group>
      <ReportForm form={form} data={data} edit={false}>
        <Group>
          <Group style={{ width: "49%" }}>
            <DateTimePicker
              readOnly
              variant="unstyled"
              style={{ flex: 1 }}
              label="Created at"
              {...form.getInputProps("dateOfEvent")}
            />
            <TextInput
              readOnly
              variant="unstyled"
              style={{ flex: 1 }}
              label="Reported from"
              {...form.getInputProps("reporter")}
            />
          </Group>
          <Box pb={5}>
            <Text size="sm" mb={5}>
              Status
            </Text>
            <StatusBadge status={decodeStatus(report.status)} />
          </Box>
        </Group>
      </ReportForm>
    </Box>
  );
};

export default ReportDetail;
