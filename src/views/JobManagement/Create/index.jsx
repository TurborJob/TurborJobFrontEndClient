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
import { Stack, Text, useToast } from "@chakra-ui/react";
import UploadImage from "../../widgets/UploadImage";
import IpPicker from "../../widgets/IpPicker";
import TextArea from "antd/es/input/TextArea";
import { getToast } from "../../../utils/toast";
import api from "../../../services/api";
import moment from "moment";
const { RangePicker } = DatePicker;

function CreateJobPage() {
  const toast = useToast();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [ip, setIp] = useState();

  form.setFieldValue("quantityWorker", 1);
  form.setFieldValue("isVehicle", false);
  form.setFieldValue("gender", "all");
  form.setFieldValue("salary", 0);

  const handleCreateJob = async () => {
    setIsLoading(true);

    let data = form.getFieldValue();

    let { rangeTime } = data;

    if (rangeTime) {
      data.startDate = rangeTime[0].format("YYYY-MM-DD");
      data.dueDate = rangeTime[1].format("YYYY-MM-DD");
      delete data.rangeTime;
    }

    if (images.length < 1) {
      toast(getToast("error", "Images is require!", "Error"));
      setIsLoading(false);
      return;
    }

    if (!ip) {
      toast(getToast("error", "IP address is require!", "Error"));
      setIsLoading(false);
      return;
    }

    data.lat = ip.lat;
    data.lng = ip.lng;
    data.salary = parseInt(data.salary);

    let payload = { ...data, images };

    let res = await api.createJob(payload);
    if (res) {
      toast(getToast("success", res?.metadata, "Success"));
    }

    setIsLoading(false);
  };

  const clearForm = () => {};

  const disabledDateCurrent = (current) => {
    const today = new Date();
    return current && current < today.setHours(0, 0, 0, 0);
  };

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
                  label={<Text>Name</Text>}
                  name="name"
                  rules={[{ required: true, message: "Name is require!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<Text>Address</Text>}
                  name="address"
                  rules={[{ required: true, message: "Address is require!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<Text>Description</Text>}
                  name="description"
                  rules={[{ required: false }]}
                >
                  <TextArea />
                </Form.Item>
                <Form.Item
                  label={<Text>Salary</Text>}
                  name="salary"
                  rules={[{ required: true, message: "Salary is require!" }]}
                >
                  <Input type="number" suffix="VND" />
                </Form.Item>
                <Form.Item
                  label={<Text>Quantity worker</Text>}
                  name="quantityWorker"
                  rules={[
                    { required: true, message: "Quantity worker is require!" },
                  ]}
                >
                  <InputNumber min={1} />
                </Form.Item>
                <Form.Item
                  name="vehicle"
                  label={<Text>Private vehicles</Text>}
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  name="rangeTime"
                  label={<Text>Start Date - Due Date</Text>}
                  format={"dd/MM/YYYY"}
                  rules={[
                    {
                      required: true,
                      message: "Start Date and Due Date is require!",
                    },
                  ]}
                >
                  <RangePicker
                    format="DD/MM/YYYY"
                    disabledDate={disabledDateCurrent}
                  />
                </Form.Item>
                <Form.Item
                  name="gender"
                  label={<Text>Gender</Text>}
                  hasFeedback
                  rules={[{ required: true, message: "Please select gender!" }]}
                >
                  <Select placeholder="Please select a gender">
                    <Option value="all">All</Option>
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
                <Text color="tomato">IP is require*</Text>
                <Text>Click in map to choose IP!</Text>
                <div>{ip ? ip?.lat + ", " + ip?.lng : ""}</div>
                <IpPicker onChangeValue={setIp} value={ip} />
              </Col>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                onClick={handleCreateJob}
              >
                Create Job
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CreateJobPage;
