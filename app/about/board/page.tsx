'use client'

import React, { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import Image from 'next/image'

export default function BoardMembers() {
    const [board, setBoard] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await fetch('/api/board')
                const result = await response.json()
                if (result.success) {
                    setBoard(result.data)
                }
            } catch (error) {
                console.error('Failed to fetch board members:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchBoard()
    }, [])

    return (
        <>
            <Navigation />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="bg-linear-to-b from-primary/10 to-white py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-zinc-900">
                        <AnimatedSection direction="up">
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                                Our <span className="text-primary italic">Advisory</span> Board
                            </h1>
                            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                                Meet the visionary leaders and experts who provide strategic guidance to Kripa Kunj's mission and growth.
                            </p>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Members Section */}
                <section className="py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        ) : board.length > 0 ? (
                            <div className="space-y-32">
                                {board.map((member, index) => {
                                    const isEven = index % 2 === 0;
                                    return (
                                        <AnimatedSection key={member._id || index} direction="up" delay={index * 100}>
                                            <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20 items-center`}>
                                                {/* Image */}
                                                <div className="w-full md:w-2/5 shrink-0">
                                                    <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] border-8 border-white group">
                                                        <Image
                                                            src={member.imageUrl || '/placeholder-avatar.jpg'}
                                                            alt={member.name}
                                                            fill
                                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className={`flex-1 text-center ${isEven ? 'md:text-left' : 'md:text-right'} space-y-8`}>
                                                    <div className="text-zinc-900">
                                                        <h2 className="text-4xl md:text-6xl font-black mb-3 tracking-tighter">
                                                            {member.name}
                                                        </h2>
                                                        <p className="text-2xl font-bold text-red-600 uppercase tracking-[0.2em]">
                                                            {member.designation}
                                                        </p>
                                                    </div>

                                                    {member.quote && member.quote.trim() !== '' && (
                                                        <div className={`relative ${isEven ? 'pl-8 border-l-4' : 'pr-8 border-r-4'} border-primary`}>
                                                            <p className="text-2xl font-serif italic text-primary/80 leading-relaxed">
                                                                "{member.quote}"
                                                            </p>
                                                        </div>
                                                    )}

                                                    <div className="space-y-8">
                                                        {member.bio && member.bio.trim() !== '' && (
                                                            <p className="text-xl text-zinc-700 leading-relaxed font-medium">
                                                                {member.bio}
                                                            </p>
                                                        )}

                                                        {((member.linkedinUrl && member.linkedinUrl.trim() !== '') ||
                                                            (member.email && member.email.trim() !== '')) && (
                                                                <div className={`flex items-center ${isEven ? 'justify-center md:justify-start' : 'justify-center md:justify-end'} gap-6 pt-4`}>
                                                                    {member.linkedinUrl && member.linkedinUrl.trim() !== '' && (
                                                                        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer"
                                                                            className="w-14 h-14 rounded-2xl bg-[#0077b5] flex items-center justify-center text-white hover:bg-[#006097] transition-all shadow-xl hover:-translate-y-2 hover:rotate-3">
                                                                            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                                                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                                            </svg>
                                                                        </a>
                                                                    )}
                                                                    {member.email && member.email.trim() !== '' && (
                                                                        <a href={`mailto:${member.email}`}
                                                                            className="w-14 h-14 rounded-2xl bg-[#ea4335] flex items-center justify-center text-white hover:bg-[#d93025] transition-all shadow-xl hover:-translate-y-2 hover:-rotate-3">
                                                                            <svg className="w-7 h-7 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                            </svg>
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        </AnimatedSection>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-foreground/50">
                                No board members found.
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
