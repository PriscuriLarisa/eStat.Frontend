import { DefaultButton, IIconProps, Label, Separator, TextField } from "office-ui-fabric-react";
import { TitleCard } from "../titleCard/titleCard";
import { buttonStyles, cellContainer, fieldsContainer, iconClassname, imageClassName, labelClassname, labelRightClassname, labelThinClassname, mainContainer, profileInfoContainer, purchasesContainer, textFieldLargeStyles, textFieldReadonlyStyles, textFieldStyles } from "./manageProfile.styles";
import { Icon } from "@fluentui/react";
import { useContext, useEffect, useState } from "react";
import { AuthentificationContextModel } from "../../authentication/authenticationContext.types";
import AuthentificationContext from "../../authentication/authenticationContext";
import { Memberships } from "../../enums/memberships";
import { getMembershipName } from "../../helpers/membershipHelper";
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext";
import { IFetchResult } from "../../hooks/useFetch.types";
import { Purchase } from "../../models/Purchase";
import { useFetch } from "../../hooks/useFetch";
import { ExpandableCard } from "../expandableCard/expandableCard";
import { Product } from "../../models/Product";
import { PurchaseProduct } from "../../models/PurchaseProduct";
import { TitleCardSmall } from "../titleCard/titleCardSmall";
import { TitleCardMedium } from "../titleCard/titleCardMedium";
import { FONT_FAMILY } from "../../library/constants";
import { UserInfo } from "../../models/User";
import { ConfirmationMessageBar } from "../confirmationMessageBar/confirmationMessageBar";

export const ManageProfile = (): JSX.Element => {
    const authenticationContext: AuthentificationContextModel = useContext(AuthentificationContext);
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [firstName, setFirstName] = useState<string>(authenticationContext.User.firstName);
    const [lastName, setLastName] = useState<string>(authenticationContext.User.lastName);
    const [email, setEmail] = useState<string>(authenticationContext.User.email);
    const [displaySaveChanges, setDisplaySaveChanges] = useState<boolean>(false);
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);
    const purchasesData: IFetchResult<Purchase[]> = useFetch<Purchase[]>(() => services.PurchaseService.GetPurchases(authenticationContext.User.userGUID!), [authenticationContext.User.userGUID!]);
    const [purchaseNumbers, setPurchaseNumbers] = useState<any>({});

    useEffect(() => {
        if (purchasesData.isLoading) {
            return;
        }
        if (purchasesData.errors !== '' ||
            purchasesData.data === null ||
            purchasesData.data?.Error !== undefined ||
            purchasesData.data?.Data === undefined) {
            return;
        }
        var sortedArray = purchasesData.data.Data.sort(function(a, b) {
            var c = Date.parse(a.date.toString());
            var d = Date.parse(b.date.toString());
            return c-d;
        });
        var purchaseNumber = sortedArray.length + 1;
        var purchaseNumbersObject: any = {};
        sortedArray.forEach(p => { purchaseNumber -= 1; console.log(p); purchaseNumbersObject[p.purchaseGUID!] = purchaseNumber});
        setPurchases(sortedArray);
        setPurchaseNumbers(purchaseNumbersObject);
    }, [purchasesData]);

    const onFirstNameChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
        setFirstName(newValue!);
        setDisplaySaveChanges(true);
    };

    const onLasttNameChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
        setLastName(newValue!);
        setDisplaySaveChanges(true);
    };

    const onEmailChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
        setEmail(newValue!);
        setDisplaySaveChanges(true);
    };

    const onSaveChangesClicked = () => {
        const newUser: UserInfo = Object.assign({}, authenticationContext.User);
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        services.UserService.UpdateUserInfo(newUser);
        setTimeout(() => {
            authenticationContext.SetUpdatedUser(newUser);
            setDisplayMessage(true);
        }, 1000);
    };

    const getProductInfo = (product: any): JSX.Element => {
        return <>
            <div style={{ display: "flex" }}>
                <div style={{ height: "100%", width: '20%' }}>
                    <img
                        className={imageClassName}
                        src={product.product.product.imageLink}
                    />
                </div>
                <div style={{ height: "100%", width: '80%' }}>
                    <TitleCardSmall title={product.product.product.name ?? ""} />
                    <Label className={labelClassname}>{`Quantity: ${product.product.quantity ?? ""}`}</Label>
                    <Label className={labelThinClassname}>{`Retailer: ${product.product.user.firstName ?? ""} ${product.product.user.lastName ?? ""}`}</Label>
                    <Label className={labelRightClassname}>{`${product.product.price ?? ""}$`}</Label>
                    <Separator />
                </div>
            </div>
        </>
    }

    const computeTotalPrice = (p: Purchase): number => {
        const values = p?.products.map(p => (Number(p.price) * Number(p.quantity)));
        let result = values!.reduce((a, b) => {
            return a + b;
        });

        return Number(result.toFixed(2));
    }

    const purchasesList: JSX.Element[] = purchases.map(p => {
        const productInfo: JSX.Element[] = p.products.map((pro: PurchaseProduct) => getProductInfo(pro));
        const content: JSX.Element = <>
            {productInfo}
            <div style={{ color: '#4B56D2', fontFamily: FONT_FAMILY, fontSize: '20px', position: 'relative', textAlign: 'center'}}>
                <h3 style={{marginTop: '2%', position: 'relative'}}>{`Total price: ${computeTotalPrice(p).toString()}$`}</h3>
            </div>
        </>
        return <>
            <ExpandableCard title={`Purchase #${purchaseNumbers[p.purchaseGUID!]}: ${new Date(p.date).toDateString()} ${new Date(p.date).getHours()}:${new Date(p.date).getMinutes()}`} content={content} />
        </>

    });

    const onMessageClosed = (): void => {
        setDisplayMessage(false);
    };

    return (
        <>
            <TitleCard title="My Profile" />
            <div className={mainContainer}>

                <div className={profileInfoContainer}>
                    <Icon iconName="Contact" className={iconClassname} />
                    <div className={fieldsContainer}>
                        <div className={cellContainer}>
                            <Label className={labelClassname}>First name</Label>
                            <TextField value={firstName} styles={textFieldStyles} onChange={onFirstNameChanged} />
                        </div>
                        <div className={cellContainer}>
                            <Label className={labelClassname}>Last name</Label>
                            <TextField value={lastName} styles={textFieldStyles} onChange={onLasttNameChanged} />
                        </div>
                        <div className={cellContainer}>
                            <Label className={labelClassname}>Email</Label>
                            <TextField value={email} styles={textFieldLargeStyles} onChange={onEmailChanged} />
                        </div>
                        <div></div>
                        <div className={cellContainer}>
                            <Label className={labelClassname}>Birthday</Label>
                            <TextField value={new Date(authenticationContext.User.birthday).toLocaleDateString().trim()} styles={textFieldReadonlyStyles} readOnly />
                        </div>
                        <div className={cellContainer}>
                            <Label className={labelClassname}>Membership</Label>
                            <TextField value={getMembershipName(authenticationContext.User.membership)} styles={textFieldReadonlyStyles} readOnly />
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '10%', position: 'relative', alignContent: 'center' }}>
                        {displaySaveChanges && <DefaultButton styles={buttonStyles} onClick={onSaveChangesClicked}>Save changes</DefaultButton>}
                    </div>
                </div>

                <div className={purchasesContainer}>
                    <TitleCardMedium title="Purchases"/>
                    <Separator/>
                    <>{purchasesList}</>
                </div>
            </div>
            <ConfirmationMessageBar message={"Profile information has been updated successfully."} display={displayMessage} onMessageClosed={onMessageClosed}/>
        </>
    );
};