
const MenuCustomerLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
        {/* <CollapseProvider> */}
            {/* <PageLayout> */}
                    {children}
            {/* </PageLayout> */}
        {/* </CollapseProvider> */}
        </>
    );
};

export default MenuCustomerLayout;