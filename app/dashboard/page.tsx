import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
    return (
      <div className="container py-8 grid grid-cols-2 gap-4">
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>Income</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">Rp100.000</CardTitle>
            </CardHeader>
        </Card>

        <Card className="@container/card">
            <CardHeader>
                <CardDescription>Outcome</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">Rp50.000</CardTitle>
            </CardHeader>
        </Card>
      </div>
    );
  }
  