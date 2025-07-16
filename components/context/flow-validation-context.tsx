import { AppNodeMissingInputs } from "@/types/app-node"
import React, { Dispatch, SetStateAction } from "react"

type FlowValidationCOntextType = {
    invalidInputs:AppNodeMissingInputs[],
    setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputs[]>>
    clearErrors: () => void
}

export const FlowValidationContext = React.createContext<FlowValidationCOntextType| null>(null)