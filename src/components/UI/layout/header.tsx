"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter()
  
  const { isAuth, session, status, setAuthState } = useAuthStore()


  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const handleSignOut = async () => {
    try {
    await signOutFunc();  
    } catch (error) {
      console.log("error", error)
    }
  
    setAuthState("unauthenticated", null)
    router.push("/")
  };

  const getNavItems = () => {
   return siteConfig.navItems
    .filter((item) => {
      if (item.href === "/ingredients") {
        return isAuth
      }
        return true
    })
    .map((item) => {
    const isActive = pathname === item.href;

            return (
            <li key={item.href}>
              <Link href={item.href} className={`px-3 py-1
                ${isActive ? "text-blue-500" : "text-foreground"}
                hover:text-blue-300 hover:border
                hover:border-blue-300 hover:rounded-md
                transition-colors
                duration-200`}
              >
                {item.label}
              </Link>
            </li>
            )
          })
  }

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-lg backdrop-saturate-150 border-b border-divider">
      <div className="flex items-center justify-between px-6 max-w-7xl mx-auto"
        style={{height: layoutConfig.headerHeight}}
      >

        {/* Логотип */}
        <div className="flex items-center gap-2 flex-1">
          <Image src="/logo.png" alt="Картинка" width={44} height={44}/>
          <span className="font-bold text-foreground text-base tracking-tight">{siteConfig.title}</span>
        </div>

        
        {/* Ссылки по центру */}
        <ul className="flex items-center gap-8 mx-auto">
          {getNavItems()}
        </ul>

        {/* Login + Sign Up */}
       <div className="flex items-center justify-end gap-3 flex-1">
          {isAuth && <p>Привет, {session?.user?.email?.split("@")[0]}!</p>}


          {status === "loading" ? (
            <p>Загрузка...</p>
          ) : !isAuth ? 
          <> <Button variant="outline" size="sm" className="text-white" onPress={() => setIsLoginOpen(true)}>
              Логин
             </Button>
            <Button size="sm" className="bg-primary text-primary-foreground rounded-md px-4" onPress={() => setIsRegistrationOpen(true)}>
              Регистрация
            </Button> </>
          : <Button variant="outline" size="sm" className="text-white" onPress={handleSignOut}>
              Выйти
            </Button>
          }
        </div> 

      </div>

      <RegistrationModal isOpen={isRegistrationOpen}
      onClose={() => setIsRegistrationOpen(false)} 
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
}