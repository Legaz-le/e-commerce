

export type allType = {
  image: string
  title: string
  description: string
  price: string
  width?: number
  height?: number
}

export type dataType = Pick<allType, "image" | "title" | "description">

export const data:dataType[] = [
  {
    image: "/images/Delivery.jpg",
    title: "Next day as standard",
    description: "Order before 3pm and get your order the next day as standard"
  },
  {
    image: "/images/Checkmark--outline.jpg",
    title: "Made by true artisans",
    description: "Handmade crafted goods made with real passion and craftmanship"
  },
  {
    image: "/images/Purchase.jpg",
    title: "Unbeatable prices",
    description: "For our materials and quality you won’t find better prices anywhere"
  },
  {
    image: "/images/Sprout.jpg",
    title: "Recycle packaging",
    description: "We use 100% recycled packaging to ensure our footprint is manageable"
  }
]

export type imageType = Pick<allType, 'image' | 'title' | 'price'>

export const Images:imageType[] = [
  {
    image: "/images/Photo.jpg",
    title: "The Dandy chair",
    price: "$250",
  },
  {
    image: "/images/Photo_2.jpg",
    title: "Rustic Vase Set",
    price: "$155",
  },
  {
    image: "/images/Photo_3.jpg",
    title: "The Silky Vase",
    price: "$125",
  },
  {
    image: "/images/Photo_4.jpg",
    title: "The Lucy Lamp",
    price: "$399",
  }
]

export type PopularProductsType = Pick<allType, 'image' | 'title' | 'price' | 'width' | 'height'>

export const PopularProducts:PopularProductsType[] = [
  {
    image: "/images/Large.jpg",
    title: "The Popular suede sofa",
    price: "$980",
    width: 740,
    height: 375,
  },
  {
    image: "/images/Photo.jpg",
    title: "The Dandy chair",
    price: "$250",
    width: 355,
    height: 0,
  },
  {
    image: "/images/Photo_2.2.jpg",
    title: "The Dandy chair",
    price: "$250",
    width: 355,
    height: 0,
  },
]
