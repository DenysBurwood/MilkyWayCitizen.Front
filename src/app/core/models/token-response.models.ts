import { Roles } from "@core/enum/roles";

export interface TokenResponse
{
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role":Roles,
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth":Date,
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid":number,
}