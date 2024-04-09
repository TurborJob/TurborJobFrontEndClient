import { Box, Button, Container, Image, VStack } from "@chakra-ui/react";
import React from "react";
import BasicInfo from "./BasicInfo";
import { Col, Row } from "antd";

export default function Profile() {
  return (
    <VStack my={50}>
      <Container maxW="container.xl">
        <Box>
          <Image
            w="full"
            h="50%"
            src={"/image/cover.jpg"}
            alt="Cover"
            maxHeight={200}
          />
          <Button position="absolute" top={4} right={4} variant="ghost">
            <svg width="1.2em" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
          </Button>
        </Box>
        <Row style={{marginTop:-70, padding:50}} gutter={16}>
          <Col xxs={24} xs={24} sm={24} md={12} lg={10} xl={8}>
            <BasicInfo />
          </Col>
          <Col xs={12} sm={12} md={12} lg={14} xl={16}>
            <div>col-6</div>
          </Col>
        </Row>
      </Container>
    </VStack>
  );
}
