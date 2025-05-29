"use client"

import type { ReactNode } from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "outline"
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`} onClick={onClick} disabled={disabled}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  )
}
