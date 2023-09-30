import { createContext, useContext, useState } from "react";

interface AlertProviderProps {
  children: React.ReactNode
}

type AlertProviderState = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const initialState: AlertProviderState = {
  isOpen: false,
  setIsOpen: () => null
}

const AlertProviderContext = createContext<AlertProviderState>(initialState)

export function AlertProvider({
  children,
  ...props
}: AlertProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const value = {
    isOpen,
    setIsOpen: (isOpen: boolean) => {
      setIsOpen(isOpen)
    }
  }

  return (
    <AlertProviderContext.Provider {...props} value={value}>
      {children}
    </AlertProviderContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(AlertProviderContext)

  if (context === undefined)
    throw new Error("useAlert must be used within a AlertProvider")

  return context
}