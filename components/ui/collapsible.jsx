import React, { useState } from "react";

export function Collapsible({ children, className }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (child.type.displayName === "CollapsibleTrigger") {
          return React.cloneElement(child, { onClick: () => setOpen((o) => !o) });
        }
        if (child.type.displayName === "CollapsibleContent") {
          return open ? child : null;
        }
        return child;
      })}
    </div>
  );
}

export function CollapsibleTrigger({ children, onClick, className }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
CollapsibleTrigger.displayName = "CollapsibleTrigger";

export function CollapsibleContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
CollapsibleContent.displayName = "CollapsibleContent";
