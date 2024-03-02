"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, {useState, useEffect} from 'react';
import {Flex, Stack, Spinner, Text} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

function DashboardPage() {
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
            <Spinner size="xl" thickness='4px' color={"green.400"} />
          </Stack>
        </Flex>
      );
    }

    if (!user) {
      router.push('/sign-in');
    }

    return (
      <Stack>
        <Text>Dashboard</Text>
      </Stack>
    );

}

export default DashboardPage;