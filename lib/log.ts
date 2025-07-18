import { Log, LogCollector, LogFunction, LogLevel, LogLevels } from "@/types/log";

export const createLogCollector = () : LogCollector => {
    const logs: Log[] = [];
    const getAll = () => logs;

    const logFuncs = {} as Record<LogLevel, LogFunction>
    LogLevels.forEach(level => logFuncs[level] = 
        (message: string) => logs.push({message, level, timestamp: new Date()}))

    return  {
        getAll,
        ...logFuncs
    }
}