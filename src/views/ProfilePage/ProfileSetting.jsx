import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import {
  Flex,
  Box,
  HStack,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Grid,
  useToast,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import { Button, DatePicker, Form, Input, Select, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import moment from "moment";
import local from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { getToast } from "../../utils/toast";
import { useAppSelector } from "../../reduxs/hooks";
import IpPicker from "../widgets/IpPicker";

function ProfileSetting() {
  const { profile } = useAppSelector((state) => state.account);

  const toast = useToast();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarLink, setAvatarLink] = useState(profile?.avatar);
  const [ip, setIp] = useState();

  form.setFieldValue("fullName", profile?.fullName);
  form.setFieldValue("email", profile?.email);
  form.setFieldValue("phone", profile?.phone);
  form.setFieldValue("address", profile?.address);
  form.setFieldValue("gender", profile?.gender);
  form.setFieldValue("birthday", moment(profile?.birthday));

  const handleUpdateProfile = async () => {
    let data = form.getFieldValue();
    let { address, phone, birthday, gender, fullName, email } = data;

    if (avatarLink) {
      data.avatar = avatarLink.fileLink;
    }

    if (ip) {
      data.lat = ip.lat;
      data.lng = ip.lng;
    }

    if (address && phone && birthday && gender && fullName && email) {
      birthday = moment(new Date(birthday)).format("DD/MM/yyyy");
      setIsLoading(true);
      let res = await api.updateProfile({ ...data, birthday });
      if (res && !res?.errorMessage) {
        toast(getToast("success", res.message, "Success"));
        if (res?.metadata) {
          local.add("profile", JSON.stringify(res.metadata));
          location.reload();
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Stack spacing={4}>
        <Form form={form} layout={"vertical"}>
          <HStack style={{ marginBottom: "20px" }}>
            {uploadAvatar(setAvatarLink)}
          </HStack>
          <Grid gap={2}>
            <Box>
              <Form.Item
                label="Full name"
                name="fullName"
                rules={[{ required: true, message: "First name is require!" }]}
              >
                <Input />
              </Form.Item>
            </Box>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <Box>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is require!" },
                  {
                    type: "email",
                    message: "Email is valid!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Box>
            <Box>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Phone is require!" },
                  {
                    pattern: new RegExp(
                      /^(0|\+84)(3[2-9]|5[2-8]|7[06-9]|8[1-9]|9[0-9])\d{7}$/
                    ),
                    message: "Phone is valid!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Box>
          </Grid>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is require!" }]}
          >
            <Input />
          </Form.Item>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Box>
              <Form.Item
                label="Gender"
                name={"gender"}
                initialValue={profile?.gender}
              >
                <Select style={{ minWidth: "150px" }} defaultValue={"male"}>
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>
            </Box>
            <Box>
              <Form.Item
                label="Birthday"
                name="birthday"
                rules={[{ required: true, message: "Birthday is require!" }]}
                format={"dd/MM/yyyy"}
              >
                <DatePicker />
              </Form.Item>
            </Box>
          </Grid>
          <Box>
            <Text>Click in map to choose IP!</Text>
            <div>{ip ? ip?.lat + ", " + ip?.lng : ""}</div>
            <IpPicker onChangeValue={setIp} value={ip} />
          </Box>
          <Stack spacing={10} pt={2}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              onClick={handleUpdateProfile}
            >
              Update
            </Button>
          </Stack>
        </Form>
        <UnorderedList style={{ fontSize: "small", fontWeight: "lighter" }}>
          <ListItem>
            Phone numbers for Vietnamese carriers must be either 10 or 11 digits
            long.
          </ListItem>
        </UnorderedList>
      </Stack>
    </div>
  );
}

const uploadAvatar = (setAvatarLink) => {
  const toast = useToast();
  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ]);

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
      console.log("newFileList.size", newFileList, fileList);
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      if (newFileList && newFileList.length > 0) {
        formData.append("file", newFileList[0].originFileObj);
      }
      if (
        fileList &&
        fileList.length > 0 &&
        fileList[0]?.originFileObj &&
        newFileList.length > 0
      ) {
        const res = await api.uploadFile(formData, headers);
        if (res) {
          newFileList[0].status = "success";
          setAvatarLink(res.metadata);
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
        {fileList.length < 1 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

export default ProfileSetting;
