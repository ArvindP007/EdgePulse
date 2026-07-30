import { useEffect, useState } from "react";
import {
  Activity,
  Cpu,
  HardDrive,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLoader from "@/components/common/PageLoader";

const cards = [
  {
    title: "Customers",
    value: "24",
    icon: Users,
  },
  {
    title: "Devices",
    value: "156",
    icon: Cpu,
  },
  {
    title: "Gateways",
    value: "18",
    icon: HardDrive,
  },
  {
    title: "Active Alerts",
    value: "5",
    icon: Activity,
  },
];

export default function DashboardPage() {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsPageLoading(false), 500);

    return () => window.clearTimeout(timer);
  }, []);

  if (isPageLoading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to EdgePulse Setup Portal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground hover:bg-muted">
            Status
          </button>
          <button className="rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground hover:bg-muted">
            Category
          </button>
          <button className="rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground hover:bg-muted">
            Price: $100-$200
          </button>
          <button className="rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground hover:bg-muted">
            Columns
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm">{card.title}</CardTitle>
                <p className="text-xs text-muted-foreground">Updated 2m ago</p>
              </div>
              <card.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
        <Card>
  <CardHeader>
    <CardTitle>Recent Activity</CardTitle>
  </CardHeader>

  <CardContent>
    <div className="space-y-3">
      <p>✔ Customer "Acme Corp" added</p>
      <p>✔ Device "Gateway-001" registered</p>
      <p>✔ User "Admin" created</p>
      <p>✔ Firmware updated successfully</p>
    </div>
  </CardContent>
</Card>
      </div>
    </div>
  );
}