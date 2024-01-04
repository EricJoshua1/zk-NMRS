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
import { ContractContext } from "../context/ContractContext";
import { notifications } from "@mantine/notifications";

const ReportDetail = () => {
  const [loading, setLoading] = useState(false);
  const { contract } = useContext(ContractContext);
  const { user } = useContext(UserContext);

  // const { id } = useParams();
  const navigate = useNavigate();
  const { state: report } = useLocation();

  const decodeStatus = (status) => {
    const intStatus = Number.parseInt(status);
    if (intStatus == 0) return "accepted";
    if (intStatus == 2) return "pending";
    return "rejected";
  };

  // const data = reports.find((item) => item.reportNumber.toString() === id);
  const data = {
    status: decodeStatus(report?.status) ?? "",
    category: report?.category ?? "",
    dateOfEvent: new Date(Number.parseInt(report?.dateOfEvent) * 1000) ?? "",
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

  const handleResolution = async (action) => {
    setLoading(true);
    const notificationId = notifications.show({
      color: "yellow",
      autoClose: false,
      loading: true,
      title: "Changing status...",
      message: "Please wait while report status is being updated!",
    });

    const status = action === "accept" ? 0 : 1;
    try {
      const result = await contract.methods
        .changeReportStatus(data.id, status)
        .send({ from: user.id });
      console.log(result);

      // stop loading
      setLoading(false);
      // hide notification
      notifications.hide(notificationId);

      if (result.events) {
        const { IncidentReportStatusChanged: statusChangedEvent } =
          result.events;

        const newStatus = statusChangedEvent.returnValues["newStatus"];
        const reportId = statusChangedEvent.returnValues["reportId"];

        console.log(newStatus, status);

        if (Number.parseInt(newStatus) == status) {
          // show notification
          notifications.show({
            title: "Success!",
            color: "green",
            message: "Report has been successful changed! ",
            autoClose: 10000,
          });

          // navigate back
          navigate(-1);
        }
      } else {
        notifications.show({
          color: "red",
          title: "Changing status Failed!",
          message: "Something went wrong, Try again!",
          autoClose: 10000,
        });
      }
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Transaction failed!",
        message: "Check if you have enough gas fees and try again.1",
        autoClose: 10000,
      });
      console.log(error);
    }
  };

  const handleReject = () => handleResolution("reject");
  const handleAccept = () => handleResolution("accept");

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
              <Button disabled={loading} color="red" onClick={handleReject}>
                Reject
              </Button>
              <Button disabled={loading} color="green" onClick={handleAccept}>
                Accept
              </Button>
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
