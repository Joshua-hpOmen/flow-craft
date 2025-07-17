"use client"
import { flowToExecutionPlan, FlowToExecutionPlanValidationError } from "@/lib/workflow/executionPlan";
import { AppNode, AppNodeMissingInputs } from "@/types/app-node";
import { useReactFlow } from "@xyflow/react";
import React from "react";
import useFlowValidation from "./use-flow-validation";
import { toast } from "sonner";

const useExecutionPlan = () => {
    const {toObject} = useReactFlow();
    const {setInvalidInputs, clearErrors} = useFlowValidation()

    const handleError = React.useCallback((error: {
            type: FlowToExecutionPlanValidationError;
            invalidElements?: AppNodeMissingInputs[];
        }) => {

        switch (error.type) {
            case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
                toast.error("No entry point found")
                break;
            case FlowToExecutionPlanValidationError.INVALID_INPUTS:
                toast.error("Not all inputs values are defined");
                setInvalidInputs(error.invalidElements || [])
                break;
            default:
                toast.error("Something went wrong");
        }

    }, [setInvalidInputs])

    const generateExceutionPlan = React.useCallback(() => {
        const {nodes, edges} = toObject();
        const result = flowToExecutionPlan(nodes as AppNode[], edges)

        if(result.error){
            handleError(result.error)
            console.log(result.error)
            return null
        }

        clearErrors()
        return result.executionPlan
    }, [toObject, clearErrors, handleError])

    return generateExceutionPlan
};

export default useExecutionPlan