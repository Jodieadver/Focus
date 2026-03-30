import { useState } from 'react'
import LogPage from './pages/LogPage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'
import profileImage from '../pics/image.png'

export default function App() {
    const [currentPage, setCurrentPage] = useState('log')
    const renderPage = () => {
        switch (currentPage) {
            case 'log':
                return <LogPage />
            case 'history':
                return <HistoryPage />
            case 'settings':
                return <SettingsPage />
            default:
                return <LogPage />
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-surface text-on-surface">
            {/* Header */}
            <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-40 transition-opacity duration-300 ease-in-out">
                <div className="flex justify-between items-center px-8 py-6 w-full">
                    <div className="flex items-center gap-4">
                        <button className="text-primary hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <span className="text-2xl font-serif italic text-primary">Focus</span>
                    </div>
                    <div className="hidden md:flex gap-8 items-center">
                        <button
                            onClick={() => setCurrentPage('log')}
                            className={`font-label text-[0.6875rem] uppercase tracking-[0.1em] transition-all ${currentPage === 'log'
                                ? 'text-secondary'
                                : 'text-on-surface opacity-60 hover:opacity-100'
                                }`}
                        >
                            Capture
                        </button>
                        <button
                            onClick={() => setCurrentPage('history')}
                            className={`font-label text-[0.6875rem] uppercase tracking-[0.1em] transition-all ${currentPage === 'history'
                                ? 'text-secondary'
                                : 'text-on-surface opacity-60 hover:opacity-100'
                                }`}
                        >
                            Review
                        </button>
                        <button
                            onClick={() => setCurrentPage('settings')}
                            className={`font-label text-[0.6875rem] uppercase tracking-[0.1em] transition-all ${currentPage === 'settings'
                                ? 'text-secondary'
                                : 'text-on-surface opacity-60 hover:opacity-100'
                                }`}
                        >
                            Insights
                        </button>
                    </div>
                    <div className="h-10 w-10 bg-surface-container-high overflow-hidden rounded">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
                <div className="bg-surface-container-low h-[1px] w-full"></div>
            </header>

            {/* Page Content */}
            {renderPage()}

            {/* Desktop Bottom Nav */}
            <nav className="fixed bottom-0 w-full z-50 flex justify-around items-stretch bg-surface border-t-[0.5px] border-outline-variant/30 md:hidden">
                <button
                    onClick={() => setCurrentPage('log')}
                    className={`flex flex-col items-center justify-center p-4 flex-1 transition-all duration-500 ease-out ${currentPage === 'log'
                        ? 'bg-surface text-primary'
                        : 'text-on-surface hover:bg-surface-container-high'
                        }`}
                >
                    <span className="material-symbols-outlined mb-1">edit_note</span>
                    <span className="font-label text-[0.6875rem] uppercase tracking-[0.1em] font-medium">Capture</span>
                </button>
                <button
                    onClick={() => setCurrentPage('history')}
                    className={`flex flex-col items-center justify-center p-4 flex-1 transition-all duration-500 ease-out ${currentPage === 'history'
                        ? 'bg-secondary text-on-secondary'
                        : 'text-on-surface hover:bg-surface-container-high'
                        }`}
                >
                    <span className="material-symbols-outlined mb-1">auto_stories</span>
                    <span className="font-label text-[0.6875rem] uppercase tracking-[0.1em] font-medium">Review</span>
                </button>
                <button
                    onClick={() => setCurrentPage('settings')}
                    className={`flex flex-col items-center justify-center p-4 flex-1 transition-all duration-500 ease-out ${currentPage === 'settings'
                        ? 'bg-secondary text-on-secondary'
                        : 'text-on-surface hover:bg-surface-container-high'
                        }`}
                >
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: currentPage === 'settings' ? "'FILL' 1" : "'FILL' 0" }}>insights</span>
                    <span className="font-label text-[0.6875rem] uppercase tracking-[0.1em] font-medium">Insights</span>
                </button>
            </nav>
        </div>
    )
}
