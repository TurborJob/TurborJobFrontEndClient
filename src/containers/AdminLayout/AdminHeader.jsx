import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  MenuButton,
  MenuList,
  MenuDivider,
  Center,
  MenuItem,
  useColorMode,
  Menu,
  Avatar,
  useToast,
  Heading,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import api from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../reduxs/hooks";
import {
  getProfile,
  setRoles,
  setUserModeView,
} from "../../reduxs/accounts/account.slice";
import { useEffect, useState } from "react";
import localStorage from "../../utils/localStorage";
import { getToast } from "../../utils/toast";
import { Link } from "react-router-dom";
import { NAV_ITEMS_ADMIN, NAV_ITEMS_BUSINESS, NAV_ITEMS_WORKER } from "../../constant";
import { FiBell } from "react-icons/fi";
import moment from "moment";
import { Badge as BadgeCharka } from "@chakra-ui/react";
import { Badge } from "antd";


export default function AdminHeader() {
  const { profile, userModeView, roles, webSocketService } = useAppSelector(
    (state) => state.account
  );
  const dispatch = useAppDispatch();
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const getRoleName = async () => {
    let res = await api.getRoleName();
    if (res) {
      dispatch(setRoles(res.metadata));
    }
  };

  useEffect(() => {
    getRoleName();
    dispatch(getProfile());
  }, []);

  return (
    <Box position={"fixed"} width={"100%"} zIndex={99}>
      <Flex
        bg={useColorModeValue(
          `purple.300`,
        )}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            fontWeight={600}
          >
            <Link to={"../admin/dashboard"}>TURBORJOB</Link>
          </Text>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav userModeView={userModeView} />
          </Flex>
        </Flex>
        {roles.length > 1 && userModeView == "Business" && (
          <Stack>
            <Button
              colorScheme="purple"
              onClick={() => dispatch(setUserModeView("User"))}
            >
              Worker View
            </Button>
          </Stack>
        )}
        {roles.length > 1 && userModeView == "User" && (
          <Stack>
            <Button
              colorScheme="pink"
              onClick={() => dispatch(setUserModeView("Business"))}
            >
              Business View
            </Button>
          </Stack>
        )}

        <Stack px={{ base: 3 }}>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
        {profile ? (
          <Stack px={{ base: 3 }}>
            <UserNavItem profile={profile} />
          </Stack>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              href={"../admin/login"}
            >
              Sign In
            </Button>
            {/* <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              href={"../register"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button> */}
          </Stack>
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav userModeView={userModeView} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ userModeView }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} backgroundColor={'purple'}>
      {
        NAV_ITEMS_ADMIN.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Box
                  as="a"
                  p={2}
                  href={navItem.href ?? "#"}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Box>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link to={href ?? "#"}>
      <Box
        as="a"
        href={href}
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "pink.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    </Link>
  );
};

const MobileNav = ({ userModeView }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >

      {
        NAV_ITEMS_ADMIN.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const UserNavItem = ({ profile }) => {
  const toast = useToast();

  const handleLogout = async () => {
    let res = await api.logout();
    if (res) {
      localStorage.clear();
      toast(getToast("success", res.metadata, "Success"));
      setTimeout(() => {
        location.replace("../");
      }, 1000);
    }
  };

  return (
    <Menu>
      <MenuButton rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
        <Avatar
          size={"sm"}
          src={
            profile?.avatar
              ? profile?.avatar
              : "https://avatars.dicebear.com/api/male/username.svg"
          }
        />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar
            size={"2xl"}
            src={
              profile?.avatar
                ? profile?.avatar
                : "https://avatars.dicebear.com/api/male/username.svg"
            }
          />
        </Center>
        <br />
        <Center>
          <p>{profile.fullName}</p>
        </Center>
        <br />
        <MenuDivider />
        {/* <MenuItem>Your Profile</MenuItem> */}
        <MenuItem>
          <Link to={"../admin/account-setting"}>Account Settings</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};