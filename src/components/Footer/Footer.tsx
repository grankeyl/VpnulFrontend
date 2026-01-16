import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const active = pathToTab(location.pathname);

  const items = useMemo(
    () => [
      { key: "vpn" as const, label: t("footer.vpn"), Icon: LockIcon },
      { key: "tasks" as const, label: t("footer.tasks"), Icon: TasksIcon },
      { key: "profile" as const, label: t("footer.profile"), Icon: ProfileIcon },
    ],
    []
  );

  const isHide = () => {
    if (location.pathname.startsWith('/instruction')) return true;
    if (location.pathname.startsWith('/redirect')) return true;
    if (location.pathname.startsWith('/profile/referrals')) return true;
    return false;
  }

  return (
    <nav className={`footer ${isHide() ? 'hide' : ''}`} aria-label="Bottom navigation">
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