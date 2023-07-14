import { IIconProps, Label } from "@fluentui/react";
import { contentContainerClassname, mainContainerClassname, searchContainerClassname, textClassname, textFieldStyles } from "./searchProducts.styles";
import { Product } from "../../models/Product";
import { ProductCard } from "../productCard/productCard";
import { Paginator } from "../paginator/paginator";
import { TextField } from "office-ui-fabric-react";
import { useContext, useEffect, useState } from "react";
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext";
import { SortingCriterias } from "../../enums/sortingCriterias";
import { IFetchResult } from "../../hooks/useFetch.types";
import { useFetch } from "../../hooks/useFetch";
import { PRODUCTS_PER_PAGE } from "../../library/constants";
import { useParams } from "react-router-dom";
const searchIconProps: IIconProps = { iconName: "Search" };

export const SearchProducts = (): JSX.Element => {
    const url = new URL(window.location.href);
    const urlKeywords: string | null = url.searchParams.get("keywords");
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [keyWords, setKeyWords] = useState<string>("");
    const [searchBarText, setSearchBarText] = useState<string>("");
    const [areProductsLoaded, setAreProductsLoaded] = useState<boolean>(false);
    const [numberOfPages, setNumberOfPages] = useState<number>(1);
    const [numberOfPagesLoaded, setNumberOfPagesLoaded] = useState<boolean>(false);
    const productsData: IFetchResult<Product[]> = useFetch<Product[]>(() => services.ProductsService.GetSearchedProductsByPage(currentPage, SortingCriterias.AlphabeticAscending, keyWords), [keyWords, currentPage.toString(), urlKeywords!]);
    const numberOfproductsData: IFetchResult<number> = useFetch<number>(() => services.ProductsService.GetNumberOfProductsBySearch(keyWords), [keyWords, urlKeywords!]);

    const onSearchBarChange = (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText?: string | undefined): void => {
        setSearchBarText(newText ?? "");
    };

    useEffect(() => {
        if(urlKeywords)
            setKeyWords(urlKeywords);
    }, [urlKeywords]);

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
        setAreProductsLoaded(true);
    }, [productsData]);

    useEffect(() => {
        if (numberOfproductsData.isLoading) {
            return;
        }
        if (numberOfproductsData.errors !== '' ||
            numberOfproductsData.data === null ||
            numberOfproductsData.data?.Error !== undefined ||
            numberOfproductsData.data?.Data === undefined) {
            return;
        }
        setNumberOfPages(Math.ceil(numberOfproductsData.data.Data / PRODUCTS_PER_PAGE));
        setNumberOfPagesLoaded(true);
    }, [numberOfproductsData]);

    const checkIfEnterPressed = (_event: any): void => {
        if (_event.key === 'Enter') {
            _event.preventDefault();
            setCurrentPage(1);
            const url = new URL(window.location.href);
            url.searchParams.set('keywords', searchBarText); 
            window.history.replaceState(null, "", url);      
            setKeyWords(searchBarText);
        }
    }

    const updateCurrentPage = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    };

    const productsInPage: JSX.Element[] = products.map(product => {
        return (
            <ProductCard product={product} />
        )
    });

    return (
        <>
            <div className={mainContainerClassname}>
                <div className={searchContainerClassname}>
                    <Label className={textClassname}>What are you looking for?</Label>
                    <TextField styles={textFieldStyles} iconProps={searchIconProps} borderless onChange={onSearchBarChange} onKeyDown={checkIfEnterPressed} />
                </div>
                <div className={contentContainerClassname}>
                    {!areProductsLoaded && <Label>Loading..</Label>}
                    {areProductsLoaded && productsInPage}
                </div>
                {areProductsLoaded && numberOfPagesLoaded && <Paginator maxNumberOfPages={numberOfPages} updatePageNumber={updateCurrentPage} />}
            </div>
        </>
    )
};