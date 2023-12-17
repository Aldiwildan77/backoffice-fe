/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Card,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  Html5QrcodeResult,
  Html5QrcodeScanType,
  Html5QrcodeScanner,
  Html5QrcodeSupportedFormats,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode";
import { useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router";
import { emailValidationSchema } from "../app/validator/email.validator";
import { Device, useDeviceDetection } from "../hooks/useDeviceDetection";

function QRScanPage() {
  const [device] = useDeviceDetection();
  const navigate = useNavigate();
  const [isGranted, setGranted] = useState<boolean>(false);
  const [isRender, setRender] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    if (device === Device.Desktop) {
      toast({
        title: "Only mobile and tablet are supported",
        description: "Only mobile and tablet are supported",
        status: "error",
        duration: 5 * 1000,
        isClosable: true,
      });
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device]);

  const onScanSuccess: QrcodeSuccessCallback = (
    decodeText: string,
    decodeResult: Html5QrcodeResult
  ) => {
    console.log(decodeResult);
    emailValidationSchema
      .validate(decodeText)
      .then((valid) => {
        console.log(valid);
        return navigate(`/qr/result`, {
          replace: true,
          state: { email: decodeText },
        });
      })
      .catch((e: Error) => console.log(e.message));
  };

  const onScanError: QrcodeErrorCallback = (errorMessage: string, error) => {
    console.log(errorMessage);
    console.log(error);
    return;
  };

  const getCameraPermision = async () => {
    const permission = await navigator.mediaDevices.enumerateDevices();
    if (permission.some((camera) => camera.deviceId && camera.groupId)) {
      setGranted(true);
      setRender(true);
    } else {
      navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
        setGranted(true);
        setRender(true);
      });
    }
  };

  useEffect(() => {
    if (!device) {
      return;
    }
    getCameraPermision();
  }, []);

  useEffect(() => {
    if (!isGranted || !isRender) {
      return;
    }

    try {
      const scanner = new Html5QrcodeScanner(
        "qr-scanner",
        {
          fps: 10,
          qrbox: { height: 200, width: 200 },
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
          rememberLastUsedCamera: true,
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        },
        true
      );
      scanner.render(onScanSuccess, onScanError);
      return () => {
        scanner.clear().catch((e) => console.error(e));
      };
    } catch (e) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGranted, isRender]);

  return (
    <Center w={"full"} h={"100vh"}>
      <Flex
        w="full"
        h={"100vh"}
        flexDir={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        py={{ lg: "2rem" }}
      >
        <Card
          h="full"
          w="full"
          maxW="800px"
          minW={{
            base: "auto",
            lg: "400px",
          }}
          py={"2rem"}
          px={"2rem"}
          bg={"white"}
        >
          <VStack spacing={"4"} w="full">
            <HStack w="full" h="full" textAlign={"center"}>
              <IconButton
                onClick={() => navigate("/", { replace: true })}
                as={"button"}
                bg={"white"}
                icon={<Icon as={MdArrowBackIosNew} boxSize="24px" />}
                aria-label="Back"
                _hover={{
                  bg: "white",
                }}
              />
              <Heading fontSize={"24px"}>Scan QR</Heading>
            </HStack>

            {isRender ? (
              <Box w="full" id="qr-scanner" />
            ) : (
              <Center w="full" h="full">
                <Heading fontSize={"24px"}>Camera not found!</Heading>
              </Center>
            )}
          </VStack>
        </Card>
      </Flex>
    </Center>
  );
}

export default QRScanPage;
