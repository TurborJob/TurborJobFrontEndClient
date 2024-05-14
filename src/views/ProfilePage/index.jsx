import {
  Box,
  Button,
  Center,
  Container,
  Image,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import BasicInfo from "./BasicInfo";
import { Col, Row } from "antd";
import TabInfo from "./TabInfo";
import { useAppSelector } from "../../reduxs/hooks";

export default function Profile() {

  return (
    <VStack my={50}>
      <Container
        maxW="container.xl"
        bg={useColorModeValue("gray.50", "gray.800")}
        rounded={"md"}
      >
        <Box>
          <Image
            w="full"
            h="50%"
            src={"/image/cover.jpg"}
            alt="Cover"
            maxHeight={200}
          />
        </Box>
        <Row style={{ marginTop: -70, padding: 50 }} gutter={[16, 50]}>
          <Col xxs={24} xs={24} sm={24} md={24} lg={10} xl={8}>
            <BasicInfo />
          </Col>
          <Col xxs={24} xs={24} sm={24} md={24} lg={14} xl={16}>
            <Box
              bg={useColorModeValue("white", "gray.800")}
              p={3}
              rounded={"lg"}
            >
              <TabInfo />
            </Box>
          </Col>
        </Row>
      </Container>
    </VStack>
  );
}
