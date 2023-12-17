import React from "react";
import {
  Group,
  Text,
  Box,
  Button,
  ScrollArea,
  Textarea,
  TextInput,
  Stack,
  Divider,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import StatusBadge from "./StatusBadge";
import RadioInput from "./RadioInput";
import FileUploader from "./FileUploader";
import { category } from "../data/options";

const ReportForm = ({ form, data, edit, children }) => {
  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <ScrollArea h={"calc(90vh - 160px)"}>
        <Stack p="md" gap={"lg"}>
          {children && (
            <>
              {children}
              <Divider />
            </>
          )}
          <RadioInput
            readOnly={!edit}
            label="Event Category"
            formHelper={form.getInputProps("category")}
            currentValue={form.values.category}
            list={category}
          />

          <Group w="49%">
            <DateTimePicker
              readOnly={!edit}
              variant={edit ? "default" : "unstyled"}
              style={{ flex: 1 }}
              label="Date of Event"
              placeholder="Date of Event"
              {...form.getInputProps("dateOfEvent")}
            />
            <TextInput
              style={{ flex: 1 }}
              readOnly={!edit}
              variant={edit ? "default" : "unstyled"}
              label="Location of Event"
              placeholder="Location of Event"
              {...form.getInputProps("locationOfEvent")}
            />
          </Group>
          <Group>
            <TextInput
              style={{ flex: 1 }}
              readOnly={!edit}
              variant={edit ? "default" : "unstyled"}
              label="Injured Employee or Damanged Equipment"
              placeholder="Injured Employee or Damanged Equipment"
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
            <FileUploader
              readOnly={!edit}
              label="Supoporting files"
              placeholder="Upload supoporting files"
              formHelper={form.getInputProps("files")}
              currentValue={form.values.files}
            />
          </Box>

          {edit && (
            <Button w={150} mt="md">
              Submit
            </Button>
          )}
        </Stack>
      </ScrollArea>
    </form>
  );
};

export default ReportForm;
