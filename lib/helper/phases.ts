import { ExecutionPhase } from "../generated/prisma";

type Phase = Pick<ExecutionPhase, "creditsConsumed">;

export const GetPhasesTotalCoset = (executionPhases: Phase[]) => {
    return executionPhases.reduceRight((accumVal, phase) => accumVal + (phase.creditsConsumed || 0), 0)
}