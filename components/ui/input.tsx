'use client'
import { Input as HeroInput, InputProps } from '@heroui/react'

interface HeroInputProps extends InputProps {
  // Puedes agregar props personalizados si necesitas
}

export const Input = (props: HeroInputProps) => {
  return (
    <HeroInput
      variant='bordered'
      radius='sm'
      size='sm'
      classNames={
        {
          // input: 'text-sm',
          //inputWrapper: 'bg-white shadow-sm'
        }
      }
      {...props}
    />
  )
}
