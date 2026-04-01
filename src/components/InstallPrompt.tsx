'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
      return;
    }

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem('install-dismissed');
    if (dismissedAt && Date.now() - Number(dismissedAt) < 24 * 60 * 60 * 1000) {
      setDismissed(true);
    }

    // Listen for beforeinstallprompt (Chrome/Edge/Samsung)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsStandalone(true);
      }
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('install-dismissed', String(Date.now()));
  };

  // Already installed or dismissed
  if (isStandalone || dismissed) return null;

  // Chrome auto-install available
  if (deferredPrompt) {
    return (
      <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 animate-slide-up">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📲</span>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 text-sm">Cài app về máy</h3>
            <p className="text-xs text-blue-700 mt-0.5">Mở nhanh hơn, dùng như app thật, không cần App Store!</p>
          </div>
          <button onClick={handleDismiss} className="text-blue-400 text-lg leading-none">✕</button>
        </div>
        <button
          onClick={handleInstall}
          className="w-full mt-3 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-bold transition-all active:scale-95"
        >
          Cài đặt ngay
        </button>
      </div>
    );
  }

  // Fallback: show manual guide
  return (
    <>
      <button
        onClick={() => setShowGuide(true)}
        className="mx-4 mb-4 w-[calc(100%-2rem)] py-2.5 px-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700 font-medium flex items-center justify-center gap-2"
      >
        <span>📲</span> Cài app về điện thoại
      </button>

      {showGuide && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-end justify-center" onClick={() => setShowGuide(false)}>
          <div
            className="w-full max-w-lg bg-white rounded-t-3xl p-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-900 text-center mb-4">📲 Cài app về máy</h2>

            {/* Android Chrome */}
            <div className="mb-4">
              <h3 className="font-semibold text-sm text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">A</span>
                Android (Chrome)
              </h3>
              <ol className="text-sm text-gray-600 space-y-1.5 ml-7">
                <li>1. Bấm nút <strong>⋮</strong> (3 chấm) góc trên phải</li>
                <li>2. Chọn <strong>"Thêm vào màn hình chính"</strong></li>
                <li>3. Bấm <strong>"Thêm"</strong> hoặc <strong>"Cài đặt"</strong></li>
              </ol>
            </div>

            {/* iPhone Safari */}
            <div className="mb-4">
              <h3 className="font-semibold text-sm text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-gray-800 text-white text-xs rounded-full flex items-center justify-center font-bold">i</span>
                iPhone (Safari)
              </h3>
              <ol className="text-sm text-gray-600 space-y-1.5 ml-7">
                <li>1. Bấm nút <strong>Chia sẻ</strong> (hình vuông mũi tên lên)</li>
                <li>2. Cuộn xuống chọn <strong>"Thêm vào MH chính"</strong></li>
                <li>3. Bấm <strong>"Thêm"</strong></li>
              </ol>
            </div>

            <div className="p-3 bg-yellow-50 rounded-xl text-xs text-yellow-700 mb-4">
              💡 Sau khi cài, app sẽ xuất hiện trên màn hình chính như app bình thường. Mở lên là dùng ngay, không cần mở trình duyệt!
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </>
  );
}
