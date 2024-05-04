"use client";

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
import { NAV_ITEMS_BUSINESS, NAV_ITEMS_WORKER } from "../../constant";
import { FiBell } from "react-icons/fi";
import { Badge } from "antd";
import { Badge as BadgeCharka } from "@chakra-ui/react";
import moment from "moment";

export default function WithSubnavigation() {
  const { profile, userModeView, roles, webSocketService } = useAppSelector(
    (state) => state.account
  );
  const dispatch = useAppDispatch();
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [numNotifyUnread, setNumNotifyUnRead] = useState(0);
  const [notifyList, setNotifyList] = useState([]);
  const [notifyPagination, setNotifyPagination] = useState({
    page: 0,
    size: 5,
    maxSizeCurrent: 0,
  });

  const getRoleName = async () => {
    let res = await api.getRoleName();
    if (res) {
      dispatch(setRoles(res.metadata));
    }
  };

  const getNotifyNum = async () => {
    let res = await api.getNumNotifyUnread();
    if (res) {
      setNumNotifyUnRead(res?.metadata);
    }
  };

  const getNotifyList = async () =>{
    let resNotifyList = await api.getNotifyUser(notifyPagination);
    if (resNotifyList) {
      setNotifyList(resNotifyList?.metadata);
      notifyPagination.maxSizeCurrent = resNotifyList?.metadata?.length;
      setNotifyPagination(notifyPagination);
    }
  }

  const handleMarkAllRead = async () => {
    await api.markAllNotifyRead();
    getNotifyList();
  };

  const loadMoreNotify = async () => {
    notifyPagination.page = notifyPagination.page + 1;
    setNotifyPagination(notifyPagination);
    getNotifyList();
  };

  const loadBackNotify = async () => {
    if (notifyPagination?.page && notifyPagination.page > 0) {
      notifyPagination.page = notifyPagination.page - 1;
      setNotifyPagination(notifyPagination);
      getNotifyList();
    }
  };

  useEffect(() => {
    if (profile && profile?.id) {
      getRoleName();
      getNotifyNum();
    }
  }, [profile]);

  useEffect(()=> {
    if(webSocketService && profile && profile?.id){
      webSocketService.subscribePrivateGetRequestUpdateNotify(profile?.id,(message)=>{
        if(message && message?.isSuccess){
          getNotifyNum();
        }
      })
    }
  },[webSocketService,profile])

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <Box position={"fixed"} width={"100%"} zIndex={99} top={0}>
      <Flex
        bg={useColorModeValue(
          `${userModeView == "Business" ? "red.200" : "white"}`,
          `${userModeView == "Business" ? "blue.600" : "gray.800"}`
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
            <Link to={"../"}>TURBORJOB</Link>
          </Text>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav userModeView={userModeView} />
          </Flex>
        </Flex>
        {roles?.length > 1 && userModeView == "Business" && (
          <Stack>
            <Button
              colorScheme="purple"
              onClick={() => dispatch(setUserModeView("User"))}
            >
              Worker View
            </Button>
          </Stack>
        )}
        {roles?.length > 1 && userModeView == "User" && (
          <Stack>
            <Button
              colorScheme="pink"
              onClick={() => dispatch(setUserModeView("Business"))}
            >
              Business View
            </Button>
          </Stack>
        )}
        {profile && (
          <Stack>
            <NotifyNavItem
              numNotifyUnread={numNotifyUnread}
              notifies={notifyList}
              handleMarkAllRead={handleMarkAllRead}
              loadMoreNotify={loadMoreNotify}
              loadBackNotify={loadBackNotify}
              notifyPagination={notifyPagination}
              getNotifyList={getNotifyList}
            />
          </Stack>
        )}

        <Stack px={{ base: 3 }}>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
        <Stack></Stack>
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
              href={"../login"}
            >
              Sign In
            </Button>
            <Button
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
            </Button>
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
    <Stack direction={"row"} spacing={4}>
      {userModeView == "User" &&
        NAV_ITEMS_WORKER.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link to={navItem.href ?? "#"}>
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
                </Link>
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
      {userModeView == "Business" &&
        NAV_ITEMS_BUSINESS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link to={navItem.href ?? "#"}>
                  <Box
                    as="a"
                    p={2}
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
                </Link>
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
      {userModeView == "User" &&
        NAV_ITEMS_WORKER.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      {userModeView == "Business" &&
        NAV_ITEMS_BUSINESS.map((navItem) => (
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
          <Link to={"../account-setting"}>Account Settings</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

const NotifyNavItem = ({
  notifies,
  numNotifyUnread,
  handleMarkAllRead,
  loadMoreNotify,
  loadBackNotify,
  notifyPagination,
  getNotifyList
}) => {
  return (
    <>
      <Menu>
        <MenuButton
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
          style={{ margin: "0 10px" }}
          onClick={getNotifyList}
        >
          <Badge count={numNotifyUnread}>
            <IconButton icon={<FiBell />} />
          </Badge>
        </MenuButton>
        <MenuList alignItems={"center"} minW={"400px"}>
          <Stack>
            {notifies?.map((notify) => (
              <div
                key={notify?.id}
                style={{
                  border: "1px solid gray",
                  padding: "2px",
                  margin: "3px",
                }}
              >
                <Heading as="h5" size="sm">
                  {notify?.title}{" "}
                  {!notify?.isRead && (
                    <BadgeCharka ml="1" colorScheme="green">
                      New
                    </BadgeCharka>
                  )}
                </Heading>
                <Text as="i">
                  {moment(notify?.createAt).format("DD-MM-YYYY")}
                </Text>
                <Text fontSize="md">{notify?.content}</Text>
              </div>
            ))}
          </Stack>
          <MenuItem justifyContent={"center"}>
            <div onClick={() => handleMarkAllRead()}>mark all read</div>
          </MenuItem>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {notifyPagination?.maxSizeCurrent >= 5 && (
              <Button variant='ghost' onClick={() => loadMoreNotify()}>more...</Button>
            )}
            {notifyPagination?.page > 0 && (
              <Button variant='ghost' onClick={() => loadBackNotify()}>back</Button>
            )}
          </div>
        </MenuList>
      </Menu>
    </>
  );
};
