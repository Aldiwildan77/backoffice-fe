import { Box, Button, Card, HStack, Heading, VStack } from "@chakra-ui/react";

import { BsQrCodeScan } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Device, useDeviceDetection } from "../hooks/useDeviceDetection";
import { MdOutlineWarning } from "react-icons/md";

function LandingPage() {
  const navigate = useNavigate();
  const [device] = useDeviceDetection();

  return (
    <Box
      w="full"
      h={"100dvh"}
      display={"flex"}
      flexDir={"column"}
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
              onClick={() => {
                console.log(device);
                if (device === Device.Desktop) return;
                navigate("/qr/scan");
              }}
              bg={"forthColor"}
              color={"white"}
              borderRadius={"full"}
              w={"full"}
              isDisabled={device === Device.Desktop}
            >
              Scan QR
            </Button>
            <Button
              onClick={() =>
                device === Device.Desktop ? navigate("/backoffice") : null
              }
              bg={"forthColor"}
              color={"white"}
              borderRadius={"full"}
              w={"full"}
              isDisabled={device === Device.Mobile}
            >
              Back Office
            </Button>
          </VStack>
        </VStack>
      </Card>
      {device === Device.Desktop ? (
        <Box
          w={"30%"}
          minW={"320px"}
          bg={"#FEFAD3"}
          padding={"0.5rem"}
          borderRadius={"10px"}
          mt={"2rem"}
        >
          <HStack spacing={"1rem"}>
            <Box fontSize={"24px"} color={"#FACB03"}>
              <MdOutlineWarning />
            </Box>
            <Heading fontSize={"16px"} textAlign={"start"}>
              Untuk melakukan scan QR code, Pastikan perangkat yang digunakan
              adalah perangkat mobile
            </Heading>
          </HStack>
        </Box>
      ) : null}
    </Box>
  );
}

export default LandingPage;
