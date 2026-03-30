import { useEffect, useMemo, useState } from 'react'

export default function HistoryPage() {
    const [entries, setEntries] = useState([])

    useEffect(() => {
        const loadEntries = async () => {
            try {
                const res = await fetch('/api')
                const data = await res.json()
                if (Array.isArray(data)) {
                    setEntries(data)
                }
            } catch (error) {
                console.error('Failed to load Notion data:', error)
            }
        }

        loadEntries()
    }, [])

    const formatTime = (value) => {
        const date = new Date(value)
        if (Number.isNaN(date.getTime())) return '09:14 AM'
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })
    }

    const todayEntries = useMemo(() => {
        const now = new Date()
        return entries.filter((entry) => {
            if (!entry?.date) return false
            const date = new Date(entry.date)
            if (Number.isNaN(date.getTime())) return false
            return (
                date.getFullYear() === now.getFullYear() &&
                date.getMonth() === now.getMonth() &&
                date.getDate() === now.getDate()
            )
        })
    }, [entries])

    const formattedDate = useMemo(() => {
        const source = todayEntries[0]?.date || entries[0]?.date
        if (!source) return 'Monday, October 24'
        const date = new Date(source)
        if (Number.isNaN(date.getTime())) return 'Monday, October 24'
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
    }, [todayEntries, entries])

    const victories = useMemo(() => {
        const list = todayEntries
            .filter((entry) => entry?.wins)
            .map((entry, idx) => ({
                time: formatTime(entry.date),
                title: entry.focus_theme || `Victory ${idx + 1}`,
                description: entry.wins,
            }))

        return list.length
            ? list
            : [{
                time: '09:14 AM',
                title: 'No wins logged today',
                description: 'Add a new reflection and it will appear here.',
            }]
    }, [todayEntries])

    const lessons = useMemo(() => {
        const list = todayEntries
            .filter((entry) => entry?.mistakes)
            .map((entry, idx) => ({
                time: formatTime(entry.date),
                title: entry.focus_theme || `Lesson ${idx + 1}`,
                description: entry.mistakes,
            }))

        return list.length
            ? list
            : [{
                time: '00:00 PM',
                title: 'No lessons logged today',
                description: 'Add a new reflection and it will appear here.',
            }]
    }, [todayEntries])

    return (
        <main className="flex-grow pt-12 pb-32 px-6 max-w-4xl mx-auto w-full">
            {/* Hero Section */}
            <section className="mb-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                    <div className="md:col-span-8">
                        <p className="font-label text-[0.6875rem] uppercase tracking-[0.1em] text-outline mb-4">
                            {formattedDate}
                        </p>
                        <h2 className="font-headline tracking-tighter text-[3.5rem] md:text-[5rem] leading-[0.9] text-primary">
                            The Daily <br /><span className="italic text-secondary">Review</span>
                        </h2>
                    </div>
                    <div className="md:col-span-4 md:text-right pb-4">
                        <p className="text-on-surface-variant text-sm max-w-xs md:ml-auto leading-relaxed">
                            A quiet reflection on the architecture of your day. Documenting the progress and the pivots.
                        </p>
                    </div>
                </div>
            </section>

            {/* Bento Layout: Victories and Lessons */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {/* Victories Column */}
                <div className="space-y-16">
                    <div>
                        <h3 className="font-headline text-3xl mb-8 flex items-center gap-3">
                            Victories
                            <span className="h-[0.5px] flex-grow bg-outline-variant/30"></span>
                        </h3>
                        <div className="space-y-12">
                            {victories.map((victory, idx) => (
                                <div key={idx}>
                                    {victory.image && (
                                        <div className="aspect-[4/5] bg-surface-container-low mb-6 overflow-hidden">
                                            <img
                                                src={victory.image}
                                                alt={victory.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <span className="font-label text-[0.625rem] text-outline tracking-widest block mb-2">
                                        {victory.time}
                                    </span>
                                    <h4 className="font-headline text-xl text-primary mb-2">{victory.title}</h4>
                                    <p className="text-sm text-on-surface-variant leading-relaxed">
                                        {victory.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Lessons Column */}
                <div className="space-y-16 md:mt-32">
                    <div>
                        <h3 className="font-headline text-3xl mb-8 flex items-center gap-3">
                            Lessons
                            <span className="h-[0.5px] flex-grow bg-outline-variant/30"></span>
                        </h3>
                        <div className="space-y-12">
                            {lessons.map((lesson, idx) => (
                                <div key={idx}>
                                    {lesson.image && (
                                        <div className="aspect-square bg-surface-container-low mb-6 overflow-hidden">
                                            <img
                                                src={lesson.image}
                                                alt={lesson.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <span className="font-label text-[0.625rem] text-outline tracking-widest block mb-2">
                                        {lesson.time}
                                    </span>
                                    <h4 className="font-headline text-xl text-primary mb-2">{lesson.title}</h4>
                                    <p className="text-sm text-on-surface-variant leading-relaxed">
                                        {lesson.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Actions Section */}
            <section className="mt-40 border-t-[0.5px] border-outline-variant/30 pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                    <button className="font-body text-primary text-sm tracking-wide border-b-[0.5px] border-secondary/40 pb-1 hover:border-secondary transition-colors duration-300">
                        Finalize Daily Log
                    </button>
                    <p className="text-[0.6875rem] text-outline mt-2 uppercase tracking-widest">
                        Mark as complete &amp; archive
                    </p>
                </div>
                <button className="bg-primary text-on-primary px-8 py-4 flex items-center gap-3 hover:bg-primary-dim transition-colors group">
                    <span className="font-label text-xs uppercase tracking-[0.2em]">Export to Notion</span>
                    <span className="material-symbols-outlined text-sm">north_east</span>
                </button>
            </section>
        </main>
    )
}
