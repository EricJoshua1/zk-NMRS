import React from "react";
import { FileInput, Box, rem, Anchor, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";

const FileUploader = ({
  label,
  placeholder,
  formHelper,
  currentValue,
  readOnly,
}) => {
  return (
    <Box>
      <FileInput
        leftSection={
          <IconFile style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        }
        label={label}
        placeholder={placeholder}
        multiple
        clearable
        {...formHelper}
        styles={{
          wrapper: {
            display: readOnly ? "none" : "block",
          },
        }}
      />
      {readOnly && !currentValue.length && (
        <Text size="sm" mt={5}>
          No supporting files
        </Text>
      )}
      {readOnly &&
        currentValue.map((item, index) => {
          return (
            <Anchor
              key={index.toString()}
              href={
                item.url
                  ? item.url
                  : `https://someadress.com/files/${item.name}`
              }
              target="_blank"
              underline="hover"
              style={{ display: "block" }}
            >
              {item.url ?? `https://someadress.com/files/${item.name}`}
            </Anchor>
          );
        })}
    </Box>
  );
};

export default FileUploader;
