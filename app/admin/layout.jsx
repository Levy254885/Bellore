import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "Bellore Crafts - Admin",
    description: "Bellore Crafts platform administration dashboard.",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
