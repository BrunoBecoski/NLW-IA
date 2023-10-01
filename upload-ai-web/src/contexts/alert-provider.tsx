import { createContext, useContext, useState } from "react";

import { Alert } from "../components/alert";

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
      <Alert
        action="action"
        cancel="cancel"
        description="description"
        title="title"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
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