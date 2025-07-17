import FaqForm from "@/components/faq/FaqForm"; 
import AdminLayout from "@/components/layouts/AdminLayout";

export default function NewFaqPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Add New FAQ</h1>
        <FaqForm />
      </div>
    </AdminLayout>
  );
}