"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: string;
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "user.email",
    header: "Customer",
  },
  {
    accessorKey: "foodOrderItems.length",
    header: "Foods",
  },
  {
    accessorKey: "totalPrice",
    header: "Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
