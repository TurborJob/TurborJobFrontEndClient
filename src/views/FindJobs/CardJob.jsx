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
import CarouselImages from "../widgets/CarouselImages";
import moment from "moment";

export default function CardJob({ job, handlerFindJobNormal }) {
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
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
            {job?.quantityWorkerCurrent}/{job?.quantityWorkerTotal} worker
          </Text>{" "}
          gender: {job?.gender}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("tomato.700", "tomato.400")}
          px={3}
        >
          {job?.startDate &&
            job?.dueDate &&
            moment(job.startDate).format("DD/MM/YYYY") +
              " - " +
              moment(job.dueDate).format("DD/MM/YYYY")}
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
              view: {job?.viewerNum}
            </Badge>
          )}
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}>
          {
            <Button
              flex={1}
              fontSize={"sm"}
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
              Apply Job
            </Button>
          }
        </Stack>
      </Box>
    </Center>
  );
}
