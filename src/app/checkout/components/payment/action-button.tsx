import React from "react";

type ActionButtonProps = {
  action: string;
};

const ActionButton = ({ action, ...props }: ActionButtonProps) => {
  return (
    <button className="underline h-max w-max text-xs" {...props}>
      {action}
    </button>
  );
};

export default ActionButton;
