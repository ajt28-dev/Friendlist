import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
import EditModal from './EditModal';
import { BASE_URL } from "../App"; // Correct import

const UserCard = ({ user, setUsers }) => {
  const toast = useToast();

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(BASE_URL + "/friends/" + user.id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      toast({
        title: "User deleted successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md">{user.name}</Heading>
          <Flex>
            <EditModal user={user} setUsers={setUsers} />
            <IconButton
              icon={<BiTrash />}
              onClick={handleDeleteUser}
              colorScheme="red"
              ml={2}
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Avatar src={user.imgUrl} size="xl" />
        <Text mt={4}>{user.role}</Text>
        <Text>{user.description}</Text>
      </CardBody>
    </Card>
  );
};

export default UserCard;