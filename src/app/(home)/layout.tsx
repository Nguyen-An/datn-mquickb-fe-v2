const HomeLayout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
      <main style={{ overflow: "hidden" }}>{children}</main>
    );
  };
  
  export default HomeLayout;
  