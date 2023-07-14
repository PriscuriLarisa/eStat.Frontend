import AuthentificationContext from "../../authentication/authenticationContext";
import { AuthentificationContextModel } from "../../authentication/authenticationContext.types";
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext";
import { useContext, useEffect, useState } from "react";
import { UserProduct } from "../../models/UserProduct";
import { IFetchResult } from "../../hooks/useFetch.types";
import { useFetch } from "../../hooks/useFetch";
import { buttonStyles, mainContainerClassname, productsContainerClassname, productsDivContainerClassname, textFieldStyles } from "./manageStock.styles";
import { TitleCard } from "../titleCard/titleCard";
import { StockProductCard } from "./stockProductCard/stockProductCard";
import { DefaultButton, IIconProps, TextField } from "@fluentui/react";
const searchIconProps: IIconProps = { iconName: "Search" };

export const ManageStock = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const authenticationContext: AuthentificationContextModel = useContext(AuthentificationContext);
    const [batchNb, setBatchNb] = useState<number>(0);
    const [stock, setStock] = useState<UserProduct[]>([]);
    const [isStockLoaded, setIsStockLoaded] = useState<boolean>(false);
    const [searchBarText, setSearchBarText] = useState<string>("");
    const [wasSearchFired, setWasSearchFired] = useState<boolean>(false);
    const [keywords, setKeyWords] = useState<string>("_empty_search_bar_");
    
    const stockData: IFetchResult<UserProduct[]> = useFetch<UserProduct[]>(() => services.UserProductService.GetUserProductsByUserInBatches(authenticationContext.User.userGUID!, batchNb, keywords), [authenticationContext.User.userGUID!, batchNb.toString(), keywords.toString()]);
    
    useEffect(() => {
        setIsStockLoaded(false);
        if (stockData.isLoading) {
            return;
        }
        if (stockData.errors !== '' ||
            stockData.data === null ||
            stockData.data?.Error !== undefined ||
            stockData.data?.Data === undefined) {
            return;
        }
        if(!wasSearchFired) {
            let oldStock: UserProduct[] = stock.map( s=> Object.assign({}, s!));
            oldStock = oldStock.concat(stockData.data.Data)
            setStock(oldStock);
        }
        else {
            setStock(stockData.data.Data);
            setWasSearchFired(false);
        }

        setIsStockLoaded(true);
    }, [stockData]);


    const productsInCart: JSX.Element[] = stock?.map(product => {
        return (
            <StockProductCard product={product} />
        )
    })!;

    const onLoadMoreButtonClicked = (): void => {
        setBatchNb(batchNb+1);
    };

    const onSearchBarChange = (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText?: string | undefined): void => {
        setSearchBarText(newText ?? "");
    }

    const checkIfEnterPressed = (_event: any): void => {
        if (_event.key === 'Enter') {
            _event.preventDefault();   
            setKeyWords(searchBarText);
            setBatchNb(0);
            setWasSearchFired(true);
        }
    }

    return (
        <>
            <div className={mainContainerClassname}>
                <TitleCard title="My Stock" />
                <TextField styles={textFieldStyles} iconProps={searchIconProps} borderless onChange={onSearchBarChange} onKeyDown={checkIfEnterPressed} />
                <div className={productsContainerClassname}>
                    {isStockLoaded && productsInCart}
                    <DefaultButton styles={buttonStyles} onClick={onLoadMoreButtonClicked}>Load more</DefaultButton>
                </div>
            </div>
        </>
    );
};