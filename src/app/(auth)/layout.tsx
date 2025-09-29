'use client'

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-screen">
      <main className="flex h-full flex-col">
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  )
}
