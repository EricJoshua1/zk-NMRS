import React, { useEffect, useState } from "react";
import { FileInput, Box, rem, Anchor, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { useStorage } from "@thirdweb-dev/react-core";

const FileUploader = ({
  label,
  placeholder,
  formHelper,
  currentValue,
  readOnly,
}) => {
  const [files, setFiles] = useState([]);
  const [filesLoading, setFilesLoading] = useState(false);
  const storage = useStorage();

  const downloadIPFSFiles = async (ipfsLinks) => {
    if (!ipfsLinks.length) return;
    setFilesLoading(true);

    let fileObjects = [];

    for (let i = 0; i < ipfsLinks.length; i++) {
      const element = ipfsLinks[i];
      const result = await storage.download(element);

      if (result.ok) fileObjects.push(result.url);
    }

    setFilesLoading(false);
    setFiles(fileObjects);
  };

  useEffect(() => {
    downloadIPFSFiles(currentValue);
  }, []);

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
        !filesLoading &&
        currentValue.map((item, index) => {
          return (
            <Anchor
              key={index.toString()}
              href={files[index]}
              target="_blank"
              underline="hover"
              style={{ display: "block" }}
            >
              {item}
            </Anchor>
          );
        })}
    </Box>
  );
};

export default FileUploader;
