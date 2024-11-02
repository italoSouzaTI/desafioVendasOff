export interface IDatabaseProps {
    id: number;
    fornecedor: string;
    tipo: string;
    pagamento: number;
    vencimento: string;
    valor: number;
    at_create: string;
    SYNC_STATUS: boolean;
    sync_update: boolean;
    sync_delete: boolean;
}
