import StatCard from "@/app/components/admin/StatCard";
import OrdersFilters from "@/app/components/admin/OrdersFilters";
import OrdersTable from "@/app/components/admin/OrdersTable";
import OrdersMobileCard from "@/app/components/admin/OrdersMobileCard";

async function getOrders() {
  const res = await fetch("http://localhost:3000/api/admin/orders", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}

export default async function AdminPage() {
  const { orders } = await getOrders();

  const total = orders.length;
  const pending = orders.filter(o => o.status === "Pending").length;
  const approved = orders.filter(o => o.status === "Approved").length;
  const shipped = orders.filter(o => o.status === "Shipped").length;

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* ===== TOP CONSOLE ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4">

        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">
            EdPharma Order Console
          </h1>

          <div className="text-sm">
            <div className="font-medium">Super Admin</div>
            <div className="text-xs text-slate-500">
              admin@edpharma.com
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Orders" value={total} color="blue" />
          <StatCard title="Pending Review" value={pending} color="yellow" />
          <StatCard title="Approved" value={approved} color="green" />
          <StatCard title="Shipped" value={shipped} color="purple" />
           
        </div>
      </div>
      {/* TABLE */}
      <div className="hidden md:block">
        <OrdersTable orders={orders} />
      </div>

      <div className="md:hidden">
        <OrdersMobileCard orders={orders} />
      </div>
    </div>
  );
}