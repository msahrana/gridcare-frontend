const PublicLayout = ({ children }: LayoutProps<'/'>) => {
    return (
        <div className="min-h-screen bg-white">
            <main>{children}</main>
        </div>
    );
};

export default PublicLayout;
