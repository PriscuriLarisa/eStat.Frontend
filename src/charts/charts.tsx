import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { chartsContainer, mainContainerClassname, radialChartStyle, rowContainer, spinnerClassname } from "./charts.styles";
import { UserProduct } from "../models/UserProduct";
import { IFetchResult } from "../hooks/useFetch.types";
import { useFetch } from "../hooks/useFetch";
import { ServiceContext, ServiceContextInstance } from "../core/serviceContext";
import { Separator, Spinner, SpinnerSize } from "office-ui-fabric-react";
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, RadialBar, RadialBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { getAveragePricesForAreaChart, getAveragePricesVsMyPriceForAreaChart, getDataForBarchart, getDataForRadialChart, getLineChartData, getLowVsHighPricesForAreaChart } from "../helpers/chartPageDataHelper";
import { TitleCard } from "../components/titleCard/titleCard";
import { FONT_FAMILY } from "../library/constants";
import { TitleCardMedium } from "../components/titleCard/titleCardMedium";

export const Charts = (): JSX.Element => {
    const { productGUID, userProductGUID } = useParams();
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [userProduct, setUserProduct] = useState<UserProduct>();
    const [userProductLoaded, setUserProductLoaded] = useState<boolean>(false);
    const [avgPriceLastSixMonths, setAvgPriceLastSixMonths] = useState<any>();
    const [myAvgPriceLastSixMonths, setMyAvgPriceLastSixMonths] = useState<any>();
    const [highestPriceLastSixMonths, setHighestPriceLastSixMonths] = useState<any>();
    const [lowestPriceLastSixMonths, setLowestPriceLastSixMonths] = useState<any>();
    const [sellsLastMonths, setSellsLastMonths] = useState<any>();
    const [mySellsLastMonths, setMySellsLastMonths] = useState<any>();
    const [sellsByLowest, setSellsByLowestData] = useState<number>(0);
    const [sellsByHighest, setSellsByHighest] = useState<number>(0);
    const [sellsByAvg, setSellsByAvg] = useState<number>(0);
    const [currentAvgPrice, setCurrentAvgPrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasProduct, setHasProduct] = useState<boolean>(false);
    const userProductData: IFetchResult<UserProduct> = useFetch<UserProduct>(() => services.UserProductService.GetByUid(userProductGUID ?? '00000000-0000-0000-0000-000000000000'), [userProductGUID!]);
    const avgPriceLastSixMonthsData: IFetchResult<any> = useFetch<any>(() => services.ProductsService.GetAvgPriceLastSixMonths(userProductLoaded ? productGUID! : '00000000-0000-0000-0000-000000000000'), [productGUID!, userProductLoaded.toString()]);
    const myAvgPriceLastSixMonthsData: IFetchResult<any> = useFetch<any>(() => services.UserProductService.GetUserProductAveragePricesLast6Months(userProductGUID ?? '00000000-0000-0000-0000-000000000000'), [userProductGUID!]);
    const highestPriceLastSixMonthsData: IFetchResult<any> = useFetch<any>(() => services.ProductsService.GetHighestPriceLastSixMonths(productGUID!), [productGUID!]);
    const lowestPriceLastSixMonthsData: IFetchResult<any> = useFetch<any>(() => services.ProductsService.GetLowestPriceLastSixMonths(productGUID!), [productGUID!]);
    const sellsByLowestData: IFetchResult<number | null> = useFetch<number | null>(() => services.ProductsService.GetSellsByLowest(productGUID!), [productGUID!]);
    const sellsByHighestData: IFetchResult<number | null> = useFetch<number | null>(() => services.ProductsService.GetSellsByHighest(productGUID!), [productGUID!]);
    const sellsByAvgData: IFetchResult<number | null> = useFetch<number | null>(() => services.ProductsService.GetSellsByAvg(productGUID!), [productGUID!]);
    const sellsLastMonthsData: IFetchResult<any | null> = useFetch<number | null>(() => services.ProductsService.GetSellsLast6Months(productGUID!), [productGUID!]);
    const mySellsLastMonthsData: IFetchResult<any | null> = useFetch<number | null>(() => services.UserProductService.GetMySellsLast6Months(userProductGUID!), [userProductGUID!]);
    const currentAveragePriceData: IFetchResult<any | null> = useFetch<number | null>(() => services.ProductsService.GetCurrentAveragePrice(productGUID!), [productGUID!]);

    useEffect(() => {
        if (userProductData.isLoading) {
            return;
        }
        if(userProductData.data?.Status === 404) {
            setUserProduct(undefined);
            setUserProductLoaded(true);
            setHasProduct(false);
            return;
        }
        if (userProductData.errors !== '' ||
            userProductData.data === null ||
            userProductData.data?.Error !== undefined ||
            userProductData.data?.Data === undefined) {
            return;
        }
        setUserProduct(userProductData.data?.Data);
        setUserProductLoaded(true);
        setHasProduct(true);
    }, [userProductData]);

    useEffect(() => {
        if (currentAveragePriceData.isLoading) {
            return;
        }
        if (currentAveragePriceData.errors !== '' ||
            currentAveragePriceData.data === null ||
            currentAveragePriceData.data?.Error !== undefined ||
            currentAveragePriceData.data?.Data === undefined) {
            return;
        }
        setCurrentAvgPrice(currentAveragePriceData.data?.Data);
    }, [currentAveragePriceData]);

    useEffect(() => {
        if (avgPriceLastSixMonthsData.isLoading) {
            return;
        }
        if (avgPriceLastSixMonthsData.errors !== '' ||
            avgPriceLastSixMonthsData.data === null ||
            avgPriceLastSixMonthsData.data?.Error !== undefined ||
            avgPriceLastSixMonthsData.data?.Data === undefined) {
            return;
        }
        setAvgPriceLastSixMonths(avgPriceLastSixMonthsData.data.Data);
    }, [avgPriceLastSixMonthsData]);

    useEffect(() => {
        if (myAvgPriceLastSixMonthsData.isLoading) {
            return;
        }
        if (myAvgPriceLastSixMonthsData.errors !== '' ||
            myAvgPriceLastSixMonthsData.data === null ||
            myAvgPriceLastSixMonthsData.data?.Error !== undefined ||
            myAvgPriceLastSixMonthsData.data?.Data === undefined) {
            return;
        }
        setMyAvgPriceLastSixMonths(myAvgPriceLastSixMonthsData.data.Data);
    }, [myAvgPriceLastSixMonthsData]);

    useEffect(() => {
        if (highestPriceLastSixMonthsData.isLoading) {
            return;
        }
        if (highestPriceLastSixMonthsData.errors !== '' ||
            highestPriceLastSixMonthsData.data === null ||
            highestPriceLastSixMonthsData.data?.Error !== undefined ||
            highestPriceLastSixMonthsData.data?.Data === undefined) {
            return;
        }
        setHighestPriceLastSixMonths(highestPriceLastSixMonthsData.data.Data);
    }, [highestPriceLastSixMonthsData]);

    useEffect(() => {
        if (lowestPriceLastSixMonthsData.isLoading) {
            return;
        }
        if (lowestPriceLastSixMonthsData.errors !== '' ||
            lowestPriceLastSixMonthsData.data === null ||
            lowestPriceLastSixMonthsData.data?.Error !== undefined ||
            lowestPriceLastSixMonthsData.data?.Data === undefined) {
            return;
        }
        setLowestPriceLastSixMonths(lowestPriceLastSixMonthsData.data.Data);
    }, [lowestPriceLastSixMonthsData]);


    useEffect(() => {
        if (sellsByLowestData.isLoading) {
            return;
        }
        if (sellsByLowestData.errors !== '' ||
            sellsByLowestData.data === null ||
            sellsByLowestData.data?.Error !== undefined ||
            sellsByLowestData.data?.Data === undefined ||
            sellsByLowestData.data?.Data == null) {
            return;
        }
        setSellsByLowestData(sellsByLowestData.data?.Data);
        console.log(sellsByLowestData.data?.Data);
    }, [sellsByLowestData]);

    useEffect(() => {
        if (sellsByHighestData.isLoading) {
            return;
        }
        if (sellsByHighestData.errors !== '' ||
            sellsByHighestData.data === null ||
            sellsByHighestData.data?.Error !== undefined ||
            sellsByHighestData.data?.Data === undefined ||
            sellsByHighestData.data?.Data == null) {
            return;
        }
        setSellsByHighest(sellsByHighestData.data?.Data);
        console.log(sellsByHighestData.data?.Data);
    }, [sellsByHighestData]);

    useEffect(() => {
        if (sellsByAvgData.isLoading) {
            return;
        }
        if (sellsByAvgData.errors !== '' ||
            sellsByAvgData.data === null ||
            sellsByAvgData.data?.Error !== undefined ||
            sellsByAvgData.data?.Data === undefined ||
            sellsByAvgData.data?.Data == null) {
            return;
        }
        setSellsByAvg(sellsByAvgData.data?.Data);
        console.log(sellsByAvgData.data?.Data);
    }, [sellsByAvgData]);

    useEffect(() => {
        if (sellsLastMonthsData.isLoading) {
            return;
        }
        if (sellsLastMonthsData.errors !== '' ||
            sellsLastMonthsData.data === null ||
            sellsLastMonthsData.data?.Error !== undefined ||
            sellsLastMonthsData.data?.Data === undefined ||
            sellsLastMonthsData.data?.Data == null) {
            return;
        }
        setSellsLastMonths(sellsLastMonthsData.data?.Data);
        console.log(sellsLastMonthsData.data?.Data);
    }, [sellsLastMonthsData]);

    useEffect(() => {
        if (mySellsLastMonthsData.isLoading) {
            return;
        }
        if (mySellsLastMonthsData.errors !== '' ||
            mySellsLastMonthsData.data === null ||
            mySellsLastMonthsData.data?.Error !== undefined ||
            mySellsLastMonthsData.data?.Data === undefined ||
            mySellsLastMonthsData.data?.Data == null) {
            return;
        }
        setMySellsLastMonths(mySellsLastMonthsData.data?.Data);
        console.log(mySellsLastMonthsData.data?.Data);
    }, [mySellsLastMonthsData]);

    useEffect(() => {

        if (avgPriceLastSixMonths == null ||
            highestPriceLastSixMonths == null || lowestPriceLastSixMonths == null || sellsLastMonths == null ||
            sellsByLowest == null || sellsByHighest == null || sellsByAvg == null || currentAvgPrice == null
            || (hasProduct == true && (mySellsLastMonths == null || myAvgPriceLastSixMonths == null)))
            return;

        setLoading(false);
    }, [userProduct, userProductLoaded, avgPriceLastSixMonths, myAvgPriceLastSixMonths,
        highestPriceLastSixMonths, lowestPriceLastSixMonths, sellsLastMonths,
        mySellsLastMonths, sellsByLowest, sellsByHighest, sellsByAvg]);

    const toPercent = (decimal: number, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;


    const getPercent = (value: any, total: any) => {
        const ratio = total > 0 ? value / total : 0;

        return toPercent(ratio, 2);
    };

    const renderTooltipContent = (o: any): JSX.Element => {
        const { payload, label } = o;
        const total = payload.reduce((result: number, entry: any) => result + entry.value, 0);

        return (
            <div className="customized-tooltip-content">
                <p className="total">{`${label} (Total: ${total})`}</p>
                <ul className="list">
                    {payload.map((entry: any, index: number) => (
                        <li key={`item-${index}`} style={{ color: entry.color }}>
                            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <>
            <div className={mainContainerClassname}>
                <TitleCard title="Charts"></TitleCard>
                <div className={chartsContainer}>

                    {loading &&
                        <div style={{ width: '50%', height: '50%', position: 'relative', margin: 'auto', top: '40%' }}>
                            <Spinner label={"Gathering all the required statistics. \n Please wait..."} ariaLive="assertive" labelPosition="top" className={spinnerClassname} size={SpinnerSize.large} />
                        </div>
                    }
                    {
                        !loading &&
                        <>
                            <div className={rowContainer}>
                                <div style={{ width: '60%', height: '100%' }}>
                                    <TitleCardMedium title="Highest vs Lowest prices in the past six months"></TitleCardMedium>
                                    <ResponsiveContainer width="100%" height="90%">
                                        <AreaChart
                                            width={500}
                                            height={400}
                                            data={getLowVsHighPricesForAreaChart(highestPriceLastSixMonths, lowestPriceLastSixMonths)}
                                            margin={{
                                                top: 10,
                                                right: 30,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" fontSize={13} fontFamily={FONT_FAMILY} />
                                            <YAxis fontSize={13} fontFamily={FONT_FAMILY} />
                                            <Area type="monotone" stackId="1" dataKey="high" stroke="#4B56D2" fill="#4B56D2" name="Highest prices" opacity={0.6} />
                                            <Area type="monotone" stackId="2" dataKey="low" stroke="#472183" fill="#472183" name="Lowest prices" opacity={0.6} />
                                            <Tooltip contentStyle={{ fontFamily: FONT_FAMILY }} />
                                            <Legend wrapperStyle={{ fontSize: "15px", fontFamily: FONT_FAMILY }} ></Legend>
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div style={{ width: '45%', height: '100%', marginLeft: '5%' }}>
                                    <TitleCardMedium title="Selling numbers"></TitleCardMedium>
                                    <ResponsiveContainer width="90%" height="100%">
                                        <RadialBarChart cx="30%" cy="50%" innerRadius="20%" outerRadius="100%" barSize={20} data={getDataForRadialChart(sellsByHighest, sellsByLowest, sellsByAvg)}>
                                            <RadialBar
                                                label={{ position: 'insideStart', fill: 'white', fontFamily: FONT_FAMILY, fontWeight: '600' }}
                                                background
                                                dataKey="value"
                                                opacity={0.7}
                                            />
                                            <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={radialChartStyle} />
                                        </RadialBarChart>

                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <Separator></Separator>
                            <div className={rowContainer}>
                                <div style={{ width: '50%', height: '100%' }}>
                                    <TitleCardMedium title="Average price vs My price in the past six months"></TitleCardMedium>
                                    <ResponsiveContainer width="100%" height="90%">
                                        <AreaChart
                                            width={500}
                                            height={400}
                                            data={hasProduct ? getAveragePricesVsMyPriceForAreaChart(avgPriceLastSixMonths, myAvgPriceLastSixMonths) : getAveragePricesForAreaChart(avgPriceLastSixMonths)}
                                            margin={{
                                                top: 10,
                                                right: 30,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" fontSize={13} fontFamily={FONT_FAMILY} />
                                            <YAxis fontSize={13} fontFamily={FONT_FAMILY} />
                                            <Area type="monotone" stackId="1" dataKey="avgPrice" stroke="#8884d8" fill="#4B56D2" name="Average price" opacity={0.6} />
                                            <Area type="monotone" stackId="2" dataKey="myPrice" stroke="#8884d8" fill="#472183" name="My price" opacity={0.6} />
                                            <Tooltip contentStyle={{ fontFamily: FONT_FAMILY }} />
                                            <Legend wrapperStyle={{ fontSize: "15px", fontFamily: FONT_FAMILY }} ></Legend>
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div style={{ width: '45%', height: '100%', marginLeft: '5%' }}>
                                    <TitleCardMedium title="Sells"></TitleCardMedium>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            width={500}
                                            height={300}
                                            data={getLineChartData(sellsLastMonths, mySellsLastMonths)}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" strokeLinecap="square" />
                                            <XAxis dataKey="name" fontFamily={FONT_FAMILY} fontSize={15} strokeLinecap="square" />
                                            <YAxis fontFamily={FONT_FAMILY} fontSize={15} strokeLinecap="square" />
                                            <Tooltip contentStyle={{ fontFamily: FONT_FAMILY }} />
                                            <Legend wrapperStyle={{ fontSize: "15px", fontFamily: FONT_FAMILY }} />
                                            <Line type="linear" dataKey="totalSells" stroke="#82C3EC" name="Sells" activeDot={{ r: 5 }} strokeLinecap="square" />
                                            {mySellsLastMonths && <Line type="linear" dataKey="mySells" stroke="#4B56D2" name="My sells" activeDot={{ r: 5 }} strokeLinecap="square" />}
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <Separator></Separator>
                            <div className={rowContainer}>
                                <div style={{ width: '50%', height: '100%' }}>
                                    <TitleCardMedium title="Average prices"></TitleCardMedium>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            width={500}
                                            height={300}
                                            data={getDataForBarchart(currentAvgPrice, userProduct?.price)}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" fontSize={13} fontFamily={FONT_FAMILY}/>
                                            <YAxis fontSize={13} fontFamily={FONT_FAMILY}/>
                                            <Tooltip contentStyle={{ fontFamily: FONT_FAMILY, fontSize: '12px' }}/>
                                            <Legend wrapperStyle={{ fontSize: "13px", fontFamily: FONT_FAMILY }}/>
                                            <Bar dataKey="value" fill="#8884d8" barSize={28} name="Price"/>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div style={{ width: '40%', height: '100%' }}>

                                </div>
                            </div>
                        </>
                    }
                </div>

            </div>
        </>
    )
};