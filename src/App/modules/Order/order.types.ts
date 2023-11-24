export type TSingleBookOrderPayload = {
    bookId: string,
    quantity: number
}

export interface IOrder {
    userId: string,
    // role: 'admin' | 'customer',
    orderedBooks: TSingleBookOrderPayload[]
}