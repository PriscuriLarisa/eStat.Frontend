import { Memberships } from "../../enums/memberships";
import { Roles } from "../../enums/roles";

export interface IMembershipInfo {
    title: string,
    description: string,
    price: number,
    role: Roles,
    membership: Memberships 
}