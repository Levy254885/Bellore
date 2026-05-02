import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "Bellore Crafts - Seller Dashboard",
    description: "Manage your Bellore Crafts storefront, products, and orders.",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
