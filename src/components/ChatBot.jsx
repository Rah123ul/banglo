import React, { useState, useRef, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  AYUSH AI — Memorial Assistant for SNS Club / CIKS, NIT Calicut
//  Dedicated to the memory of Ayush Aditya (1998-2024)
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const COLORS = {
    maroon: '#be3a34',
    darkMaroon: '#4a1d1d',
    gold: '#f2cc8f',
    sage: '#81b29a',
    cream: '#fdf8f3'
};

// ── Highlight Helper ────────────────────────────────────────────────────────
const h = (text, type = 'event') => {
    let styles = "font-weight:700;padding:1px 5px;border-radius:4px;font-family:Georgia,serif;";
    if (type === 'event') {
        styles += `color:#be3a34;background:rgba(190,58,52,0.08);`;
    } else if (type === 'field') {
        styles += `color:#4a1d1d;background:rgba(74,29,29,0.07);`;
    } else if (type === 'success') {
        styles += `color:#2d7a4f;background:rgba(45,122,79,0.08);`;
    } else if (type === 'name') {
        styles += `color:#81b29a;background:transparent;`;
    }
    return `<span style="${styles}">${text}</span>`;
};

const QUICK_ACTIONS = [
    { label: '🏛️ Club Events', query: 'Tell me about upcoming club events' },
    { label: '📚 Indian Knowledge Systems', query: 'Explain Indian Knowledge Systems' },
    { label: '🔬 SNS Activities', query: 'What are the main activities of SNS Club?' },
    { label: '💬 Ask Anything', query: 'How can you help me today?' }
];

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [showScrollNudge, setShowScrollNudge] = useState(false);
    const [fabVisible, setFabVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);

    // ── Session & Memorial State ──────────────────────────────────────────────
    const hasGreeted = useRef(false);
    const hasTooltipShown = useRef(false);
    const userName = useRef('');
    const nudgeTimer = useRef(null);
    const msgIdRef = useRef(0);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);
    const chatWindowRef = useRef(null);
    const windowHeightRef = useRef(window.innerHeight);

    // ── Registration State ──────────────────────────────────────────────────
    const [regState, setRegState] = useState(null);
    const [confetti, setConfetti] = useState(false);

    // ── Initialization & Detection ──────────────────────────────────────────
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width <= 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // FAB Entrance Animation (1.5s delay)
        const timer = setTimeout(() => setFabVisible(true), 1500);

        // Memorial Tooltip (5s delay, 6s duration)
        const tooltipTimer = setTimeout(() => {
            if (!hasTooltipShown.current && !isOpen) {
                setShowTooltip(true);
                hasTooltipShown.current = true;
                setTimeout(() => setShowTooltip(false), 6000);
            }
        }, 5000);

        // Escape Key Close
        const handleEsc = (e) => { if (e.key === 'Escape' && isOpen) setIsOpen(false); };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleEsc);
            clearTimeout(timer);
            clearTimeout(tooltipTimer);
        };
    }, [isOpen]);

    // Body Scroll Lock
    useEffect(() => {
        if (isMobile && isOpen && !isMinimized) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    }, [isMobile, isOpen, isMinimized]);

    // ── Solution 1: visualViewport API (Android keyboard detection) ────────
    useEffect(() => {
        if (!window.visualViewport || !isOpen) return;

        const handleViewportResize = () => {
            const viewport = window.visualViewport;
            if (chatWindowRef.current && isMobile) {
                chatWindowRef.current.style.height = `${viewport.height}px`;
                chatWindowRef.current.style.top = `${viewport.offsetTop}px`;
            }
            // Also scroll to bottom when keyboard opens
            setTimeout(() => scrollToBottom(), 100);
        };

        window.visualViewport.addEventListener('resize', handleViewportResize);
        window.visualViewport.addEventListener('scroll', handleViewportResize);

        return () => {
            window.visualViewport.removeEventListener('resize', handleViewportResize);
            window.visualViewport.removeEventListener('scroll', handleViewportResize);
        };
    }, [isOpen, isMobile]);

    // ── Solution 5: Resize detection fallback (keyboard open/close) ────────
    useEffect(() => {
        const handleResize = () => {
            const newHeight = window.innerHeight;
            const heightDiff = windowHeightRef.current - newHeight;

            // Keyboard opened (height reduced by > 150px)
            if (heightDiff > 150 && isMobile) {
                setTimeout(() => scrollToBottom(), 100);
            }
            windowHeightRef.current = newHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]);

    // Inactivity Nudge
    useEffect(() => {
        if (isOpen && !loading && messages.length > 0) {
            clearTimeout(nudgeTimer.current);
            nudgeTimer.current = setTimeout(() => {
                addAyushMsg("Still there? Feel free to ask anything 🙏", { isNudge: true });
            }, 90000);
        }
        return () => clearTimeout(nudgeTimer.current);
    }, [isOpen, loading, messages.length]);

    // Scroll Management
    const scrollToBottom = (behavior = 'smooth') => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior });
        }
    };

    // ── Solution 2: Input focus scroll (backup fix) ───────────────────────
    const handleInputFocus = () => {
        if (window.innerWidth < 768) {
            setTimeout(() => {
                inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                scrollToBottom();
            }, 400); // wait for keyboard animation
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 80;
            setShowScrollNudge(!isNearBottom);
        }
    };

    useEffect(() => {
        if (!showScrollNudge) scrollToBottom();
    }, [messages, loading]);

    useEffect(() => {
        if (isOpen && !hasGreeted.current) {
            hasGreeted.current = true;
            const greetingMsg = {
                role: 'assistant',
                type: 'tribute_welcome',
                content: "Namaste! I am Ayush AI, a memorial assistant dedicated to Ayush Aditya. How can I help you today?",
                id: ++msgIdRef.current
            };
            setMessages([greetingMsg]);
        }
    }, [isOpen]);

    // ── Helpers ─────────────────────────────────────────────────────────────
    const addAyushMsg = (content, extra = {}) => {
        setMessages((prev) => [
            ...prev,
            { role: 'assistant', content, id: ++msgIdRef.current, ...extra },
        ]);
        setLoading(false);
    };

    const extractName = (text) => {
        const matches = text.match(/(?:I'm|My name is|I am) ([A-Z][a-z]+)/i);
        if (matches && matches[1]) userName.current = matches[1];
    };

    // ── Registration Flow ───────────────────────────────────────────────────
    const startRegistrationFlow = async () => {
        setLoading(true);
        addAyushMsg("🎉 Let's get you registered! Checking available events...");
        try {
            const res = await fetch(`${API_BASE}/api/events`);
            const events = await res.json();
            const activeEvents = events; // filtered by backend
            if (activeEvents.length === 0) {
                addAyushMsg('No active events for registration right now. Stay tuned! 🙏');
                return;
            }
            setRegState({ step: 'select_event', events: activeEvents });
            addAyushMsg('Please select an event:', { type: 'event_selection', events: activeEvents });
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleRegistrationStep = async (text) => {
        const input = text?.trim();
        const lower = input?.toLowerCase();
        if (lower === 'cancel' || lower === 'exit') {
            setRegState(null);
            addAyushMsg('Registration cancelled. What else can I help you with?');
            return;
        }
        const state = { ...regState };
        if (state.step === 'select_event') {
            let selected = state.events.find(e => e.title.toLowerCase() === lower);
            if (!selected) {
                const num = parseInt(input);
                if (!isNaN(num) && num > 0 && num <= state.events.length) selected = state.events[num - 1];
            }
            if (!selected) {
                addAyushMsg("Event not found. Please select from the list.", { type: 'event_selection', events: state.events });
                return;
            }
            state.selectedEvent = selected;
            state.step = 'name';
            setRegState(state);
            addAyushMsg(`Registering for ${h(selected.title, 'event')}. What is your ${h('full name', 'field')}?`);
            return;
        }
        if (state.step === 'name') {
            state.name = input;
            state.step = 'email';
            setRegState(state);
            addAyushMsg(`Got it, ${h(input.split(' ')[0], 'name')}. Your ${h('email address', 'field')}?`);
            return;
        }
        if (state.step === 'email') {
            state.email = input;
            state.step = 'rollNo';
            setRegState(state);
            addAyushMsg(`Your ${h('roll number', 'field')}?`);
            return;
        }
        if (state.step === 'rollNo') {
            state.rollNo = input;
            state.step = 'phone';
            setRegState(state);
            addAyushMsg(`Final step: your ${h('10-digit phone number', 'field')}?`);
            return;
        }
        if (state.step === 'phone') {
            state.phone = input;
            state.step = 'confirm';
            setRegState(state);
            addAyushMsg('Review your details:', { type: 'confirmation_summary', regData: { ...state } });
            return;
        }
        if (state.step === 'confirm' && lower === 'confirm') {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE}/api/events/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: state.name, email: state.email,
                        rollNo: state.rollNo, phone: state.phone,
                        eventId: state.selectedEvent._id
                    })
                });
                if (res.ok) {
                    setConfetti(true);
                    addAyushMsg(`🎉 ${h('Registration successful!', 'success')} See you at ${h(state.selectedEvent.title, 'event')} 🙏`);
                    setRegState(null);
                } else {
                    setError(true);
                }
            } catch (err) { setError(true); }
            finally { setLoading(false); }
        }
    };

    // ── Chat Logic ──────────────────────────────────────────────────────────
    const sendMessage = useCallback(async (text) => {
        const trimmed = (text || input).trim();
        if (!trimmed || loading) return;

        setInput('');
        setError(false);
        extractName(trimmed);

        const userMsg = {
            role: 'user',
            content: trimmed,
            id: ++msgIdRef.current,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, userMsg]);

        if (trimmed.toLowerCase().includes('about ayush aditya')) {
            addAyushMsg('', { type: 'memorial_plaque' });
            return;
        }

        if (!regState && (trimmed.toLowerCase().includes('register') || trimmed.toLowerCase().includes('sign up'))) {
            startRegistrationFlow();
            return;
        }

        if (regState) {
            handleRegistrationStep(trimmed);
            return;
        }

        setLoading(true);
        const payload = messages.slice(-12).map(({ role, content }) => ({ role, content }));
        payload.push({ role: 'user', content: trimmed });

        try {
            const res = await fetch(`${API_BASE}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: payload }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error();

            setSendSuccess(true);
            setTimeout(() => setSendSuccess(false), 500);

            let reply = data.reply;
            if (userName.current && !reply.toLowerCase().includes(userName.current.toLowerCase())) {
                reply = reply.replace(/Namaste|Hello|Hi/i, `Namaste ${userName.current}`);
            }

            if (reply.includes('[START_REGISTRATION]')) {
                addAyushMsg(reply.replace('[START_REGISTRATION]', '').trim());
                startRegistrationFlow();
            } else {
                addAyushMsg(reply, { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
            }
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }, [input, loading, messages, regState]);

    const handleRetry = () => {
        setError(false);
        const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
        if (lastUserMsg) sendMessage(lastUserMsg.content);
    };

    // ── Render ───────────────────────────────────────────────────────────────

    // Window Dimension Logic 
    let windowStyles = {
        position: 'fixed',
        bottom: '148px',
        right: '24px',
        width: '380px',
        height: '600px',
        minHeight: '550px',
        zIndex: 9998,
        borderRadius: '20px'
    };

    // Solution 3: Use dvh for mobile (dynamic viewport height)
    if (isMobile) {
        windowStyles = {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100dvh',
            minHeight: '-webkit-fill-available',
            borderRadius: '0',
            zIndex: 99999,
            overscrollBehavior: 'contain',
            touchAction: 'pan-y'
        };
    } else if (isTablet) {
        windowStyles = {
            ...windowStyles,
            width: '400px',
            height: '650px'
        };
    }

    return (
        <>
            {/* ── FAB BUTTON ────────────────────────────────────────────── */}
            {fabVisible && (
                <div
                    className="ayush-ai-trigger-container"
                    style={{
                        position: 'fixed', bottom: '80px', right: '24px', zIndex: 9999,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                        animation: 'fabEntrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both'
                    }}
                >
                    {showTooltip && (
                        <div style={{
                            background: COLORS.darkMaroon, color: COLORS.gold, padding: '8px 16px', borderRadius: '20px',
                            fontSize: '12px', whiteSpace: 'nowrap', position: 'relative', animation: 'tooltipFadeIn 0.3s ease-out'
                        }}>
                            Need guidance? Ask Ayush AI 🙏
                            <div style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `6px solid ${COLORS.darkMaroon}` }} />
                        </div>
                    )}
                    <button
                        onClick={() => { setIsOpen(true); setIsMinimized(false); setShowTooltip(false); }}
                        style={{
                            width: '56px', height: '56px', borderRadius: '50%', border: `2px solid ${COLORS.gold}`,
                            background: `linear-gradient(135deg, ${COLORS.maroon} 0%, #8B2020 100%)`, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, outline: 'none',
                            boxShadow: '0 4px 20px rgba(190,58,52,0.4), 0 2px 8px rgba(0,0,0,0.2)',
                            position: 'relative', transition: 'transform 0.2s'
                        }}
                    >
                        <span style={{ fontSize: '26px', fontFamily: 'serif', color: 'white', fontWeight: 'bold' }}>A</span>
                        <div className="pulse-ring" />
                    </button>
                    <span style={{ fontSize: '10px', color: 'white', letterSpacing: '1px', textShadow: '0 1px 2px rgba(0,0,0,0.5)', fontWeight: 'bold' }}>AYUSH AI</span>
                </div>
            )}

            {/* ── CHAT WINDOW ───────────────────────────────────────────── */}
            {isOpen && (
                <div
                    ref={chatWindowRef}
                    style={{
                        ...windowStyles,
                        background: '#fff',
                        boxShadow: '0 12px 48px rgba(0,0,0,0.25)',
                        display: 'flex', flexDirection: 'column',
                        overflow: 'hidden',
                        animation: isMobile ? 'none' : 'windowEntrance 0.3s ease-out'
                    }}>
                    {/* Header */}
                    <div style={{ background: `linear-gradient(135deg, ${COLORS.darkMaroon} 0%, ${COLORS.maroon} 100%)`, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: `1px solid ${COLORS.gold}30` }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ color: COLORS.gold, fontWeight: 'bold', fontSize: '15px', letterSpacing: '0.3px' }}>Ayush AI</div>
                            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', fontWeight: '500' }}></div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <HeaderBtn onClick={() => { setMessages([]); hasGreeted.current = false; }} icon="♻️" title="Clear" />
                            {!isMobile && <HeaderBtn onClick={() => setIsMinimized(!isMinimized)} icon={isMinimized ? "↑" : "−"} title="Minimize" />}
                            <HeaderBtn onClick={() => setIsOpen(false)} icon="×" title="Close" />
                        </div>
                    </div>

                    {!isMinimized && (
                        <>
                            {/* Messages Container */}
                            <div
                                ref={scrollRef}
                                onScroll={handleScroll}
                                style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'linear-gradient(180deg, #fdf8f3 0%, #faf4eb 100%)', position: 'relative', minHeight: 0, WebkitOverflowScrolling: 'touch' }}
                            >
                                {messages.map((msg) => (
                                    <MsgBubble
                                        key={msg.id} msg={msg}
                                        onAction={(q) => sendMessage(q)}
                                        onRegister={startRegistrationFlow}
                                        onConfirm={() => handleRegistrationStep('confirm')}
                                        onCancel={() => handleRegistrationStep('cancel')}
                                    />
                                ))}

                                {loading && (
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                                        <div className="lotus-pulse">🪷</div>
                                        <div style={{ background: 'white', padding: '10px 15px', borderRadius: '15px 15px 15px 4px', border: `1px solid ${COLORS.maroon}15`, fontSize: '14px' }}>Seeking knowledge...</div>
                                    </div>
                                )}

                                {error && (
                                    <div style={{ padding: '15px', background: '#fff0f0', border: '1px solid #ffcdd2', borderRadius: '12px', textAlign: 'center' }}>
                                        <p style={{ color: COLORS.darkMaroon, fontSize: '13px', margin: '0 0 10px 0' }}>🕯️ Ayush AI is momentarily away. Please try again.</p>
                                        <button onClick={handleRetry} style={{ padding: '8px 20px', background: COLORS.maroon, color: 'white', border: 'none', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Retry</button>
                                    </div>
                                )}

                                {/* Scroll Nudge */}
                                {showScrollNudge && (
                                    <button
                                        onClick={() => scrollToBottom()}
                                        style={{
                                            position: 'absolute',
                                            bottom: '70px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: COLORS.darkMaroon,
                                            color: COLORS.gold,
                                            border: 'none',
                                            borderRadius: '20px',
                                            padding: '8px 16px',
                                            fontSize: '11px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            zIndex: 100,
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                            whiteSpace: 'nowrap',
                                            pointerEvents: 'auto'
                                        }}
                                    >
                                        ↓ New message
                                    </button>
                                )}
                            </div>

                            {/* Input Area — Solution 4: Sticky bottom input */}
                            <div style={{ padding: '15px', background: COLORS.cream, borderTop: '1px solid rgba(0,0,0,0.08)', position: 'sticky', bottom: 0, zIndex: 10 }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', background: 'white', borderRadius: '28px', padding: '6px 8px 6px 16px', border: `1.5px solid ${COLORS.maroon}40` }}>
                                    <textarea
                                        ref={inputRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                        onFocus={handleInputFocus}
                                        placeholder="Ask Ayush AI anything..."
                                        rows={1}
                                        inputMode="text"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        spellCheck="false"
                                        style={{ flex: 1, border: 'none', background: 'none', outline: 'none', padding: '10px 0', fontSize: '14px', fontFamily: 'serif', resize: 'none', maxHeight: '120px', touchAction: 'manipulation' }}
                                        onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`; }}
                                    />
                                    <button
                                        onClick={() => { sendMessage(); if (isMobile) setTimeout(() => inputRef.current?.focus(), 50); }}
                                        disabled={!input.trim() || loading}
                                        style={{
                                            width: '40px', height: '40px', borderRadius: '50%', border: 'none',
                                            background: sendSuccess ? COLORS.sage : (input.trim() ? COLORS.maroon : '#ddd'),
                                            color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            touchAction: 'manipulation'
                                        }}
                                    >
                                        ➔
                                    </button>
                                </div>
                                <div style={{ textAlign: 'center', padding: '10px 0 0', fontSize: '10px', color: 'rgba(0,0,0,0.4)' }}>

                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            <style>{`
                @keyframes fabEntrance {
                    0% { transform: translateY(60px) scale(0.5); opacity: 0; }
                    60% { transform: translateY(-10px) scale(1.1); opacity: 1; }
                    100% { transform: translateY(0) scale(1); }
                }
                @keyframes windowEntrance {
                    from { transform: scale(0.9) translateY(20px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }
                @keyframes ringPulse {
                    0% { transform: scale(1); opacity: 0.6; }
                    80% { transform: scale(1.8); opacity: 0; }
                    100% { transform: scale(1.8); opacity: 0; }
                }
                .pulse-ring {
                    position: absolute; inset: -4px; border-radius: 50%; border: 2.5px solid ${COLORS.maroon}50;
                    animation: ringPulse 2.5s ease-out 4s infinite;
                }
                .lotus-pulse { font-size: 26px; animation: lotusPulse 2.5s ease-in-out infinite; }
                @keyframes lotusPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.25); opacity: 0.8; }
                }
            `}</style>
        </>
    );
}

function HeaderBtn({ icon, onClick, title }) {
    return (
        <button
            onClick={onClick} title={title}
            style={{
                width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,255,255,0.12)',
                border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
        >
            <span style={{ fontSize: '14px' }}>{icon}</span>
        </button>
    );
}

function MsgBubble({ msg, onAction, onRegister, onConfirm, onCancel }) {
    const isUser = msg.role === 'user';
    const type = msg.type;

    if (type === 'tribute_welcome') {
        return (
            <div style={{ background: '#fffcf7', border: `1.5px solid ${COLORS.gold}`, borderRadius: '20px', padding: '24px', textAlign: 'center', boxShadow: '0 6px 20px rgba(242,204,143,0.2)' }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: COLORS.darkMaroon, fontFamily: 'serif' }}> </h3>
                <p style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 10px 0', color: COLORS.darkMaroon }}>Welcome to SNS Club AI.</p>
                <p style={{ fontSize: '14px', fontStyle: 'italic', lineHeight: '1.7', color: COLORS.darkMaroon, opacity: 0.9 }}>
                    This assistant is dedicated to the memory of Ayush Aditya —
                    a bright soul, active member of SNS Club, and seeker of knowledge.
                    May his curiosity and spirit live on through every question asked here.
                </p>
                <div style={{ height: '1.5px', background: COLORS.gold, margin: '20px 0' }} />
                <p style={{ fontWeight: 'bold', margin: '0 0 20px 0', color: COLORS.maroon, fontSize: '15px' }}>I'm Ayush AI. How can I help you today?</p>

                <button
                    onClick={onRegister}
                    style={{
                        width: '100%', padding: '14px', background: COLORS.maroon, color: 'white',
                        border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer'
                    }}
                >📋 Register for an Event</button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
                    {QUICK_ACTIONS.map(a => (
                        <button key={a.label} onClick={() => onAction(a.query)} style={{ padding: '10px', background: 'white', border: `1.2px solid ${COLORS.maroon}25`, borderRadius: '14px', fontSize: '11px', fontWeight: '600', color: COLORS.darkMaroon, cursor: 'pointer' }}>{a.label}</button>
                    ))}
                </div>

                <button
                    onClick={() => onAction('About Ayush Aditya')}
                    style={{ marginTop: '15px', background: 'none', border: `1px solid ${COLORS.gold}80`, color: 'rgba(74,29,29,0.6)', fontStyle: 'italic', padding: '8px 20px', borderRadius: '14px', fontSize: '12px', cursor: 'pointer' }}
                >🕯️ About Ayush Aditya</button>
            </div>
        );
    }

    if (type === 'memorial_plaque') {
        return (
            <div style={{ background: '#fffcf7', border: `2.5px solid ${COLORS.gold}`, borderRadius: '24px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '16px', lineHeight: '1.8', color: COLORS.darkMaroon, fontFamily: 'serif' }}>
                    Ayush Aditya was a dedicated member of the SNS Club at NIT Calicut — curious, warm, and deeply interested in the
                    intersection of science and Indian philosophy. He actively participated in club events and brought energy and
                    enthusiasm to every discussion. He passed away in a road accident, leaving behind cherished memories and an enduring spirit.
                    <br /><br />
                    This AI assistant bears his name so that his love for knowledge continues to inspire every student who seeks it.
                    <br /><br />
                    <strong style={{ fontSize: '18px', color: COLORS.maroon }}>We remember him.</strong>
                </div>
            </div>
        );
    }

    if (type === 'event_selection') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {msg.events?.map(ev => (
                    <div key={ev._id} style={{ background: 'white', padding: '15px', borderRadius: '16px', borderLeft: `5px solid ${COLORS.maroon}`, boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
                        <div style={{ fontWeight: 'bold', color: COLORS.maroon, fontSize: '15px' }}>{ev.title}</div>
                        <div style={{ fontSize: '12.5px', color: '#666', marginTop: '4px' }}>📅 {ev.month} {ev.day} | 🕒 {ev.time}</div>
                        <button onClick={() => onAction(ev.title)} style={{ marginTop: '12px', width: '100%', padding: '8px', background: COLORS.sage, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Select Event</button>
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'confirmation_summary') {
        const d = msg.regData;
        return (
            <div style={{ background: 'white', border: `2px solid ${COLORS.gold}`, borderRadius: '20px', padding: '20px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '12px', borderBottom: `1px solid ${COLORS.gold}`, paddingBottom: '8px', color: COLORS.darkMaroon }}>Confirm Details 📋</div>
                <div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div><strong>Event:</strong> {d.selectedEvent.title}</div>
                    <div><strong>Name:</strong> {d.name}</div>
                    <div><strong>Email:</strong> {d.email}</div>
                    <div><strong>Roll No:</strong> {d.rollNo}</div>
                    <div><strong>Phone:</strong> {d.phone}</div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                    <button onClick={onConfirm} style={{ flex: 1.5, padding: '12px', background: COLORS.sage, color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Confirm ✓</button>
                    <button onClick={onCancel} style={{ flex: 1, padding: '12px', background: COLORS.maroon, color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ alignSelf: isUser ? 'flex-end' : 'flex-start', maxWidth: '88%', position: 'relative' }}>
            <div
                style={{
                    background: isUser ? COLORS.maroon : 'white',
                    color: isUser ? 'white' : COLORS.darkMaroon,
                    padding: '12px 18px', borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    fontSize: '15px', lineHeight: '1.7', fontFamily: 'serif',
                    boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
                    border: isUser ? 'none' : `1.2px solid ${COLORS.maroon}15`,
                }}
            >
                {isUser ? msg.content : <span dangerouslySetInnerHTML={{ __html: msg.content }} />}
            </div>

            <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.35)', marginTop: '6px', fontWeight: '500', textAlign: isUser ? 'right' : 'left' }}>
                {msg.time}
            </div>
        </div>
    );
}