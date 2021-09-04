import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "@/components/Link";
import { API_URL } from "@/config/index";
import styles from '@/styles/Home.module.css';


export default function Home({ products }) {

  const getProductImages = ({ product_image, title }) => {
    if (!product_image.length) return (
      <h4>{title}</h4>
    )
    return <Image src={product_image[0].image} alt={title} height="150" width="200" />
  }

  return (
    <Layout title="Home Page">
      <h1>All Products</h1>
      <ul className={styles.productList}>
        {products.map(product => (
          <li key={product.id} className={styles.productItem}>
            {getProductImages(product)}
            <div className={styles.productDescription}>
              <br />
              <Link href={`/products/${product.slug}`}>
                {product.title}
              </Link>
              <br />
              {product.regular_price}
              <br />
              {product.description || "No description provided"}
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/products`)
  const data = await res.json()
  return {
    props: {
      products: data
    }
  }
}