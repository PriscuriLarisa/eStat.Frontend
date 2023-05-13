import { Separator } from "office-ui-fabric-react";
import { TitleCard } from "../titleCard/titleCard";
import { membershipDetails } from "./manageMemberships.items";
import { mainContainerClassname, membershipInfoContainerClasssname } from "./manageMemberships.styles";
import { MembershipCard } from "./membershipCard/membershipCard";
import { AuthentificationContextModel } from "../../authentication/authenticationContext.types";
import { useContext } from "react";
import AuthentificationContext from "../../authentication/authenticationContext";

export const ManageMemberships = (): JSX.Element => {
    const authenticationContext: AuthentificationContextModel = useContext(AuthentificationContext);

    const membershipCards: JSX.Element[] = membershipDetails.filter(m => m.role === authenticationContext.User.role).map(m => {
        return (
            <>
                <MembershipCard membershipInfo={m} />
            </>
        )
    })

    return (
        <>
            <div className={mainContainerClassname}>
                <TitleCard title="Memberships" />
                <div className={membershipInfoContainerClasssname}>
                    {membershipCards}
                </div>
            </div>
        </>

    )

};