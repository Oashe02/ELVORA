// pages/admin/makes/new.js
import MakeForm from "@/components/makes/MakeForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function NewMakePage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Add New Make</h1>
        <MakeForm />
      </div>
    </AdminLayout>
  );
}