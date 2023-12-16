import { IconButton } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { Flex, HStack, Heading } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { Device, useDeviceDetection } from '../hooks/useDeviceDetection';

function Backoffice() {
  const toast = useToast();
  const navigate = useNavigate();
  const device = useDeviceDetection();

  if (device && device !== Device.Desktop) {
    toast({
      title: 'Only desktop supported',
      description: 'Only desktop supported',
      status: 'error',
      duration: 5 * 1000,
      isClosable: true,
    });
    navigate('/', { replace: true });
  }

  return (
    <Flex w={'full'} h={'100vh'} bg={'white'} p='2'>
      <HStack w={'full'} bg={'rgba(0,0,0,0.1)'} h='60px' borderRadius={'8px'}>
        <IconButton
          onClick={() => navigate('/', { replace: true })}
          as={'button'}
          bg={'none'}
          icon={<Icon as={MdArrowBackIosNew} boxSize='24px' />}
          aria-label='Back'
          _hover={{
            bg: 'none',
          }}
        />
        <Heading fontSize={'24px'}>Backoffice</Heading>
      </HStack>
    </Flex>
  );
}

export default Backoffice;
