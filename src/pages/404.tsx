import { Center, Flex, Heading, Text } from '@chakra-ui/react';

export default function ErrorPage() {
  return (
    <Center
      bg={'secondaryColor'}
      h='100vh'
      color='white'
      textColor={'white'}
      px='4'
    >
      <Flex
        flex='1'
        justifyContent={'center'}
        flexDirection={'column'}
        textAlign={'center'}
      >
        <Heading as='h1' size='4xl'>
          404
        </Heading>
        <Text>Sorry you are in the wrong page!</Text>
      </Flex>
    </Center>
  );
}
