import { Memberships } from "../enums/memberships"

export const getMembershipName = (membership: Memberships): string => {
    if(membership === Memberships.NoMembership) return "No Membership";
    if(membership === Memberships.UserFirstTier) return "First Tier User";
    if(membership === Memberships.UserSecondTier) return "Second Tier User";
    if(membership === Memberships.OwnerFirstTier) return "First Tier Owner";
    if(membership === Memberships.OwnerSecondTier) return "Second Tier Owner";
    return "";
}