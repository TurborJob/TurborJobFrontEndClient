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

import "../../styles/register.css";

import { Button, DatePicker, Form, Input, Select, Upload, message } from "antd";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import api from "../../services/api";
import { getToast } from "../../utils/toast";
import moment from "moment";
import local from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import IpPicker from "../widgets/IpPicker";

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarLink, setAvatarLink] = useState(null);
  const [ip, setIp] = useState();

  const handleRegister = async () => {
    let data = form.getFieldValue();
    let {
      username,
      password,
      address,
      phone,
      birthday,
      gender,
      fullName,
      email,
      firstName,
      lastName,
    } = data;

    if (lastName && firstName) {
      data.fullName = firstName + " " + lastName;
    }

    if (avatarLink) {
      data.avatar = avatarLink.fileLink;
    }

    if (!ip) {
      toast(getToast("error", "IP address is require!", "Error"));
      setIsLoading(false);
      return;
    }

    data.lat = ip.lat;
    data.lng = ip.lng;

    if (
      username &&
      password &&
      address &&
      phone &&
      birthday &&
      gender &&
      fullName &&
      email
    ) {
      birthday = moment(new Date(birthday)).format("DD/MM/yyyy");
      setIsLoading(true);
      let res = await api.register({ ...data, birthday });
      if (res && !res?.errorMessage) {
        toast(getToast("success", res.message, "Success"));
        local.add("accessToken", res.metadata.token);
        local.add("refreshToken", res.metadata.refreshToken);
        local.add("profile", JSON.stringify(res.metadata.profile));
        navigate("/");
      }
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={2}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Form form={form} layout={"vertical"}>
              <HStack style={{ marginBottom: "20px" }}>
                {uploadAvatar(setAvatarLink)}
              </HStack>
              <Box>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Username is require!" },
                    {
                      pattern: new RegExp(/^[a-zA-Z0-9_-]{6,20}$/),
                      message: "Username must be between 6 and 20 characters!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
              </Box>
              <HStack>
                <Box>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Password is require!" },
                      {
                        pattern: new RegExp(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/
                        ),
                        message: "Password is wrong format!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </Box>
                <Box>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Confirm Password is require!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Confirm Password do not match!")
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </Box>
              </HStack>
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <Box>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      { required: true, message: "First name is require!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Box>
                <Box>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      { required: true, message: "Last name is require!" },
                    ]}
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
                    {/* Các đầu số 03, 05, 07, 08, 09 (ví dụ: 0981234567)
                    Số có thể bắt đầu với +84 hoặc 84 (ví dụ +84981234567, 84981234567) */}
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
                  <Form.Item label="Gender" name={"gender"} initialValue="male">
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
                    rules={[
                      { required: true, message: "Birthday is require!" },
                    ]}
                    format={"dd/MM/yyyy"}
                  >
                    <DatePicker />
                  </Form.Item>
                </Box>
              </Grid>
              <Box>
                <Text color="tomato">IP is require*</Text>
                <Text>Click in map to choose IP!</Text>
                <div>{ip ? ip?.lat + ", " + ip?.lng : ""}</div>
                <IpPicker onChangeValue={setIp} value={ip} />
              </Box>
              <Stack spacing={10} pt={2}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  onClick={handleRegister}
                >
                  Sign up
                </Button>
              </Stack>
            </Form>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} href="../login">
                  Login
                </Link>
              </Text>
            </Stack>
            <UnorderedList style={{ fontSize: "small", fontWeight: "lighter" }}>
              <ListItem>
                Username must have a length of 6 to 20 characters.
              </ListItem>
              <ListItem>
                Password must contain uppercase letters, lowercase letters,
                numbers, special characters, and be at least 8 characters long.
              </ListItem>
              <ListItem>
                Phone numbers for Vietnamese carriers must be either 10 or 11
                digits long.
              </ListItem>
            </UnorderedList>
          </Stack>
        </Box>
      </Stack>
    </Flex>
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
      console.log("newFileList.size", newFileList.size);
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      if (newFileList && newFileList.length > 0) {
        formData.append("file", newFileList[0].originFileObj);
      }
      if (fileList && fileList?.originFileObj) {
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
