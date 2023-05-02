import { useContext, useEffect, useState } from "react"
import { Product } from "../../models/Product"
import { Paginator } from "../paginator/paginator"
import { ProductCard } from "../productCard/productCard"
import { TitleCard } from "../titleCard/titleCard"
import { contentContainerClassname, mainContainerClassname } from "./manageProducts.styles"
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext"
import { SortingCriterias } from "../../enums/sortingCriterias"
import { Label } from "@fluentui/react"
import { useParams } from "react-router-dom"

export const ManageProducts = (): JSX.Element => {
    const { category } = useParams();
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        services.ProductsService.GetProductsByPage(currentPage, SortingCriterias.AlphabeticAscending, category).then(products => {setProducts(products); setLoading(false)});
    }, [currentPage, category]);

    const productsInPage: JSX.Element[] = products.map(product => {
        return (
            <ProductCard product={product} />
        )
    });

    const updateCurrentPage = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className={mainContainerClassname}>
            <TitleCard title="Products" />
            {productsInPage && <div className={contentContainerClassname}>
                {loading && <Label>Loading..</Label> }
                {!loading && productsInPage}
            </div>}
            <Paginator maxNumberOfPages={20} updatePageNumber={updateCurrentPage} />
        </div>
    )
}