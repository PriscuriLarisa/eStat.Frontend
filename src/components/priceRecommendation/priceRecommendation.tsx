import { useParams } from "react-router-dom";
import { Link, Text } from "@fluentui/react";
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext";
import { useContext, useEffect, useState } from "react";
import { PricePrediction } from "../../models/PricePrediction";
import { useFetch } from "../../hooks/useFetch";
import { IFetchResult } from "../../hooks/useFetch.types";
import { UserProduct } from "../../models/UserProduct";
import { additionalInfoContainer, arrowIconClassname, headerContainerClassname, infoColumnOne, mainContainerClassname, priceChangeContainer, priceChangeInfoContainer, priceContainerClassname, priceDownIconClassname, priceUpIconClassname, textClassname, textDownClassname, textImportantClassname, textSmallClassname, textUpClassname, titleContainerClassname } from "./priceRecommendation.style";
import { TitleCard } from "../titleCard/titleCard";
import { TitleCardMedium } from "../titleCard/titleCardMedium";
import { IIconProps, Icon, Separator } from "office-ui-fabric-react";
import { Bar, BarChart, CartesianGrid, Cell, Label, Legend, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getDataForBarchart, getDataForSecondBarchart, getRetailerForPieChart } from "../../helpers/priceRecommendationInfoHelper";
import { data } from "jquery";
import { COLORS, FONT_FAMILY, RADIAN } from "../../library/constants";
import { TitleCardSmall } from "../titleCard/titleCardSmall";
import { CustomPieLabelData } from "./priceRecommendation.types";

const downIcon: IIconProps = { iconName: "MarketDown" };
const upIcon: IIconProps = { iconName: "Market" };
const arrow: IIconProps = { iconName: "TriangleSolidDown12" };

export const PriceRecommendation = (): JSX.Element => {
    const { uid } = useParams();
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [priceRecommendation, setPriceRecommendation] = useState<PricePrediction>();
    const [isPriceRecommendationLoaded, setIsPriceRecommendationLoaded] = useState<boolean>(false);
    const priceRommendationsData: IFetchResult<PricePrediction> = useFetch<PricePrediction>(() => services.PricePredictionService.GetByUid(uid!), [uid ?? ""]);
    const [userProduct, setUserProduct] = useState<UserProduct>();
    const [userProductGUID, setUserProductGUID] = useState<string>("");
    const userProductData: IFetchResult<UserProduct | null> = useFetch<UserProduct | null>(() => services.UserProductService.GetByUserProductUid(userProductGUID), [userProductGUID]);
    const [selectedBarIndex, setSelectedBarIndex] = useState<number>(0);
    const [selectedBarValue, setSelectedBarValue] = useState<number>(0);

    useEffect(() => {
        setIsPriceRecommendationLoaded(false);
        if (priceRommendationsData.isLoading) {
            return;
        }
        if (priceRommendationsData.errors !== '' ||
            priceRommendationsData.data === null ||
            priceRommendationsData.data?.Error !== undefined ||
            priceRommendationsData.data?.Data === undefined) {
            return;
        }
        setPriceRecommendation(priceRommendationsData.data.Data);
        setUserProductGUID(priceRommendationsData.data.Data.userProductID)
        setIsPriceRecommendationLoaded(true);
        setSelectedBarValue(getDataForSecondBarchart(priceRommendationsData.data.Data!)[0].value);
    }, [priceRommendationsData]);

    useEffect(() => {
        if (userProductData.data === undefined || userProductData.data == null)
            return;

        if (userProductData.data.Data == null)
            return;
        if (userProductData.isLoading) {
            return;
        }
        if (userProductData.errors !== '' ||
            userProductData.data === null ||
            userProductData.data?.Error !== undefined ||
            userProductData.data?.Data === undefined) {
            return;
        }
        setUserProduct(userProductData.data.Data);
    }, [userProductData]);

    const calculatePercentage = (oldPrice: number, newPrice: number): number => {
        return Number((((oldPrice - newPrice) / oldPrice) * 100).toFixed(2));
    };

    const renderCustomizedLabel = (customPieLabelData: CustomPieLabelData) => {
        const radius = customPieLabelData.outerRadius + (customPieLabelData.outerRadius - customPieLabelData.innerRadius) * 0.17;
        const x = customPieLabelData.cx + radius * Math.cos(-customPieLabelData.midAngle * RADIAN);
        const y = customPieLabelData.cy + radius * Math.sin(-customPieLabelData.midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="black" textAnchor={x > customPieLabelData.cx ? 'start' : 'end'} dominantBaseline="central" fontFamily={FONT_FAMILY} fontSize={'12px'}>
                {`${(customPieLabelData.percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const handleBarClick = (data: any, index: number): void => {
        setSelectedBarIndex(index);
        setSelectedBarValue(getDataForSecondBarchart(priceRecommendation!)[index].value);
    };

    return (
        <>
            {isPriceRecommendationLoaded && userProduct !== undefined &&
                <div className={mainContainerClassname}>
                    <div className={headerContainerClassname}>
                        <div className={titleContainerClassname}>
                            <TitleCard title="Price recommendation for" />
                            <TitleCardMedium title={userProduct?.product.name!} />
                        </div>

                        <div className={priceContainerClassname}>
                            <div className={priceChangeContainer}>
                                <Text className={textClassname}>
                                    {priceRecommendation?.myCurrentPrice}$
                                </Text>
                                <div>
                                    <Icon iconName="TriangleSolidDown12" className={arrowIconClassname}></Icon>
                                </div>
                                <Text className={textImportantClassname}>
                                    {priceRecommendation?.predictedPrice}$
                                </Text>
                            </div>
                            <div className={priceChangeInfoContainer}>
                                {
                                    priceRecommendation?.predictedPrice! > priceRecommendation?.myCurrentPrice! ?
                                        <Icon iconName="Market" className={priceUpIconClassname}></Icon> :
                                        <Icon iconName="MarketDown" className={priceDownIconClassname}></Icon>

                                }
                                {
                                    priceRecommendation?.predictedPrice! > userProduct?.price! ?
                                        <Text className={textUpClassname}>
                                            +{-calculatePercentage(priceRecommendation?.myCurrentPrice!, priceRecommendation?.predictedPrice!)}
                                        </Text> :
                                        <Text className={textDownClassname}>
                                            {-calculatePercentage(priceRecommendation?.myCurrentPrice!, priceRecommendation?.predictedPrice!)}%
                                        </Text>

                                }
                            </div>
                        </div>
                    </div>
                    <div className={additionalInfoContainer}>
                        <div className={infoColumnOne}>
                            <div style={{ margin: 'auto', width: 'auto', textAlign: 'center' }}>
                                <TitleCardSmall title="Price evolution" />
                            </div>
                            <ResponsiveContainer width="100%" height="60%">
                                <BarChart
                                    barGap={-38}
                                    width={500}
                                    height={300}
                                    data={getDataForBarchart(priceRecommendation!)}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip contentStyle={{ fontFamily: FONT_FAMILY, fontSize: '12px' }} />
                                    <XAxis dataKey="name" fontSize={13} fontFamily={FONT_FAMILY} />
                                    <XAxis dataKey="name" fontSize={13} fontFamily={FONT_FAMILY} />
                                    <YAxis fontFamily={FONT_FAMILY} fontSize={15} />
                                    <Legend wrapperStyle={{ fontSize: "13px", fontFamily: FONT_FAMILY }} />
                                    <Bar dataKey="averageValue" fill="#82C3EC" barSize={48} opacity={0.6} name={"Avg. value per retailer"} />
                                    <Bar dataKey="myValue" fill="#4B56D2" barSize={28} opacity={0.6} name={"My value"} />
                                </BarChart>
                            </ResponsiveContainer>
                            <div style={{ margin: 'auto', width: 'fit-content', textAlign: 'center', marginTop: '4%' }}>
                                <TitleCardSmall title="Searches last month" />
                                <Text className={textClassname}>
                                    {priceRecommendation?.nbOfSearchesLastMonth}
                                </Text>
                            </div>
                        </div>
                        <div className={infoColumnOne}>
                            <div style={{ margin: 'auto', width: 'fit-content', textAlign: 'center' }}>
                                <TitleCardSmall title="Sells last month" />
                            </div>
                            <ResponsiveContainer width="100%" height="60%">
                                <PieChart width={200} height={200}>
                                    <Pie
                                        data={getRetailerForPieChart(priceRecommendation!)}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={renderCustomizedLabel}
                                    >
                                        {getRetailerForPieChart(priceRecommendation!).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ fontFamily: FONT_FAMILY, fontSize: '12px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div style={{ margin: 'auto', width: 'fit-content', textAlign: 'center', marginTop: '4%' }}>
                                <TitleCardSmall title="Total sells last month" />
                                <Text className={textClassname}>
                                    {priceRecommendation?.nbOfPurchasesLastMonth}
                                </Text>
                            </div>
                        </div>
                        <div className={infoColumnOne}>
                            <div style={{ margin: 'auto', width: 'auto', textAlign: 'center' }}>
                                <TitleCardSmall title="Stock evolution" />
                            </div>
                            <ResponsiveContainer width="100%" height="70%">
                                <BarChart
                                    barGap={-38}
                                    width={500}
                                    height={300}
                                    data={getDataForSecondBarchart(priceRecommendation!)}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip contentStyle={{ fontFamily: FONT_FAMILY, fontSize: '12px' }} />
                                    <XAxis dataKey="name" fontSize={13} fontFamily={FONT_FAMILY} />
                                    <XAxis dataKey="name" fontSize={13} fontFamily={FONT_FAMILY} />
                                    <YAxis fontFamily={FONT_FAMILY} fontSize={15} />
                                    <Legend wrapperStyle={{ fontSize: "13px", fontFamily: FONT_FAMILY }} />
                                    <Bar dataKey="value" fill="#82C3EC" barSize={38} name={"Stock"} onClick={handleBarClick}>
                                        {getDataForSecondBarchart(priceRecommendation!).map((entry, index) => (
                                            <Cell cursor="pointer" fill={index === selectedBarIndex ? '#4B56D2' : '#82C3EC'} key={`cell-${index}`} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                            <div style={{ margin: 'auto', width: 'fit-content', textAlign: 'center', marginTop: '4%' }}>
                                <Text className={textSmallClassname}>
                                    Stock of {getDataForSecondBarchart(priceRecommendation!)[selectedBarIndex].name}: {selectedBarValue}
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
};