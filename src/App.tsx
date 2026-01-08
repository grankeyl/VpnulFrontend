import './App.css';

import TelegramModule from './hooks/useTelegram';

import { useEffect, useState } from 'react';
import { useSubsStore } from "./store/subs.store";

import { Home } from './pages/Home/Home';
import { Tasks } from './pages/Tasks/Tasks';
import { Profile } from './pages/Profile/Profile';
import { Referrals } from './pages/Referrals/Referrals';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Load } from './components/Load/Load';
import { Header } from './components/Header';
import { Footer } from './components/Footer/Footer';
import { ModalProvider } from "./components/modal/ModalProvider";

import { BuySubscriptionModal } from "./pages/Home/Modals/BuySubscription/BuySubscriptionModal";
import { WithdrawModal } from './pages/Referrals/Modals/Withdraw/Withdraw';

import { userApi } from "./api";
import { useUserStore } from './store/user.store';

const registry = {
  buySubscription: BuySubscriptionModal,
  withdraw: WithdrawModal,
} as const;

function App() {
  const [mounted, setMounted] = useState(false);

  const setUserData = useUserStore((s) => s.setUserData);
  const setUserDataMeta = useUserStore((s) => s.setUserDataMeta);

  const auth = async () => {
    const initDataRaw = TelegramModule.initDataRaw() as any;

    const init = await userApi.init(initDataRaw);
    if (!init) return;

    setUserData({ ...init.user });
    setUserDataMeta({ ...init.meta });

    TelegramModule.readyMiniApp();

    setTimeout(() => {
      setMounted(true);
    }, 300);
  };

  useEffect(() => {
    auth();
  }, []);

  window.addEventListener("beforeunload", () => {
    useSubsStore.getState().clearSubsData();
    localStorage.removeItem("subs_store_v1");
  });

  if (!mounted) {
    return <Load />;
  }

  return (
    <BrowserRouter>
      <ModalProvider registry={registry}>
        <div className="fonts-loaded h-screen w-full bg-black">
          <div className="w-full max-w-xl h-screen relative overflow-hidden flex flex-col justify-center items-center bg-black m-auto">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/referrals" element={<Referrals />} />
              <Route path="/w" element={<div style={{ color: "white", padding: 24 }}>Tasks page</div>} />
            </Routes>
            <Footer />
          </div>
        </div>
      </ModalProvider>
    </BrowserRouter>
  )
}

export default App
