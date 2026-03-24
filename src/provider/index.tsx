import React from 'react'
import UiProvider from './ui-provider'

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <UiProvider>
            {children}
        </UiProvider>
    )
}

export default AppProvider
