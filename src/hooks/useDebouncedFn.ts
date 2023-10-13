import { useRef } from "react";

export default function useDebouncedFunction(func: Function, delay: number): Function {
  const ref = useRef<number | null>(null);
  return (...args: any[]) => {
    clearTimeout(ref.current as number);
    ref.current = setTimeout(() => func(...args), delay);
  };
}
