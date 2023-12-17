import moment from "moment";
import React from "react";

function PendingTime({ time }) {
  const diff = moment().diff(moment(time), "days");
  return (
    <div
      style={{ color: diff > 4 ? "#E03131" : diff > 2 ? "#F08C00" : "white" }}
    >
      {moment(time).fromNow(true)}
    </div>
  );
}

export default PendingTime;
