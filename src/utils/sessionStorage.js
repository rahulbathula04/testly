// Local Storage Session Autosave & Instant Recovery Manager for Testly Practice Engine

const SESSION_KEY = 'testly_active_practice_session';

export function saveActiveSession(sessionState) {
  try {
    const payload = {
      ...sessionState,
      timestamp: Date.now()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('Failed to save testly practice session to localStorage', err);
  }
}

export function getActiveSession() {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;
    const session = JSON.parse(data);
    
    // Expire session if older than 24 hours
    if (Date.now() - session.timestamp > 24 * 60 * 60 * 1000) {
      clearActiveSession();
      return null;
    }
    return session;
  } catch (err) {
    return null;
  }
}

export function clearActiveSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (err) {
    console.error('Failed to clear testly practice session', err);
  }
}

// Aliases for seamless imports across modules
export const savePracticeSession = saveActiveSession;
export const loadPracticeSession = getActiveSession;
export const clearPracticeSession = clearActiveSession;
