import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useAppSelector } from "../../reduxs/hooks";

export default function PackCard({ pack, setFocusPack, focusPack }) {
  const { titleI18n } = useAppSelector((state) => state.account);

  const renderRequireMoney = () => {};

  return (
    <Center py={6} m={1}>
      <Box
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          {Object.keys(pack.price).map((currency, index) => {
            const val = pack.price[currency];
            return (
              <Stack
                key={index}
                direction={"row"}
                align={"center"}
                justify={"center"}
              >
                <Text fontSize={"lg"}>{currency}</Text>
                <Text fontSize={"4lg"} fontWeight={800}>
                  {val}
                </Text>
                <Text color={"gray.500"}>/{titleI18n[pack.time]}</Text>
              </Stack>
            );
          })}
        </Stack>

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.400" />
              {pack.numDayExtend} {titleI18n["day"]}
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.400" />
              {pack.limitJobInDay} {titleI18n["jobs"]}
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.400" />
              {pack.limitWorkerInDay} {titleI18n["workers"]}
            </ListItem>
          </List>

          <Button
            disabled={pack.id == focusPack?.id ? false : true}
            mt={10}
            w={"full"}
            bg={pack.id == focusPack?.id ? "green.500" : "gray.400"}
            color={"white"}
            rounded={"xl"}
            _hover={{
              bg: "green.500",
            }}
            onClick={() => setFocusPack(pack)}
          >
            {titleI18n["use"]}
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
