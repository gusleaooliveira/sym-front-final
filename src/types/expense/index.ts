export interface IExpense {
    id?: number;
    value: number;
    date: Date;
    type: string;
    frequency: string;
    description: string;
    user_id: number;
}