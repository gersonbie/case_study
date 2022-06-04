import React, { useRef } from "react";
import ContextMenu from "../ContextMenu";

const Container = ({ children, menuItems }) => {
  const containerRef = useRef(null);
  return (
    <tr ref={containerRef}>
      {children}
      {menuItems.length > 0 ? <ContextMenu parentRef={containerRef} items={menuItems} /> : null}
    </tr>
  );
};

export default Container;
