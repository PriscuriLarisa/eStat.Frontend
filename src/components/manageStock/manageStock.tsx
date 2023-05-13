import AuthentificationContext from "../../authentication/authenticationContext";
import { AuthentificationContextModel } from "../../authentication/authenticationContext.types";
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext";
import { useContext, useEffect, useState } from "react";
import { UserProduct } from "../../models/UserProduct";
import { IFetchResult } from "../../hooks/useFetch.types";
import { useFetch } from "../../hooks/useFetch";
import { buttonStyles, mainContainerClassname, productsContainerClassname, productsDivContainerClassname } from "./manageStock.styles";
import { TitleCard } from "../titleCard/titleCard";
import { StockProductCard } from "./stockProductCard/stockProductCard";
import { DefaultButton } from "@fluentui/react";


export const ManageStock = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const authenticationContext: AuthentificationContextModel = useContext(AuthentificationContext);
    const [batchNb, setBatchNb] = useState<number>(1);
    const [stock, setStock] = useState<UserProduct[]>([]);
    const [isStockLoaded, setIsStockLoaded] = useState<boolean>(false);
    const stockData: IFetchResult<UserProduct[]> = useFetch<UserProduct[]>(() => services.UserProductService.GetUserProductsByUserInBatches(authenticationContext.User.userGUID!, batchNb), [authenticationContext.User.userGUID!, batchNb.toString()]);

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
        let oldStock: UserProduct[] = stock.map( s=> Object.assign({}, s!));
        oldStock = oldStock.concat(stockData.data.Data)
        setStock(oldStock);
        setIsStockLoaded(true);
    }, [stockData]);

    const productsInCart: JSX.Element[] = stock?.map(product => {
        return (
            <StockProductCard product={product} />
        )
    })!;

    const onLoadMoreButtonClicked = (): void => {
        setBatchNb(batchNb+1);
    }

    return (
        <>
            <div className={mainContainerClassname}>
                <TitleCard title="My Stock" />
                <div className={productsContainerClassname}>
                    {isStockLoaded && productsInCart}
                    <DefaultButton styles={buttonStyles} onClick={onLoadMoreButtonClicked}>Load more</DefaultButton>
                </div>
            </div>
        </>
    );
};