import { IconProgressCheck, IconBowlChopsticks, IconAward, IconClipboardList } from '@tabler/icons-react';

const CookStatsPanel = ({ orders, orderFilter, setOrderFilter }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <button
                onClick={() => setOrderFilter("IN_PROGRESS")}
                className={`group relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer ${orderFilter === "IN_PROGRESS" ? "ring-4 ring-orange-300 ring-opacity-50" : ""}`}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-100 text-sm font-medium mb-1">En Progreso</p>
                            <p className="text-4xl font-bold">{orders.filter(order => order.state === "IN_PROGRESS").length}</p>
                        </div>
                        <div className="bg-orange-400 bg-opacity-30 p-3 rounded-xl backdrop-blur-sm">
                            <IconProgressCheck stroke={2} className="w-7 h-7" />
                        </div>
                    </div>
                </div>
            </button>

            <button
                onClick={() => setOrderFilter("READY_TO_SERVE")}
                className={`group relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer ${orderFilter === "READY_TO_SERVE" ? "ring-4 ring-blue-300 ring-opacity-50" : ""}`}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium mb-1">Listas para Servir</p>
                            <p className="text-4xl font-bold">{orders.filter(order => order.state === "READY_TO_SERVE").length}</p>
                        </div>
                        <div className="bg-blue-400 bg-opacity-30 p-3 rounded-xl backdrop-blur-sm">
                            <IconBowlChopsticks stroke={2} className="w-7 h-7" />
                        </div>
                    </div>
                </div>
            </button>

            <button
                onClick={() => setOrderFilter("COMPLETED")}
                className={`group relative bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer ${orderFilter === "COMPLETED" ? "ring-4 ring-green-300 ring-opacity-50" : ""}`}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-400 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 text-sm font-medium mb-1">Completadas</p>
                            <p className="text-4xl font-bold">{orders.filter(order => order.state === "COMPLETED").length}</p>
                        </div>
                        <div className="bg-green-400 bg-opacity-30 p-3 rounded-xl backdrop-blur-sm">
                            <IconAward stroke={2} className="w-7 h-7" />
                        </div>
                    </div>
                </div>
            </button>

            <button
                onClick={() => setOrderFilter("ALL")}
                className={`group relative bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer ${orderFilter === "ALL" ? "ring-4 ring-gray-300 ring-opacity-50" : ""}`}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-500 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-300 text-sm font-medium mb-1">Total Órdenes</p>
                            <p className="text-4xl font-bold">{orders.length}</p>
                        </div>
                        <div className="bg-gray-500 bg-opacity-30 p-3 rounded-xl backdrop-blur-sm">
                            <IconClipboardList stroke={2} className="w-7 h-7" />
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default CookStatsPanel;