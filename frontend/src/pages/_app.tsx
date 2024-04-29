import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
// other imports
import AuthUserProvider from '../components/auth/authUserProvider';

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </ChakraProvider>
  );
}

export default App;