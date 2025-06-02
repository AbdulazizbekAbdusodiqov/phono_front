export interface CreateProductProps {
    title: string;
    storage:number;
    ram:number;
    user_id:number;
    brand_id:number;
    model_id?: number | null;
    other_model?:string| null;
    color_id:number;
    price:number;
    currency_id:number;
    description: string;
    year: string;
    negotiable:boolean;
    has_document:boolean;
    phone_number:string;
    address_id:number;
    condition: boolean;
}
