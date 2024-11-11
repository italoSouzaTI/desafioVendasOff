export interface IDatabaseProps {
    id: number;
    id_api?: string;
    id_device: string;
    supplier: string;
    account_type: string;
    payment: number;
    maturity: string;
    value_price: string;
    at_create: string;
    sync_status: boolean;
    sync_update: boolean;
    sync_delete: boolean;
    is_sync: boolean;
}
