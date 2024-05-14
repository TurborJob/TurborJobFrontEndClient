import React, { useEffect, useState } from "react";
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
import { useAppSelector } from "../../../reduxs/hooks";
const { RangePicker } = DatePicker;

function CreateJobPage() {
  const { titleI18n } = useAppSelector((state) => state.account);

  const toast = useToast();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [ip, setIp] = useState();

  useEffect(() => {
    form.setFieldValue("quantityWorker", 1);
    form.setFieldValue("isVehicle", false);
    form.setFieldValue("gender", "all");
    form.setFieldValue("salary", 0);
  }, [form]);

  const handleCreateJob = async () => {
    setIsLoading(true);

    let data = form.getFieldValue();

    let { rangeTime } = data;

    if (rangeTime) {
      data.startDate = rangeTime[0].format("YYYY-MM-DD HH:mm:ss");
      data.dueDate = rangeTime[1].format("YYYY-MM-DD HH:mm:ss");
      delete data.rangeTime;
    }

    if (images.length < 1) {
      toast(
        getToast("error", titleI18n["images_is_require"], titleI18n["error"])
      );
      setIsLoading(false);
      return;
    }

    if (!ip) {
      toast(getToast("error", "IP address is require!", titleI18n["error"]));
      setIsLoading(false);
      return;
    }

    data.lat = ip.lat;
    data.lng = ip.lng;
    data.salary = parseInt(data.salary);

    let payload = { ...data, images };

    let res = await api.createJob(payload);
    if (res) {
      toast(getToast("success", res?.metadata, titleI18n["success"]));
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
                  label={<Text>{titleI18n["name"]}</Text>}
                  name="name"
                  rules={[
                    { required: true, message: titleI18n["name_is_require"] },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<Text>{titleI18n["address"]}</Text>}
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: titleI18n["address_is_require"],
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<Text>{titleI18n["description"]}</Text>}
                  name="description"
                  rules={[{ required: false }]}
                >
                  <TextArea />
                </Form.Item>
                <Form.Item
                  label={<Text>{titleI18n["salary"]}</Text>}
                  name="salary"
                  rules={[
                    { required: true, message: titleI18n["salary_is_require"] },
                  ]}
                >
                  <Input type="number" suffix="VND" />
                </Form.Item>
                <Form.Item
                  label={<Text>{titleI18n["quantity_worker"]}</Text>}
                  name="quantityWorker"
                  rules={[
                    {
                      required: true,
                      message: titleI18n["quantity_worker_is_require"],
                    },
                  ]}
                >
                  <InputNumber min={1} />
                </Form.Item>
                <Form.Item
                  name="vehicle"
                  label={<Text>{titleI18n["private_vehicles"]}</Text>}
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  name="rangeTime"
                  label={<Text>{titleI18n["start_date_due_date"]}</Text>}
                  format={"YYYY-MM-DD HH:mm:ss"}
                  rules={[
                    {
                      required: true,
                      message: titleI18n["start_date_due_date_is_require"],
                    },
                  ]}
                >
                  <RangePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime
                    disabledDate={disabledDateCurrent}
                  />
                </Form.Item>
                <Form.Item
                  name="gender"
                  label={<Text>{titleI18n["gender_upper"]}</Text>}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: titleI18n["please_select_gender"],
                    },
                  ]}
                >
                  <Select placeholder={titleI18n["please_select_gender"]}>
                    <Option value="all">{titleI18n["all"]}</Option>
                    <Option value="male">{titleI18n["male"]}</Option>
                    <Option value="female">{titleI18n["female"]}</Option>
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
                <Text color="tomato">{titleI18n["ip_address_is_require"]}</Text>
                <Text>{titleI18n["click_in_map_to_choose_ip"]}</Text>
                <div>{ip ? ip?.lat + ", " + ip?.lng : ""}</div>
                <IpPicker onChangeValue={setIp} value={ip} />
              </Col>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                onClick={handleCreateJob}
              >
                {titleI18n["create_job"]}
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CreateJobPage;
