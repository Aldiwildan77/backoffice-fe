import { Box, Button, Card, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsQrCodeScan } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Device, useDeviceDetection } from '../hooks/useDeviceDetection';

function LandingPage() {
  const navigate = useNavigate();
  const [userDevice, setUserDevice] = useState<Device>();
  const device = useDeviceDetection();

  useEffect(() => {
    if (device) {
      setUserDevice(device);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              onClick={() =>
                userDevice !== Device.Desktop ? navigate('/qr/scan') : null
              }
              bg={'forthColor'}
              color={'white'}
              borderRadius={'full'}
              w={'full'}
              isActive={userDevice !== Device.Desktop}
            >
              Scan QR
            </Button>
            <Button
              onClick={() =>
                userDevice === Device.Desktop ? navigate('/backoffice') : null
              }
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
