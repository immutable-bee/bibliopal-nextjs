import React, { useState } from "react";

const Tooltip = ({
  id,
  content,
  children,
  width = "max-w-sm",
  tailwind,
  placement = "above",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  let tooltipStyles = "z-10";

  switch (placement) {
    case "above":
      tooltipStyles += " mb-2 bottom-full left-1/2 transform -translate-x-1/2";
      break;
    case "below":
      tooltipStyles += " mt-2 top-full left-1/2 transform -translate-x-1/2";
      break;
    case "right":
      tooltipStyles +=
        " ml-2 mt-5 left-full top-1/2 transform -translate-y-1/2";
      break;
    default:
      tooltipStyles += " mb-2 bottom-full left-1/2 transform -translate-x-1/2";
      break;
  }

  return (
    <div
      className={`${tailwind} relative inline-block`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {isOpen && (
        <div
          id={id}
          className={`${width} ${tooltipStyles} w-full min-h-min absolute cursor-text p-2 text-sm text-black bg-white rounded-xl !shadow z-50`}
          onMouseLeave={() => setIsOpen(false)}
          style={{ bottom: "100%" }}
        >
          {content}
        </div>
      )}
      <div className="cursor-pointer">{children}</div>
    </div>
  );
};

export default Tooltip;
