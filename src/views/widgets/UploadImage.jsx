import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { getToast } from '../../utils/toast';
import api from "../../services/api"
import { useToast } from '@chakra-ui/react';


const UploadImage= ({onChangeValue, value, limitImage}) => {
    const toast = useToast();
    const [fileList, setFileList] = useState([]);
  
    const onPreview = async (file) => {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    };
  
    const onChange = async ({ fileList: newFileList }) => {
      if (newFileList.size > 10000) {
        toast(getToast("File too big!"));
        return;
      } else {
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        const formData = new FormData();
        if (newFileList && newFileList.length > 0) {
            await newFileList.map((newFile)=>formData.append("file", newFile.originFileObj))
        }
        if(fileList && fileList.length > 0 &&  fileList[0]?.originFileObj && newFileList.length > 0){
          const res = await api.uploadFile(formData, headers);
          if (res) {
            newFileList[0].status = "success";
            onChangeValue([...value,res?.metadata?.fileLink]);
          }
        }
      }
      setFileList(newFileList);
    };
    return (
      <ImgCrop rotationSlider>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          style={{ justifyContent: "center" }}
        >
          {fileList.length < limitImage && "+ Upload"}
        </Upload>
      </ImgCrop>
    );
};

export default UploadImage;