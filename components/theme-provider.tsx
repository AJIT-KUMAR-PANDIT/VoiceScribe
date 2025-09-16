'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import { useThemeColor } from "./theme-color-provider";

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const { themeColor } = useThemeColor();

  return (
    <NextThemesProvider
      {...props}
      value={{
        light: "light",
        dark: "dark",
        system: "system",
        colorful: "colorful",
        ...props.value,
      }}
    >
      {children}
    </NextThemesProvider>
  );
}
