import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "@/components/Link";
import { API_URL } from "@/config/index";
import styles from '@/styles/Home.module.css';


export default function Category({ products, category }) {

  const getProductImages = ({ product_image, title }) => {
    if (!product_image.length) return (
      <h4>{title}</h4>
    )
    return <Image src={product_image[0].image} alt={title} height="150" width="200" />
  }

  return (
    <Layout title={`Category | ${category.name}`}>
      <h1>{category.name}</h1>
      <ul className={styles.productList}>
        {products.map(product => (
          <li key={product.id} className={styles.productItem}>
            {getProductImages(product)}
            <div className={styles.productDescription}>
              <br />
              <Link href={`products/${product.slug}`}>
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
      {!products.length && (<p>No products under category</p>)}
    </Layout>
  )
}

export async function getServerSideProps({ query: { slug } }) {
  const productRes = await fetch(`${API_URL}/categories/${slug}`)
  const categoryRes = await fetch(`${API_URL}/category/${slug}`)
  const products = await productRes.json()
  const category = await categoryRes.json()

  return {
    props: {
      products,
      category
    }
  }
}