import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
} from "antd";
import { Stack, Text } from "@chakra-ui/react";
import UploadImage from "../../widgets/UploadImage";
import IpPicker from "../../widgets/IpPicker";
import TextArea from "antd/es/input/TextArea";
const { RangePicker } = DatePicker;

function CreateJobPage() {
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [ip, setIp] = useState();

  return (
    <div>
      <Form form={form} layout={"vertical"}>
        <Row gutter={[12, 12]}>
          <Col
            span={24}
            style={{ borderBottom: "solid 1px gray", padding: "30px 10px" }}
          >
            <Row gutter={[12, 12]}>
              <Col xxs={24} xs={24} sm={24} md={24} lg={12} xl={12}>
                <Stack>
                  <UploadImage
                    onChangeValue={setImages}
                    value={images}
                    limitImage={5}
                  />
                </Stack>
              </Col>
              <Col xxs={24} xs={24} sm={24} md={24} lg={12} xl={12}></Col>
            </Row>
          </Col>
          <Col
            span={24}
            style={{ borderBottom: "solid 1px gray", padding: "30px 10px" }}
          >
            <Row gutter={[12, 12]}>
              <Col xxs={24} xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Name is require!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Address is require!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: false }]}
                >
                  <TextArea />
                </Form.Item>
                <Form.Item
                  label="Quantity worker"
                  name="quantityWorker"
                  rules={[
                    { required: true, message: "Quantity worker is require!" },
                  ]}
                >
                  <InputNumber min={1} />
                </Form.Item>
                <Form.Item
                  name="vehicle"
                  label="Private vehicles"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  name="rangeTime"
                  label="Start Date - Due Date"
                  format={"dd/MM/YYYY"}
                  rules={[
                    {
                      required: true,
                      message: "Start Date and Due Date is require!",
                    },
                  ]}
                >
                  <RangePicker format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item
                  name="gender"
                  label="Gender"
                  hasFeedback
                  rules={[{ required: true, message: "Please select gender!" }]}
                >
                  <Select placeholder="Please select a gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="lgpt">LGPT</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col
                xxs={24}
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                style={{ padding: "20px" }}
              >
                <Text color="tomato">IP is require*</Text>Click in map to choose
                IP!
                <div>{ip ? ip?.lat + ", " + ip?.lng : ""}</div>
                <IpPicker onChangeValue={setIp} value={ip} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CreateJobPage;
