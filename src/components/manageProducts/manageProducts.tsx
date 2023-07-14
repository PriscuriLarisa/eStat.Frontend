import { useContext, useEffect, useState } from "react"
import { Product } from "../../models/Product"
import { Paginator } from "../paginator/paginator"
import { ProductCard } from "../productCard/productCard"
import { TitleCard } from "../titleCard/titleCard"
import { contentContainerClassname, mainContainerClassname, spinnerClassname } from "./manageProducts.styles"
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext"
import { SortingCriterias } from "../../enums/sortingCriterias"
import { Label, Spinner, SpinnerSize } from "@fluentui/react"
import { useParams } from "react-router-dom"
import { IFetchResult } from "../../hooks/useFetch.types"
import { useFetch } from "../../hooks/useFetch"

export const ManageProducts = (): JSX.Element => {
    const { category } = useParams();
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const productsData: IFetchResult<Product[]> = useFetch<Product[]>(() => services.ProductsService.GetProductsByPageAPI(currentPage, SortingCriterias.AlphabeticAscending, category), [currentPage.toString(), category!]);


    // useEffect(() => {
    //     setLoading(true);
    //     services.ProductsService.GetProductsByPage(currentPage, SortingCriterias.AlphabeticAscending, category).then(products => { setProducts(products); setLoading(false) });
    // }, [currentPage, category]);

    useEffect(() => {
        if (productsData.isLoading) {
            return;
        }
        if (productsData.errors !== '' ||
            productsData.data === null ||
            productsData.data?.Error !== undefined ||
            productsData.data?.Data === undefined) {
            return;
        }
        setProducts(productsData.data.Data);
        console.log(productsData.data.Data);
        setLoading(false);
    }, [productsData]);


    const productsInPage: JSX.Element[] = products.map(product => {
        return (
            <ProductCard product={product} />
        )
    });

    const updateCurrentPage = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={mainContainerClassname}>
            <TitleCard title={category!} />
            {loading &&
                <div style={{ width: '60%', height: '50%', margin: 'auto', position: 'relative', top: '10%' }}>
                    <Spinner label="Loading data..." ariaLive="assertive" labelPosition="top" className={spinnerClassname} size={SpinnerSize.large} />
                </div>
            }
            {
                productsInPage && !loading &&
                <>
                    <div className={contentContainerClassname}>
                        {productsInPage}
                    </div>
                    <Paginator maxNumberOfPages={20} updatePageNumber={updateCurrentPage} />
                </>
            }


        </div>
    )
}