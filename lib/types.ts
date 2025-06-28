export type Transaction = {
    uuid: string
    title: string
    amount: number
    type: "income" | "expense"
    date: Date
  }