"use client";

import * as React from "react";
import { Paintbrush } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeColor } from "../theme-color-provider";

export function ColorPicker() {
  const { setTheme } = useTheme();
  const { setThemeColor } = useThemeColor();

  const colors = [
    { name: "zinc", color: "hsl(240 5.9% 10%)" },
    { name: "rose", color: "hsl(346.8 77.2% 49.8%)" },
    { name: "blue", color: "hsl(217.2 91.2% 59.8%)" },
    { name: "green", color: "hsl(142.1 76.2% 36.3%)" },
    { name: "orange", color: "hsl(24.6 95% 53.1%)" },
    { name: "red", color: "hsl(0 72.2% 50.6%)" },
    { name: "yellow", color: "hsl(47.9 95.8% 53.1%)" },
    { name: "violet", color: "hsl(262.1 83.3% 57.8%)" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Paintbrush className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle color</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {colors.map((color) => (
          <DropdownMenuItem
            key={color.name}
            onClick={() => {
              setThemeColor(color.color);
              setTheme("colorful"); // Set theme to colorful when a custom color is picked
            }}
            style={{ backgroundColor: color.color, color: "white" }}
          >
            {color.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}