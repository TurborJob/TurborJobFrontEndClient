
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Radio, RadioGroup, Stack, useDisclosure } from "@chakra-ui/react"
import React from "react"

export default function DefaultAside({isOpenDraw, isCloseDraw}) {
  const [placement, setPlacement] = React.useState('left')

  return (
    <>
      <Drawer placement={placement} onClose={isCloseDraw} isOpen={isOpenDraw}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}