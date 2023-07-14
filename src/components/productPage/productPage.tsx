import { useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { addToCartButtonStyles, characteristicsContainerClassname, detailsListStyles, imageClassName, textClassName, labelStyles, mainContainerClassname, productCharacteristicsContainerClassname, productChartsContainerClassname, productDetailsContainerClassname, productInfoContainerClassname, productTitleContainerClassname, titleStyles, orderButtonStyles, infoContainer, infoLabelStyles, secondaryContainer, calloutTitleClassname, calloutContainerClassname, quantitySpinButtonClassname, calloutBodyContainerClassname, quantitySpinButtonStyles, addToCartCalloutButtonStyles, chartsButtonStyles, spinnerClassname, createOffer, addOfferButtonStyle, quantityDivClassname, priceLabel, priceStyles } from "./productPage.styles";
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext";
import { Product } from "../../models/Product";
import { Memberships } from "../../enums/memberships";
import { getFormattedJSON } from "../../helpers/stringFormatHelper";
import { Callout, ConstrainMode, DefaultButton, DetailsList, DetailsListLayoutMode, DirectionalHint, IColumn, IIconProps, IconButton, Label, SpinButton, Spinner, SpinnerSize, TextField } from "@fluentui/react";
import { FONT_FAMILY, GUID_EMPTY } from "../../library/constants";
import { UserProduct, UserProductCreate } from "../../models/UserProduct";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AuthentificationContextModel } from "../../authentication/authenticationContext.types";
import AuthentificationContext from "../../authentication/authenticationContext";
import { IFetchResult } from "../../hooks/useFetch.types";
import { useFetch } from "../../hooks/useFetch";
import { ShoppingCart } from "../../models/ShoppingCart";
import { ShoppingCartProductAdd } from "../../models/ShoppingCartProduct";
import { ConfirmationMessageBar } from "../confirmationMessageBar/confirmationMessageBar";
import { Roles } from "../../enums/roles";
import { TitleCardSmall } from "../titleCard/titleCardSmall";
import { TitleCardCenter } from "../titleCard/titleCardCenter";
import { off } from "process";

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

const retailerColumns: IColumn[] = [
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
    const [quantityChartData, setQuantityBarChartData] = useState<any[]>([]);
    const authenticationContext: AuthentificationContextModel = useContext(AuthentificationContext);
    const [shoppingCart, setShoppingcart] = useState<ShoppingCart>();
    const [displayCallout, setDisplayCallout] = useState<boolean>(false);
    const [displayCreateOfferCallout, setDisplayCreateOfferCallout] = useState<boolean>(false);
    const [pressedCartButton, setPressedCartButton] = useState<string>('');
    const shoppingCartData: IFetchResult<ShoppingCart> = useFetch<ShoppingCart>(() => services.ShoppingCartService.GetShoppingCartByUser(authenticationContext.User.userGUID!), [authenticationContext.User.userGUID!]);
    const [displayMessageBar, setDisplayMessageBar] = useState<boolean>(false);
    const [newOfferPrice, setNewOfferPrice] = useState<Number>(product ? product.basePrice : 0);
    const [messageBarText, setMessageBarText] = useState<string>('');
    const navigate: NavigateFunction = useNavigate();

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
        setNewOfferPrice(product.basePrice);
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
        let priceChartData: any[] = [];
        offers?.forEach((e) => {
            if (e.quantity !== 0) {
                priceChartData.push({ name: `${e.user.firstName}` + "\n" + `${e.user.lastName}`, Price: e.price });
            }
        });

        let quantityChartData: any[] = [];
        offers?.forEach((e) => {
            if (e.quantity !== 0) {
                quantityChartData.push({ name: `${e.user.firstName}` + "\n" + `${e.user.lastName}`, Quantity: e.quantity });
            }
        });
        setBarChartData(priceChartData);
        setQuantityBarChartData(quantityChartData);
        console.log(quantityChartData);
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
            setMessageBarText('Product successfully added to cart.')
            setDisplayMessageBar(true);
        }, 500);
    };

    const addNewOffer = (newOffer: any): void => {
        let newOffers = offers ? offers.map(a => ({ ...a })) : [];
        newOffers.push({
            userProductGUID: newOffer.userProductGUID,
            userGUID: newOffer.userGUID,
            category: newOffer.product.category,
            name: newOffer.product.name,
            user: authenticationContext.User,
            imageLink: newOffer.product.imageLink,
            product: newOffer.product,
            price: newOffer.price,
            quantity: newOffer.quantity
        })

        setOffers(newOffers);
    }

    const onSaveOfferClicked = () => {
        setDisplayCreateOfferCallout(false);
        let newUserProduct: UserProductCreate = {
            userGUID: authenticationContext.User.userGUID,
            productGUID: product?.productGUID ?? GUID_EMPTY,
            price: newOfferPrice as number,
            quantity: selectedQuantity
        }
        services.UserProductService.AddNewUserProduct(newUserProduct).then(result => { console.log(result); addNewOffer(result.Data); });

        setTimeout(() => {
            setMessageBarText('Product successfully added to cart.')
            setDisplayMessageBar(true);
        }, 500);
        console.log('save');
    };

    const onMessageClosed = (): void => {
        setDisplayMessageBar(false);
    }

    const onQuantitySelectedChanged = (event: React.SyntheticEvent<HTMLElement, Event>, newValue?: string | undefined) => {
        setSelectedQuantity(newValue ? Number(newValue) : 1);
    };

    const onChartsClicked = (): void => {
        var ownUserProduct: UserProduct | undefined = offers?.find(o => o.userGUID === authenticationContext.User.userGUID);
        console.log(offers);
        console.log(authenticationContext.User.userGUID);
        navigate(`/charts/${product?.productGUID}/${ownUserProduct ? ownUserProduct.userProductGUID : '00000000-0000-0000-0000-000000000000'}`)
    };

    const onCreateOfferClicked = (): void => {
        setDisplayCreateOfferCallout(true);
    };

    const hasUserOfferAlready = (): boolean => {
        return offers?.find(off => off.userGUID === authenticationContext.User.userGUID) == null;
    };

    const getCharacteristics = (characteristics: any): string => {
        return JSON.stringify(characteristics, null, 4).replaceAll('{', "").replaceAll('}', "").replaceAll('"', '').replaceAll('\\', '').replaceAll(',', '');
    };

    const onPriceChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
        setNewOfferPrice(Number(newValue));
    }

    return (
        <div className={mainContainerClassname}>
            {loading &&
                <div style={{ width: '60%', height: '50%', margin: 'auto', position: 'relative', top: '10%' }}>
                    <Spinner label="Loading data..." ariaLive="assertive" labelPosition="top" className={spinnerClassname} size={SpinnerSize.large} />
                </div>
            }

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
                                    columns={authenticationContext.User.role === Roles.Purchaser ? columns : retailerColumns}
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
                                <Label styles={labelStyles}><pre className={textClassName}>{getCharacteristics(getFormattedJSON(product!.characteristics))}</pre></Label>
                            </div>
                        </div>
                    </div>
                    <div className={secondaryContainer}>
                        {/* <div className={infoContainer}>
                            {displayOrderButton &&
                                <>
                                    <Label styles={infoLabelStyles}>No available offers?</Label>
                                    <DefaultButton text="Place order" styles={orderButtonStyles} />
                                </>
                            }
                        </div> */}
                        {offers!.length > 0 &&
                            <div className={productChartsContainerClassname}>
                                {authenticationContext.User.membership === Memberships.UserFirstTier || authenticationContext.User.membership === Memberships.UserSecondTier && <ResponsiveContainer width="100%" height="45%">
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
                                        <Legend wrapperStyle={{ fontSize: "16px", fontFamily: FONT_FAMILY }} />
                                        <Bar dataKey="Price" stackId="a" fill="#4B56D2" barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                                }
                                {authenticationContext.User.membership === Memberships.UserSecondTier && <ResponsiveContainer width="100%" height="45%">
                                    <BarChart
                                        width={100}
                                        height={200}
                                        data={quantityChartData}
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
                                        <Legend wrapperStyle={{ fontSize: "16px", fontFamily: FONT_FAMILY }} />
                                        <Bar dataKey="Quantity" stackId="a" fill="#4B56D2" barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                                }
                                {authenticationContext.User.role === Roles.Retailer && offers && offers.length > 0 && <DefaultButton text="See more info" styles={chartsButtonStyles} onClick={onChartsClicked} />}
                            </div>
                        }
                        {authenticationContext.User.role === Roles.Retailer && hasUserOfferAlready() &&
                            <div className={createOffer}>
                                <TitleCardCenter title="You want to add your own offer?" />
                                <DefaultButton text="Create new offer" id="create-offer-button" styles={addOfferButtonStyle} onClick={onCreateOfferClicked} />
                            </div>
                        }
                        {displayCreateOfferCallout &&
                            <Callout
                                role="dialog"
                                target={`#create-offer-button`}
                                isBeakVisible={true}
                                onDismiss={() => { setDisplayCallout(false) }}
                                directionalHint={DirectionalHint.bottomCenter}
                                setInitialFocus
                                gapSpace={10}
                            >
                                <div className={calloutContainerClassname}>
                                    <TitleCardSmall title='Create personal offer for the product' />
                                    <SpinButton
                                        label="Select the quantity"
                                        defaultValue="1"
                                        min={1}
                                        max={500}
                                        step={1}
                                        className={quantitySpinButtonClassname}
                                        styles={quantitySpinButtonStyles}
                                        onChange={onQuantitySelectedChanged}
                                    />
                                    <div className={quantityDivClassname}>
                                        <Label className={priceLabel}>Price per item</Label>
                                        <TextField defaultValue={`${product?.basePrice}`} value={newOfferPrice.toString()} borderless styles={priceStyles} onChange={onPriceChange} />
                                        <Label className={priceLabel}>$</Label>
                                    </div>
                                    <DefaultButton text="Save offer" styles={addToCartCalloutButtonStyles} onClick={onSaveOfferClicked} />
                                </div>

                            </Callout>
                        }
                        {displayCallout &&
                            <Callout
                                role="dialog"
                                target={`#cartButton-${pressedCartButton}`}
                                isBeakVisible={true}
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
            <ConfirmationMessageBar message="Product successfully added to cart." display={displayMessageBar} onMessageClosed={onMessageClosed} />
        </div>
    )
};