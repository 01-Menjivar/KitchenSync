import { useEffect } from "react";
import Layout from "../../../shared/ui/Layout";
import CreateDish from "./CreateDish";
import DishGrid from "./DishGrid";
import { useDishStore } from "../store";

const DishManagement = () => {
    const {
        feedback,
        loadDishes,
        clearFeedback
    } = useDishStore();

    useEffect(() => {
        loadDishes().catch(e => {
            console.error("Error loading dishes:", e);
        });
    }, [loadDishes]);

    useEffect(() => {
        if (feedback) {
            const timer = setTimeout(() => {
                clearFeedback();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [feedback, clearFeedback]);

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <div className="max-w-7xl mx-auto">

                    {feedback && (
                        <div className={`mb-6 p-4 rounded-xl border-2 transition-all duration-300 ${
                            feedback.type === "success"
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                : "bg-red-50 border-red-200 text-red-700"
                        }`}>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                    feedback.type === "success" ? "bg-emerald-500" : "bg-red-500"
                                }`}></div>
                                {feedback.message}
                            </div>
                        </div>
                    )}

                    <CreateDish />
                    <DishGrid />
                </div>
            </div>
        </Layout>
    );
};

export default DishManagement;