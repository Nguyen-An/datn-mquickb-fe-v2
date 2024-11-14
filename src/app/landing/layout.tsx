const LandingLayout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
      <main style={{ overflow: "hidden" }}>{children}</main>
    );
  };
  
  export default LandingLayout;
  