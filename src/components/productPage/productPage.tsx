import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCartButtonStyles, characteristicsContainerClassname, detailsListStyles, imageClassName, textClassName, labelStyles, mainContainerClassname, productCharacteristicsContainerClassname, productChartsContainerClassname, productDetailsContainerClassname, productInfoContainerClassname, productTitleContainerClassname, titleStyles, orderButtonStyles, infoContainer, infoLabelStyles, secondaryContainer } from "./productPage.styles";
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext";
import { Product } from "../../models/Product";
import { Memberships } from "../../enums/memberships";
import { getFormattedJSON } from "../../helpers/stringFormatHelper";
import { ConstrainMode, DefaultButton, DetailsList, DetailsListLayoutMode, IColumn, IIconProps, IconButton, Label } from "@fluentui/react";
import { FONT_FAMILY } from "../../library/constants";
import { UserProduct } from "../../models/UserProduct";
import { UserDisplayInfo } from "../../models/User";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const userMembership: Memberships = Memberships.UserSecondTier;
const searchIconProps: IIconProps = { iconName: "ShoppingCart" };

const columns: IColumn[] = [
    {
        key: 'owner',
        name: 'Owner',
        fieldName: 'Owner',
        minWidth: 130,
        maxWidth: 130,
        isResizable: false
    },
    {
        key: 'price',
        name: 'Price',
        fieldName: 'Price',
        minWidth: 80,
        maxWidth: 80,
        isResizable: false
    },
    {
        key: 'quantity',
        name: 'Qnt.',
        fieldName: 'Q',
        minWidth: 30,
        maxWidth: 30,
        isResizable: false
    },
    {
        key: 'addToCart',
        name: '',
        fieldName: '',
        minWidth: 50,
        maxWidth: 50,
        isResizable: false
    }
];

export const ProductPage = (): JSX.Element => {
    const { uid } = useParams();
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [product, setProduct] = useState<Product>();
    const [offers, setOffers] = useState<UserProduct[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [displayOrderButton, setDisplayOrderButton] = useState<boolean>(true);
    const [barChartData, setBarChartData] = useState<any[]>([]);

    useEffect(() => {
        services.ProductsService.GetByUid(uid!).then(r => { setProduct(r.Data) })
    }, [])

    useEffect(() => {
        if (!product?.productGUID)
            return;
        services.UserProductService.GetUserProductsByProduct(product?.productGUID).then(products => { setOffers(products); setLoading(false) });
    }, [product]);

    useEffect(() => {
        if (!offers)
            return;

        if (offers!.length > 0)
            setDisplayOrderButton(false);
    }, [offers])

    useEffect(() => {
        if (loading)
            return;
        let chartData: any[] = [];
        offers?.forEach((e) => chartData.push({ name: `${e.user.firstName}` + "\n" + `${e.user.lastName}`, Price: e.price }));
        setBarChartData(chartData);
    }, [loading])

    const onRenderItemColumn = (item: UserProduct, _index?: number, column?: IColumn): React.ReactNode => {
        switch (column!.key) {
            case 'owner':
                return item.user.firstName + ' ' + item.user.lastName;
            case 'price':
                return item.price
            case 'quantity':
                return item.quantity
            case 'addToCart':
                return <IconButton onClick={() => { console.log("Item added to cart!") }} aria-label="Add to cart" iconProps={searchIconProps} styles={addToCartButtonStyles} />
            default:
                return "";
        };
    };

    return (
        <div className={mainContainerClassname}>
            {loading && <Label>Loading..</Label>}
            {!loading &&
                <>
                    <div className={productDetailsContainerClassname}>
                        <div className={productTitleContainerClassname}>
                            <Label styles={titleStyles}>{product!.name}</Label>
                        </div>
                        <div className={productInfoContainerClassname}>
                            <div className={productCharacteristicsContainerClassname}>
                                <img className={imageClassName} src={product!.imageLink} />
                                <DetailsList styles={detailsListStyles}
                                    items={offers ?? []}
                                    columns={columns}
                                    compact={false}
                                    isHeaderVisible={true}
                                    constrainMode={ConstrainMode.unconstrained}
                                    onRenderItemColumn={onRenderItemColumn}
                                    layoutMode={DetailsListLayoutMode.fixedColumns}
                                    className={textClassName}
                                    selectionPreservedOnEmptyClick
                                    selectionMode={0}
                                />
                            </div>
                            <div className={characteristicsContainerClassname}>
                                <Label styles={labelStyles}><pre className={textClassName}>{JSON.stringify(getFormattedJSON(product!.characteristics), null, 4)}</pre></Label>
                            </div>
                        </div>
                    </div>
                    <div className={secondaryContainer}>
                        <div className={infoContainer}>
                            {displayOrderButton &&
                                <>
                                    <Label styles={infoLabelStyles}>No available offers?</Label>
                                    <DefaultButton text="Place order" styles={orderButtonStyles} />
                                </>
                            }
                        </div>
                        {Memberships[userMembership] === Memberships[Memberships.UserSecondTier] && offers!.length > 0 &&
                            <div className={productChartsContainerClassname}>
                                <ResponsiveContainer width="100%" height="50%">
                                    <BarChart
                                        width={100}
                                        height={200}
                                        data={barChartData}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" fontSize={10} fontFamily={FONT_FAMILY}/>
                                        <YAxis fontFamily={FONT_FAMILY} fontSize={15}/>
                                        <Tooltip contentStyle={{ fontFamily: FONT_FAMILY }}/>
                                        <Legend fontFamily={FONT_FAMILY}/>
                                        <Bar dataKey="Price" stackId="a" fill="#4B56D2" barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        }
                    </div>
                </>
            }


        </div>
    )
};