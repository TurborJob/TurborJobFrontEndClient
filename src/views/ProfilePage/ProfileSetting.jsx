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
  const { profile, titleI18n } = useAppSelector((state) => state.account);

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
        toast(getToast("success", res.message, titleI18n['success']));
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
            {uploadAvatar(setAvatarLink, titleI18n)}
          </HStack>
          <Grid gap={2}>
            <Box>
              <Form.Item
                label={titleI18n['full_name']}
                name="fullName"
                rules={[{ required: true, message: titleI18n['full_name_is_require'] }]}
              >
                <Input />
              </Form.Item>
            </Box>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <Box>
              <Form.Item
                label={titleI18n['email']}
                name="email"
                rules={[
                  { required: true, message: titleI18n['email_is_require'] },
                  {
                    type: "email",
                    message: titleI18n['email_is_invalid'],
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Box>
            <Box>
              <Form.Item
                label={titleI18n['phone']}
                name="phone"
                rules={[
                  { required: true, message: titleI18n['phone_is_require'] },
                  {
                    pattern: new RegExp(
                      /^(0|\+84)(3[2-9]|5[2-8]|7[06-9]|8[1-9]|9[0-9])\d{7}$/
                    ),
                    message: titleI18n['phone_is_invalid'],
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Box>
          </Grid>

          <Form.Item
            label={titleI18n['address']}
            name="address"
            rules={[{ required: true, message: titleI18n['address_is_require'] }]}
          >
            <Input />
          </Form.Item>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Box>
              <Form.Item
                label={titleI18n['gender']}
                name={"gender"}
                initialValue={profile?.gender}
              >
                <Select style={{ minWidth: "150px" }} defaultValue={"male"}>
                  <Select.Option value="male">{titleI18n['male']}</Select.Option>
                  <Select.Option value="female">{titleI18n['female']}</Select.Option>
                </Select>
              </Form.Item>
            </Box>
            <Box>
              <Form.Item
                label={titleI18n['birthday']}
                name="birthday"
                rules={[{ required: true, message: titleI18n['birthday_is_require'] }]}
                format={"dd/MM/yyyy"}
              >
                <DatePicker />
              </Form.Item>
            </Box>
          </Grid>
          <Box>
            <Text>{titleI18n['click_in_map_to_choose_ip']}</Text>
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
              {titleI18n['update']}
            </Button>
          </Stack>
        </Form>
        <UnorderedList style={{ fontSize: "small", fontWeight: "lighter" }}>
          <ListItem>
            {titleI18n['phone_numbers_for_vietnamese_carriers_must_be_either_10_or_11_digits_long']}
          </ListItem>
        </UnorderedList>
      </Stack>
    </div>
  );
}

const uploadAvatar = (setAvatarLink, titleI18n) => {
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
        {fileList.length < 1 && "+ "+titleI18n['upload']}
      </Upload>
    </ImgCrop>
  );
};

export default ProfileSetting;
