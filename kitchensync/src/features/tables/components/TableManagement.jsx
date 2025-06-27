import { useEffect, useRef } from "react";
import { useTableStore } from "../store";
import CreateTable from "./CreateTable";
import TableGrid from "./TableGrid";
import Layout from "../../../shared/ui/Layout";
import { IconBrandAirtable } from '@tabler/icons-react';

const TableManagement = () => {
    const {
        tables,
        feedback,
        isLoadingTables,
        loadTables,
        clearFeedback
    } = useTableStore();

    const feedbackTimeoutRef = useRef(null);

    useEffect(() => {
        loadTables()
            .catch(error => {
                console.error("Error loading tables:", error);
            });
    }, [loadTables]);

    useEffect(() => {
        return () => {
            if (feedbackTimeoutRef.current) {
                clearTimeout(feedbackTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (feedbackTimeoutRef.current) {
            clearTimeout(feedbackTimeoutRef.current);
            feedbackTimeoutRef.current = null;
        }

        if (feedback) {
            feedbackTimeoutRef.current = setTimeout(() => {
                clearFeedback();
                feedbackTimeoutRef.current = null;
            }, 3000);
        }
    }, [feedback, clearFeedback]);

    const handleFeedback = (feedbackData) => {
        useTableStore.setState({ feedback: feedbackData });
    };

    return (
        <Layout>
            <div className="min-h-screen p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="bg-gradient-to-br from-violet-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                                    <IconBrandAirtable className="w-6 h-6 text-white" stroke={2} />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">Gestión de Mesas</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    {feedback && (
                        <div className={`mb-8 p-6 rounded-2xl border-2 shadow-lg ${
                            feedback.type === "success"
                                ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300 text-emerald-800"
                                : "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 text-amber-800"
                        }`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                    feedback.type === "success" 
                                        ? "bg-emerald-500" 
                                        : "bg-amber-500"
                                }`}>
                                    {feedback.type === "success" ? "✓" : "!"}
                                </div>
                                <span className="font-semibold text-lg">{feedback.message}</span>
                            </div>
                        </div>
                    )}

                    <div className="space-y-8">
                        <CreateTable
                            tables={tables}
                            onFeedback={handleFeedback}
                            onTableCreated={loadTables}
                        />
                        <TableGrid
                            tables={tables}
                            isLoading={isLoadingTables}
                            onRefresh={loadTables}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TableManagement;