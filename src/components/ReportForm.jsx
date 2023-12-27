import React, { useContext, useState } from "react";
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
  Tooltip,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import StatusBadge from "./StatusBadge";
import RadioInput from "./RadioInput";
import FileUploader from "./FileUploader";
import { category } from "../data/options";
import { ContractContext } from "./../context/ContractContext";
import { UserContext } from "../context/UserContext";
import { useStorage, useStorageUpload } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const ReportForm = ({ form, data, edit, children }) => {
  const { contract } = useContext(ContractContext);
  const { user } = useContext(UserContext);
  const storage = useStorage();
  const { mutateAsync: upload, isLoading } = useStorageUpload();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    setLoading(true);
    const {
      category,
      dateOfEvent,
      locationOfEvent,
      description,
      title,
      severity,
      involvedObject,
      files,
    } = form.values;

    // convert dateOfEvent into unix timestamp
    const date = new Date(dateOfEvent);
    const timestampInSeconds = Math.floor(date.getTime() / 1000);

    // const result = await storage.download(
    //   "ipfs://QmQaZUMoaLAoK4J8K8Nur3vqaimTeuULALFoUcKY2eqKwp/proving.key"
    // );
    // console.log("IPFS: ", result);

    let fileList = [];

    // upload files to IPFS
    if (files.length > 0) {
      // const uris = await upload({ data: files });
      // console.log(uris);
      fileList = files.map((item) => fileList.push(item.name));
    }

    const payload = {
      category,
      // we send unix timestamp in place of dateOfEvent
      timestampInSeconds,
      locationOfEvent,
      description,
      title,
      severity,
      involvedObject,
      fileList,
    };
    // console.log(payload);

    // send data to smart contract
    const result = await contract.methods
      .submitIncidentReport(...Object.values(payload))
      .send({ from: user.id });
    console.log(result);

    if (result.events) {
      // event.returnValues[0] --> reportId
      // event.returnValues[1] --> address

      const { IncidentReportSubmitted: event } = result.events;

      // show notification
      notifications.show({
        color: "green",
        title: "Success",
        message: "Near-miss report has been successful submitted!",
      });
      // navigate back to reporter list
      navigate(-1);
    } else {
      // show failed notification
      notifications.show({
        color: "red",
        title: "Failed",
        message: "Something went wrong, make sure you have enough gas!",
      });
      // set Loading false
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        // we have access to "values" from here
        handleFormSubmit();
      })}
    >
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
              label="Involved Employee or Equipment"
              placeholder="Involved Employee or Equipment"
              {...form.getInputProps("involvedObject")}
            />
            <Box style={{ flex: 1 }}>
              <RadioInput
                readOnly={!edit}
                label="Urgency of Intervention"
                formHelper={form.getInputProps("severity")}
                currentValue={form.values.severity}
                list={[
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                  { value: "critical", label: "Critical" },
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
            <Button loading={loading} w={150} mt="md" type="submit">
              Submit
            </Button>
          )}
        </Stack>
      </ScrollArea>
    </form>
  );
};

export default ReportForm;
