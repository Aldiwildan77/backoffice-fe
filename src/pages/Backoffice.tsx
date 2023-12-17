import { IconButton } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { Flex, HStack, Heading } from '@chakra-ui/layout';
import {
  Box,
  Button,
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
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { getUsers } from '../api/get-users';
import { UserProfile } from '../interface/entity/user-profile';

import dayjs from 'dayjs';
import { getUsersExport } from '../api/export-users';
import { DATE_FORMAT } from '../constant/datetime';
import { Transportation } from '../constant/transportation';

const TableHeaders = [
  'Name',
  'Email',
  'Phone',
  'Address',
  'Check In',
  'Check Out',
  'Seat Table',
  'Actions',
];

const constructVechileDeparture = (user: UserProfile) => {
  if (user.depart_vehicle_type === Transportation.PLANE.toString()) {
    return `${user.depart_airline} - ${user.depart_flight_number}`;
  }
  if (user.depart_vehicle_type === Transportation.TRAIN.toString()) {
    return `${user.depart_train_name}`;
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
  return '';
};

function Backoffice() {
  // const toast = useToast();
  // const device = useDeviceDetection();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // if (device && device !== Device.Desktop) {
  //   toast({
  //     title: 'Only desktop supported',
  //     description: 'Only desktop supported',
  //     status: 'error',
  //     duration: 5 * 1000,
  //     isClosable: true,
  //   });
  //   navigate('/', { replace: true });
  // }

  useEffect(() => {
    const fetchUsers = async () => {
      console.log('fetching users');
      const users = await getUsers(page, limit);
      setUsers(users.data);
      setTotal(users.meta.total);
      setTotalPage(users.meta.total_page);
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    const fetchUsers = async () => {
      console.log('fetching users');
      const users = await getUsers(page, limit);
      setUsers(users.data);
    };
    fetchUsers();
  }, [page, limit]);

  return (
    <Flex w={'full'} h={'100vh'} bg={'white'} p='2'>
      <VStack w={'full'} h={'full'} spacing={'2rem'}>
        <HStack
          w={'full'}
          bg={'rgba(0,0,0,0.1)'}
          h='60px'
          borderRadius={'8px'}
          justifyContent={'space-between'}
          px='2'
        >
          <HStack>
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
          <HStack>
            <Button
              as={'a'}
              onClick={handleExportUsers}
              bg={'forthColor'}
              download
            >
              Export
            </Button>
          </HStack>
        </HStack>
        <TableContainer w={'full'} h={'full'} bg={'white'}>
          <VStack w='full' spacing='3'>
            <Box w='full' whiteSpace={'nowrap'}>
              <HStack w='full' justifyContent='space-between'>
                <HStack>
                  <Text>Limit</Text>
                  <Select
                    onChange={handleSetLimit}
                    value={limit}
                    className='select'
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={100}>100</option>
                    <option value={500}>500</option>
                  </Select>
                </HStack>
                <Box>
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
            <Table variant='simple'>
              <Thead bg={'rgba(0,0,0,0.4)'}>
                <Tr>
                  {TableHeaders.map((header) => (
                    <Th
                      key={`header-${header.replace(' ', '_')}`}
                      textColor='white'
                    >
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
                      <Td>{user.address}</Td>
                      <Td>
                        <Text>{dayjs(user.depart_at).format(DATE_FORMAT)}</Text>
                        <Text>{user.depart_vehicle_type}</Text>
                        <Text>{constructVechileDeparture(user)}</Text>
                      </Td>
                      <Td>
                        <Text>{dayjs(user.return_at).format(DATE_FORMAT)}</Text>
                        <Text>{user.return_vehicle_type}</Text>
                        <Text>{constructVechileReturn(user)}</Text>
                      </Td>
                      <Td>{user.seat_table}</Td>
                      <Td>
                        <IconButton
                          as={'button'}
                          bg={'none'}
                          icon={<Icon as={MdArrowBackIosNew} boxSize='24px' />}
                          aria-label='Back'
                          _hover={{
                            bg: 'none',
                          }}
                        />
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </VStack>
        </TableContainer>
      </VStack>
    </Flex>
  );
}

export default Backoffice;
