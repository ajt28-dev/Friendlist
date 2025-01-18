import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  IconButton,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { BiEditAlt } from 'react-icons/bi';
import { BASE_URL } from "../App";

const EditModal = ({ user, setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: user.name,
    role: user.role,
    description: user.description
  });
  const toast = useToast();

  const handleEditUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + '/friends/' + user.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUsers((prevUsers) => prevUsers.map((u) => u.id === user.id ? data : u));
      toast({
        status: "success",
        title: "eyyyy",
        description: "friend updated successfully",
        duration: 2000,
        position: "top-center",
      });
      onClose();
    } catch (error) {
      toast({
        status: "error",
        title: "An error occurred",
        description: error.message,
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant='ghost'
        colorScheme='blue'
        aria-label='Edit user'
        size={"sm"}
        icon={<BiEditAlt size={20} />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleEditUser}>
          <ModalContent>
            <ModalHeader>Edit User</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  placeholder='Full Name'
                  value={inputs.name}
                  onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Role</FormLabel>
                <Input
                  placeholder='Role'
                  value={inputs.role}
                  onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder='Description'
                  value={inputs.description}
                  onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;