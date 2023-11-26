import React from "react";
import { Icon } from '@iconify/react';

interface ProgressProps {
  percent: number;
  back: () => void;
}

export default function Progress({percent, back}: ProgressProps) {
  return <div className="flex gap-2 items-center">
    {back != null && <Icon icon="mdi:arrow-left" className="text-gray-400 text-2xl" onClick={back}/>}
    <div className="relative bg-gray-200 h-4 rounded-xl flex-1">
      {percent > 0 && <div className="absolute bg-green h-4 rounded-xl" style={{width: `${percent}%`}}></div>}
    </div>
  </div>
}
