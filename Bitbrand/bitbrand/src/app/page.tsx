import { Button, Flex, Link } from "@chakra-ui/react";


export default function Home() {


  return (
    <Flex alignItems="center" justifyContent="center" w="100%" h="100vh">
        <Button as="a" href="/login" >Login</Button>
    </Flex>
  );
}
