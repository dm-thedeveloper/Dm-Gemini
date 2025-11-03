import React, { ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

type TooltipProps = {
  text?: string // optional, defaults to 'profile'
  children: ReactNode // the element over which the tooltip appears
}

const TooltipComp: React.FC<TooltipProps> = ({
  text = 'profile',
  children,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipComp
