import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const DEBUG_SWIPE = false;
const EDGE_THRESHOLD = 50;
const iOS_EDGE_THRESHOLD = 80;
const MIN_SWIPE_DISTANCE = 100;
const MAX_VERTICAL_DRIFT = 75;
const GESTURE_TIMEOUT = 500;
const NAVIGATION_COOLDOWN = 800;

export function useSwipeNavigation() {
    const location = useLocation();
    const [swipeState, setSwipeState] = useState({
        active: false,
        side: null, // 'left' or 'right'
        progress: 0, // 0 to 1
    });
    const [toast, setToast] = useState({ show: false, message: '' });

    const touchRef = useRef({
        startX: 0,
        startY: 0,
        startTime: 0,
        isEdgeSwipe: false,
        side: null,
        isCancelled: false,
        lastNavTime: 0,
    });

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const currentThreshold = isIOS ? iOS_EDGE_THRESHOLD : EDGE_THRESHOLD;

    const log = useCallback((...args) => {
        if (DEBUG_SWIPE) console.log('SwipeNav:', ...args);
    }, []);

    const showToast = useCallback((message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), 2000);
    }, []);

    const handleBack = useCallback(() => {
        const now = Date.now();
        if (now - touchRef.current.lastNavTime < NAVIGATION_COOLDOWN) return;

        if (window.history.length <= 1 || location.pathname === '/') {
            showToast("You're on the first page");
            return;
        }

        log("NAVIGATING BACK");
        touchRef.current.lastNavTime = now;

        // Momentum feel
        document.body.style.transition = 'transform 150ms ease-out';
        const direction = touchRef.current.side === 'left' ? 30 : -30;
        document.body.style.transform = `translateX(${direction}px)`;

        setTimeout(() => {
            window.history.back();
            document.body.style.transform = '';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 150);
        }, 150);
    }, [location.pathname, showToast, log]);

    useEffect(() => {
        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            const x = touch.clientX;
            const y = touch.clientY;
            const now = Date.now();

            // Reset state
            touchRef.current.startX = x;
            touchRef.current.startY = y;
            touchRef.current.startTime = now;
            touchRef.current.isCancelled = false;

            // Smart Conflict Avoidance
            const target = e.target;
            if (target.closest('textarea, input, select')) return;

            // ChatBot sidebar check (left:0, width:320px)
            // Note: We check if the touch started within the bounds of the chatbot UI if it's open
            const chatBot = document.querySelector('.ayush-ai-trigger-container')?.nextElementSibling;
            if (chatBot && chatBot.contains(target)) {
                log("Touch in ChatBot - skipping");
                return;
            }

            // Horizontally scrollable elements check
            let el = target;
            while (el && el !== document.body) {
                const style = window.getComputedStyle(el);
                if ((style.overflowX === 'auto' || style.overflowX === 'scroll') && el.scrollWidth > el.clientWidth) {
                    log("Touch in scrollable element - skipping");
                    return;
                }
                el = el.parentElement;
            }

            // Edge detection
            if (x < currentThreshold) {
                touchRef.current.isEdgeSwipe = true;
                touchRef.current.side = 'left';
                log(`touchstart at x=${x} (LEFT EDGE detected)`);
            } else if (x > window.innerWidth - currentThreshold) {
                touchRef.current.isEdgeSwipe = true;
                touchRef.current.side = 'right';
                log(`touchstart at x=${x} (RIGHT EDGE detected)`);
            } else {
                touchRef.current.isEdgeSwipe = false;
                touchRef.current.side = null;
            }
        };

        const handleTouchMove = (e) => {
            if (!touchRef.current.isEdgeSwipe || touchRef.current.isCancelled) return;

            const touch = e.touches[0];
            const deltaX = Math.abs(touch.clientX - touchRef.current.startX);
            const deltaY = Math.abs(touch.clientY - touchRef.current.startY);

            if (deltaY > MAX_VERTICAL_DRIFT) {
                touchRef.current.isCancelled = true;
                setSwipeState({ active: false, side: null, progress: 0 });
                log("cancelled — vertical drift exceeded limit");
                return;
            }

            // If we are definitely swiping horizontally, prevent default scrolling
            if (deltaX > 10 && deltaX > deltaY) {
                if (e.cancelable) e.preventDefault();
            }

            const progress = Math.min(deltaX / MIN_SWIPE_DISTANCE, 1);
            setSwipeState({
                active: true,
                side: touchRef.current.side,
                progress: progress
            });
        };

        const handleTouchEnd = (e) => {
            if (!touchRef.current.isEdgeSwipe || touchRef.current.isCancelled) {
                setSwipeState({ active: false, side: null, progress: 0 });
                return;
            }

            const touch = e.changedTouches[0];
            const deltaX = touchRef.current.side === 'left'
                ? touch.clientX - touchRef.current.startX
                : touchRef.current.startX - touch.clientX;
            const duration = Date.now() - touchRef.current.startTime;

            if (deltaX >= MIN_SWIPE_DISTANCE && duration < GESTURE_TIMEOUT) {
                log(`touchend deltaX=${deltaX}px → Triggering action`);
                handleBack();
            } else {
                log(`gesture cancelled - distance: ${deltaX}px, duration: ${duration}ms`);
            }

            setSwipeState({ active: false, side: null, progress: 0 });
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        // Additional Gestures: Long Press for Link Preview
        let longPressTimer;
        const handleLongPress = (e) => {
            const target = e.target.closest('a');
            if (target) {
                longPressTimer = setTimeout(() => {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'link-preview-tooltip';
                    const url = new URL(target.href);
                    tooltip.innerText = `To: ${url.hash.replace('#/', '/') || 'Home'}`;
                    document.body.appendChild(tooltip);

                    const rect = target.getBoundingClientRect();
                    tooltip.style.left = `${rect.left}px`;
                    tooltip.style.top = `${rect.top - 25}px`;

                    log("Long press on link -> Show preview");

                    const removeTooltip = () => {
                        if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
                        window.removeEventListener('touchend', removeTooltip);
                        window.removeEventListener('touchmove', removeTooltip);
                    };
                    window.addEventListener('touchend', removeTooltip);
                    window.addEventListener('touchmove', removeTooltip);
                }, 500);
            }
        };

        const cancelLongPress = () => clearTimeout(longPressTimer);

        // Double Tap for Focus Mode
        let lastTapTime = 0;
        const handleDoubleTap = (e) => {
            if (e.target === document.body || e.target.classList.contains('App')) {
                const now = Date.now();
                if (now - lastTapTime < 300) {
                    document.body.classList.toggle('focus-mode');
                    log("Double tap -> Toggle focus mode");

                    const notification = document.createElement('div');
                    notification.className = 'focus-mode-notification';
                    notification.innerText = document.body.classList.contains('focus-mode') ? "Focus Mode ON" : "Focus Mode OFF";
                    document.body.appendChild(notification);
                    setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 2000);
                }
                lastTapTime = now;
            }
        };

        // Pinch Detection Placeholder
        const handlePinch = (e) => {
            if (e.touches.length === 2) {
                log("Pinch detected - structure only");
            }
        };

        window.addEventListener('touchstart', handleLongPress);
        window.addEventListener('touchend', cancelLongPress);
        window.addEventListener('touchmove', cancelLongPress);
        window.addEventListener('touchstart', handleDoubleTap);
        window.addEventListener('touchmove', handlePinch);

        // Scroll to top gesture
        let lastHeaderTap = 0;
        const handleHeaderClick = (e) => {
            const header = document.querySelector('header') || document.querySelector('.sticky-header') || document.querySelector('.Header'); // Adjust selector as needed
            if (header && header.contains(e.target)) {
                const now = Date.now();
                if (now - lastHeaderTap < 300) {
                    // Triple tap would be 3 in 600ms etc, but double tap is common enough
                    // Let's implement triple tap logic
                    header.tapCount = (header.tapCount || 0) + 1;
                    if (header.tapCount === 3) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        log("Triple tap on header -> Scroll to top");
                        header.tapCount = 0;
                    }
                    setTimeout(() => { header.tapCount = 0; }, 600);
                }
                lastHeaderTap = now;
            }
        };
        window.addEventListener('click', handleHeaderClick);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchstart', handleLongPress);
            window.removeEventListener('touchend', cancelLongPress);
            window.removeEventListener('touchmove', cancelLongPress);
            window.removeEventListener('touchstart', handleDoubleTap);
            window.removeEventListener('touchmove', handlePinch);
            window.removeEventListener('click', handleHeaderClick);
        };
    }, [currentThreshold, handleBack, log]);

    return { swipeState, toast };
}
