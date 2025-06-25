"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [openAddTransactionDialog, setOpenAddTransactionDialog] =
    useState<boolean>(false);

  return (
    <div className="container py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* Total Balance Card */}
      <Card className="@container/card sm:col-span-2 md:col-span-1">
        <CardHeader>
          <CardDescription>Total Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Rp80.000
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
          <CardDescription>Income</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Rp100.000
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
            Rp20.000
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
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
          </DialogHeader>

          {/* <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div> */}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
