import React from "react";
import { Group, Radio } from "@mantine/core";

const RadioInput = ({ label, formHelper, list, readOnly, currentValue }) => {
  return (
    <Radio.Group style={{ flex: 1 }} label={label} {...formHelper}>
      <Group mt="xs">
        {list.map((item) => (
          <Radio
            value={item.value}
            label={item.label}
            key={item.value}
            disabled={readOnly && currentValue !== item.value}
          />
        ))}
      </Group>
    </Radio.Group>
  );
};

export default RadioInput;
