import { Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { Button, Col, Form, Input, Row } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import React, { useState } from "react";
import api from "../../services/api";
import { getToast } from "../../utils/toast";
import { useAppSelector } from "../../reduxs/hooks";

export default function AccountSetting() {
  const { titleI18n } = useAppSelector((state) => state.account);

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const [form] = Form.useForm();
  const handleChangePass = async () => {
    let dataForm = form.getFieldValue();
    let { password, newPassword } = dataForm;
    setIsLoading(true);
    let res = await api.changePass({ password, newPassword });
    if (res && !res?.errorMessage) {
      toast(getToast("success", res.metadata, titleI18n['success']));
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
                  {titleI18n['old_password']}
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
                  {titleI18n['new_password']}
                </Text>
              }
              name="newPassword"
              rules={[
                { required: true, message: titleI18n['password_is_require'] },
                {
                  pattern: new RegExp(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/
                  ),
                  message: titleI18n['password_is_wrong_format'],
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
              label={titleI18n['confirm_password']}
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: titleI18n['confirm_password_is_require'],
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(titleI18n['confirm_password_do_not_match'])
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
            {titleI18n['submit']}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
