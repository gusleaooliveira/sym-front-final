import { IRevenue } from './../revenue/index';
import { IExpense } from './../expense/index';

export interface IModal {
    isOpen: boolean
    onClose: () => void
    gasto?: IExpense
    recebimento?: IRevenue
    refetch?: () => any
}