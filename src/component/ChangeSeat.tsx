import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { setSeatTable } from '../api/set-seat-table';
import { UserProfile } from '../interface/entity/user-profile';

export type ChangeSeatProps = {
  user?: UserProfile;
  isOpen: boolean;
  onClose: () => void;
};

function ChangeSeat({ user, isOpen, onClose }: ChangeSeatProps) {
  // bad ways lol
  const [seat, setSeat] = useState<string>('');
  const toast = useToast();

  const onSubmit = async () => {
    if (!user) {
      return;
    }

    if (!seat) {
      toast({
        title: 'Error',
        description: 'Seat tidak boleh kosong',
        status: 'error',
        duration: 3 * 1000,
        isClosable: true,
      });
      return;
    }

    try {
      const resp = await setSeatTable(user.email, seat);
      if (!resp) {
        return;
      }

      toast({
        title: 'Success',
        description: 'Seat berhasil diubah',
        status: 'success',
        duration: 3 * 1000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Seat gagal diubah',
        status: 'error',
        duration: 3 * 1000,
        isClosable: true,
      });
    }

    setSeat('');
  };

  const handleOnClose = () => {
    setSeat('');
    onClose();
  };

  const handleChangeSeat = (e: ChangeEvent<HTMLInputElement>) => {
    setSeat(e.target.value);
  };

  const handleOnSubmitSeat = () => {
    onSubmit();
    if (user && seat !== user.seat_table) {
      user.seat_table = seat;
    }
  };

  return (
    <Modal
      blockScrollOnMount={true}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent mx='2'>
        <ModalHeader fontSize={'18px'}>{user?.email}</ModalHeader>
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Seat</FormLabel>
            <Input
              placeholder='Masukkan seat'
              name='seat'
              onChange={handleChangeSeat}
              value={seat}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='green' mr={3} onClick={handleOnSubmitSeat}>
            Update
          </Button>
          <Button onClick={handleOnClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ChangeSeat;
