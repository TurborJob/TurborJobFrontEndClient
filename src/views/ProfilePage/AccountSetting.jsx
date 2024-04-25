import { Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { Button, Col, Form, Input, Row } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import React, { useState } from "react";
import api from "../../services/api";
import { getToast } from "../../utils/toast";

export default function AccountSetting() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const [form] = Form.useForm();
  const handleChangePass = async () => {
    let dataForm = form.getFieldValue();
    let { password, newPassword } = dataForm;
    setIsLoading(true);
    let res = await api.changePass({ password, newPassword });
    if (res && !res?.errorMessage) {
      toast(getToast("success", res.metadata, "Success"));
      location.reload();
    }
    setIsLoading(false);
  };
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <Form
        layout={"vertical"}
        form={form}
        initialValues={{ layout: "vertical" }}
      >
        <Row gutter={[12, 12]}>
          <Col xxs={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label={
                <Text color={useColorModeValue("gray.900", "white")}>
                  Old Password
                </Text>
              }
              name="password"
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </Col>
          <Col xxs={24} xs={24} sm={12} md={24} lg={24} xl={12}>
            <Form.Item
              label={
                <Text color={useColorModeValue("gray.900", "white")}>
                  New password
                </Text>
              }
              name="newPassword"
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
          </Col>
          <Col xxs={24} xs={24} sm={12} md={24} lg={24} xl={12}>
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
                    if (!value || getFieldValue("newPassword") === value) {
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
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleChangePass}
            loading={isLoading}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
