/** What you need to feed to have a proper log */
export type LogParams = {
  /** used a log descriptor */
  message: string;
  /** attached to the log descriptor */
  context?: Record<string, unknown>;
  /** Defaults to log */
  type?: 'log' | 'action' | 'view';
  /** Defaults to tap */
  actionType?: 'tap' | 'scroll' | 'swipe' | 'custom';
};

/** What we need to handle an error */
export type ErrorParams = {
  error: Error;
  context?: Record<string, unknown>;
  severity?: 'debug' | 'error' | 'warning' | 'critical' | 'info';
};
