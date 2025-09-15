"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function AudioVisualizer3D({ 
  isActive = false, 
  className,
  variant = "waves", // waves, bars, circular, sphere
  colorScheme = "gradient"
}) {
  const [bars, setBars] = useState(Array(32).fill(0))
  const animationRef = useRef()

  useEffect(() => {
    if (isActive) {
      const animate = () => {
        setBars(bars => bars.map(() => Math.random()))
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      setBars(Array(32).fill(0))
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive])

  const renderWaves = () => (
    <div className="flex items-center justify-center gap-[2px] h-32 perspective-1000">
      {bars.map((height, i) => (
        <div
          key={i}
          className={cn(
            "w-1 sm:w-1.5 lg:w-2 rounded-full transition-all duration-150",
            "bg-gradient-to-t from-primary via-secondary to-accent",
            "shadow-lg shadow-primary/30"
          )}
          style={{
            height: `${20 + height * 80}px`,
            transform: `rotateX(${height * 10}deg) translateZ(${height * 10}px)`,
            animationDelay: `${i * 0.05}s`,
            opacity: isActive ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  )

  const renderBars = () => (
    <div className="flex items-end justify-center gap-1 h-32 perspective-1000">
      {bars.map((height, i) => (
        <div
          key={i}
          className={cn(
            "relative w-2 sm:w-3 lg:w-4 rounded-t-lg",
            "transform-gpu transition-all duration-200",
            "hover:scale-110"
          )}
          style={{
            height: `${10 + height * 120}px`,
            background: `linear-gradient(180deg, 
              hsl(${200 + i * 5}, 70%, 60%) 0%, 
              hsl(${220 + i * 5}, 80%, 40%) 100%)`,
            transform: `perspective(500px) rotateX(-15deg) translateZ(${i * 2}px)`,
            boxShadow: `0 ${height * 20}px ${height * 30}px rgba(${100 + i * 5}, 150, 255, 0.3)`,
          }}
        >
          <div 
            className="absolute inset-0 rounded-t-lg opacity-50"
            style={{
              background: `linear-gradient(to top, transparent, rgba(255,255,255,${height * 0.3}))`
            }}
          />
        </div>
      ))}
    </div>
  )

  const renderCircular = () => (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
      <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
      <div className="absolute inset-2 rounded-full border border-secondary/30 animate-pulse" 
           style={{ animationDelay: '0.5s' }} />
      <div className="absolute inset-4 rounded-full border border-accent/40 animate-pulse" 
           style={{ animationDelay: '1s' }} />
      
      {bars.map((height, i) => {
        const angle = (i / bars.length) * Math.PI * 2
        const radius = 60 + height * 40
        const x = Math.cos(angle) * radius + 96
        const y = Math.sin(angle) * radius + 96
        
        return (
          <div
            key={i}
            className="absolute w-1 origin-center"
            style={{
              left: '50%',
              top: '50%',
              height: `${10 + height * 50}px`,
              transform: `translate(-50%, -50%) rotate(${(i * 360) / bars.length}deg) translateY(-${radius}px)`,
              background: `linear-gradient(to top, 
                hsl(${180 + i * 10}, 70%, 50%), 
                hsl(${200 + i * 10}, 80%, 70%))`,
              boxShadow: `0 0 ${height * 20}px hsl(${180 + i * 10}, 70%, 50%)`,
              opacity: isActive ? 1 : 0.3,
            }}
          />
        )
      })}
      
      <div className={cn(
        "absolute inset-0 rounded-full",
        "bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10",
        "animate-spin-slow"
      )} />
    </div>
  )

  const renderSphere = () => (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 transform-gpu">
      <div 
        className={cn(
          "absolute inset-0 rounded-full",
          "bg-gradient-to-br from-primary via-secondary to-accent",
          "animate-rotate-3d",
          isActive && "neon-glow"
        )}
        style={{
          transform: 'rotateX(45deg) rotateZ(45deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {bars.slice(0, 16).map((height, i) => {
          const angle = (i / 16) * Math.PI * 2
          return (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-2"
              style={{
                transform: `rotateY(${(i * 360) / 16}deg)`,
                borderColor: `hsla(${200 + i * 20}, 70%, 60%, ${0.2 + height * 0.5})`,
                borderWidth: `${1 + height * 2}px`,
                animation: isActive ? `pulse ${1 + i * 0.1}s ease-in-out infinite` : 'none',
              }}
            />
          )
        })}
      </div>
      
      <div className={cn(
        "absolute inset-8 rounded-full",
        "bg-gradient-radial from-white/20 to-transparent",
        "blur-xl",
        isActive && "animate-pulse"
      )} />
    </div>
  )

  const visualizers = {
    waves: renderWaves(),
    bars: renderBars(),
    circular: renderCircular(),
    sphere: renderSphere(),
  }

  return (
    <div className={cn(
      "flex items-center justify-center p-4",
      "transform-gpu transition-all duration-500",
      className
    )}>
      {visualizers[variant]}
    </div>
  )
}

// Mini version for compact displays
export function AudioVisualizerMini({ isActive = false, className }) {
  const [bars, setBars] = useState(Array(8).fill(0))

  useEffect(() => {
    const interval = isActive ? setInterval(() => {
      setBars(bars => bars.map(() => Math.random()))
    }, 150) : null

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive])

  return (
    <div className={cn("flex items-center gap-0.5 h-6", className)}>
      {bars.map((height, i) => (
        <div
          key={i}
          className="w-0.5 bg-primary rounded-full transition-all duration-150"
          style={{
            height: `${4 + height * 20}px`,
            opacity: isActive ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  )
}