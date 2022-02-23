import { initializeDCP } from './scripts/deviceCapabilty';
import { initializeNavigation } from './scripts/navigation'
import { printLog } from './utils/utils';

export const initialize = () => {
    const logTag = "init"
    const path = window.location.pathname
    
    if (path.includes("navigation")) {
        initializeNavigation()
    } else {
        initializeDCP()
        printLog(logTag, "initializeDCP")
    }
}