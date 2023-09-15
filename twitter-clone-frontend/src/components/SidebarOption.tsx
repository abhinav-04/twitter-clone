import React from "react";
import "./SidebarOption.css";

interface SidebarOptionProps {
    active: boolean;
    text: string;
    Icon: React.FC;
  }

function SidebarOption({ active, text, Icon }:SidebarOptionProps) {
  return (
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;