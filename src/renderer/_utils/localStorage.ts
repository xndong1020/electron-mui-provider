export const setItem = (
  key: string,
  state: Record<string, any> | string
): void => {
  try {
    const serializedState =
      typeof state === "string" ? state : JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {}
};

export const getItem = <T>(key: string): T | null => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return null;
    try {
      return JSON.parse(serializedState) as T;
    } catch {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};
