import React from "react";
import { Group, Box, Title, ActionIcon } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import ReportForm from "../components/ReportForm";

const NewReport = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      createdAt: "",
      user: "",
      status: "",
      category: "",
      dateOfEvent: "",
      locationOfEvent: "",
      severity: "",
      title: "",
      description: "",
      involvedObject: "",
      files: [],
    },

    validate: {
      category: (value) => (!value ? "Category is required!" : null),
      dateOfEvent: (value) => (!value ? "Date of event is required!" : null),
      locationOfEvent: (value) =>
        !value ? "Location of event is required!" : null,
      severity: (value) =>
        !value ? "Urgency of Intervention is required!" : null,
      title: (value) => (!value ? "Title is required!" : null),
      description: (value) => (!value ? "Description is required!" : null),
      involvedObject: (value) =>
        !value ? "Involved object is required!" : null,
    },
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

          <Title order={3}>New report</Title>
        </Group>
      </Group>
      <ReportForm form={form} edit={true} />
    </Box>
  );
};

export default NewReport;
