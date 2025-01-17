import { Container, Flex } from '@chakra-ui/react'
import React from 'react'

const nav = () => {
  return <Container maxW = {"900px"}>
    <Box
    px={4}
    my={4}
    borderRadius={5}>
        <Flex h = "16p"
        alignItems={"center"}
        justifyContent={"space-between"}
        >
            {/* Left side*/}
            <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            display={{base:"none",sm:"flex"}}
            
            >
            <img src="/react.png" alt="react logo" width={50} height={50}/>
            <text fontSize={"40px"}>+</text>
            <img src="/python.png" alt="python logo" width={50} height={50}/>
            <text fontSize={"40px"}>=</text>
            <img src="/explode.png" alt="explode logo" width={50} height={50}/>
            </Flex>
            {/*Right side*/}
            <Flex></Flex>
        </Flex>
    </Box>


  </Container>
}

export default nav