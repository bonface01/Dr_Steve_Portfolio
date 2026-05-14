import { AdminAuth } from "@/components/admin/AdminAuth";

export const metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return <AdminAuth />;
}
