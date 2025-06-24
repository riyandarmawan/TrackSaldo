import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="container py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* Total Balance */}
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

      {/* Income */}
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

      {/* Expenses */}
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
              <CardAction>
                <Button>Add Transaction</Button>
              </CardAction>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
