import React, { useState, useEffect } from "react";

const SidebarLine = () => {
  interface SidebarItem {
    label: string;
    icon: string;
    route: string;
  }
  const [menuItems, setMenuItems] = useState<SidebarItem[]>([]);

  useEffect(() => {
    const menuData = require("src/app/listSidebar.json");
    setMenuItems(menuData);
  }, []);

  return (
    <div className="sidebar">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="linesSidebar">
            <a href={item.route}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarLine;
