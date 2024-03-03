'use client';

import React from 'react';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import { Link, Flex, Text, Box, Button, Input, InputGroup, InputRightElement, InputRightAddon } from '@chakra-ui/react';
import * as Yup from 'yup';

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const ResetPassword = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  async function resetPassword(formData) {
    const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Password reset instructions sent.');
    }
  }

  return (
    <Flex flexDir={"column"} justifyContent={"center"} align={"center"} minH={"100vh"}>
      <Flex marginY={"40px"}>
        <Text fontSize={"6xl"} fontWeight={"bolder"} color={"white"}>Sprout</Text>
        <Text fontSize={"6xl"} fontWeight={"bolder"} color={"green.400"}>Spy</Text>
      </Flex>
      <Box flexDir={"column"} justifyContent={"center"} align={"center"} borderRadius={"10px"} bgColor={"gray.700"} minW={{md:"25rem", sm:"20rem", base:"40%"}} paddingX={"20px"} paddingY={"50px"}>
      <Text fontSize={"4xl"} fontWeight={"bolder"} color={"gray.300"}>Reset Password</Text>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={ResetPasswordSchema}
          onSubmit={resetPassword}
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
              />
              {errors.email && touched.email ? (
                <Text w={"100%"} color={"red"} fontSize={"xl"} align={"left"}>{String(errors.email)}</Text>
              ) : <Text w={"100%"} color={"red"} fontSize={"xl"} align={"left"} >&nbsp;</Text>}
              <Button colorScheme={"green"} w={"45%"} type="submit" marginY={"20px"}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        {errorMsg && <Text w={"100%"} color={"red"} fontSize={"xl"} align={"left"} margin={0}>{errorMsg}</Text>}
        {successMsg && <Text w={"100%"} color={"black"} fontSize={"xl"} align={"left"} margin={0}>{successMsg}</Text>}
        <Link href="/sign-in" marginTop={"20px"} fontWeight={"bold"} color={"gray.300"}>
          Remember your password? Sign In.
        </Link>
      </Box>
    </Flex>
  );
};

export default ResetPassword;
