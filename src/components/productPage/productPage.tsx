import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCartButtonStyles, characteristicsContainerClassname, detailsListStyles, imageClassName, textClassName, labelStyles, mainContainerClassname, productCharacteristicsContainerClassname, productChartsContainerClassname, productDetailsContainerClassname, productInfoContainerClassname, productTitleContainerClassname, titleStyles, orderButtonStyles, infoContainer, infoLabelStyles, secondaryContainer, calloutTitleClassname, calloutContainerClassname, quantitySpinButtonClassname, calloutBodyContainerClassname, quantitySpinButtonStyles, addToCartCalloutButtonStyles } from "./productPage.styles";
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext";
import { Product } from "../../models/Product";
import { Memberships } from "../../enums/memberships";
import { getFormattedJSON } from "../../helpers/stringFormatHelper";
import { Callout, ConstrainMode, DefaultButton, DetailsList, DetailsListLayoutMode, DirectionalHint, IColumn, IIconProps, IconButton, Label, SpinButton } from "@fluentui/react";
import { FONT_FAMILY } from "../../library/constants";
import { UserProduct } from "../../models/UserProduct";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AuthentificationContextModel } from "../../authentication/authenticationContext.types";
import AuthentificationContext from "../../authentication/authenticationContext";
import { IFetchResult } from "../../hooks/useFetch.types";
import { useFetch } from "../../hooks/useFetch";
import { ShoppingCart } from "../../models/ShoppingCart";
import { ShoppingCartProductAdd } from "../../models/ShoppingCartProduct";
import { ConfirmationMessageBar } from "../confirmationMessageBar/confirmationMessageBar";

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
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [offers, setOffers] = useState<UserProduct[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [displayOrderButton, setDisplayOrderButton] = useState<boolean>(true);
    const [barChartData, setBarChartData] = useState<any[]>([]);
    const authenticationContext: AuthentificationContextModel = useContext(AuthentificationContext);
    const [shoppingCart, setShoppingcart] = useState<ShoppingCart>();
    const [displayCallout, setDisplayCallout] = useState<boolean>(false);
    const [pressedCartButton, setPressedCartButton] = useState<string>('');
    const shoppingCartData: IFetchResult<ShoppingCart> = useFetch<ShoppingCart>(() => services.ShoppingCartService.GetShoppingCartByUser(authenticationContext.User.userGUID!), [authenticationContext.User.userGUID!]);
    const [displayMessageBar, setDisplayMessageBar] = useState<boolean>(false);

    useEffect(() => {
        services.ProductsService.GetByUid(uid!).then(r => { setProduct(r.Data) })
    }, []);

    useEffect(() => {
        if (shoppingCartData.isLoading) {
            return;
        }
        if (shoppingCartData.errors !== '' ||
            shoppingCartData.data === null ||
            shoppingCartData.data?.Error !== undefined ||
            shoppingCartData.data?.Data === undefined) {
            return;
        }
        setShoppingcart(shoppingCartData.data.Data);
    }, [shoppingCartData]);

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
    }, [loading]);

    const onAddToCartClicked = (itemId: string) => {
        setSelectedQuantity(1);
        setPressedCartButton(itemId);
        setDisplayCallout(true);
    };

    const onRenderItemColumn = (item: UserProduct, _index?: number, column?: IColumn): React.ReactNode => {
        switch (column!.key) {
            case 'owner':
                return item.user.firstName + ' ' + item.user.lastName;
            case 'price':
                return item.price
            case 'quantity':
                return item.quantity
            case 'addToCart':
                return <IconButton id={`cartButton-${item.userProductGUID}`} onClick={() => { onAddToCartClicked(item.userProductGUID!); }} aria-label="Add to cart" iconProps={searchIconProps} styles={addToCartButtonStyles} />
            default:
                return "";
        };
    };

    const onAddItemToCartButtonClicked = () => {
        const selectedOffer: UserProduct = offers?.find(o => o.userProductGUID === pressedCartButton)!;
        if (!selectedOffer)
            return;
        const cartItemToBeAdded: ShoppingCartProductAdd = {
            shoppingCartGUID: shoppingCart?.shoppingCartGUID!,
            userProductGUID: selectedOffer.userProductGUID!,
            quantity: selectedQuantity
        };
        services.ShoppingCartService.AddUserProductToCart(cartItemToBeAdded);
        setTimeout(() => {
            setDisplayMessageBar(true);
        }, 500);
    };

    const onMessageClosed = (): void => {
        setDisplayMessageBar(false);
    }

    const onQuantitySelectedChanged = (event: React.SyntheticEvent<HTMLElement, Event>, newValue?: string | undefined) => {
        setSelectedQuantity(newValue ? Number(newValue) : 1);
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
                                        <XAxis dataKey="name" fontSize={10} fontFamily={FONT_FAMILY} />
                                        <YAxis fontFamily={FONT_FAMILY} fontSize={15} />
                                        <Tooltip contentStyle={{ fontFamily: FONT_FAMILY }} />
                                        <Legend fontFamily={FONT_FAMILY} />
                                        <Bar dataKey="Price" stackId="a" fill="#4B56D2" barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        }

                        {displayCallout &&
                            <Callout
                                role="dialog"
                                target={`#cartButton-${pressedCartButton}`}
                                isBeakVisible={true}
                                //beakWidth={beakWidth}
                                onDismiss={() => { setDisplayCallout(false) }}
                                directionalHint={DirectionalHint.rightCenter}
                                setInitialFocus
                                gapSpace={35}
                            >
                                <div className={calloutContainerClassname}>
                                    <Label className={calloutTitleClassname}>
                                        {offers?.find(o => o.userProductGUID === pressedCartButton)!.product!.name}
                                    </Label>
                                    <div className={calloutBodyContainerClassname}>
                                        <SpinButton
                                            label="Select the quantity"
                                            defaultValue="1"
                                            min={1}
                                            max={offers?.find(o => o.userProductGUID === pressedCartButton)!.quantity}
                                            step={1}
                                            className={quantitySpinButtonClassname}
                                            styles={quantitySpinButtonStyles}
                                            onChange={onQuantitySelectedChanged}
                                        />

                                        <DefaultButton text="Add to cart" styles={addToCartCalloutButtonStyles} onClick={onAddItemToCartButtonClicked} />

                                    </div>
                                </div>
                            </Callout>
                        }
                    </div>
                </>
            }
            <ConfirmationMessageBar message="Product successfully added to cart." display={displayMessageBar} onMessageClosed={onMessageClosed}/>
        </div>
    )
};