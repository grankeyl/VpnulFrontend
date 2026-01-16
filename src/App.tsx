import './App.css';

import TelegramModule from './hooks/useTelegram';

import { useEffect, useState } from 'react';

import { Home } from './pages/Home/Home';
import { Tasks } from './pages/Tasks/Tasks';
import { Profile } from './pages/Profile/Profile';
import { Referrals } from './pages/Referrals/Referrals';
import { Instruction } from './pages/Instrucrion/Instrucrion';
import { Redirect } from './pages/Redirect/Redirect';
import { ToastProvider } from './components/Toast/ToastContext';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Load } from './components/Load/Load';
import { Header } from './components/Header';
import { Footer } from './components/Footer/Footer';
import { ModalProvider } from "./components/modal/ModalProvider";

import { BuySubscriptionModal } from "./pages/Modals/BuySubscription/BuySubscriptionModal";
import { WithdrawModal } from './pages/Referrals/Modals/Withdraw/Withdraw';
import { ActiveSubscription } from './pages/Modals/ActiveSubscription/ActiveSubscription';

import { userApi } from "./api";
import { useUserStore } from './store/user.store';
import { useTelegramLifecycle } from './hooks/useTelegramLifecycle';

const registry = {
  buySubscription: BuySubscriptionModal,
  activeSubscription: ActiveSubscription,
  withdraw: WithdrawModal,
} as const;

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mounted, setMounted] = useState(false);

  useTelegramLifecycle();

  const setUserData = useUserStore((s) => s.setUserData);
  const setUserDataMeta = useUserStore((s) => s.setUserDataMeta);
  const setSubscriptionData = useUserStore((s) => s.setSubscriptionData);

  const checkPageOpener = () => {
    if (location.pathname.startsWith("/redirect")) {
      TelegramModule.readyMiniApp();
      setMounted(true);
    }
  };

  const auth = async () => {
    checkPageOpener();

    const initDataRaw = TelegramModule.initDataRaw() as any;
    const initData = TelegramModule.initData() as any;

    const init = await userApi.init(initDataRaw);
    if (!init) return;

    setUserData({ ...init.user });
    setUserDataMeta({ ...init.meta });
    setSubscriptionData({ ...init.subscription });

    await initStartApp(initData.start_param);
    
    TelegramModule.readyMiniApp();

    setTimeout(() => {
      setMounted(true);
    }, 300);
  };

  function miniAppTransport(dtx: any) {
    if (!dtx || dtx === "debug") return;
    if (dtx === "instruction") { navigate("/instruction"); return; }
    if (dtx === "instruction") { navigate("/instruction"); return; }
    if (dtx === "instruction") { navigate("/instruction"); return; }
    if (dtx === "instruction") { navigate("/instruction"); return; }
    if (dtx === "instruction") { navigate("/instruction"); return; }
  }

  async function initStartApp(startParam?: string) {
    if (!startParam) return;
    const [, startAppType = ""] = (startParam ?? "").split("_");
    switch (startAppType) {
      case "opener":
        break;
      default:
        miniAppTransport(startParam);
    }
  }

  useEffect(() => {
    auth();
  }, []);

  if (!mounted) {
    return <Load />;
  }

  return (
      <ModalProvider registry={registry}>
        <ToastProvider>
          <div className="fonts-loaded h-screen w-full bg-black">
            <div className="w-full max-w-xl h-screen relative overflow-hidden flex flex-col justify-center items-center bg-black m-auto">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/referrals" element={<Referrals />} />
                <Route path="/instruction" element={<Instruction />} />
                <Route path="/redirect" element={<Redirect />} />
                <Route path="/w" element={<div style={{ color: "white", padding: 24 }}>Tasks page</div>} />
              </Routes>
              <Footer />
            </div>
          </div>
        </ToastProvider>
      </ModalProvider>
  )
}

export default App
