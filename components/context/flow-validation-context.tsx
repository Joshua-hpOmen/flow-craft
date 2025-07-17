"use client"
import { AppNodeMissingInputs } from "@/types/app-node"
import React, { Dispatch, SetStateAction } from "react"

type FlowValidationCOntextType = {
    invalidInputs:AppNodeMissingInputs[],
    setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputs[]>>
    clearErrors: () => void
}

export const FlowValidationContext = React.createContext<FlowValidationCOntextType| null>(null)

type ProviderProps = {
    children: React.ReactNode
}

export const FlowValidationcontextProvider: React.FC<ProviderProps> = (props: ProviderProps) => {
    const [invalidInputs, setInvalidInputs] = React.useState<AppNodeMissingInputs[]>([]);

    const clearErrors = () => setInvalidInputs([])

    return <FlowValidationContext.Provider value={{invalidInputs, setInvalidInputs, clearErrors}}>
        {props.children}
    </FlowValidationContext.Provider>
}