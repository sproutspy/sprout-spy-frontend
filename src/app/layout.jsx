import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react';
import { ChakraProvider, Text } from '@chakra-ui/react'
import AuthProvider from 'src/components/AuthProvider';

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body style={{backgroundColor: "#171923"}}>
          <main>
           <ChakraProvider>
              <AuthProvider accessToken={session?.access_token}>{children}</AuthProvider>
            </ChakraProvider>
          </main>
      </body>
    </html>
  );
}
