// pages/admin/manufacturers/new.js
import ManufacturerForm from "@/components/manufacturers/ManufacturerForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function NewManufacturerPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Add New Manufacturer</h1>
        <ManufacturerForm />
      </div>
    </AdminLayout>
  );
}