"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Transaction } from "@/lib/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { NumericFormat } from "react-number-format";

const addFormSchema = z.object({
  title: z.string().min(2),
  amount: z.number().min(1000),
  type: z.enum(["income", "expense"]),
  date: z.date(),
});

export default function Dashboard() {
  const [openAddTransactionDialog, setOpenAddTransactionDialog] =
    useState<boolean>(false);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      uuid: "1",
      title: "Salary",
      amount: 100000,
      type: "income",
      date: new Date(),
    },
    {
      uuid: "2",
      title: "Rent",
      amount: 50000,
      type: "expense",
      date: new Date(),
    },
  ]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const totalBalance = transactions.reduce((acc, curr) => {
    if (curr.type === "income") {
      return acc + curr.amount;
    } else {
      return acc - curr.amount;
    }
  }, 0);
  
  const incomes = transactions.reduce((acc, curr) => {
    if (curr.type === "income") {
      return acc + curr.amount;
    } else {
      return acc;
    }
  }, 0);
  
  const expenses = transactions.reduce((acc, curr) => {
    if (curr.type === "expense") {
      return acc + curr.amount;
    } else {
      return acc;
    }
  }, 0);
  
  const formattedTotalBalance = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalBalance);;

  const formattedIncomes = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(incomes);

  const formattedExpenses = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(expenses);;

  const addForm = useForm<z.infer<typeof addFormSchema>>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      title: "",
      amount: 1000,
      type: "income",
      date: new Date(),
    },
  });

  function onAddSubmit(values: z.infer<typeof addFormSchema>) {
    const newTransaction = {
      uuid: crypto.randomUUID(),
      title: values.title,
      amount: values.amount,
      type: values.type,
      date: values.date,
    };

    setTransactions([...transactions, newTransaction]);

    setOpenAddTransactionDialog(false);
    
    addForm.reset({
      title: "",
      amount: 1000,
      type: "income",
      date: new Date(),
    });
  }

  return (
    <div className="container py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* Total Balance Card */}
      <Card className="@container/card sm:col-span-2 md:col-span-1">
        <CardHeader>
          <CardDescription>Total Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formattedTotalBalance}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +2%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      {/* Income Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Incomes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formattedIncomes}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      {/* Expenses Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Expenses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formattedExpenses}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDown />
              -8.5%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Tabs
        defaultValue="overview"
        className="col-span-1 sm:col-span-2 md:col-span-3"
      >
        <TabsList className="w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview"></TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardAction onClick={() => setOpenAddTransactionDialog(true)}>
                <Button>Add Transaction</Button>
              </CardAction>
            </CardHeader>

            <CardContent>
              <DataTable columns={columns} data={transactions} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* add transaction dialog */}
      <Dialog
        open={openAddTransactionDialog}
        onOpenChange={(open) => {
          if (!open) {
            setOpenAddTransactionDialog(false);
          }
        }}
      >
        <DialogContent>
          <Form {...addForm}>
            <form
              onSubmit={addForm.handleSubmit(onAddSubmit)}
              className="space-y-8"
            >
              <DialogHeader>
                <DialogTitle>Add Transaction</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4">
                <FormField
                  control={addForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the title of your transaction"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <NumericFormat
                          customInput={Input}
                          min={0}
                          defaultValue={field.value}
                          placeholder="Type the amount of transaction"
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix="Rp "
                          onValueChange={(values) =>
                            field.onChange(values.floatValue)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a type of transaction" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <FormControl>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              data-empty={!field.value}
                              className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                        </FormControl>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
