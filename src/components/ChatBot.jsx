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
    const [messages, setMessages] = useState([]); // { role: 'user'|'assistant', content: string, id: number }
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasGreeted, setHasGreeted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const msgIdRef = useRef(0);

    // ── Mobile Detection ──────────────────────────────────────────────────────
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 480);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    // ── Send message ──────────────────────────────────────────────────────────
    const sendMessage = useCallback(
        async (text) => {
            const trimmed = (text || input).trim();
            if (!trimmed || loading) return;

            setInput('');
            setError('');

            const userMsg = { role: 'user', content: trimmed, id: ++msgIdRef.current };
            const newMessages = [...messages, userMsg];
            setMessages(newMessages);
            setLoading(true);

            // Build the payload (exclude id field — backend doesn't need it)
            const payload = newMessages.map(({ role, content }) => ({ role, content }));

            try {
                const res = await fetch(`${API_BASE}/api/chat`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: payload }),
                });

                // Check if response is JSON
                const contentType = res.headers.get('content-type');
                let data = {};
                if (contentType && contentType.includes('application/json')) {
                    data = await res.json();
                }

                if (!res.ok) {
                    // Handle specific status codes
                    if (res.status === 404) {
                        throw new Error('Vidya\'s services are being updated. Please try again in a few minutes.');
                    }
                    if (res.status === 429) {
                        throw new Error('Too many messages. Please wait a minute.');
                    }
                    throw new Error(data.message || `Server error (${res.status}). Please try again later.`);
                }

                if (!data.reply) {
                    throw new Error('Vidya is silent right now. Please try again.');
                }

                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: data.reply, id: ++msgIdRef.current },
                ]);
            } catch (err) {
                console.error('Chat Error:', err);
                if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
                    setError('Cannot reachVidya. Please check your internet or wait for the server to wake up.');
                } else {
                    setError(err.message || 'Failed to reach Vidya. Please try again.');
                }
            } finally {
                setLoading(false);
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        },
        [input, loading, messages]
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
        setError('');
        // Trigger re-greeting
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
                {/* Tooltip (Desktop only via CSS) */}
                <div className="vidya-tooltip">
                    Chat with Vidya
                </div>

                <button
                    onClick={() => {
                        setIsOpen(true);
                        setIsMinimized(false);
                    }}
                    aria-label="Open Vidya AI Assistant"
                    className="vidya-trigger-btn"
                    style={{
                        position: 'relative',
                        borderRadius: '50%',
                        border: '2px solid #f2cc8f', // Gold/Saffron accent ring
                        cursor: 'pointer',
                        background: 'linear-gradient(135deg, #be3a34 0%, #4a1d1d 100%)',
                        boxShadow: `
                            0 10px 30px rgba(74, 29, 29, 0.4),
                            0 4px 10px rgba(0, 0, 0, 0.2),
                            inset 0 2px 4px rgba(255, 255, 255, 0.15)
                        `,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        padding: 0,
                        outline: 'none',
                    }}
                >
                    {/* OM symbol with subtle inner glow/emboss */}
                    <svg
                        width="60%"
                        height="60%"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ filter: 'drop-shadow(0 0 1px rgba(242, 204, 143, 0.4))' }}
                    >
                        <text
                            x="50%"
                            y="58%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fontSize="62"
                            fontFamily="serif"
                            fill="white"
                            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                        >
                            ॐ
                        </text>
                    </svg>

                    {/* Elegant Slow Pulse */}
                    <span style={{
                        position: 'absolute',
                        inset: '-4px',
                        borderRadius: '50%',
                        border: '1.5px solid rgba(242, 204, 143, 0.3)',
                        animation: 'vidya-pulse-slow 4s ease-out infinite',
                        pointerEvents: 'none',
                    }} />
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
                        display: 'flex',
                        flexDirection: 'column',
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        animation: isMobile && !isMinimized ? 'vidya-slideUpMobile 0.4s ease-out' : 'vidya-slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                        border: '1px solid rgba(190,58,52,0.15)',
                        background: '#fdf8f3',
                        transition: 'all 0.3s ease',
                    }}
                >
                    {/* ── Header ─────────────────────────────────────────── */}
                    <div style={{
                        background: 'linear-gradient(135deg, #4a1d1d 0%, #be3a34 100%)',
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flexShrink: 0,
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Decorative mandala watermark */}
                        <div style={{
                            position: 'absolute', right: '-20px', top: '-20px',
                            width: '100px', height: '100px',
                            opacity: 0.06, fontSize: '90px', lineHeight: 1,
                            fontFamily: 'serif', color: '#f2cc8f', userSelect: 'none',
                            pointerEvents: 'none',
                        }}>ॐ</div>

                        {/* Avatar */}
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            background: 'rgba(242,204,143,0.25)',
                            border: '2px solid rgba(242,204,143,0.5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '20px', flexShrink: 0,
                        }}>🪔</div>

                        {/* Title */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                                color: '#f2cc8f', fontWeight: 'bold', fontSize: '16px',
                                letterSpacing: '0.5px',
                            }}>Vidya</div>
                            <div style={{
                                color: 'rgba(255,255,255,0.65)', fontSize: '11px',
                                fontFamily: 'sans-serif', letterSpacing: '0.3px',
                            }}>
                                {loading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <TypingDots small /> thinking…
                                    </span>
                                ) : 'SNS Club · CIKS, NIT Calicut'}
                            </div>
                        </div>

                        {/* Controls */}
                        <div style={{
                            display: 'flex',
                            gap: '4px',
                            position: 'relative',
                            zIndex: 2,
                        }}>
                            <IconBtn title="Clear chat" onClick={clearChat}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" />
                                </svg>
                            </IconBtn>
                            <IconBtn title={isMinimized ? 'Expand' : 'Minimize'} onClick={() => setIsMinimized((v) => !v)}>
                                {isMinimized ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
                                ) : (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                )}
                            </IconBtn>
                            <IconBtn title="Close" onClick={() => setIsOpen(false)}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </IconBtn>
                        </div>
                    </div>

                    {/* ── Body (hidden when minimized) ────────────────────── */}
                    {!isMinimized && (
                        <>
                            {/* Messages */}
                            <div style={{
                                flex: 1,
                                overflowY: 'auto',
                                padding: '16px 14px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                background: 'linear-gradient(180deg, #fdf8f3 0%, #faf4eb 100%)',
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#e07a5f33 transparent',
                            }}>
                                {/* Suggestions (only when just greeting shown) */}
                                {messages.length === 1 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                                        {SUGGESTIONS.map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => sendMessage(s)}
                                                style={{
                                                    background: 'white',
                                                    border: '1px solid rgba(190,58,52,0.25)',
                                                    borderRadius: '20px',
                                                    padding: isMobile ? '7px 14px' : '5px 12px',
                                                    fontSize: isMobile ? '12px' : '11.5px',
                                                    color: '#4a1d1d',
                                                    cursor: 'pointer',
                                                    fontFamily: 'sans-serif',
                                                    transition: 'all 0.15s',
                                                    lineHeight: '1.3',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#be3a34';
                                                    e.currentTarget.style.color = 'white';
                                                    e.currentTarget.style.borderColor = '#be3a34';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'white';
                                                    e.currentTarget.style.color = '#4a1d1d';
                                                    e.currentTarget.style.borderColor = 'rgba(190,58,52,0.25)';
                                                }}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Message bubbles */}
                                {messages.map((msg) => (
                                    <MessageBubble key={msg.id} msg={msg} />
                                ))}

                                {/* Loading indicator */}
                                {loading && (
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                                        <div style={{
                                            width: '28px', height: '28px', borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #be3a34, #4a1d1d)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '13px', flexShrink: 0,
                                        }}>🪔</div>
                                        <div style={{
                                            background: 'white',
                                            borderRadius: '16px 16px 16px 4px',
                                            padding: '10px 14px',
                                            border: '1px solid rgba(190,58,52,0.12)',
                                        }}>
                                            <TypingDots />
                                        </div>
                                    </div>
                                )}

                                {/* Error */}
                                {error && (
                                    <div style={{
                                        background: '#fff0f0',
                                        border: '1px solid #ffcdd2',
                                        borderRadius: '10px',
                                        padding: '10px 12px',
                                        fontSize: '12.5px',
                                        color: '#c62828',
                                        fontFamily: 'sans-serif',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                    }}>
                                        ⚠️ {error}
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Divider */}
                            <div style={{ height: '1px', background: 'rgba(190,58,52,0.1)' }} />

                            {/* ── Input Area ───────────────────────────────── */}
                            <div style={{
                                padding: '10px 12px',
                                background: '#fdf8f3',
                                display: 'flex',
                                gap: '8px',
                                alignItems: 'flex-end',
                            }}>
                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask Vidya anything…"
                                    rows={1}
                                    disabled={loading}
                                    style={{
                                        flex: 1,
                                        resize: 'none',
                                        border: '1.5px solid rgba(190,58,52,0.3)',
                                        borderRadius: '12px',
                                        padding: isMobile ? '12px 14px' : '9px 12px',
                                        fontSize: '13.5px',
                                        fontFamily: "'Georgia', serif",
                                        background: loading ? '#faf6f0' : 'white',
                                        color: '#3d1a1a',
                                        outline: 'none',
                                        lineHeight: '1.5',
                                        maxHeight: '100px',
                                        overflowY: 'auto',
                                        transition: 'all 0.2s',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#be3a34'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(190,58,52,0.3)'}
                                    onInput={(e) => {
                                        // Auto-grow
                                        e.target.style.height = 'auto';
                                        e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                                    }}
                                />
                                <button
                                    onClick={() => sendMessage()}
                                    disabled={!input.trim() || loading}
                                    style={{
                                        width: isMobile ? '46px' : '40px',
                                        height: isMobile ? '46px' : '40px',
                                        borderRadius: '50%',
                                        border: 'none',
                                        cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
                                        background: !input.trim() || loading
                                            ? '#e8d5d5'
                                            : 'linear-gradient(135deg, #be3a34 0%, #4a1d1d 100%)',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        transition: 'background 0.2s, transform 0.1s',
                                        transform: 'translateY(-1px)',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!(!input.trim() || loading)) e.currentTarget.style.transform = 'scale(1.08) translateY(-1px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </button>
                            </div>

                            {/* Footer branding */}
                            <div style={{
                                textAlign: 'center',
                                padding: '4px 0 8px',
                                fontSize: '10px',
                                color: 'rgba(74,29,29,0.35)',
                                fontFamily: 'sans-serif',
                                letterSpacing: '0.5px',
                                background: '#fdf8f3',
                            }}>
                                Powered by Llama 3.3 · CIKS, NIT Calicut
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* ── Global Keyframe CSS ─────────────────────────────────────── */}
            <style>{`
                :root {
                    --vidya-btn-size: 58px;
                }
                @media (max-width: 600px) {
                    :root { --vidya-btn-size: 64px; }
                }

                .vidya-trigger-btn {
                    width: var(--vidya-btn-size);
                    height: var(--vidya-btn-size);
                }

                .vidya-trigger-btn:hover {
                    transform: scale(1.08) translateY(-3px);
                    box-shadow: 0 15px 35px rgba(74, 29, 29, 0.5);
                }

                .vidya-tooltip {
                    position: absolute;
                    right: calc(var(--vidya-btn-size) + 12px);
                    background: #4a1d1d;
                    color: #f2cc8f;
                    padding: 6px 14px;
                    border-radius: 8px;
                    font-size: 13px;
                    white-space: nowrap;
                    pointer-events: none;
                    opacity: 0;
                    transform: translateX(10px);
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    border: 1px solid rgba(242, 204, 143, 0.2);
                    font-family: sans-serif;
                }

                .vidya-trigger-container:hover .vidya-tooltip {
                    opacity: 1;
                    transform: translateX(0);
                }

                @media (max-width: 800px) {
                    .vidya-tooltip { display: none; }
                }

                @keyframes vidya-entrance {
                    0%   { opacity: 0; transform: translateY(40px) scale(0.5); rotate: -15deg; }
                    100% { opacity: 1; transform: translateY(0) scale(1); rotate: 0deg; }
                }
                @keyframes vidya-slideUpMobile {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                @keyframes vidya-pulse-slow {
                    0%   { transform: scale(1);   opacity: 0.5; }
                    70%  { transform: scale(1.4); opacity: 0;   }
                    100% { transform: scale(1.4); opacity: 0;   }
                }
                @keyframes vidya-slideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.96); }
                    to   { opacity: 1; transform: translateY(0)    scale(1);    }
                }
                @keyframes vidya-dot {
                    0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
                    40%           { transform: scale(1);   opacity: 1;   }
                }
                @keyframes vidya-fadeIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to   { opacity: 1; transform: translateY(0);   }
                }
            `}</style>
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function MessageBubble({ msg }) {
    const isUser = msg.role === 'user';
    return (
        <div style={{
            display: 'flex',
            flexDirection: isUser ? 'row-reverse' : 'row',
            alignItems: 'flex-end',
            gap: '8px',
            animation: 'vidya-fadeIn 0.25s ease',
        }}>
            {/* Avatar */}
            {!isUser && (
                <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #be3a34, #4a1d1d)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', flexShrink: 0,
                }}>🪔</div>
            )}

            <div style={{
                maxWidth: '82%',
                background: isUser
                    ? 'linear-gradient(135deg, #be3a34 0%, #8B2020 100%)'
                    : 'white',
                color: isUser ? 'white' : '#3d1a1a',
                borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                padding: '10px 13px',
                fontSize: '13.5px',
                lineHeight: '1.6',
                fontFamily: "'Georgia', serif",
                border: isUser ? 'none' : '1px solid rgba(190,58,52,0.12)',
                boxShadow: isUser
                    ? '0 4px 12px rgba(190,58,52,0.3)'
                    : '0 2px 8px rgba(0,0,0,0.05)',
                wordBreak: 'break-word',
            }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
            />

            {isUser && (
                <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #81b29a, #5a8a72)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', flexShrink: 0,
                }}>🎓</div>
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