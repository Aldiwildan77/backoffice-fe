import {
  Box,
  Button,
  Card,
  Center,
  HStack,
  Heading,
  Icon,
  IconButton,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsSignpostFill } from 'react-icons/bs';
import { FaMap, FaPhone, FaUserAlt } from 'react-icons/fa';
import { MdArrowBackIosNew, MdEmail } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkIn } from '../api/check-in';
import { getUserByEmail } from '../api/get-user-by-email';
import ChangeSeat from '../component/ChangeSeat';
import { UserProfile } from '../interface/entity/user-profile';

function QRResultPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [checkInProgress, setCheckInProgress] = useState(false);
  const [loadInProgress, setLoadInProgress] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (userProfile) {
      return;
    }

    getUserByEmail(state?.email)
      .then((res) => {
        const profile = res as UserProfile;
        if (!profile?.email) {
          toast({
            title: 'User not found',
            description: 'User not found',
            status: 'error',
            duration: 5 * 1000,
            isClosable: true,
          });
          return navigate('/qr/scan', { replace: true });
        }
        setUserProfile(profile);
        setLoadInProgress(false);
      })
      .catch((e) => {
        console.error('get profile error:', e);
        return navigate('/qr/scan', { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckIn = () => {
    if (!state?.email) {
      return;
    }
    setCheckInProgress(true);
    checkIn(state?.email)
      .then(() => {
        toast({
          title: 'Check in success',
          description: 'Check in success',
          status: 'success',
          duration: 9 * 1000,
          isClosable: true,
        });
        setCheckInProgress(false);
      })
      .catch((e) => {
        toast({
          title: 'Check in failed',
          description: e.message,
          status: 'error',
          duration: 9 * 1000,
          isClosable: true,
        });
        setCheckInProgress(false);
      });
  };

  const handleChangeSeat = () => {
    onClose();
  };

  return (
    <>
      <Center w={'full'} h={'100vh'}>
        <VStack></VStack>
        <Card
          w='full'
          maxW='800px'
          minW={{
            base: 'auto',
            lg: '400px',
          }}
          h={{
            base: '100vh',
            lg: 'auto',
          }}
          py={{ md: '4rem', base: '8px' }}
          px={{ md: '4rem', base: '8px' }}
          borderRadius={{
            lg: '10px',
          }}>
          <HStack w='full' textAlign={'center'} mb='5'>
            <IconButton
              onClick={() => navigate('/qr/scan', { replace: true })}
              as={'button'}
              bg={'white'}
              icon={<Icon as={MdArrowBackIosNew} boxSize='24px' />}
              aria-label='Back'
              _hover={{
                bg: 'white',
              }}
            />
            <Heading fontSize={'24px'}>Biodata</Heading>
          </HStack>

          {!loadInProgress ? (
            <VStack spacing={'4'}>
              <VStack spacing={'4'} w='full' justifyContent={'center'}>
                <Box w={'full'}>
                  <Heading fontSize={'24px'}>Account Information</Heading>
                  <Card bg={'rgba(0,0,0,0.1)'} p={'5'}>
                    <VStack spacing={'2'}>
                      <HStack w={'full'} spacing={'5'}>
                        <Icon as={FaUserAlt} boxSize={'16px'} />
                        <Box>{userProfile?.name}</Box>
                      </HStack>
                      <HStack w={'full'} spacing={'5'}>
                        <Icon as={MdEmail} boxSize={'16px'} />
                        <Box>{userProfile?.email}</Box>
                      </HStack>
                      <HStack w={'full'} spacing={'5'}>
                        <Icon as={FaPhone} boxSize={'16px'} />
                        <Box>{userProfile?.phone}</Box>
                      </HStack>
                      <HStack w={'full'} spacing={'5'}>
                        <Icon as={FaMap} boxSize={'16px'} />
                        <Box>{userProfile?.address}</Box>
                      </HStack>
                      <HStack w={'full'} spacing={'5'}>
                        <Icon as={BsSignpostFill} boxSize={'16px'} />
                        <Box>{userProfile?.postal_code}</Box>
                      </HStack>
                    </VStack>
                  </Card>
                </Box>
                <Box w={'full'}>
                  <Heading fontSize={'24px'}>Seat Number</Heading>
                  <Card bg={'rgba(0,0,0,0.1)'} p={'5'} textAlign={'center'}>
                    <Heading fontSize={'32px'}>
                      {userProfile?.seat_table || '-'}
                    </Heading>
                  </Card>
                </Box>
              </VStack>
              <VStack w={'full'} spacing={'2'} mt={'10'}>
                <Button
                  w={'full'}
                  bg={'forthColor'}
                  px={'10'}
                  borderRadius={'24px'}
                  onClick={onOpen}>
                  Change Seat
                </Button>
                <Button
                  w={'full'}
                  bg={'forthColor'}
                  px={'10'}
                  borderRadius={'24px'}
                  onClick={handleCheckIn}
                  isLoading={checkInProgress}>
                  Check In
                </Button>
              </VStack>
            </VStack>
          ) : (
            <Center h='full' w='full'>
              <Heading fontSize={'32px'}>Loading...</Heading>
            </Center>
          )}
        </Card>
      </Center>
      <ChangeSeat
        isOpen={isOpen}
        onClose={handleChangeSeat}
        user={userProfile}
      />
    </>
  );
}

export default QRResultPage;
