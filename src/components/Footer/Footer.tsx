import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LockIcon from "../../icons/Lock";
import TasksIcon from "../../icons/Tasks";
import ProfileIcon from "../../icons/Profile";

import "./style.scss";

type FooterTab = "vpn" | "tasks" | "profile";

const tabToPath: Record<FooterTab, string> = {
  vpn: "/",
  tasks: "/tasks",
  profile: "/profile",
};

const pathToTab = (pathname: string): FooterTab => {
  if (pathname.startsWith("/tasks")) return "tasks";
  if (pathname.startsWith("/profile")) return "profile";
  return "vpn";
};

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const active = pathToTab(location.pathname);

  const items = useMemo(
    () => [
      { key: "vpn" as const, label: "VPN", Icon: LockIcon },
      { key: "tasks" as const, label: "Tasks", Icon: TasksIcon },
      { key: "profile" as const, label: "Profile", Icon: ProfileIcon },
    ],
    []
  );

  return (
    <nav className="footer" aria-label="Bottom navigation">
      <div className="glass-pill" />

      <div className="items" role="tablist" aria-orientation="horizontal">
        {items.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            className={"item" + (active === key ? " active" : "")}
            onClick={() => navigate(tabToPath[key])}
            role="tab"
            aria-selected={active === key}
          >
            <Icon />
            <h4>{label}</h4>
          </button>
        ))}
      </div>
    </nav>
  );
};