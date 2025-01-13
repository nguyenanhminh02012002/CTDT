export function buildUrlWithParams(dto) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(dto)) {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  }

  return `?${params.toString()}`;
}
