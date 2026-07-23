import {
  Activity,
  Cpu,
  HardDrive,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to EdgePulse Setup Portal.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">
                {card.title}
              </CardTitle>

              <card.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">
                {card.value}
              </div>
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