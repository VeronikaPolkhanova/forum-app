interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <div className="mx-auto max-w-7xl px-4 md:px-20 lg:px-40">{children}</div>;
};

export default Layout;
