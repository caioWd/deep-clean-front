import { useState, type ReactElement } from 'react';
import { Tooltip } from 'react-native-paper';

interface TooltipProps {
  title: string
  children: ReactElement
}

const CustomTooltip = ({ title, children }: TooltipProps) => {
  return (
    <Tooltip title={title} leaveTouchDelay={1500}>
      {children}
    </Tooltip>
  )
};

export default CustomTooltip;