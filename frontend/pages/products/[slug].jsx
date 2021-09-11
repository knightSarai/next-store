import Image from "next/image";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function Product({ product }) {
    const getfeaturedImage = () => {
        const { product_image } = product;
        if (!product_image.length) return <h2>No Image Provided</h2>
        const featuredImage = product_image.find(image => image.is_feature)
        if (featuredImage) return (
            <Image src={featuredImage.image} alt={featuredImage.alt_text} height="350" width="400" />
        )

        return (
            <Image src={product_image[0].image} alt={product_image[0].alt_text} height="350" width="400" />
        )
    }

    const getProductImages = () => {
        const { product_image } = product;
        if (!product_image.length <= 1) return ""

        return (
            product_image.map(image => (
                !image.is_feature && <Image src={image.image} alt={image.alt_text} height="100" width="150" />
            ))
        )
    }




    return (
        <Layout title={`Product | ${product.title}`}>
            <h1>{product.title}</h1>
            {getfeaturedImage()}
            <p>{product.description}</p>
            <ul style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                {getProductImages()}
            </ul>
        </Layout>
    )
}


export async function getServerSideProps({ query: { slug } }) {
    const res = await fetch(`${API_URL}/products/${slug}`)
    const product = await res.json()

    return {
        props: {
            product
        }
    }
}