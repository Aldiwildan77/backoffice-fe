import { Box, Button, Card, Heading, VStack } from "@chakra-ui/react";
import { BsQrCodeScan } from "react-icons/bs";

export default function QRScanPage() {
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
          <Button
            bg={"forthColor"}
            color={"white"}
            borderRadius={"full"}
            mt={"3rem"}
            w={"full"}
          >
            Scan QR
          </Button>
        </VStack>
      </Card>
    </Box>
  );
}
