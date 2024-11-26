import PageCustomerLayout from "@/components/pageCustomerLayout/PageCustomerLayout";

const MenuCustomerLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <PageCustomerLayout>
                    {children}
            </PageCustomerLayout>
        </>
    );
};

export default MenuCustomerLayout;