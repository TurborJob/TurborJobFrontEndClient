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
  Flex,
  Image,
} from "@chakra-ui/react";
import CarouselImages from "../../widgets/CarouselImages";
import moment from "moment";
import { Rate } from "antd";
import { useAppSelector } from "../../../reduxs/hooks";

export default function UserProfileCard({ user, handleRequestApply }) {
  const { titleI18n } = useAppSelector((state) => state.account);

  const renderBtn = () => (
    <>
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
        onClick={()=>handleRequestApply("approve")}
      >
        {titleI18n['approve']}
      </Button>

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
        onClick={()=>handleRequestApply("reject")}
      >
        {titleI18n['reject']}
      </Button>
    </>
  );

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
        <div style={{ paddingBottom: "5px" ,display:'flex', justifyContent:'center' }}>
        <Image boxSize='200px' src={user.avatar ? user.avatar
              : "https://avatars.dicebear.com/api/male/username.svg"
            } alt="avatar" />
        </div>
        <Heading fontSize={"xl"} fontFamily={"body"}>
          {user?.fullName}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {user?.phone}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {user?.email}
          <Flex gap="middle" vertical style={{justifyContent:'center'}}>
              <Rate disabled value={user?.rating} />
            </Flex>
            <Center gap="middle" vertical>
              {user?.countRate} {titleI18n['reviewer']}
            </Center>
          {titleI18n['gender']}: {user?.gender}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("tomato.700", "tomato.400")}
          px={3}
        >
 
            {moment(user?.birthday).format("DD/MM/YYYY")}
    
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
        <Text>{user?.noteMessage}</Text>

        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}>
          {renderBtn()}
        </Stack>
      </Box>
    </Center>
  );
}
