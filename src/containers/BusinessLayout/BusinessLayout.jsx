import React from "react";

import BusinessHeader from "./BusinessHeader";
import BusinessFooter from "./BusinessFooter";
import BusinessAside from "./BusinessAside";
import { Box, Container, Flex, position, useDisclosure } from "@chakra-ui/react";
import SimpleSidebarBusiness from "./SimpleSidebarBusiness";
import { useAppSelector } from "../../reduxs/hooks";

function BusinessLayout({ children }) {
  const { userModeView } = useAppSelector((state) => state.account);

  const {
    isOpen: isOpenDraw,
    onOpen: onOpenDraw,
    onClose: onCloseDraw,
  } = useDisclosure();
  return (
    <>
      <div className="app ">
        <div className="app-header">
          <BusinessHeader />
        </div>
        <div className="app-body" style={{minHeight:"800px"}}>
          <Flex>
          {userModeView == "Business" && <Box style={{width: "fit-content"}}><SimpleSidebarBusiness /></Box>}
            <Box className="mt-4" style={{width:"100%"}} pt={100} px={10}>
              <div className="">{children}</div>
            </Box>
          </Flex>
        </div>

        <div>
          <BusinessAside isOpenDraw={isOpenDraw} onCloseDraw={onCloseDraw} />
        </div>
        <div>
          <BusinessFooter />
        </div>
      </div>
    </>
  );
}

export default BusinessLayout;
