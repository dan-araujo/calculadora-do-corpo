export function scheduleIdleAfterLoad(callback, host = window) {
  let cancelled = false;
  let pendingId;
  const useIdleCallback = typeof host.requestIdleCallback === 'function'
    && typeof host.cancelIdleCallback === 'function';

  const run = () => {
    pendingId = undefined;
    if (!cancelled) callback();
  };
  const schedule = () => {
    host.removeEventListener('load', schedule);
    if (cancelled) return;
    pendingId = useIdleCallback ? host.requestIdleCallback(run) : host.setTimeout(run, 1);
  };

  if (host.document.readyState === 'complete') schedule();
  else host.addEventListener('load', schedule, { once: true });

  return () => {
    cancelled = true;
    host.removeEventListener('load', schedule);
    if (pendingId === undefined) return;
    if (useIdleCallback) host.cancelIdleCallback(pendingId);
    else host.clearTimeout(pendingId);
    pendingId = undefined;
  };
}
