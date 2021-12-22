import { initializeDCP } from './scripts/deviceCapabilty';
import { printLog } from './utils/utils';

export const initialize = () => {
    const logTag = "init"

    initializeDCP()
    printLog(logTag, "initializeDCP")
}