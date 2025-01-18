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
  Flex,
  useDisclosure,
  RadioGroup,
  Textarea,
  Radio,
  useToast
} from '@chakra-ui/react';
import { BiAddToQueue } from 'react-icons/bi';
import { BASE_URL } from "../App";

const CreateUserModal = ({ setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    description: "",
    gender: "",
  });
  const toast = useToast();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      if (!res.ok) {
        throw new Error("Failed to create user");
      }
      const newUser = await res.json();
      setUsers((prevUsers) => [...prevUsers, newUser]);
      toast({
        title: "User created.",
        description: "The user has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create user.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button leftIcon={<BiAddToQueue />} colorScheme="teal" onClick={onOpen}>
        Add User
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleCreateUser}>
          <ModalContent>
            <ModalHeader>Create User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={inputs.name}
                  onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Role</FormLabel>
                <Input
                  value={inputs.role}
                  onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  resize={"none"}
                  overflowY={"hidden"}
                  placeholder="He's a super pulis pangkagaguhan cop"
                  value={inputs.description}
                  onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                />
              </FormControl>
              <RadioGroup mt={4} value={inputs.gender} onChange={(value) => setInputs({ ...inputs, gender: value })}>
                <Flex gap={5}>
                  <Radio value='male'>Male</Radio>
                  <Radio value='female'>Female</Radio>
                </Flex>
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreateUserModal;