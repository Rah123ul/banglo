import React, { useState, useRef, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  VIDYA — AI Assistant for SNS Club / CIKS, NIT Calicut
//  Matches the site's warm saffron-maroon-sage palette
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE = 'https://sns-backend-t230.onrender.com';


// Suggested starter questions shown when chat is empty
const SUGGESTIONS = [
    'What is the SNS Club?',
    'Tell me about Vedic Mathematics',
    'How does Ayurveda relate to modern medicine?',
    'What events are coming up?',
    'Explain the Bhagavad Gita briefly',
];

// Simple markdown-lite renderer: bold, italic, inline code, line breaks
function renderMarkdown(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code style="background:#f2cc8f33;padding:1px 5px;border-radius:4px;font-size:0.9em">$1</code>')
        .replace(/\n/g, '<br/>');
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]); // { role: 'user'|'assistant', content: string, id: number, isConfirmation?: boolean }
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasGreeted, setHasGreeted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // ── Registration State ──────────────────────────────────────────────────
    const [regState, setRegState] = useState(null);
    /* regState = {
        step: 'select_event' | 'name' | 'email' | 'rollNo' | 'phone' | 'confirm',
        selectedEvent: null,
        events: [],
        name: '', email: '', rollNo: '', phone: '',
        abandonedMsg: null // Store message if user deviates
    } */

    const [confetti, setConfetti] = useState(false); // Success celebration

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const msgIdRef = useRef(0);

    // ── Registration Steps Config ──────────────────────────────────────────
    const REG_STEPS = {
        name: 1,
        email: 2,
        rollNo: 3,
        phone: 4,
        confirm: 5
    };

    // ── Mobile Detection ──────────────────────────────────────────────────────
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 480);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // ── Confetti effect ──────────────────────────────────────────────────────
    useEffect(() => {
        if (confetti) {
            const timer = setTimeout(() => setConfetti(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [confetti]);

    // ── Body Scroll Lock on Mobile ────────────────────────────────────────────
    useEffect(() => {
        if (isMobile && isOpen && !isMinimized) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobile, isOpen, isMinimized]);

    // ── Scroll to bottom on new messages ──────────────────────────────────────
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    // ── Focus input when chat opens ───────────────────────────────────────────
    useEffect(() => {
        if (isOpen && !isMinimized) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen, isMinimized]);

    // ── Greeting on first open ────────────────────────────────────────────────
    useEffect(() => {
        if (isOpen && !hasGreeted) {
            setHasGreeted(true);
            const greeting = {
                role: 'assistant',
                content:
                    'Namaste 🙏 I\'m **Vidya**, your AI guide for the Science & Spirituality Club at NIT Calicut.\n\nI can help you explore Indian Knowledge Systems, club events, Vedic sciences, and much more. What would you like to discover today?',
                id: ++msgIdRef.current,
            };
            setMessages([greeting]);
        }
    }, [isOpen, hasGreeted]);

    // ── Helper: Add Assistant Message ─────────────────────────────────────────
    const addVidyaMsg = (content, extra = {}) => {
        setMessages((prev) => [
            ...prev,
            { role: 'assistant', content, id: ++msgIdRef.current, ...extra },
        ]);
        setLoading(false);
    };

    // ── Registration Logic ───────────────────────────────────────────────────
    const startRegistrationFlow = async () => {
        setLoading(true);
        addVidyaMsg("🎉 Let's get you registered! First, let me check what events are available...");
        try {
            const res = await fetch(`${API_BASE}/api/events`);
            const events = await res.json();
            const activeEvents = events.filter((e) => e.isActive);

            if (activeEvents.length === 0) {
                addVidyaMsg('It looks like there are no active events for registration right now. Stay tuned for updates! 🙏');
                return;
            }

            setRegState({ step: 'select_event', events: activeEvents });
            addVidyaMsg('Please select an event to register:', { type: 'event_selection', events: activeEvents });
        } catch (err) {
            console.error('Fetch events error:', err);
            addVidyaMsg('I encountered an error fetching the events. Please try again in a moment. 🙏');
        } finally {
            setLoading(false);
        }
    };

    const handleRegistrationStep = async (text) => {
        const input = text?.trim();
        const lower = input?.toLowerCase();

        // Check for cancellation
        if (lower === 'cancel' || lower === 'exit') {
            setRegState(null);
            addVidyaMsg('Registration cancelled. What else can I help you with?');
            return;
        }

        const state = { ...regState };

        if (state.step === 'select_event') {
            // Can select by title (from card) or number/name (from text)
            let selected = state.events.find(e => e.title.toLowerCase() === lower);
            if (!selected) {
                const num = parseInt(input);
                if (!isNaN(num) && num > 0 && num <= state.events.length) {
                    selected = state.events[num - 1];
                }
            }
            if (!selected) {
                addVidyaMsg("I couldn't find that event. Please select one from the list above or type the name correctly.", { type: 'event_selection', events: state.events });
                return;
            }
            state.selectedEvent = selected;
            state.step = 'name';
            setRegState(state);
            addVidyaMsg(`Great! You're registering for **${selected.title}**. \n\nWhat is your **full name**?`);
            return;
        }

        if (state.step === 'name') {
            if (input.length < 2) {
                addVidyaMsg('Please enter a valid name.');
                return;
            }
            state.name = input;
            state.step = 'email';
            setRegState(state);
            addVidyaMsg(`Got it, ${input.split(' ')[0]}. And your **email address**?`);
            return;
        }

        if (state.step === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input)) {
                addVidyaMsg('Please enter a valid email address.');
                return;
            }
            state.email = input;
            state.step = 'rollNo';
            setRegState(state);
            addVidyaMsg('Thank you. What is your **roll number**?');
            return;
        }

        if (state.step === 'rollNo') {
            if (!input) {
                addVidyaMsg('Roll number cannot be empty.');
                return;
            }
            state.rollNo = input;
            state.step = 'phone';
            setRegState(state);
            addVidyaMsg('Almost there! Finally, your **10-digit phone number**?');
            return;
        }

        if (state.step === 'phone') {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(input.replace(/[- ]/g, ''))) {
                addVidyaMsg('Please enter a valid 10-digit phone number.');
                return;
            }
            state.phone = input;
            state.step = 'confirm';
            setRegState(state);
            addVidyaMsg('Please review your details:', {
                type: 'confirmation_summary',
                regData: { ...state }
            });
            return;
        }

        if (state.step === 'confirm') {
            if (lower === 'confirm') {
                setLoading(true);
                try {
                    const res = await fetch(`${API_BASE}/api/events/register`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: state.name,
                            email: state.email,
                            rollNo: state.rollNo,
                            phone: state.phone,
                            eventId: state.selectedEvent._id
                        })
                    });
                    const data = await res.json();
                    if (res.ok) {
                        setConfetti(true);
                        addVidyaMsg(`🎉 **Registration successful!** See you at **${state.selectedEvent.title}** 🙏\n\nA confirmation email will be sent to ${state.email}.`);
                        setRegState(null);
                    } else if (res.status === 409) {
                        addVidyaMsg('You have already registered for this event with this email! 😅');
                        setRegState(null);
                    } else {
                        addVidyaMsg('Something went wrong. Please try again or contact support.');
                    }
                } catch (err) {
                    addVidyaMsg('I encountered a network error. Please check your connection.');
                } finally {
                    setLoading(false);
                }
            } else {
                addVidyaMsg('Type **confirm** to finish or **cancel** to exit.');
            }
        }
    };

    // ── Send message ──────────────────────────────────────────────────────────
    const sendMessage = useCallback(
        async (text) => {
            const trimmed = (text || input).trim();
            if (!trimmed || loading) return;

            setInput('');
            setError('');

            const userMsg = { role: 'user', content: trimmed, id: ++msgIdRef.current };
            setMessages((prev) => [...prev, userMsg]);

            // 1. Handle registration keywords and flow logic
            const lower = trimmed.toLowerCase();
            if (!regState && (lower.includes('register') || lower.includes('sign up') || lower.includes('join event'))) {
                startRegistrationFlow();
                return;
            }

            if (regState) {
                // Abandonment check: if user asks something else mid-flow
                const isRegFollowUp = regState.step !== 'confirm' || lower === 'confirm' || lower === 'cancel';
                // Simple heuristic: if it looks like a question or completely different topic
                if (trimmed.includes('?') && !regState.step.includes('name')) {
                    setRegState({ ...regState, abandonedMsg: trimmed });
                    addVidyaMsg("We were in the middle of registration! Would you like to **continue** where we left off or **start fresh** with your new question?");
                    return;
                }

                if (lower === 'continue') {
                    // resumes naturally by doing nothing here
                    addVidyaMsg("Great! Let's continue. Please provide the details I asked for above.");
                    return;
                }

                if (lower === 'start fresh') {
                    const originalMsg = regState.abandonedMsg;
                    setRegState(null);
                    sendMessage(originalMsg);
                    return;
                }

                handleRegistrationStep(trimmed);
                return;
            }

            setLoading(true);

            // Build the payload (exclude id field — backend doesn't need it)
            const payload = [...messages, userMsg].map(({ role, content }) => ({ role, content }));

            try {
                const res = await fetch(`${API_BASE}/api/chat`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: payload }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || `Server error (${res.status}).`);
                }

                if (!data.reply) {
                    throw new Error('Vidya is silent right now.');
                }

                // Check for [START_REGISTRATION] trigger
                if (data.reply.includes('[START_REGISTRATION]')) {
                    const cleanedReply = data.reply.replace('[START_REGISTRATION]', '').trim();
                    if (cleanedReply) {
                        addVidyaMsg(cleanedReply);
                    }
                    startRegistrationFlow();
                } else {
                    addVidyaMsg(data.reply);
                }
            } catch (err) {
                console.error('Chat Error:', err);
                setError(err.message || 'Failed to reach Vidya.');
                setLoading(false);
            } finally {
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        },
        [input, loading, messages, regState]
    );

    // ── Key handler ───────────────────────────────────────────────────────────
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // ── Clear conversation ────────────────────────────────────────────────────
    const clearChat = () => {
        setMessages([]);
        setHasGreeted(false);
        setRegState(null);
        setError('');
        setTimeout(() => setHasGreeted(false), 50);
    };

    // ─────────────────────────────────────────────────────────────────────────
    //  RENDER
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <>
            {/* ── Floating Trigger Button ──────────────────────────────────── */}
            <div
                className="vidya-trigger-container"
                style={{
                    position: 'fixed',
                    bottom: isMobile ? '16px' : 'calc(env(safe-area-inset-bottom, 24px) + 8px)',
                    right: isMobile ? '16px' : '24px',
                    zIndex: 9999,
                    display: isOpen && !isMinimized ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'vidya-entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                }}
            >
                <div className="vidya-tooltip">Chat with Vidya</div>
                <button
                    onClick={() => { setIsOpen(true); setIsMinimized(false); }}
                    aria-label="Open Vidya AI Assistant"
                    className="vidya-trigger-btn"
                    style={{
                        position: 'relative', borderRadius: '50%', border: '2px solid #f2cc8f',
                        cursor: 'pointer', background: 'linear-gradient(135deg, #be3a34 0%, #4a1d1d 100%)',
                        boxShadow: '0 10px 30px rgba(74, 29, 29, 0.4), 0 4px 10px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', padding: 0, outline: 'none',
                    }}
                >
                    <svg width="60%" height="60%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="62" fontFamily="serif" fill="white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>ॐ</text>
                    </svg>
                    <span style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: '1.5px solid rgba(242, 204, 143, 0.3)', animation: 'vidya-pulse-slow 4s ease-out infinite', pointerEvents: 'none' }} />
                </button>
            </div>

            {/* ── Chat Window ─────────────────────────────────────────────── */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: isMobile && !isMinimized ? '0' : 'auto',
                        bottom: isMobile && !isMinimized ? '0' : '28px',
                        right: isMobile && !isMinimized ? '0' : '28px',
                        left: isMobile && !isMinimized ? '0' : 'auto',
                        zIndex: 9998,
                        width: isMinimized ? '280px' : (isMobile ? '100%' : '380px'),
                        height: isMinimized ? 'auto' : (isMobile ? '100%' : '580px'),
                        borderRadius: isMobile && !isMinimized ? '0' : '20px',
                        overflow: 'hidden',
                        boxShadow: '0 24px 60px rgba(74,29,29,0.25), 0 8px 20px rgba(0,0,0,0.15)',
                        display: 'flex', flexDirection: 'column',
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        animation: isMobile && !isMinimized ? 'vidya-slideUpMobile 0.4s ease-out' : 'vidya-slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                        border: '1px solid rgba(190,58,52,0.15)',
                        background: '#fdf8f3', transition: 'all 0.3s ease',
                    }}
                >
                    {/* Header */}
                    <div style={{ background: 'linear-gradient(135deg, #4a1d1d 0%, #be3a34 100%)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '100px', height: '100px', opacity: 0.06, fontSize: '90px', lineHeight: 1, fontFamily: 'serif', color: '#f2cc8f', userSelect: 'none', pointerEvents: 'none' }}>ॐ</div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(242,204,143,0.25)', border: '2px solid rgba(242,204,143,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>🪔</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ color: '#f2cc8f', fontWeight: 'bold', fontSize: '16px', letterSpacing: '0.5px' }}>Vidya</div>
                            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontFamily: 'sans-serif', letterSpacing: '0.3px' }}>
                                {loading ? <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><TypingDots small /> thinking…</span> : 'SNS Club · CIKS, NIT Calicut'}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '4px', position: 'relative', zIndex: 2 }}>
                            {regState && (
                                <IconBtn title="Cancel registration" onClick={() => { setRegState(null); addVidyaMsg('Registration cancelled. What else can I help you with?'); }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                </IconBtn>
                            )}
                            <IconBtn title="Clear chat" onClick={clearChat}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /></svg>
                            </IconBtn>
                            <IconBtn title={isMinimized ? 'Expand' : 'Minimize'} onClick={() => setIsMinimized((v) => !v)}>
                                {isMinimized ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg> : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>}
                            </IconBtn>
                            <IconBtn title="Close" onClick={() => setIsOpen(false)}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </IconBtn>
                        </div>
                    </div>

                    {!isMinimized && (
                        <>
                            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'linear-gradient(180deg, #fdf8f3 0%, #faf4eb 100%)', scrollbarWidth: 'thin', scrollbarColor: '#e07a5f33 transparent', position: 'relative' }}>
                                {/* Progress Bar */}
                                {regState && REG_STEPS[regState.step] && (
                                    <ProgressBar
                                        current={REG_STEPS[regState.step]}
                                        total={Object.keys(REG_STEPS).length}
                                    />
                                )}

                                {messages.length === 1 && (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '8px',
                                        marginTop: '4px'
                                    }}>
                                        {/* Primary Action Button */}
                                        <button
                                            onClick={() => startRegistrationFlow()}
                                            className="vidya-reg-btn-special"
                                            style={{
                                                gridColumn: '1 / span 2',
                                                background: 'linear-gradient(135deg, #be3a34 0%, #8B2020 100%)',
                                                color: 'white',
                                                border: '1px solid #f2cc8f',
                                                borderRadius: '24px',
                                                padding: '12px 16px',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                boxShadow: '0 4px 15px rgba(190,58,52,0.3)',
                                            }}
                                        >
                                            <span style={{ fontSize: '18px' }}>📋</span>
                                            Register for an Event
                                            <span className="vidya-arrow">→</span>
                                            <div className="vidya-shimmer"></div>
                                        </button>
                                        <div style={{
                                            gridColumn: '1 / span 2',
                                            textAlign: 'center',
                                            fontSize: '10px',
                                            color: '#be3a34',
                                            marginTop: '-4px',
                                            marginBottom: '8px',
                                            opacity: 0.8
                                        }}>
                                            Instant registration via chat
                                        </div>

                                        {SUGGESTIONS.map((s) => (
                                            <button key={s} onClick={() => sendMessage(s)} style={{ background: 'white', border: '1px solid rgba(190,58,52,0.25)', borderRadius: '20px', padding: isMobile ? '7px 10px' : '5px 12px', fontSize: isMobile ? '11px' : '11.5px', color: '#4a1d1d', cursor: 'pointer', fontFamily: 'sans-serif', transition: 'all 0.15s', lineHeight: '1.3', textAlign: 'center' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#be3a34'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#be3a34'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#4a1d1d'; e.currentTarget.style.borderColor = 'rgba(190,58,52,0.25)'; }}>{s}</button>
                                        ))}
                                    </div>
                                )}
                                {messages.map((msg) => (
                                    <MessageBubble
                                        key={msg.id}
                                        msg={msg}
                                        regState={regState}
                                        onSelectEvent={(ev) => handleRegistrationStep(ev.title)}
                                        onConfirm={() => handleRegistrationStep('confirm')}
                                        onCancel={() => handleRegistrationStep('cancel')}
                                    />
                                ))}
                                {loading && (
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #be3a34, #4a1d1d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>🪔</div>
                                        <div style={{ background: 'white', borderRadius: '16px 16px 16px 4px', padding: '10px 14px', border: '1px solid rgba(190,58,52,0.12)' }}>
                                            <TypingDots />
                                        </div>
                                    </div>
                                )}
                                {error && (
                                    <div style={{ background: '#fff0f0', border: '1px solid #ffcdd2', borderRadius: '10px', padding: '10px 12px', fontSize: '12.5px', color: '#c62828', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', gap: '6px' }}>⚠️ {error}</div>
                                )}
                                <div ref={messagesEndRef} />

                                {/* Confetti overlay */}
                                {confetti && (
                                    <div style={{
                                        position: 'absolute', inset: 0, pointerEvents: 'none',
                                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                                        fontSize: '40px', zIndex: 10, animation: 'vidya-confetti 2s ease-out forwards'
                                    }}>
                                        🎉✨🎊🥳✨🎉
                                    </div>
                                )}
                            </div>

                            <div style={{ height: '1px', background: 'rgba(190,58,52,0.1)' }} />

                            <div style={{ padding: '10px 12px', background: '#fdf8f3', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={regState ? "Type your response..." : "Ask Vidya anything…"}
                                    rows={1}
                                    disabled={loading}
                                    style={{ flex: 1, resize: 'none', border: '1.5px solid rgba(190,58,52,0.3)', borderRadius: '12px', padding: isMobile ? '12px 14px' : '9px 12px', fontSize: '13.5px', fontFamily: "'Georgia', serif", background: loading ? '#faf6f0' : 'white', color: '#3d1a1a', outline: 'none', lineHeight: '1.5', maxHeight: '100px', overflowY: 'auto', transition: 'all 0.2s' }}
                                    onFocus={(e) => e.target.style.borderColor = '#be3a34'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(190,58,52,0.3)'}
                                    onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'; }}
                                />
                                <button
                                    onClick={() => sendMessage()}
                                    disabled={!input.trim() || loading}
                                    style={{ width: isMobile ? '46px' : '40px', height: isMobile ? '46px' : '40px', borderRadius: '50%', border: 'none', cursor: !input.trim() || loading ? 'not-allowed' : 'pointer', background: !input.trim() || loading ? '#e8d5d5' : 'linear-gradient(135deg, #be3a34 0%, #4a1d1d 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s, transform 0.1s', transform: 'translateY(-1px)' }}
                                    onMouseEnter={(e) => { if (!(!input.trim() || loading)) e.currentTarget.style.transform = 'scale(1.08) translateY(-1px)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                </button>
                            </div>

                            <div style={{ textAlign: 'center', padding: '4px 0 8px', fontSize: '10px', color: 'rgba(74,29,29,0.35)', fontFamily: 'sans-serif', letterSpacing: '0.5px', background: '#fdf8f3' }}>
                                Powered by Llama 3.3 · CIKS, NIT Calicut
                            </div>
                        </>
                    )}
                </div>
            )}

            <style>{`
                :root { --vidya-btn-size: 58px; }
                @media (max-width: 600px) { :root { --vidya-btn-size: 64px; } }
                .vidya-trigger-btn { width: var(--vidya-btn-size); height: var(--vidya-btn-size); }
                .vidya-trigger-btn:hover { transform: scale(1.08) translateY(-3px); box-shadow: 0 15px 35px rgba(74, 29, 29, 0.5); }
                .vidya-tooltip { position: absolute; right: calc(var(--vidya-btn-size) + 12px); background: #4a1d1d; color: #f2cc8f; padding: 6px 14px; border-radius: 8px; font-size: 13px; white-space: nowrap; pointer-events: none; opacity: 0; transform: translateX(10px); transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border: 1px solid rgba(242, 204, 143, 0.2); font-family: sans-serif; }
                .vidya-trigger-container:hover .vidya-tooltip { opacity: 1; transform: translateX(0); }
                @media (max-width: 800px) { .vidya-tooltip { display: none; } }
                .vidya-reg-btn-special:hover { transform: scale(1.02); filter: brightness(1.1); }
                .vidya-arrow { margin-left: 8px; transition: transform 0.2s; }
                .vidya-reg-btn-special:hover .vidya-arrow { transform: translateX(4px); }
                .vidya-shimmer { position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); animation: vidya-shimmer 3s infinite; }
                @keyframes vidya-shimmer { 0% { left: -100%; } 30% { left: 200%; } 100% { left: 200%; } }
                @keyframes vidya-confetti { 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: translateY(-50px); opacity: 0; } }

                @keyframes vidya-entrance { 0% { opacity: 0; transform: translateY(40px) scale(0.5); rotate: -15deg; } 100% { opacity: 1; transform: translateY(0) scale(1); rotate: 0deg; } }
                @keyframes vidya-slideUpMobile { from { transform: translateY(100%); } to { transform: translateY(0); } }
                @keyframes vidya-pulse-slow { 0% { transform: scale(1); opacity: 0.5; } 70% { transform: scale(1.4); opacity: 0; } 100% { transform: scale(1.4); opacity: 0; } }
                @keyframes vidya-slideUp { from { opacity: 0; transform: translateY(20px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes vidya-dot { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }
                @keyframes vidya-fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
    const progress = (current / total) * 100;
    return (
        <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
            background: 'rgba(190,58,52,0.1)', zIndex: 10
        }}>
            <div style={{
                width: `${progress}%`, height: '100%',
                background: 'linear-gradient(90deg, #be3a34, #f2cc8f)',
                transition: 'width 0.5s ease-out'
            }} />
        </div>
    );
}


function MessageBubble({ msg, regState, onSelectEvent, onConfirm, onCancel }) {
    const isUser = msg.role === 'user';
    const type = msg.type;

    return (
        <div style={{
            display: 'flex',
            flexDirection: isUser ? 'row-reverse' : 'row',
            alignItems: 'flex-end',
            gap: '8px',
            animation: 'vidya-fadeIn 0.25s ease',
        }}>
            {!isUser && (
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #be3a34, #4a1d1d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>🪔</div>
            )}

            <div style={{
                maxWidth: '82%',
                background: isUser ? 'linear-gradient(135deg, #be3a34 0%, #8B2020 100%)' : 'white',
                color: isUser ? 'white' : '#3d1a1a',
                borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                padding: '10px 13px',
                fontSize: '13.5px',
                lineHeight: '1.6',
                fontFamily: "'Georgia', serif",
                border: isUser ? 'none' : '1px solid rgba(190,58,52,0.12)',
                boxShadow: isUser ? '0 4px 12px rgba(190,58,52,0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
                wordBreak: 'break-word',
                ...(type === 'confirmation_summary' && {
                    border: '2px solid #f2cc8f',
                    background: '#fffdf9',
                    padding: '16px',
                    borderRadius: '16px',
                })
            }}>
                {type === 'event_selection' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ fontWeight: 'bold', color: '#4a1d1d', marginBottom: '4px' }}>Upcoming Events:</div>
                        {msg.events?.map((ev) => (
                            <div key={ev._id} style={{
                                padding: '12px', borderLeft: '3px solid #f2cc8f',
                                background: '#fdf8f3', borderRadius: '8px',
                                display: 'flex', flexDirection: 'column', gap: '4px',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s',
                                cursor: 'default'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ fontWeight: 'bold', color: '#be3a34' }}>{ev.title}</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>📅 {ev.month} {ev.day} | 🕒 {ev.time}</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>📍 {ev.location}</div>
                                <button
                                    onClick={() => onSelectEvent(ev)}
                                    style={{
                                        marginTop: '6px', padding: '6px', borderRadius: '4px', border: 'none',
                                        background: '#81b29a', color: 'white', fontWeight: 'bold', cursor: 'pointer',
                                        fontSize: '12px', transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.background = '#6b9c84'}
                                    onMouseLeave={(e) => e.target.style.background = '#81b29a'}
                                >
                                    Select this event →
                                </button>
                            </div>
                        ))}
                    </div>
                ) : type === 'confirmation_summary' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontWeight: 'bold', borderBottom: '1px solid #f2cc8f', paddingBottom: '6px', marginBottom: '4px', color: '#4a1d1d' }}>
                            Confirm Registration 📋
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                            <div><span style={{ color: 'rgba(74,29,29,0.6)' }}>📌 Event:</span> <span style={{ fontWeight: '600' }}>{msg.regData?.selectedEvent?.title}</span></div>
                            <div><span style={{ color: 'rgba(74,29,29,0.6)' }}>👤 Name:</span> <span>{msg.regData?.name}</span></div>
                            <div><span style={{ color: 'rgba(74,29,29,0.6)' }}>📧 Email:</span> <span>{msg.regData?.email}</span></div>
                            <div><span style={{ color: 'rgba(74,29,29,0.6)' }}>🎓 Roll No:</span> <span>{msg.regData?.rollNo}</span></div>
                            <div><span style={{ color: 'rgba(74,29,29,0.6)' }}>📱 Phone:</span> <span>{msg.regData?.phone}</span></div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                            <button
                                onClick={onConfirm}
                                style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: '#81b29a', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                            >Confirm ✓</button>
                            <button
                                onClick={onCancel}
                                style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: '#be3a34', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                            >Cancel ✗</button>
                        </div>
                    </div>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                )}
            </div>

            {isUser && (
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #81b29a, #5a8a72)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>🎓</div>
            )}
        </div>
    );
}

function TypingDots({ small }) {
    const size = small ? 5 : 7;
    const dots = [0, 0.15, 0.3];
    return (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: small ? '16px' : '20px' }}>
            {dots.map((delay, i) => (
                <span key={i} style={{
                    width: size, height: size,
                    borderRadius: '50%',
                    background: small ? 'rgba(255,255,255,0.8)' : '#be3a34',
                    display: 'inline-block',
                    animation: `vidya-dot 1.2s ease-in-out ${delay}s infinite`,
                }} />
            ))}
        </div>
    );
}

function IconBtn({ children, onClick, title }) {
    return (
        <button
            onClick={onClick}
            title={title}
            style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                width: '28px', height: '28px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.75)',
                transition: 'background 0.15s, color 0.15s',
                padding: 0,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.22)';
                e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
            }}
        >
            {children}
        </button>
    );
}