import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Link,
  useToast,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import api from '../../services/api'
import { useState } from 'react'
import { getToast } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';
import localStorage from '../../utils/localStorage';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
export default function LoginAdmin() {

  const toast = useToast();
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const handleLogin = async() => {
    let data = {
      username,
      password,
    }
    setIsLoading(true)
    const res = await api.login(data);
    if(res){
      toast(getToast("success", res.message, "Success"));
      localStorage.add("accessToken",res.metadata.token)
      localStorage.add("refreshToken",res.metadata.refreshToken)
      localStorage.add("profile",JSON.stringify(res.metadata.profile))
      navigate('/admin/dashboard');
    }
    setIsLoading(false)
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="text" onChange={(event)=>setUsername(event.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(event)=>setPassword(event.target.value)}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'}><Link href={"../forgotPass"}>Forgot password?</Link></Text>
            </Stack>
            <Button isLoading={isLoading} colorScheme={'blue'} loadingText='Submitting' variant={'solid'} onClick={handleLogin}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  )
}