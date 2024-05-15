import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAppSelector } from "../../reduxs/hooks";
import PaymentGateway from "../../services/payment";
import api from "../../services/api";
import { getToast } from "../../utils/toast";

export default function MethodCard({ method, pack, setLoading }) {
  const { titleI18n } = useAppSelector((state) => state.account);
  const toast = useToast();

  const handlePayment = async (code) => {
    try {
      setLoading(true)
      const payment = new PaymentGateway();
      const res = await payment[code](pack.price[method.currency]);
      if (res) {
        const resExtend = await api.extendBusiness({
          numDayExtend: pack.numDayExtend,
          limitJobInDay: pack.limitJobInDay,
          limitWorkerInDay: pack.limitWorkerInDay,
        });
        if(resExtend){
          toast(getToast("success", resExtend.metadata, titleI18n["success"]));
        }
      }
      setLoading(false)
    } catch (error) {
      toast(getToast("error", error.reason, titleI18n["error"]));
      setLoading(false)
    }
  };

  return (
    <Box
      maxW={"270px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
      margin={3}
    >
      <Image
        h={"120px"}
        w={"full"}
        src={
          "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        }
        objectFit={"cover"}
      />
      <Flex justify={"center"} mt={-12}>
        <Avatar
          size={"xl"}
          src={method.logo}
          alt={"Author"}
          css={{
            border: "2px solid white",
          }}
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={"center"} mb={5}>
          <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
            {method.name}
          </Heading>
        </Stack>
        {method.status ? (
          <Button
            w={"full"}
            mt={8}
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={() => method.status && handlePayment(method.code)}
          >
            {titleI18n["use"]}
          </Button>
        ) : (
          <Button disabled w={"full"} mt={8} rounded={"md"}>
            {titleI18n["unavailable"]}
          </Button>
        )}
      </Box>
    </Box>
  );
}
