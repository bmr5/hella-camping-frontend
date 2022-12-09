export function nameWithNoSpaces(name: string | undefined) {
  if (!name) return;
  return name.replace(/\s/g, "-");
}

export function nameWithSpaces(name: string | undefined) {
  if (!name) return;
  return name.replace(/-/g, " ");
}
