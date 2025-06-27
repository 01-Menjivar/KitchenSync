import { IconTrash } from '@tabler/icons-react';
import { getStateColor, getStateText } from '../../../shared/constants/tableStates';
import { useTableStore } from "../store";
import Button from '../../../shared/ui/Button';
import FlipCard from '../../../shared/ui/FlipCard';

const TableCard = ({table}) => {
    const loadTables = useTableStore(state => state.loadTables)
    const deleteTables = useTableStore(state => state.deleteTables)
    const setFeedback = useTableStore(state => state.setFeedback)

    const isOccupied = table.state === 'OCCUPIED';
    
    const handleDeleteClick = async (e) => {
        e.stopPropagation();
        if(isOccupied){
            setFeedback({
                type: "error",
                message: "No puedes borrar una mesa con una orden activa"
            })
            return
        }
        await deleteTables(table.number);
        loadTables()
    };

    const frontContent = (
        <div className={`${
            isOccupied 
                ? 'bg-gradient-to-br from-red-50 to-rose-100 border-red-200 hover:shadow-red-200/50' 
                : 'bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200 hover:shadow-emerald-200/50'
        } border-2 rounded-2xl p-4 hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full group relative overflow-hidden`}>
            {/* Efecto de brillo sutil */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative flex flex-col justify-center items-center h-full">
                <div className={`text-4xl font-bold mb-3 ${
                    isOccupied ? 'text-red-700' : 'text-emerald-700'
                }`}>
                    Mesa {table.number}
                </div>
                
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-300 ${getStateColor(table.state)}`}>
                    {getStateText(table.state)}
                </div>
                
                <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${
                    isOccupied ? 'bg-red-400' : 'bg-emerald-400'
                } opacity-60 animate-pulse`}></div>
                <div className={`absolute top-3 left-3 w-2 h-2 rounded-full ${
                    isOccupied ? 'bg-red-300' : 'bg-emerald-300'
                } opacity-40`}></div>
            </div>
        </div>
    );
    const backContent = (
        <div className="bg-gradient-to-br from-slate-50 to-blue-100 border-2 border-slate-200 rounded-2xl p-3 h-full flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative text-center space-y-2">
                <div className="bg-gradient-to-br from-red-500 to-rose-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto shadow-lg">
                    <IconTrash size={18} className="text-white" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">
                    Eliminar Mesa
                </h4>
                <p className="text-slate-600 text-xs">
                    Mesa #{table.number}
                </p>
                <button
                    className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-3 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-xs"
                    onClick={handleDeleteClick}
                >
                    Confirmar
                </button>
            </div>
        </div>
    );

    return (
        <FlipCard
            height="160px"
            backContent={backContent}
        >
            {frontContent}
        </FlipCard>
    );
};

export default TableCard;

