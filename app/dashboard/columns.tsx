"use client"

import { Transaction } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Transaction>[] = [
    {
        header: "Title",
        accessorKey: "title",
    },
    {
        header: "Amount",
        accessorKey: "amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(amount)
       
            return formatted
          },
    },
    {
        header: "Type",
        accessorKey: "type",
    },
    {
        header: "Date",
        accessorKey: "date",
    },
];