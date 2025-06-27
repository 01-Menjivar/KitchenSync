const LoadingSpinner = ({ message = "Cargando...", size = "h-12 w-12" }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
            <div className="flex justify-center items-center py-12">
                <div className={`animate-spin rounded-full ${size} border-b-2 border-amber-500`}></div>
                <p className="ml-4 text-slate-600">{message}</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;