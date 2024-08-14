export interface Customer{
    id?:string;
    customer_name:string;
    phone_number:string;
    specialist_id:number;
    appointment_start_date:string;
    appointment_end_date:string;
    job:string;
    status:boolean;
    payment:any;
}