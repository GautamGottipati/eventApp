export interface Register{
    eventName : string;
    userid   : string;
    eventId  : string;
    fullname : string;
    mobileno : string;
    emailid  : string;
    regtype  : string;
    ticketcount : number;
    idproof  : File | string;
}