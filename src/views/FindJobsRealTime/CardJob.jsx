import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { Badge as BadgeAnt, Card as CardAnt } from "antd";
import CarouselImages from "../widgets/CarouselImages";
import moment from "moment";
import { useAppSelector } from "../../reduxs/hooks";

export default function CardJob({ job, handleApply, distance }) {
  const { titleI18n } = useAppSelector((state) => state.account);
  return (
    <Center style={{ paddingBottom: "20px" }}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <div style={{ paddingBottom: "5px" }}>
          <CarouselImages data={job?.images} />
        </div>
        <Heading fontSize={"xl"} fontFamily={"body"}>
          {job?.name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {job?.salary} VND
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {job?.description}
          <Text color={"blue.400"}>
            {job?.quantityWorkerCurrent}/{job?.quantityWorkerTotal}{" "}
            {titleI18n["workers"]}
          </Text>{" "}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("tomato.700", "tomato.400")}
          px={3}
        >
          {job?.startDate && job?.dueDate && (
            <>
              <div>
                {titleI18n["from"]}:{" "}
                {moment(job.startDate).format("DD/MM/YYYY HH:mm:ss")}
              </div>

              <div>
                {titleI18n["to"]}:{" "}
                {moment(job.dueDate).format("DD/MM/YYYY HH:mm:ss")}
              </div>
            </>
          )}
          <div>{job?.address}</div>
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"800"}
          ></Badge>
          {job?.vehicle && (
            <Badge fontWeight={"800"} variant="outline" colorScheme="green">
              #vehicle
            </Badge>
          )}

          {job?.viewer_num && (
            <Badge fontWeight={"800"} variant="subtle" colorScheme="green">
              {titleI18n["view"]}: {job?.viewerNum}
            </Badge>
          )}
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}>
          {
            <Button
              flex={1}
              fontSize={"sm"}
              onClick={() => handleApply()}
              rounded={"full"}
              bg={"teal.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "teal.500",
              }}
              _focus={{
                bg: "teal.500",
              }}
            >
              {titleI18n["apply_job"]}
            </Button>
          }
        </Stack>
      </Box>
    </Center>
  );
}
