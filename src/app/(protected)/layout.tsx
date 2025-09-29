'use client'

import { GovBar, AdminUserBar, Icon, MenuAction, FlexContainer } from "@uigovpe/components";
import { StepperProvider } from "./(context)/StepperContext";
import Image from "next/image";
import { Footer } from "../infrastructure/components/layout/Footer";

function ProtectedLayoutContent({ children }: { children: React.ReactNode }) {

  const user = {
    name: 'Nome do Usuário',
    profile: 'Nível de acesso'
  }

  const userMenuActions: MenuAction = [
    {
      label: 'Perfil',
      icon: <Icon icon="account_circle" />,
      command: () => {
          alert("acessar página de perfil!")
      }
    },
    {
      label: 'Sair',
      icon: <Icon icon="logout" />,
      command: () => {
        alert("Deslogar usuário!")
      }
    },
  ];

  return (
    <div className="h-screen">
      <GovBar
      showCookies={false}
        ui={{
          container: {
            className: 'fixed top-0 left-0'
          }
        }}
      />
      <section className="flex w-full fixed top-8 left-0">
        <div className="py-2.5 px-6 pr-0 flex justify-center items-center border-b border-[var(--color-outline-default)]">
          <Image
            src="/images/logos/logo-govpe.png"
            width={80}
            height={51}
            alt="Farmácia Digital"
            className="rounded"
          />
        </div>
        <AdminUserBar 
          user={user}
          menuActions={userMenuActions}
          ui={{
            buttonMenu: {
              className: 'hidden'
            }
          }}
        />
      </section>

      <main className="relative top-[6rem] pt-8 px-5 md:pt-14 md:px-10 w-full max-w-[120rem] h-[calc(100%-6rem)] mx-auto overflow-auto">
        <StepperProvider>
          {children}
        </StepperProvider>

        <Footer />
      </main>
    </div>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StepperProvider>
      <ProtectedLayoutContent>{children}</ProtectedLayoutContent>
    </StepperProvider>
  );
}
