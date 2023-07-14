import { PricePrediction } from "../models/PricePrediction";

export const getDataForBarchart = (priceRecommendation: PricePrediction): any[] => {
    return [
        {
            name: 'Current',
            myValue: priceRecommendation.myCurrentPrice,
            averageValue: priceRecommendation.currentAveragePrice,
        },
        {
            name: 'Avg. last month',
            myValue: priceRecommendation.myAveragePriceLastMonth, 
            averageValue: priceRecommendation.averagePriceLastMonth,
        },
    ];
};

export const getDataForSecondBarchart = (priceRecommendation: PricePrediction): any[] => {
    return [
        {
            name: 'My own',
            value: priceRecommendation.myStock
        },
        {
            name: 'Last month avg.',
            value: priceRecommendation.averageStockPerRetailerLastMonth
        },
        {
            name: 'Current avg.',
            value: priceRecommendation.currentAverageStockPerRetailer
        },
    ];
}

export const getRetailerForPieChart = (priceRecommendation: PricePrediction): any[] => {

    return [
        {
            name: 'My sells last month',
            value: priceRecommendation.mySellsLastMonth,
        },
        {
            name: 'Other sells',
            value: priceRecommendation.nbOfPurchasesLastMonth - priceRecommendation.mySellsLastMonth,
        }
    ];
}