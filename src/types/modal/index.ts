import { IExpense } from './../expense/index';
export interface IModal {
    isOpen: boolean
    onClose: () => void
    gasto?: IExpense
    refetch?: () => any
}