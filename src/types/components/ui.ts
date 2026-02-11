import * as React from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'gold'
}

export type CommanderAvatarProps = {
  name: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number
}
