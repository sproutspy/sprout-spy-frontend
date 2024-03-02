"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, {useState, useEffect} from 'react';
import SignOut from 'src/components/SignOut';
import { useRouter } from 'next/navigation';
import {Flex, Stack, Spinner, Text, Button} from '@chakra-ui/react';

export default function Profile() {
  const supabase = createClientComponentClient()
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then((response) => {
      console.log(response.data.user)
      if (!response.data.user) {
        router.push('/sign-in');
        return;
      }
      setUser(response.data.user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Stack spacing={4}>
          <Spinner size="xl" color={"green.400"} />
        </Stack>
      </Flex>
    );
  }

  if (!user) {
    router.push('/sign-in');
  }

  return (
    <div className="card">
      <h2>User Profile</h2>
      <code className="highlight">{user.email}</code>
      <div className="heading">Last Signed In:</div>
      <code className="highlight">{new Date(user.last_sign_in_at).toUTCString()}</code>
      <SignOut />
    </div>
  );
}
