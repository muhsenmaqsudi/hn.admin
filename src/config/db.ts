/*eslint @typescript-eslint/no-explicit-any:*/
export function setItem(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function hasItem(key: string) {
  return localStorage.getItem(key) !== null;
}

export function getItem(key: string, defaultValue = null) {
  const data = localStorage.getItem(key);

  if (data !== null) {
    return JSON.parse(data);
  }

  return defaultValue;
}

export function removeItem(key: string) {
  return localStorage.removeItem(key);
}

export function removeAll() {
  localStorage.clear();
}

export default {
  set: setItem,
  remove: removeItem,
  get: getItem,
  has: hasItem,
  clear: removeAll
};
