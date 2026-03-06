export async function fetchJSON<T = any>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      // attempt to parse error body
      let errBody: any = null;
      try {
        errBody = await res.json();
      } catch {}
      console.error(`API request failed: ${url}`, errBody || res.statusText);
      return [] as unknown as T;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`Network error fetching ${url}:`, err);
    return [] as unknown as T;
  }
}
