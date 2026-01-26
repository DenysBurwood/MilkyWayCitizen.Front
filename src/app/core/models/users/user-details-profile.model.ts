import { Roles } from "@core/enum/roles";
import { AddressDetails } from "../address-details.models";

export interface UserDetails
{
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    birthDate: Date,
    publishedNews: any,
    role: Roles,
    addressId: number,
    address: AddressDetails
}