import Topbar from "./Topbar.jsx";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
            <Topbar />
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;