import { flowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { AppNode } from "@/types/app-node";
import { useReactFlow } from "@xyflow/react";
import React from "react";

const useExecutionPlan = () => {
    const {toObject} = useReactFlow();

    const generateExceutionPlan = React.useCallback(() => {
        const {nodes, edges} = toObject();
        const result = flowToExecutionPlan(nodes as AppNode[], edges)

        return result.executionPlan
    }, [toObject])

    return generateExceutionPlan
};

export default useExecutionPlan