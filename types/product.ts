export interface CreateProductProps {
    title: string;
    storage:number;
    ram:number;
    user_id:string;
    brand_id:string;
    model_id?:string | null;
    other_model?:string | null;
    color_id:string;
    price:number;
    currency_id:string;
    description: string;
    year: string;
    negotiable:boolean;
    has_document:boolean;
    phone_number:string;
    address_id:string;
}
