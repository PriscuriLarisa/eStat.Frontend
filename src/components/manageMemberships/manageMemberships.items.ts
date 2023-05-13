import { Memberships } from "../../enums/memberships";
import { Roles } from "../../enums/roles";
import { IMembershipInfo } from "./manageMemberships.types";

export const membershipDetails: IMembershipInfo[] = [
    {
        title: 'Owner Tier 1',
        membership: Memberships.OwnerFirstTier,
        role: Roles.Retailer,
        price: 20,
        description: 'With this membership you will have access to: /• Product charts /• Stock charts /• Charts for your prices /• Charts for average prices over some periods'
    },
    {
        title: 'Owner Tier 2',
        membership: Memberships.OwnerSecondTier,
        role: Roles.Retailer,
        price: 30,
        description: 'With this membership you will have access to: /• Product charts /• Stock charts /• Charts for your prices /• Charts for average prices over some periods /• Charts for competitor stock  /• Charts for comptetitors\' prices over some periods'
    },
    {
        title: 'Member Tier 1',
        membership: Memberships.UserFirstTier,
        role: Roles.Purchaser,
        price: 5,
        description: 'With this membership you will have access to: /• Product charts /• Stock charts /• Charts for your prices /• Charts for average prices over some periods'
    },
    {
        title: 'Member Tier 2',
        membership: Memberships.UserSecondTier,
        role: Roles.Purchaser,
        price: 15,
        description: 'With this membership you will have access to: /• Product charts /• Stock charts /• Charts for your prices /• Charts for average prices over some periods /• Charts for competitor stock  /• Charts for comptetitors\' prices over some periods'
    }
]