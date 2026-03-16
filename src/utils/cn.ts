type ClassValue = string | undefined | null | false

export function cn(...args: ClassValue[]): string {
  return args.filter(Boolean).join(' ')
}