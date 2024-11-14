import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const FILE_TYPE = [".jpg", ".png", ".svg", "image/jpeg", "image/png"]

const UploadImage: React.FC<{ fileList: UploadFile[], setFileList: any }> = ({ fileList, setFileList }) => {
    
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
    );

    const props: UploadProps = {
        accept: FILE_TYPE.join(","),
        name: 'file',
        multiple: false,
        onChange: async (info) => {
            const { status, originFileObj } = info.file;
            if (status === 'uploading') {
                if (originFileObj) {
                    // const base64 = await convertToBase64(originFileObj);
                    // setPreviewBase64(base64); // Lưu Base64 vào state
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
            const fmData = new FormData();
            const config = {
                headers: { "content-type": "multipart/form-data" },
                onUploadProgress: (event: any) => {
                    onProgress({ percent: (event.loaded / event.total) * 100 });
                }
            };
            fmData.append("file", file);
            try {
                // const dataKey = await uploadAvatar(fmData, config);
                // setKey_avatar(dataKey)
                console.log("fmData: ", fmData);
                onSuccess("Ok");
            } catch (err: any) {
                // setPreviewBase64(key_avatar)
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
    
  return (
    <>
      <Upload
        {...props}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadImage;