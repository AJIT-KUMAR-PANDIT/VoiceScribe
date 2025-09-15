"use client"

import { cn } from "@/lib/utils"

export function ResponsiveContainer({ 
  children, 
  className,
  maxWidth = "7xl", // sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, full
  padding = "responsive", // none, sm, md, lg, responsive
  center = true
}) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full"
  }

  const paddingClasses = {
    none: "",
    sm: "px-2 sm:px-4",
    md: "px-4 sm:px-6 lg:px-8",
    lg: "px-6 sm:px-8 lg:px-12",
    responsive: "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20"
  }

  return (
    <div className={cn(
      maxWidthClasses[maxWidth],
      paddingClasses[padding],
      center && "mx-auto",
      "w-full",
      className
    )}>
      {children}
    </div>
  )
}

export function ResponsiveGrid({ 
  children, 
  className,
  columns = "auto", // auto, 1, 2, 3, 4, 5, 6, 12
  gap = "responsive" // sm, md, lg, responsive
}) {
  const columnClasses = {
    auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
    12: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12"
  }

  const gapClasses = {
    sm: "gap-2 sm:gap-3",
    md: "gap-3 sm:gap-4 lg:gap-5",
    lg: "gap-4 sm:gap-6 lg:gap-8",
    responsive: "gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8"
  }

  return (
    <div className={cn(
      "grid",
      columnClasses[columns],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}

export function ResponsiveFlex({ 
  children, 
  className,
  direction = "row", // row, col, row-reverse, col-reverse
  wrap = true,
  gap = "responsive",
  align = "center",
  justify = "start"
}) {
  const directionClasses = {
    row: "flex-row",
    col: "flex-col",
    "row-reverse": "flex-row-reverse",
    "col-reverse": "flex-col-reverse"
  }

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline"
  }

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
  }

  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    responsive: "gap-2 sm:gap-3 md:gap-4 lg:gap-6"
  }

  return (
    <div className={cn(
      "flex",
      directionClasses[direction],
      wrap && "flex-wrap",
      alignClasses[align],
      justifyClasses[justify],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}

// Responsive spacer component
export function ResponsiveSpacer({ 
  size = "md", // xs, sm, md, lg, xl, 2xl
  axis = "vertical" // vertical, horizontal, both
}) {
  const sizeClasses = {
    xs: "h-2 w-2 sm:h-3 sm:w-3",
    sm: "h-4 w-4 sm:h-6 sm:w-6",
    md: "h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10",
    lg: "h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16",
    xl: "h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20",
    "2xl": "h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
  }

  const axisClasses = {
    vertical: "w-0",
    horizontal: "h-0",
    both: ""
  }

  return (
    <div className={cn(
      sizeClasses[size],
      axisClasses[axis],
      "flex-shrink-0"
    )} />
  )
}

// Responsive section component with 3D effects
export function ResponsiveSection({ 
  children, 
  className,
  variant = "default", // default, elevated, glass, gradient
  animate = false
}) {
  const variantClasses = {
    default: "bg-background",
    elevated: "bg-card shadow-lg hover:shadow-2xl card-3d",
    glass: "glass backdrop-blur-lg border border-primary/20",
    gradient: "bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
  }

  return (
    <section className={cn(
      "relative overflow-hidden",
      "p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12",
      "rounded-xl sm:rounded-2xl",
      "transition-all duration-500",
      variantClasses[variant],
      animate && "float-animation",
      className
    )}>
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-gradient-mesh opacity-30 animate-gradient-shift" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

// TV/Large screen detector component
export function ResponsiveScreenDetector({ children }) {
  const screenSizes = {
    mobile: "block sm:hidden",
    tablet: "hidden sm:block lg:hidden",
    desktop: "hidden lg:block xl:hidden",
    large: "hidden xl:block 2xl:hidden",
    tv: "hidden 2xl:block"
  }

  return (
    <div className="relative">
      {/* Screen size indicator for development */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-2 right-2 z-50 px-2 py-1 text-xs font-mono bg-primary text-primary-foreground rounded">
          <span className={screenSizes.mobile}>Mobile</span>
          <span className={screenSizes.tablet}>Tablet</span>
          <span className={screenSizes.desktop}>Desktop</span>
          <span className={screenSizes.large}>Large</span>
          <span className={screenSizes.tv}>TV/4K</span>
        </div>
      )}
      {children}
    </div>
  )
}