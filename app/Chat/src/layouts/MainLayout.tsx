// ./layouts/MainLayout.tsx
import { ReactNode } from "react"

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex" }}>{children}</div>
    </div>
  )
}

export default MainLayout
