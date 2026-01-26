

export type allType = {
  id: string
  image: string
  title: string
  description: string
  price: number
  width?: number
  height?: number
  isLarge: boolean
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

export type imageType = Pick<allType, 'id'| 'image' | 'title' | 'price'>

export type PopularProductsType = Pick<allType, 'id' | 'image' | 'title' | 'price' | 'width' | 'height' | 'isLarge'>

export type SidebarType = Pick<allType, 'title'>

export const TextsType:SidebarType[] = [
  {
    title: "Furniture"
  },
  {
    title: "Homeware"
  },
  {
    title: "Sofas"
  },
  {
    title: "Light fittings"
  },
  {
    title: "Accessories"
  }
]

export const Prices:SidebarType[] = [
  {
    title: "0 - 100"
  },
  {
    title: "101 - 250"
  },
  {
    title: "250 +"
  },
]

export const Designer:SidebarType[] = [
  {
    title: "Robert Smith"
  },
  {
    title: "Liam Gallagher"
  },
  {
    title: "Biggie Smalls"
  },
  {
    title: "Thom Yorke"
  },
]