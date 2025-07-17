"use client"
import React from 'react'
import { FlowValidationContext } from '../context/flow-validation-context'

const useFlowValidation = () => {
    const context = React.useContext(FlowValidationContext)
    if(!context) throw new Error("useFlowValidation context must be used within the appropriate provider")
        
    return context
}

export default useFlowValidation