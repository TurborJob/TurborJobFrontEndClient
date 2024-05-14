import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import api from "../../services/api"
import { getToast } from "../../utils/toast";
import { useAppSelector } from "../../reduxs/hooks";

export default function ForgotPass() {
  const { titleI18n } = useAppSelector((state) => state.account);

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState();

  const toast = useToast();

  const handleForgotPass = async() => {
    if(!username){
      toast(getToast("error",titleI18n['username_is_require'],titleI18n['error']));
      return;
    }

    setIsLoading(true);
    const res = await api.forgotPass({username:username})
    if(res){
      console.log('res',res)
      toast(getToast("success",res?.metadata,titleI18n['success']));
    }
    setIsLoading(false)
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          {titleI18n['forgot_your_password']}
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          {titleI18n['please_enter_username']}
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-username"
            _placeholder={{ color: "gray.500" }}
            onChange={(e)=>setUsername(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            isLoading={isLoading}
            onClick={handleForgotPass}
          >
            {titleI18n['request_reset']}
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
