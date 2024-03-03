'use client';

import React from 'react';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import { Link, Flex, Text, Box, Button, Input, InputGroup, InputRightElement, InputRightAddon } from '@chakra-ui/react';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignIn = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);

  async function signIn(formData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    }
  }

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Flex flexDir={"column"} justifyContent={"center"} align={"center"} minH={"100vh"}>
      <Flex marginY={"40px"}>
        <Text fontSize={"6xl"} fontWeight={"bolder"} color={"white"}>Sprout</Text>
        <Text fontSize={"6xl"} fontWeight={"bolder"} color={"green.400"}>Spy</Text>
      </Flex>
      <Box flexDir={"column"} justifyContent={"center"} align={"center"} borderRadius={"10px"} bgColor={"gray.700"} minW={{ md: "25rem", sm: "20rem", base: "40%" }} paddingX={"20px"} paddingY={"50px"}>
        <Text fontSize={"5xl"} fontWeight={"bolder"} color={"gray.300"}>Sign In</Text>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignInSchema}
          onSubmit={signIn}
        >
          {({ errors, touched }) => (
            <Form style={{ display: "flex", flexDirection: "column" }} >
              <Text w={"100%"} left={"0"} align={"left"} marginX={"10px"} marginY={"5px"} fontWeight={"bold"} color={"gray.300"}>Email</Text>
              <Input
                id="email"
                name="email"
                placeholder="sprout@spy.com"
                type="email"
                bgColor={errors.email && touched.email ? "rgba(255, 100, 100, 0.2)" : "white"}
                focusBorderColor={'green.400'}
                errorBorderColor={'rgba(255, 100, 100, 0.2)'}
              />
              {errors.email && touched.email ? (
                <Text w={"100%"} color={"red"} fontSize={"xl"} align={"left"}>{String(errors.email)}</Text>
              ) : <Text w={"100%"} color={"red"} fontSize={"xl"} align={"left"} >&nbsp;</Text>}

              <Text w={"100%"} left={"0"} align={"left"} marginX={"10px"} marginY={"5px"} fontWeight={"bold"} color={"gray.300"}>Password</Text>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                  bgColor={errors.email && touched.email ? "rgba(255, 100, 100, 0.2)" : "white"}
                  focusBorderColor={'green.400'}
                  errorBorderColor={'rgba(255, 100, 100, 0.2)'}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && touched.password ? (
                <Text w={"100%"} color={"red"} fontSize={"xl"} align={"left"} margin={0}>{String(errors.password)}</Text>
              ) : <Text w={"100%"} color={"red"} fontSize={"xl"} align={"left"} margin={0}>&nbsp;</Text>}

              <Link href="/reset-password" marginBottom={"20px"} color={"gray.300"} fontWeight={"bold"}>
                Forgot your password?
              </Link>
              <Button colorScheme={"green"} w={"45%"} type="submit" marginBottom={"10px"}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        {errorMsg && <Text w={"100%"} color={"red"} fontSize={"xl"} align={"left"} margin={0}>{errorMsg}</Text>}
        <Link href="/sign-up" marginTop={"20px"} fontWeight={"bold"} color={"gray.300"}>
          Don&apos;t have an account? Sign Up.
        </Link>
      </Box>
    </Flex>
  );
};

export default SignIn;
