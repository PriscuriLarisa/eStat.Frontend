export interface PricePrediction {
    pricePredictionGUID: string,
    userProductID: string,
    nbOfSearchesLastMonth: number,
    nbOfPurchasesLastMonth: number,
    currentAveragePrice: number,
    averagePriceLastMonth: number,
    currentAverageStockPerRetailer: number,
    averageStockPerRetailerLastMonth: number,
    myStock: number,
    myCurrentPrice: number,
    myAveragePriceLastMonth: number,
    mySellsLastMonth:number,
    predictedPrice: number
}