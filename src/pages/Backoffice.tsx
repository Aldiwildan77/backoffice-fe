import { IconButton } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { Flex, HStack, Heading } from '@chakra-ui/layout';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { getUsers } from '../api/get-users';
import { UserProfile } from '../interface/entity/user-profile';

import dayjs from 'dayjs';
import debounce from 'debounce';
import { FaSearch } from 'react-icons/fa';
import { bulkSeatTable } from '../api/bulk-seat-table';
import { getUsersExport } from '../api/export-users';
import ChangeSeat from '../component/ChangeSeat';
import { DATE_FORMAT } from '../constant/datetime';
import { Transportation } from '../constant/transportation';

const TableHeaders = [
  'Name',
  'Email',
  'Phone',
  'Address',
  'Departure',
  'Return',
  'Seat Table',
  'Check In',
  'Actions',
];

const constructVechileDeparture = (user: UserProfile) => {
  if (user.depart_vehicle_type === Transportation.PLANE.toString()) {
    return `${user.depart_airline} - ${user.depart_flight_number}`;
  }
  if (user.depart_vehicle_type === Transportation.TRAIN.toString()) {
    return `${user.depart_train_name}`;
  }
  if (user.depart_vehicle_type === Transportation.OTHER.toString()) {
    return `${user.depart_vehicle_additional_info}`;
  }
  return '';
};

const constructVechileReturn = (user: UserProfile) => {
  if (user.return_vehicle_type === Transportation.PLANE.toString()) {
    return `${user.return_airline} - ${user.return_flight_number}`;
  }
  if (user.return_vehicle_type === Transportation.TRAIN.toString()) {
    return `${user.return_train_name}`;
  }
  if (user.return_vehicle_type === Transportation.OTHER.toString()) {
    return `${user.return_vehicle_additional_info}`;
  }
  return '';
};

function Backoffice() {
  const toast = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<UserProfile>();

  const searchDebounce = debounce(async (email: string) => {
    if (!email) {
      return;
    }
    const users = await getUsers(page, limit, email);
    setUsers(users.data);
    setTotal(users.meta.total);
    setTotalPage(users.meta.total_page);
  }, 500);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers(page, limit);
      setUsers(users.data);
      setTotal(users.meta.total);
      setTotalPage(users.meta.total_page);
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const handleNextPage = () => {
    if (users.length < limit) {
      return;
    }
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const handleSetLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(e.target.value as unknown as number);
  };

  const handleExportUsers = () => {
    getUsersExport();
  };

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    bulkSeatTable(file)
      .then((res) => {
        toast({
          title: res.message,
          description: res.message,
          status: 'success',
          duration: 5 * 1000,
          isClosable: true,
        });
        setTimeout(() => navigate(0), 1000);
      })
      .catch((err) => {
        toast({
          title: err.message,
          description: err.message,
          status: 'error',
          duration: 5 * 1000,
          isClosable: true,
        });
      });
  };

  const handleOpenChangeSeat = (user: UserProfile) => {
    setUser(user);
    onOpen();
  };

  return (
    <>
      <Box
        bg='white'
        w={'full'}
        h={'100vh'}
        position={'absolute'}
        zIndex={'-1'}
      />
      <Flex
        w={'full'}
        h={{ base: '100vh', md: 'auto', lg: 'auto' }}
        bg={'white'}
        p='2'
        overflowX='hidden'>
        <VStack w={'full'} h={'full'} spacing={'2rem'}>
          <HStack
            w={'full'}
            bg={'rgba(0,0,0,0.1)'}
            h='60px'
            borderRadius={'8px'}
            justifyContent={'space-between'}
            p='2'>
            <HStack>
              <IconButton
                onClick={() => navigate('/', { replace: true })}
                as={'button'}
                bg={'none'}
                icon={
                  <Icon
                    as={MdArrowBackIosNew}
                    boxSize={{ base: '16px', lg: '24px' }}
                  />
                }
                aria-label='Back'
                _hover={{
                  bg: 'none',
                }}
              />
              <Heading fontSize={{ base: 'sm', lg: '24px' }}>
                Back Office
              </Heading>
            </HStack>
            <HStack display={{ base: 'none', lg: 'flex' }}>
              <Button as={'label'} bg={'forthColor'} cursor={'pointer'}>
                Upload
                <input
                  type='file'
                  hidden
                  onChange={handleUploadFile}
                  accept='.csv'
                />
              </Button>
              <Button
                as={'a'}
                onClick={handleExportUsers}
                bg={'forthColor'}
                cursor={'pointer'}
                download>
                Export
              </Button>
            </HStack>
          </HStack>
          <Flex w={'full'} justify={'end'}>
            <InputGroup w={{ base: 'full', lg: '25%' }}>
              <Input
                focusBorderColor='forthColor'
                placeholder='Search email'
                borderColor={'rgba(0,0,0,0.1)'}
                onChange={(e) => {
                  searchDebounce.clear();
                  searchDebounce(e.target.value);
                }}
              />
              <InputRightElement color={'rgba(0,0,0,0.1)'}>
                <FaSearch />
              </InputRightElement>
            </InputGroup>
          </Flex>

          <TableContainer w={'full'} h={'full'} bg={'white'} mb='10'>
            <VStack w='full' spacing='3'>
              <Box w='full'>
                <HStack w='full' justifyContent='space-between'>
                  <HStack>
                    <Text>Limit</Text>
                    <Select
                      onChange={handleSetLimit}
                      value={limit}
                      className='select'>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={100}>100</option>
                      <option value={500}>500</option>
                    </Select>
                  </HStack>
                  <Box display={{ base: 'none', lg: 'block' }}>
                    <Text>
                      Showing {users.length} of {total} users
                    </Text>
                  </Box>
                  <HStack>
                    <IconButton
                      onClick={handlePrevPage}
                      as={'button'}
                      bg={'none'}
                      icon={<Icon as={MdArrowBackIosNew} boxSize='24px' />}
                      aria-label='Back'
                      _hover={{
                        bg: 'none',
                      }}
                    />
                    <Text>
                      {page}/{totalPage}
                    </Text>
                    <IconButton
                      onClick={handleNextPage}
                      as={'button'}
                      bg={'none'}
                      icon={<Icon as={MdArrowForwardIos} boxSize='24px' />}
                      aria-label='Back'
                      _hover={{
                        bg: 'none',
                      }}
                    />
                  </HStack>
                </HStack>
              </Box>
              <Box w='full' h='full' overflowX='scroll'>
                <Table variant='simple'>
                  <Thead bg={'rgba(0,0,0,0.4)'}>
                    <Tr>
                      {TableHeaders.map((header) => (
                        <Th
                          key={`header-${header.replace(' ', '_')}`}
                          textColor='white'>
                          {header}
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody position={'relative'}>
                    {users &&
                      users.map((user) => (
                        <Tr key={`user-${user.email}`} fontSize={'14px'}>
                          <Td>{user.name}</Td>
                          <Td>{user.email}</Td>
                          <Td>{user.phone}</Td>
                          <Td>
                            <Text>{user.address}</Text>
                            <Text>{user.postal_code}</Text>
                          </Td>
                          <Td>
                            <Text>
                              {dayjs(user.depart_at).format(DATE_FORMAT)}
                            </Text>
                            <Text>{user.depart_vehicle_type}</Text>
                            <Text>{constructVechileDeparture(user)}</Text>
                          </Td>
                          <Td>
                            <Text>
                              {dayjs(user.return_at).format(DATE_FORMAT)}
                            </Text>
                            <Text>{user.return_vehicle_type}</Text>
                            <Text>{constructVechileReturn(user)}</Text>
                          </Td>
                          <Td>{user.seat_table}</Td>
                          <Td>{user.checked_in ? 'Yes' : 'No'}</Td>
                          <Td>
                            <Button
                              bg={'forthColor'}
                              onClick={() => handleOpenChangeSeat(user)}>
                              Change Seat
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </Box>
            </VStack>
          </TableContainer>
        </VStack>
      </Flex>
      <ChangeSeat isOpen={isOpen} onClose={onClose} user={user} />
    </>
  );
}

export default Backoffice;
