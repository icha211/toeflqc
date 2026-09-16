import { useState, useEffect, useCallback } from 'react';
import { TestTypeCategory, ViewMode, ProblemSetRecord, ApiGatewayConfig, ArchivedSetItem } from '../types/developer';
import { developerApi } from '../services/developerApi';

export const useDeveloperConsole = () => {
    const [activeTab, setActiveTab] = useState<TestTypeCategory>('mocktest');
    const [libraryView, setLibraryView] = useState<ViewMode>('grid');
    const [problemSets, setProblemSets] = useState<ProblemSetRecord[]>([]);
    const [archivedSets, setArchivedSets] = useState<ArchivedSetItem[]>([]);
    const [calendarYear, setCalendarYear] = useState<number>(new Date().getFullYear());

  // Modal Display States
    const [isModuleModalOpen, setIsModuleModalOpen] = useState<boolean>(false);
    const [isRecoverModalOpen, setIsRecoverModalOpen] = useState<boolean>(false);
    const [isGatewayConfigOpen, setIsGatewayConfigOpen] = useState<boolean>(false);

  // Gateway Config State
    const [gatewayConfig, setGatewayConfig] = useState<ApiGatewayConfig>({
        url: '',
        host: 'localhost',
        port: '8000',
        protocol: 'http',
    });

  // Load Initial Data
    const loadSets = useCallback(async () => {
        if (activeTab === 'materialslibrary') return;
        const sets = await developerApi.fetchSetsByTestType(activeTab);
        setProblemSets(sets);
    }, [activeTab]);

    useEffect(() => {
        loadSets();
    }, [loadSets]);

    const handleSaveGatewayConfig = (config: ApiGatewayConfig) => {
        setGatewayConfig(config);
        localStorage.setItem('toefl_api_gateway_config', JSON.stringify(config));
    };

    const handleDeleteSet = async (setId: string, moduleName: string) => {
    if (confirm(`Delete "${moduleName}" set? This removes it from active sets.`)) {
        await developerApi.softDeleteSet(setId, activeTab);
        await loadSets();
        }
    };

    const handleOpenRecoverModal = async () => {
        const archives = await developerApi.fetchArchivedSets(activeTab);
        setArchivedSets(archives);
        setIsRecoverModalOpen(true);
    };

    const handleRestoreSet = async (setId: string) => {
        await developerApi.restoreArchivedSet(setId, activeTab);
        setIsRecoverModalOpen(false);
        await loadSets();
    };

    return {
        activeTab,
        setActiveTab,
        libraryView,
        setLibraryView,
        problemSets,
        archivedSets,
        calendarYear,
        setCalendarYear,
        isModuleModalOpen,
        setIsModuleModalOpen,
        isRecoverModalOpen,
        setIsRecoverModalOpen,
        isGatewayConfigOpen,
        setIsGatewayConfigOpen,
        gatewayConfig,
        handleSaveGatewayConfig,
        handleDeleteSet,
        handleOpenRecoverModal,
        handleRestoreSet,
        loadSets,
    };
};