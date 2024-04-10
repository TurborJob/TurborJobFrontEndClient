import { Text, useColorModeValue } from "@chakra-ui/react";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";

export default function AccountSetting() {
  const [form] = Form.useForm();
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <Form
        layout={"vertical"}
        form={form}
        initialValues={{ layout: "vertical" }}
      >
        <Row gutter={[12, 12]}>
          <Col xxs={24} xs={24} sm={12} md={24} lg={24} xl={12}>
            <Form.Item
              label={
                <Text color={useColorModeValue("gray.900", "white")}>
                  Field A
                </Text>
              }
            >
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xxs={24} xs={24} sm={12} md={24} lg={24} xl={12}>
            <Form.Item
              label={
                <Text color={useColorModeValue("gray.900", "white")}>
                  Field B
                </Text>
              }
            >
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
