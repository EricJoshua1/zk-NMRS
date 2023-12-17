import React, { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Group,
  Box,
  Title,
  Button,
  ActionIcon,
  TextInput,
  Text,
} from "@mantine/core";
import reports from "../data/reports";
import { IconArrowLeft } from "@tabler/icons-react";
import StatusBadge from "../components/StatusBadge";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import ReportForm from "../components/ReportForm";
import { DateTimePicker } from "@mantine/dates";
import { UserContext } from "../context/UserContext";

const ReportDetail = () => {
  const { user } = useContext(UserContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const data = reports.find((item) => item.reportNumber.toString() === id);

  const form = useForm({
    initialValues: {
      createdAt: data?.createdAt ?? "",
      user: data?.user ?? "",
      status: data?.status ?? "",
      category: data?.category ?? "",
      dateOfEvent: data?.dateOfEvent ?? "",
      locationOfEvent: data?.locationOfEvent ?? "",
      severity: data?.severity ?? "",
      title: data?.title ?? "",
      description: data?.description ?? "",
      injuredObject: data?.injuredObject ?? "",
      files: data?.files ?? [],
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
            (#{data.reportNumber}) {data.title}
          </Title>
        </Group>
        {user?.role === "manager" && data.status === "pending" && (
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
              {...form.getInputProps("createdAt")}
            />
            <TextInput
              readOnly
              variant="unstyled"
              style={{ flex: 1 }}
              label="Reported from"
              {...form.getInputProps("user")}
            />
          </Group>
          <Box pb={5}>
            <Text size="sm" mb={5}>
              Status
            </Text>
            <StatusBadge status={data.status} />
          </Box>
        </Group>
      </ReportForm>
    </Box>
  );
};

export default ReportDetail;
