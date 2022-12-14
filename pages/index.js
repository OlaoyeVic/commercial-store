import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import graphql from '../lib/graphql'
import getAllProducts from '../lib/graphql/queries/getAllProducts'
import ProductCard from '../components/ProductCard'
import { Grid } from '@chakra-ui/react'

// export const getStaticProps = async () => {
//   const { products } = await graphql.request(getAllProducts)
//   return {
//     revalidate: 60,
//     props: {
//       products,
//     }
//   }
// }

export const getStaticProps = async() => {
  const { products } = await graphql.request(getAllProducts)
  return {
    revalidate: 60,
    props: {
      products,
    }
  }
}

export default function Home(props) {
  return (
    <Grid gridTemplateColumns="repeat(4, 1fr)" gap="5">
      {props && props.products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  )
}
