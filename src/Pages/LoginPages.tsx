import {
    Button,
    HStack,
    Input,
    Text,
    useToast,
    VStack,
    Flex,
    Heading,
    Box,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  
  function LogInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast();
    const navigate = useNavigate();
  
    const submitLogin = async () => {
      try {
        const request = await fetch(`http://localhost:5045/api/v1/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await request.json();
  
        if (request.status !== 201) {
          toast({
            title: data.message,
            position: "top",
            duration: 3000,
            status: "error",
          });
          return;
        }
        toast({
          title: data.message,
          position: "top",
          duration: 3000,
          status: "success",
        });
        localStorage.setItem(`token`, data.token);
        navigate(`/`);
      } catch (error) {
        toast({
          title: "server Error !",
          position: "top",
          duration: 3000,
          status: "error",
        });
      }
    };
  
    return (
      <Flex bg={'#EEE'} justifyContent={'center'} alignItems='center' height={'100vh'}>
        <VStack bg={"gray"} textColor='white' width={'300px'} height={'300px'}>
          <Heading>Login</Heading>
          <VStack align={'left'} spacing='3'>
            <Box>
              <Text>Username</Text>
              <Input color={"black"} bg={"white"} onChange={(e)=>setUsername(e.target.value)}
               value={username} placeholder={'username'} type={'text'} />
            </Box>

            <Box>
              <Text>Password</Text>
              <Input bg={"white"} color={"black"} onChange={(e)=>setPassword(e.target.value)} 
              value={password} placeholder={'password'} type={"password"}/>
            </Box>
            <Button onClick={submitLogin} textColor='black'>Login</Button>
          </VStack>
          <HStack textColor={"black"}>
            <Text > you don't have account ? </Text>
            <Link to="/register">
              <Text decoration="underline">Register</Text>
            </Link>
          </HStack>
        </VStack>
      </Flex>
    );
  }
  
  export default LogInPage;