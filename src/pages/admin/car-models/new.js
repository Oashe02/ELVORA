// pages/admin/car-models/new.js
import CarModelForm from "@/components/car-models/CarModelForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function NewCarModelPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Add New Car Model</h1>
        <CarModelForm />
      </div>
    </AdminLayout>
  );
}