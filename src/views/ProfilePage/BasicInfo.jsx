import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../reduxs/hooks";
import { Flex, Rate } from "antd";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { setRoles } from "../../reduxs/accounts/account.slice";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

export default function BasicInfo() {
  const { profile, roles } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const [roleName, setRoleName] = useState(null);

  const getRoleName = async () => {
    let rolesName = "";
    for (let i = 0; i < roles.length; i++) {
      if (i == roles.length - 1 && i != 0) {
        rolesName = rolesName + ", " + roles[i].name;
      } else {
        rolesName = rolesName + " " + roles[i].name;
      }
    }
    setRoleName(rolesName);
  };

  useEffect(() => {
    getRoleName();
  }, [roles]);

  return (
    <Center>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${profile?.avatar || IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={profile?.avatar || IMAGE}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {profile?.fullName}
          </Heading>
          <Center color={"gray.600"} as="i">
            {roleName}
          </Center>
          <Stack direction={"row"} align={"center"}></Stack>
          <Stack>
            <Flex gap="middle" vertical>
              <Rate disabled value={profile?.rating} />
            </Flex>
            <Center gap="middle" vertical>
              {profile?.countRate} reviewer
            </Center>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
