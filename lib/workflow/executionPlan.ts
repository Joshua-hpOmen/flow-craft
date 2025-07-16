import { AppNode } from "@/types/app-node";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";

type flowToExecutionPlanType = {
    executionPlan?: WorkflowExecutionPlan
}

const getInvalidInputs = (node:AppNode, edges: Edge[], planned: Set<string>) => {
    const invalidInputs = [];
    const inputs = TaskRegistry[node.data.type].inputs;

    const incomingEdges = edges.filter(edge => edge.target === node.id);

    for(const input of inputs){
        const inputValue = node.data.inputs[input.name];
        const inputValueProvided = inputValue.length > 0;

        if(inputValueProvided) continue;

        const inputLinkedToOutput = incomingEdges.find(edge => edge.targetHandle === input.name)
        const requiredInputProvidedByVisitedOuput = input.required && inputLinkedToOutput && planned.has(inputLinkedToOutput.source)

        if(requiredInputProvidedByVisitedOuput) {
            continue
        }else if (!input.required){
            if(!inputLinkedToOutput) continue;

            if(inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) continue;
        }

        invalidInputs.push(input.name);

    }
    return invalidInputs
}

export const flowToExecutionPlan = (nodes: AppNode[], edges: Edge[]) : flowToExecutionPlanType => {
    const entryPoint  = nodes.find(node => TaskRegistry[node.data.type].isEntryPoint)

    if(!entryPoint) throw new Error("🔴Unhandled Error no entry point")


    const planned = new Set<string>();
    const executionPlan : WorkflowExecutionPlan = [
        {
            phase: 1, 
            nodes: [entryPoint]
        },
    ]

    planned.add(entryPoint.id)

    for (let phase=2; phase <= nodes.length && planned.size < nodes.length ; phase++){

        const nextPhase: WorkflowExecutionPlanPhase = {phase, nodes: []}

        for(const currentNode of nodes) {
            if(planned.has(currentNode.id)) continue;
            const invalidInputs = getInvalidInputs(currentNode, edges, planned)

            if(invalidInputs.length > 0){

                const incomers = getIncomers(currentNode, nodes, edges)
                console.log("🟢The incomers",incomers)

                if(incomers.every(incomer => planned.has(incomer.id))){

                    throw new Error("🔴Unhandled error");

                }else continue;
            }

            nextPhase.nodes.push(currentNode);
        }

        for(const nodeIter of nextPhase.nodes){
            planned.add(nodeIter.id)
        }
        executionPlan.push(nextPhase)
    }

    console.log(executionPlan)
    return { executionPlan }
}