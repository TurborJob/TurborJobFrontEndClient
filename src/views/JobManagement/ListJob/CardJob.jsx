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
import CarouselImages from "../../widgets/CarouselImages";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../reduxs/hooks";

export default function CardJob({ job, handlerFindJobNormal, handleUpdateJobToDone}) {
  const { profile, webSocketService } = useAppSelector(
    (state) => state.account
  );
  const navigate = useNavigate();

  const handleFindNow = () => {
    if(profile && profile?.id && webSocketService){
      webSocketService.sendMessageFindJob(profile?.id, job?.id,"Request find job now")
    }
  }

  const renderStatus = () => {
    // inactive, processing, success, done, fail.
    if (job?.status == "inactive") {
      return (
        <Badge fontWeight={"800"} variant="solid" colorScheme="red">
          {job.status}
        </Badge>
      );
    }

    if (job?.status == "processing") {
      return (
        <Badge fontWeight={"800"} variant="solid" colorScheme="blue">
          {job.status}
        </Badge>
      );
    }

    if (job?.status == "done") {
      return (
        <Badge fontWeight={"800"} variant="solid" colorScheme="green">
          {job.status}
        </Badge>
      );
    }

    if (job?.status == "success") {
      return (
        <Badge fontWeight={"800"} variant="solid" colorScheme="teal">
          {job.status}
        </Badge>
      );
    }

    if (job?.status == "fail") {
      return (
        <Badge fontWeight={"800"} variant="solid" colorScheme="purple">
          {job.status}
        </Badge>
      );
    }
  };

  const renderBtn = () => {
    if (job?.status == "inactive") {
      return (
        <>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
            onClick={() => handlerFindJobNormal(job?.id)}
          >
            Find
          </Button>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
            onClick={handleFindNow}
          >
            Find now
          </Button>
        </>
      );
    }

    if (job?.status == "processing") {
      return (
        <Button
          flex={1}
          variant="outline"
          fontSize={"sm"}
          rounded={"full"}
          bg={"blue.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
          onClick={() => navigate(`../request-form#${job?.id}`)}
        >
          Request form
        </Button>
      );
    }

    if (job?.status == "done") {
      return (
        <Button
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          bg={"green.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "green.500",
          }}
          _focus={{
            bg: "green.500",
          }}
        >
          Done
        </Button>
      );
    }

    if (job?.status == "fail") {
      return (
        <Button
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          bg={"red.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "red.500",
          }}
          _focus={{
            bg: "red.500",
          }}
        >
          Fail
        </Button>
      );
    }

    if (job?.status == "success") {
      return (
        <Button
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          bg={"pink.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "pink.500",
          }}
          _focus={{
            bg: "pink.500",
          }}
          onClick={()=>handleUpdateJobToDone(job?.id)}
        >
          Update Done
        </Button>
      );
    }
  };

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
          {renderStatus()}
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
          {renderBtn()}
        </Stack>
      </Box>
    </Center>
  );
}
