import React from "react";
import { Group, Radio, Tooltip } from "@mantine/core";

const RadioInput = ({ label, formHelper, list, readOnly, currentValue }) => {
  return (
    <Radio.Group style={{ flex: 1 }} label={label} {...formHelper}>
      <Group mt="xs">
        {list.map((item) => (
          <Tooltip key={item.value} label={item.description}>
            <Radio
              value={item.value}
              label={item.label}
              disabled={readOnly && currentValue !== item.value}
            />
          </Tooltip>
        ))}
      </Group>
    </Radio.Group>
  );
};

export default RadioInput;
