import { DefaultButton } from "@fluentui/react"
import { buttonStyles, contentContainerClassname, mainContainerClassname, priceClassname, priceLabelClassname, secondaryButtonStyles, textClassname, titleClassname } from "./membershipCard.styles"
import { IMembershipCardProps } from "./membershipCard.types"
import { useContext, useEffect, useState } from "react"
import $ from 'jquery';
import { AuthentificationContextModel } from "../../../authentication/authenticationContext.types";
import AuthentificationContext from "../../../authentication/authenticationContext";
import { UserInfo } from "../../../models/User";
import { ServiceContext, ServiceContextInstance } from "../../../core/serviceContext";
import { ConfirmationMessageBar } from "../../confirmationMessageBar/confirmationMessageBar";
import { Memberships } from "../../../enums/memberships";

export const MembershipCard = (props: IMembershipCardProps): JSX.Element => {

    const info: JSX.Element[] = props.membershipInfo.description.split('/').slice(1).map(d => { return <p className={textClassname}>{d}</p> });
    const authenticationContext: AuthentificationContextModel = useContext(AuthentificationContext);
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const [registeredEvent, setRegisteredEvent] = useState<boolean>(false);
    useEffect(() => {
        if (registeredEvent)
            return;
        $('*[id*=membershipCard_]').on({
            mouseenter: function () {
                $(this).css({ 'backgroundImage': 'linear-gradient(180deg, rgba(75,86,210,0.31985294117647056) 0%, rgba(71,33,131,0.35066526610644255) 46%, rgba(128,134,195,0) 88%)' })
            },
            mouseleave: function () {
                $(this).css({ 'backgroundImage': 'none' })
            },
        });
        setRegisteredEvent(true);
        console.log(authenticationContext.User)
        console.log(props.membershipInfo.membership)
        console.log(props.membershipInfo.title)
    }, []);

    const onSelectMembershipClicked = () => {
        const newUser: UserInfo = Object.assign({}, authenticationContext.User);
        newUser.membership = props.membershipInfo.membership;
        services.UserService.UpdateUserInfo(newUser);
        setTimeout(() => {
            authenticationContext.SetUpdatedUser(newUser);
            setMessage("Your membership was successfully changed");
            setDisplayMessage(true);
        }, 1000);
    };

    const onCancelMembershipClicked = () => {
        const newUser: UserInfo = Object.assign({}, authenticationContext.User);
        newUser.membership = Memberships.NoMembership;
        services.UserService.UpdateUserInfo(newUser);
        setTimeout(() => {
            authenticationContext.SetUpdatedUser(newUser);
            setMessage("Your membership has been successfully canceled.");
            setDisplayMessage(true);
        }, 1000);
    }

    const onMessageClosed = (): void => {
        setDisplayMessage(false);
    };

    return (
        <>
            <div className={mainContainerClassname} id={`membershipCard_${props.membershipInfo.title}`}>
                <div style={{ textAlign: 'center' }}>
                    <h1 className={titleClassname}>{props.membershipInfo.title}</h1>
                </div>
                <div className={contentContainerClassname}>
                    <h3 className={textClassname}>{props.membershipInfo.description.split('/')[0]}</h3>
                    {info}
                    { authenticationContext.User.membership !== props.membershipInfo.membership && <h3 className={priceLabelClassname}>Price</h3>}
                    { authenticationContext.User.membership === props.membershipInfo.membership && <h3 className={priceLabelClassname}>Current membership</h3>}
                    <h4 className={priceClassname}>{`${props.membershipInfo.price}$`}</h4>
                    {authenticationContext.User.membership === props.membershipInfo.membership && <DefaultButton styles={secondaryButtonStyles} onClick={onCancelMembershipClicked}>Cancel membership</DefaultButton>}
                    {authenticationContext.User.membership !== props.membershipInfo.membership && <DefaultButton styles={buttonStyles} onClick={onSelectMembershipClicked}>Choose membership</DefaultButton>}
                </div>
            </div>
            <ConfirmationMessageBar message={message} display={displayMessage} onMessageClosed={onMessageClosed}/>
        </>
    )
}