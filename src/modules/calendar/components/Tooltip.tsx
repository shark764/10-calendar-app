import { ReactNode, useState } from 'react';
import { capitalize } from '@2600hz/commio-native-utilities';

import './tooltip.scss';

export type DirectionTip = 'top' | 'right' | 'bottom' | 'left';

interface Props {
  children: ReactNode;
  content: ReactNode;
  delay?: number;
  direction?: DirectionTip;
  trigger?: 'click' | 'hover';
}

const Tooltip = ({
  children,
  content,
  delay = 400,
  direction = 'right',
  trigger = 'click',
}: Props) => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    clearTimeout(timeout);
    setActive(false);
  };

  const toggleTip = () => {
    if (active) {
      hideTip();
    } else {
      showTip();
    }
  };

  const handleKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Escape') {
      hideTip();
    }
  };

  const ttProps = {
    onClick: trigger === 'click' ? toggleTip : undefined,
    onMouseEnter: trigger === 'hover' ? showTip : undefined,
    onMouseLeave: trigger === 'hover' ? hideTip : undefined,
  };

  const ttDir = capitalize(direction);

  return (
    <div
      className="TooltipWrapper"
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}>
      <div className="TooltipRef" {...ttProps}>
        {children}
      </div>
      {active && <div className={`TooltipTip Tooltip-${ttDir}`}>{content}</div>}
    </div>
  );
};

export default Tooltip;
