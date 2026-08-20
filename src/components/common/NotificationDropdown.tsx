import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, Clock, ShieldAlert, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { formatTimeAgo } from '../../lib/utils';

export const NotificationDropdown: React.FC = () => {
  const { notifications, unreadNotificationCount, markNotificationAsRead, markAllNotificationsAsRead, setCurrentView } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'healing_success':
        return <Sparkles className="h-3.5 w-3.5 text-emerald-400" />;
      case 'critical_insight':
        return <Layers className="h-3.5 w-3.5 text-blue-400" />;
      case 'collector_down':
        return <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />;
      default:
        return <RefreshCw className="h-3.5 w-3.5 text-amber-400" />;
    }
  };

  const handleAction = (notif: typeof notifications[0]) => {
    markNotificationAsRead(notif.id);
    if (notif.actionUrl === '#intelligence') {
      setCurrentView('intelligence');
    } else if (notif.actionUrl === '#healing') {
      setCurrentView('healing');
    } else {
      setCurrentView('collectors');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
        title="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadNotificationCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 font-mono shadow-sm">
            {unreadNotificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-800 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 px-1">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold text-slate-200 font-mono">NOTIFICATIONS</h4>
              <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                {notifications.length}
              </span>
            </div>
            {unreadNotificationCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
              >
                <CheckCheck className="h-3 w-3" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="mt-2 max-h-80 overflow-y-auto space-y-2 pr-1">
            {notifications.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-500">No new notifications</p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleAction(notif)}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-2.5 transition-all ${
                    notif.read
                      ? 'border-slate-800/40 bg-slate-950/40 text-slate-400 hover:bg-slate-800/40'
                      : 'border-slate-700/80 bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="mt-0.5 rounded p-1.5 bg-slate-900 border border-slate-800 shrink-0">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-medium text-slate-100 font-mono truncate">
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {notif.description}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                      <Clock className="h-2.5 w-2.5" />
                      <span>{formatTimeAgo(notif.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
