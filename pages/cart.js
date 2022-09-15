import { useContext, useEffect, useState } from "react";
import { Box, Divider, Text, Flex, Button } from '@chakra-ui/react'
import CartContext from "../lib/context/Cart";
import graphql from "../lib/graphql";
import getProductsById from "../lib/graphql/queries/getProductsById";
import Link from "next/link";

const Cart = () => {
    const { items } = useContext(CartContext)
    const [products, setProducts] = useState([])
    const hasProducts = Object.keys(items).length

    useEffect(() => {
        if(!hasProducts) return
        
        graphql.request(getProductsById, {
            ids: Object.keys(items)
        })
        .then((data) => {
            setProducts(data.products)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [JSON.stringify(products)])

    const getTotal = () => {
        if(!products.length) return 0

        return Object.keys(items)
            .map(
                (id) =>
                products.find((product) => product.id === id).price*(items[id]/100)
            )
            .reduce((x, y) => x+y)
            .toFixed(2)
    }

    return (
        <Box 
            rounded="xl"
            boxShadow="2xl"
            w="container.lg"
            p="16"
            bgColor="white"
        >
            <Text as="h1" fontSize="2x1" fontWeight="bold" textColor='blue'>
                Cart
            </Text>
            <Divider my="10" />
            <Box>
                {!hasProducts ? (
                    <Text textColor='blue'>This cart is empty!</Text>
                ) : (
                    <>
                        {products.map((product) => (
                            <Flex key={product.id} justifyContent="space-between" mb="4">
                                <Box>
                                    <Link href={`/product/${product.slug}`} passHref>
                                        <Text as="a" fontWeight="bold" textColor='blue' _hover={{textDecoration: 'underline', color: 'blue.500'}}>
                                            {product.name} {''}
                                            <Text as="span" color="gray.500">
                                                {''}
                                                x{items[product.id]}
                                            </Text>
                                        </Text>
                                    </Link>
                                </Box>
                                <Box color='blue'>
                                    €{(items[product.id] * (product.price/100)).toFixed(2)}
                                </Box>
                            </Flex>
                        ))}
                        <Divider my="10" />
                        <Flex
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Text fontSize="xl" fontWeight="bold" color='blue'>
                                Total: €{getTotal()}
                            </Text>
                            <Button colorScheme="blue">Pay now</Button>
                        </Flex>
                    </>
                )}
            </Box>
        </Box>
    )
}
export default Cart