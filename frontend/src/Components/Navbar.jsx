import { Flex, Box, Spacer, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {Link} from "react-router-dom"

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      paddingLeft={6}
      paddingRight={6}
      bg="blue.900"
      color="white"
    >
      <Flex align="center" >
        <Link to={"/"}>
          <img src="https://www.citypng.com/public/uploads/preview/hd-official-blue-paypal-logo-trademark-png-216352711957dpeuc7foy.png" alt="Logo" height="100%" width="100" />
        </Link>
      </Flex>

      <Spacer />

      <Box display={{ base: "block", md: "none" }} onClick={isOpen ? onClose : onOpen}>
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </Box>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 6, md: 0 }}
        fontSize={"20px"}
      >
        <Box padding={4} marginLeft={{ base: 0, md: 6 }}>
          <Link to="/login">Login</Link>
        </Box>
        <Box padding={4} marginLeft={{ base: 0, md: 6 }}>
          <Link to="/signup">Signup</Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default Navbar;  