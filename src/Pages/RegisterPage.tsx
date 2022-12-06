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
  
  function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const toast = useToast();
    const navigate = useNavigate();
  
    const RegisterFunc = async () => {
      try {
        if (password !== confirmPassword) {
          toast({
            title: "you must confirm the password !",
            duration: 3000,
            status: "error",
            position: "top",
          });
        }
        const request = await fetch(
          `http://localhost:5045/api/v1/user/regster`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, email }),
          }
        );
        const data = await request.json();
        if (request.status !== 201) {
          toast({
            title: data.message,
            duration: 3000,
            status: "error",
            position: 'top',
          });
          return;
        }
        toast({
          title: data.message,
          duration: 3000,
          status: "success",
          position: "top",
        });
  
  
        navigate(`/login`);
  
  
      } catch (errpr) {
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
      <VStack bg={"gray"} textColor='white' width={'300px'} height={'450px'}>
        <Heading>Login</Heading>
        <VStack align={'left'} spacing='3'>
          <Box>
            <Text>Username</Text>
            <Input color={"black"} bg={"white"} onChange={(e)=>setUsername(e.target.value)}
             value={username} placeholder={'username'} type={'text'} />
          </Box>

          <Box>
            <Text>Email</Text>
            <Input color={"black"} bg={"white"} onChange={(e)=>setEmail(e.target.value)}
             value={email} placeholder={'email'} type={'email'} />
          </Box>

          <Box>
            <Text>Password</Text>
            <Input bg={"white"} color={"black"} onChange={(e)=>setPassword(e.target.value)} 
            value={password} placeholder={'password'} type={"password"}/>
          </Box>

          <Box>
            <Text>Confirm Password</Text>
            <Input bg={"white"} color={"black"} onChange={(e)=>setConfirmPassword(e.target.value)} 
            value={confirmPassword} placeholder={'Confirm Password'} type={"password"}/>
          </Box>

          <Button onClick={RegisterFunc} textColor='black'>Register</Button>
        </VStack>
        <HStack textColor={"black"}>
            <Text > you have account ? </Text>
            <Link to="/login">
              <Text decoration="underline">Login</Text>
            </Link>
          </HStack>
      </VStack>
    </Flex>
    );
  }
  
  export default RegisterPage;