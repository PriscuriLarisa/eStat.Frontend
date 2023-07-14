import { Months } from "../enums/months";
import { COLORS } from "../library/constants";

export const getAveragePricesForAreaChart = (averagePricesLastMonths: any): any[] => {
    var prices: any[] = [];
    var months = getOrderedMonthsFromObject(averagePricesLastMonths);

    months.forEach(key => {
        var newEntry = {
            name: Months[Number(key)],
            avgPrice: averagePricesLastMonths[key]
        };
        prices.push(newEntry);
    });
    return prices;
};

const getOrderedMonthsFromObject = (obj: any): number[] => {
    var months: number[] = [];
    for (const [key] of Object.entries(obj)) {
        months.push(Number(key));
    }

    var orderedMonths: number[] = [];
    var lastMonth = 1;
    var index = months.indexOf(1) + 1;
    orderedMonths.push(lastMonth);
    while (index < months.length && months[index] == lastMonth + 1) {
        orderedMonths.push(months[index]);
        lastMonth = months[index];
        index++;
    }

    var restOfMonths: number[] = months.filter(m => !orderedMonths.includes(m)).sort((a, b) => a - b);
    restOfMonths.forEach(el => {
        orderedMonths.unshift(Number(el));
    });

    return orderedMonths;
}

export const getAveragePricesVsMyPriceForAreaChart = (averagePricesLastMonths: any, myPricesLastMonths: any): any[] => {
    var prices: any[] = [];
    var months = getOrderedMonthsFromObject(averagePricesLastMonths);

    months.forEach(key => {
        var newEntry = {
            name: Months[Number(key)],
            myPrice: myPricesLastMonths[key],
            avgPrice: averagePricesLastMonths[key]
        };
        prices.push(newEntry);
    });
    return prices;
};

export const getLowVsHighPricesForAreaChart = (highPrices: any, lowPrices: any): any[] => {

    var months = getOrderedMonthsFromObject(highPrices);
    var prices: any[] = [];

    months.forEach(key => {
        var newEntry = {
            name: Months[Number(key)],
            high: highPrices[key],
            low: lowPrices[key]
        };
        prices.push(newEntry);
    });

    return prices;
};

export const getLineChartData = (sells: any, mySells: any): any[] => {

    var months = getOrderedMonthsFromObject(sells);
    var prices: any[] = [];
    if(!mySells) {
        months.forEach(key => {
            var newEntry = {
                name: Months[Number(key)],
                totalSells: sells[key],
            };
            prices.push(newEntry);
        });
    }
    else {
        months.forEach(key => {
            var newEntry = {
                name: Months[Number(key)],
                totalSells: sells[key],
                mySells: mySells[key]
            };
            prices.push(newEntry);
        });
    }

    return prices;
};

export const getDataForBarchart = (averagePrices: any, myAveragePrices?: any): any[] => {
    console.log(myAveragePrices);
    return myAveragePrices ?
        [
            {
                name: 'My current price',
                value: myAveragePrices,
            },
            {
                name: 'Current average price',
                value: averagePrices,
            }

        ] :
        [
            {
                name: 'Current average price',
                value: averagePrices,
            }

        ]
};

export const getDataForRadialChart = (highPriceSells: number, lowPriceSells: number, averagePriceSells: number): any[] => {

    return [
        {
            name: 'Sells for low price',
            value: averagePriceSells,
            fill: COLORS[2]
        },
        {
            name: 'Sells for average price',
            value: lowPriceSells,
            fill: COLORS[1]
        },
        {
            name: 'Sells for high price',
            value: highPriceSells,
            fill: COLORS[0]
        },

    ]
};