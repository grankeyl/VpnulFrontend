export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-[18px_20px] rounded-lg bg-white dark:bg-[#111]">
      {children}
    </div>
  )
}