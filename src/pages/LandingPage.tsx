import { Box, Button, Card, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsQrCodeScan } from 'react-icons/bs';
import { Device, useDeviceDetection } from '../hooks/useDeviceDetection';

function LandingPage() {
  const [userDevice, setUserDevice] = useState<Device>();
  const device = useDeviceDetection();

  useEffect(() => {
    if (device) {
      setUserDevice(device);
    }
  }, []);

  return (
    <Box
      w='full'
      h={'100dvh'}
      display={'flex'}
      flexDir={'row'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Card
        w={'30%'}
        minW={'320px'}
        borderRadius={'10px'}
        py={'2rem'}
        px={'2rem'}
        bg={'white'}
      >
        <VStack spacing={'1rem'}>
          <Box fontSize={'150px'} color={'primaryColor'}>
            <BsQrCodeScan />
          </Box>
          <Heading fontSize={'32px'}>Check In</Heading>
          <VStack w='full' mt={'3rem'} spacing={'1rem'}>
            <Button
              as={'a'}
              href='/qr/scan'
              bg={'forthColor'}
              color={'white'}
              borderRadius={'full'}
              w={'full'}
              isActive={userDevice !== Device.Desktop}
            >
              Scan QR
            </Button>
            <Button
              as={'a'}
              href='/backoffice'
              bg={'forthColor'}
              color={'white'}
              borderRadius={'full'}
              w={'full'}
              isActive={userDevice === Device.Desktop}
            >
              Back Office
            </Button>
          </VStack>
        </VStack>
      </Card>
    </Box>
  );
}

export default LandingPage;
