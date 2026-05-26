import React from 'react'
import QueryProvider from './query-provider'

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    )
}

export default AppProvider
