import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { DateTimePicker } from "@mantine/dates";
import {
  Group,
  Text,
  Box,
  Title,
  Button,
  ScrollArea,
  ActionIcon,
  Textarea,
  TextInput,
  Stack,
  FileInput,
  rem,
  Radio,
  Divider,
} from "@mantine/core";
import reports from "../data/reports";
import { IconArrowLeft, IconFile } from "@tabler/icons-react";
import StatusBadge from "../components/StatusBadge";
import { useForm } from "@mantine/form";
import RadioInput from "../components/RadioInput";

const ReportDetail = () => {
  const { id } = useParams();

  const data = reports.find((item) => item.reportNumber.toString() === id);

  const [edit, setEdit] = useState(false);

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
    },

    validate: {},
  });

  return (
    <Box>
      <Group p="md" justify="space-between">
        <Group>
          <ActionIcon variant="transparent">
            <IconArrowLeft
              style={{ width: "100%", height: "100%" }}
              color="rgba(255, 255, 255, 0.8)"
            />
          </ActionIcon>

          <Title order={3}>
            (#{data.reportNumber}) {data.title}
          </Title>
        </Group>
        <Group gap={"sm"}>
          <Button variant="light" onClick={() => setEdit(!edit)}>
            {edit ? "Cancel" : "Edit"}
          </Button>
          {edit && (
            <Button variant="light" onClick={() => setEdit(!edit)}>
              {"Save"}
            </Button>
          )}
        </Group>
      </Group>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <ScrollArea h={"calc(90vh - 160px)"}>
          <Stack p="md" gap={"lg"}>
            <>
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
              <Divider />
            </>
            <RadioInput
              readOnly={!edit}
              label="Event Category"
              formHelper={form.getInputProps("category")}
              currentValue={form.values.category}
              list={[
                { value: "accident", label: "Accident" },
                { value: "incident", label: "Incident" },
                { value: "fatality", label: "Fatality" },
                { value: "environmentHazards", label: "Environment Hazards" },
                { value: "other", label: "Other" },
              ]}
            />
            {/* <Radio.Group
              readOnly={!edit}
              variant={edit ? "default" : "unstyled"}
              label="Event Category"
              {...form.getInputProps("category")}
            >
              <Group mt="xs">
                <Radio value="accident" label="Accident" />
                <Radio value="incident" label="Incident" />
                <Radio value="fatality" label="Fatality" />
                <Radio value="environmentHazards" label="Environment Hazards" />
                <Radio
                  value="other"
                  label={
                    <Group align="center" mt="-5">
                      <Text size="sm">Other</Text>
                      <TextInput
                        size="xs"
                        readOnly={!edit}
                        variant={edit ? "default" : "unstyled"}
                      />
                    </Group>
                  }
                />
              </Group>
            </Radio.Group> */}
            <Group w="49%">
              <DateTimePicker
                readOnly={!edit}
                variant={edit ? "default" : "unstyled"}
                style={{ flex: 1 }}
                label="Date of Event"
                {...form.getInputProps("dateOfEvent")}
              />
              <TextInput
                style={{ flex: 1 }}
                readOnly={!edit}
                variant={edit ? "default" : "unstyled"}
                label="Location of Event"
                {...form.getInputProps("locationOfEvent")}
              />
            </Group>
            <Group>
              <TextInput
                style={{ flex: 1 }}
                readOnly={!edit}
                variant={edit ? "default" : "unstyled"}
                label="Injured Employee or Damanged Equipment"
                {...form.getInputProps("injuredObject")}
              />
              <Box style={{ flex: 1 }}>
                <RadioInput
                  readOnly={!edit}
                  label="Severity of Injury or Damag"
                  formHelper={form.getInputProps("severity")}
                  currentValue={form.values.severity}
                  list={[
                    { value: "minor", label: "Minor" },
                    { value: "moderate", label: "Moderate" },
                    { value: "serious", label: "Serious" },
                    { value: "fatal", label: "Fatal" },
                  ]}
                />
              </Box>
            </Group>

            <TextInput
              label="Title"
              placeholder="Title"
              readOnly={!edit}
              variant={edit ? "default" : "unstyled"}
              {...form.getInputProps("title")}
            />
            <Textarea
              label="Describe Event in Detail"
              readOnly={!edit}
              variant={edit ? "default" : "unstyled"}
              {...form.getInputProps("description")}
              placeholder="Describe Event in Detail"
              minRows={2}
              autosize
            />
            <Box style={{ width: "49%" }}>
              <FileInput
                leftSection={
                  <IconFile
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                }
                label="Supoporting files"
                placeholder="Upload supoporting files"
                multiple
                clearable
              />
            </Box>

            <Button w={150} mt="md">
              Submit
            </Button>
          </Stack>
        </ScrollArea>
      </form>
    </Box>
  );
};

export default ReportDetail;
