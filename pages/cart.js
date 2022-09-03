import { useContext, useEffect, useState } from "react";
import { Box, Divider, Text } from '@chakra-ui/react'
import CartContext from "../lib/context/Cart";
import graphql from "../lib/graphql";
import getProductsById from "../lib/graphql/queries/getProductsById";

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

    return (
        <Box 
            rounded="xl"
            boxShadow="2xl"
            w="container.lg"
            p="16"
            bgColor="white"
        >
            <Text as="h1" fontSize="2x1" fontWeight="bold">
                Cart
            </Text>
            <Divider my="10" />
            <Box>
                <Text>The cart is empty</Text>
            </Box>
        </Box>
    )
}
export default Cart