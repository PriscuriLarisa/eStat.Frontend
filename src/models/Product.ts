export interface Product {
    productGUID?: string,
    characteristics: string,
    inUse: boolean,
    category: string,
    name?: string,
    imageLink: string,
    basePrice: number
}