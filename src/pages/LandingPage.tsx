import { Box, Button, Card, Heading, VStack } from "@chakra-ui/react";
import { BsQrCodeScan } from "react-icons/bs";

export default function LandingPage() {
  return (
    <Box
      w="full"
      h={"100dvh"}
      display={"flex"}
      flexDir={"row"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card
        w={"30%"}
        minW={"320px"}
        borderRadius={"10px"}
        py={"2rem"}
        px={"2rem"}
        bg={"white"}
      >
        <VStack spacing={"1rem"}>
          <Box fontSize={"150px"} color={"primaryColor"}>
            <BsQrCodeScan />
          </Box>
          <Heading fontSize={"32px"}>Check In</Heading>
          <VStack w="full" mt={"3rem"} spacing={"1rem"}>
            <Button
              bg={"forthColor"}
              color={"white"}
              borderRadius={"full"}
              w={"full"}
            >
              Scan QR
            </Button>
            <Button
              bg={"forthColor"}
              color={"white"}
              borderRadius={"full"}
              w={"full"}
            >
              Back Office
            </Button>
          </VStack>
        </VStack>
      </Card>
    </Box>
  );
}
