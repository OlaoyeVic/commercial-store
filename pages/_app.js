import '../styles/globals.css'
import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import CartContext from '../lib/context/Cart'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [items, setItems] = useState({})
  return (
    <ChakraProvider>
      <CartContext.Provider value={{items, setItems}}>
        <Flex w="full" minH="100vh" bgColor="gray.100">
          <Navbar />
          <Box maxW="70vw" m="auto">
            <Component {...pageProps} />
          </Box>
        </Flex>
      </CartContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
