import React from "react";
import { Badge } from "@mantine/core";

function StatusBadge({ status }) {
  return (
    <Badge
      w="80"
      size="md"
      color={
        status === "accepted"
          ? "green"
          : status === "rejected"
          ? "red"
          : "yellow"
      }
    >
      {status}
    </Badge>
  );
}

export default StatusBadge;
