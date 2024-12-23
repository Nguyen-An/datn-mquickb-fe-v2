import React, { useEffect, useReducer, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { uploadFileToS3, uploadIamge } from '@/api/file';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const FILE_TYPE = [".c", ".cs", ".cpp", ".doc", ".docx", ".html",
  ".java", ".json", ".pdf", ".php", ".pptx", ".txt", ".js", "text/plain"]

const UploadFileChatBot: React.FC<{ file: any, setFile: (item: any) => void }> = ({ file, setFile }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const props: UploadProps = {
    accept: FILE_TYPE.join(","),
    name: 'file',
    multiple: false,
    onChange: async (info) => {
      const { status, originFileObj } = info.file;
      if (status === 'uploading') {
        if (originFileObj) {
          console.log("originFileObj: ", originFileObj);
        }
      } else if (status === 'done') {
      } else if (status === 'error') {
      }

    },
    async onRemove() {
    },
    customRequest: async (options: any) => {
      const { onSuccess, file, onProgress } = options;
      const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (event: any) => {
          onProgress({ percent: (event.loaded / event.total) * 100 });
        }
      };

      try {
        const formData = new FormData();
        formData.append('file', file);
        const data = await uploadFileToS3(formData);
        setFile([data?.data])
        onSuccess("Ok");
      } catch (err: any) {
        onSuccess("Err");
      }
    },
    beforeUpload: (file) => {
      const isValidType = FILE_TYPE.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 10; // Giới hạn kích thước file là 10MB

      if (!isValidType) {
        // notification["error"]({
        //     message: `${mess("File_not_in_correct_format")}`,
        // });
        return Upload.LIST_IGNORE; // Bỏ qua file nếu không hợp lệ
      }
      if (!isLt2M) {
        // notification["error"]({
        //     message: `${mess("file_exceeds_allowed_size")}`,
        // });
        return Upload.LIST_IGNORE;
      }
      return true; // Cho phép upload nếu hợp lệ
    },
  };

  const removeFile = (file: any) => {
    setFile([]);
  }

  const uploadButton = (
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  );

  return (
    <>
      <Upload
        {...props}
        listType="text"
        fileList={fileList}
        onChange={handleChange}
        onRemove={removeFile}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
    </>
  );
};

export default UploadFileChatBot;