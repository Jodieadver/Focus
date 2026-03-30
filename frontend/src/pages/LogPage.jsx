import { useEffect, useState } from 'react'

const FALLBACK_FOCUS_THEMES = [
    'Deep Work Integration',
    'Breathing good',
    'Execution',
    'Learning',
    'Reflection',
]

export default function LogPage() {
    const [focusTheme, setFocusTheme] = useState('')
    const [focusThemeOptions, setFocusThemeOptions] = useState([])
    const [wins, setWins] = useState('')
    const [mistakes, setMistakes] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formMessage, setFormMessage] = useState('')

    useEffect(() => {
        const loadFocusThemeOptions = async () => {
            try {
                const res = await fetch('/api/focus-themes')
                if (!res.ok) {
                    setFocusThemeOptions(FALLBACK_FOCUS_THEMES)
                    return
                }
                const data = await res.json()
                if (Array.isArray(data) && data.length > 0) {
                    setFocusThemeOptions(data)
                } else {
                    setFocusThemeOptions(FALLBACK_FOCUS_THEMES)
                }
            } catch (error) {
                console.error('Failed to load focus themes:', error)
                setFocusThemeOptions(FALLBACK_FOCUS_THEMES)
            }
        }

        loadFocusThemeOptions()
    }, [])

    const handleLogToNotion = async () => {
        const theme = focusTheme.trim()
        const winsText = wins.trim()
        const mistakesText = mistakes.trim()

        if (!theme) {
            setFormMessage('Please select a theme.')
            return
        }

        try {
            setFormMessage('')
            setIsSubmitting(true)
            const res = await fetch('/api/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    focus_theme: theme,
                    wins: winsText,
                    mistakes: mistakesText,
                }),
            })

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}))
                throw new Error(payload.error || 'Failed to save log')
            }

            setFocusTheme('')
            setWins('')
            setMistakes('')
            setFormMessage('Saved to Notion.')
        } catch (error) {
            console.error(error)
            setFormMessage(error.message || 'Failed to save log')
        } finally {
            setIsSubmitting(false)
        }
    }

    const canSubmit =
        !isSubmitting &&
        focusTheme.trim().length > 0

    return (
        <main className="flex-grow pt-12 pb-32 px-6 max-w-4xl mx-auto w-full">
            {/* Hero Section */}
            <section className="mb-20">
                <h1 className="font-headline text-[3.5rem] leading-[1.1] tracking-tight text-primary max-w-xl">
                    Daily Capture
                </h1>
                <div className="flex justify-end mt-4">
                    <p className="font-label text-[0.6875rem] uppercase tracking-[0.1em] text-outline-variant">
                        Vol. 12 — Issue 04
                    </p>
                </div>
            </section>




            {/* Input Sections */}
            <div className="space-y-10">
                {/* Theme Section */}
                <div className="group">
                    <div className="flex items-baseline justify-between mb-2">
                        <label className="font-label text-[0.6875rem] uppercase tracking-[0.2em] text-secondary">
                            Direction
                        </label>
                        <span className="font-headline italic text-primary/40 text-lg">Theme</span>
                    </div>
                    <div className="relative">
                        <select
                            value={focusTheme}
                            onChange={(e) => setFocusTheme(e.target.value)}
                            className="w-full appearance-none rounded-full border border-outline-variant/30 bg-surface-container-low/40 px-5 py-3 pr-10 text-[1.05rem] leading-relaxed font-headline text-primary shadow-sm transition-all duration-300 focus:border-secondary focus:bg-surface-container-low/70 focus:outline-none focus:ring-2 focus:ring-secondary/20"
                        >
                            <option value="" className="text-outline-variant">Select today&apos;s theme</option>
                            {focusThemeOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant">expand_more</span>
                    </div>
                </div>

                {/* Wins Section */}
                <div className="group">
                    <div className="flex items-baseline justify-between mb-2">
                        <label className="font-label text-[0.6875rem] uppercase tracking-[0.2em] text-secondary">
                            Momentum
                        </label>
                        <span className="font-headline italic text-primary/40 text-lg">Wins</span>
                    </div>
                    <div className="relative">
                        <textarea
                            value={wins}
                            onChange={(e) => setWins(e.target.value)}
                            className="w-full rounded-3xl border border-outline-variant/30 bg-surface-container-low/40 px-5 py-4 text-[1.05rem] leading-relaxed font-headline placeholder:text-outline-variant/45 min-h-[96px] resize-none shadow-sm transition-all duration-300 focus:border-secondary focus:bg-surface-container-low/70 focus:outline-none focus:ring-2 focus:ring-secondary/20"
                            placeholder="What moved the needle today?"
                        />
                    </div>
                </div>

                {/* Mistakes Section */}
                <div className="group">
                    <div className="flex items-baseline justify-between mb-2">
                        <label className="font-label text-[0.6875rem] uppercase tracking-[0.2em] text-secondary">
                            Learning
                        </label>
                        <span className="font-headline italic text-primary/40 text-lg">Mistakes</span>
                    </div>
                    <div className="relative">
                        <textarea
                            value={mistakes}
                            onChange={(e) => setMistakes(e.target.value)}
                            className="w-full rounded-3xl border border-outline-variant/30 bg-surface-container-low/40 px-5 py-4 text-[1.05rem] leading-relaxed font-headline placeholder:text-outline-variant/45 min-h-[96px] resize-none shadow-sm transition-all duration-300 focus:border-secondary focus:bg-surface-container-low/70 focus:outline-none focus:ring-2 focus:ring-secondary/20"
                            placeholder="Where did friction occur?"
                        />
                    </div>
                </div>
            </div>

            {/* CTA Action */}
            <section className="mt-16 flex justify-center md:justify-end">
                {formMessage && (
                    <p className="text-sm text-on-surface-variant mr-4 self-center">{formMessage}</p>
                )}
                <button
                    onClick={handleLogToNotion}
                    disabled={!canSubmit}
                    className="bg-primary text-on-primary flex items-center gap-8 px-8 py-4 hover:bg-primary-dim transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="font-label text-[0.6875rem] uppercase tracking-[0.2em]">{isSubmitting ? 'Saving...' : 'Log to Notion'}</span>
                    <span
                        className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                        arrow_forward
                    </span>
                </button>
            </section>

            {/* Quote Section */}
            <section className="mt-16 flex justify-center">
                <div className="bg-secondary flex flex-col justify-end p-6 max-w-md w-full min-h-[200px]">
                    <p className="text-on-secondary font-headline text-2xl leading-tight">
                        "Simplicity is the ultimate sophistication."
                    </p>
                    <p className="text-on-secondary/60 font-label text-[0.5rem] uppercase tracking-widest mt-4">
                        — Leonardo da Vinci
                    </p>
                </div>
            </section>
        </main>
    )
}
