'use client'
import { ButtonProps, Button as HeroButton } from '@heroui/react'

interface HeroInputProps extends ButtonProps {
  // Puedes agregar props personalizados si necesitas
}

export const Button = (props: HeroInputProps) => {
  return (
    <HeroButton
      radius='sm'
      size='md'
      {...props}
      className={
        props.color === 'primary' && props.variant !== 'solid'
          ? 'bg-blue-600 text-white  border border-blue-800 inner hover:bg-blue-700 hover:border-blue-900 data-[hover=true]:opacity-100 transition-colors'
          : ''
      }
    />
  )
}
