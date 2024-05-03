import { Button, Center, Heading, Stack, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import {Col, Flex, Rate, Row } from "antd";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

function RatingForm({ jobName, user, handleRating }) {
  const [rateValue, setRateValue] = useState(null);
  const [note, setNote] = useState(null);

  return (
    <>
      <Stack p={5} border={"2px solid black"}>
        <Row gutter={[12,12]}>
          <Col span={20}>
        <Heading as="h4" size="md">
          Rate for {jobName} | {user?.fullName}
        </Heading>
        <Flex gap="middle" vertical style={{padding:"15px 0"}}>
          <Rate tooltips={desc} onChange={setRateValue} value={rateValue} />
        </Flex>
        <Textarea
          value={note}
          onChange={(e)=>setNote(e.target.value)}
          placeholder="Your comment, review about job"
          size="sm"
          w={"100%"}
        />
        </Col>
        <Col span={4}>
            <Button colorScheme="teal" style={{height:"100%", width:"100%"}} variant='solid' onClick={()=>handleRating(rateValue, note, user?.id)}>
              Rate
            </Button>
        </Col>
        </Row>
      </Stack>
    </>
  );
}

export default RatingForm;
