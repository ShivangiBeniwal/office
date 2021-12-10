import * as microsoftTeams from '@microsoft/teams-js';
import { printLog, formatFileSize } from './../utils/utils';

export const initializeNavigation = () => {
  const logTag = "Navigation"
  output("initializeNavigation")

  // Call the initialize API first
  microsoftTeams.initialize()

  const item1: microsoftTeams.menus.MenuItem = { id: "filter", title: "Filter", viewData: null, enabled: true, selected: false,
    displayMode: 0,
    icon: "PHN2ZyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMnB4JyBoZWlnaHQ9JzMycHgnIHZpZXdCb3g9JzAgMCAyOCAyOCcgdmVyc2lvbj0nMS4xJz48ZyBpZD0nUHJvZHVjdC1JY29ucycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+PGcgaWQ9J2ljX2ZsdWVudF9maWx0ZXJfMjhfcmVndWxhcicgZmlsbD0nIzIxMjEyMScgZmlsbC1ydWxlPSdub256ZXJvJz48cGF0aCBkPSdNMTcuMjUsMTkgQzE3LjY2NDIxMzYsMTkgMTgsMTkuMzM1Nzg2NCAxOCwxOS43NSBDMTgsMjAuMTY0MjEzNiAxNy42NjQyMTM2LDIwLjUgMTcuMjUsMjAuNSBMMTAuNzUsMjAuNSBDMTAuMzM1Nzg2NCwyMC41IDEwLDIwLjE2NDIxMzYgMTAsMTkuNzUgQzEwLDE5LjMzNTc4NjQgMTAuMzM1Nzg2NCwxOSAxMC43NSwxOSBMMTcuMjUsMTkgWiBNMjEuMjUsMTMgQzIxLjY2NDIxMzYsMTMgMjIsMTMuMzM1Nzg2NCAyMiwxMy43NSBDMjIsMTQuMTY0MjEzNiAyMS42NjQyMTM2LDE0LjUgMjEuMjUsMTQuNSBMNi43NSwxNC41IEM2LjMzNTc4NjQ0LDE0LjUgNiwxNC4xNjQyMTM2IDYsMTMuNzUgQzYsMTMuMzM1Nzg2NCA2LjMzNTc4NjQ0LDEzIDYuNzUsMTMgTDIxLjI1LDEzIFogTTI0LjI1LDcgQzI0LjY2NDIxMzYsNyAyNSw3LjMzNTc4NjQ0IDI1LDcuNzUgQzI1LDguMTY0MjEzNTYgMjQuNjY0MjEzNiw4LjUgMjQuMjUsOC41IEwzLjc1LDguNSBDMy4zMzU3ODY0NCw4LjUgMyw4LjE2NDIxMzU2IDMsNy43NSBDMyw3LjMzNTc4NjQ0IDMuMzM1Nzg2NDQsNyAzLjc1LDcgTDI0LjI1LDcgWicgaWQ9J0NvbG9yJy8+PC9nPjwvZz48L3N2Zz4="
  }

  const item2: microsoftTeams.menus.MenuItem = { id: "newApproval", title: "New Approval Request", viewData: null, enabled: true, selected: false,
    displayMode: 0,
    icon: "PHN2ZyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgd2lkdGg9JzMycHgnIGhlaWdodD0nMzJweCcgdmlld0JveD0nMCAwIDI4IDI4Jz48ZyBpZD0nUHJvZHVjdC1JY29ucycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+PGcgaWQ9J2ljX2ZsdWVudF9hZGRfMjhfcmVndWxhcicgZmlsbD0nIzIxMjEyMScgZmlsbC1ydWxlPSdub256ZXJvJz48cGF0aCBkPSdNMTQuNSwxMyBMMTQuNSwzLjc1Mzc4NTc3IEMxNC41LDMuMzM5Nzg1NzcgMTQuMTY0LDMuMDAzNzg1NzcgMTMuNzUsMy4wMDM3ODU3NyBDMTMuMzM2LDMuMDAzNzg1NzcgMTMsMy4zMzk3ODU3NyAxMywzLjc1Mzc4NTc3IEwxMywxMyBMMy43NTM4NzU3MywxMyBDMy4zMzk4NzU3MywxMyAzLjAwMzg3NTczLDEzLjMzNiAzLjAwMzg3NTczLDEzLjc1IEMzLjAwMzg3NTczLDE0LjE2NCAzLjMzOTg3NTczLDE0LjUgMy43NTM4NzU3MywxNC41IEwxMywxNC41IEwxMywyMy43NTIzNjUxIEMxMywyNC4xNjYzNjUxIDEzLjMzNiwyNC41MDIzNjUxIDEzLjc1LDI0LjUwMjM2NTEgQzE0LjE2NCwyNC41MDIzNjUxIDE0LjUsMjQuMTY2MzY1MSAxNC41LDIzLjc1MjM2NTEgTDE0LjUsMTQuNSBMMjMuNzQ5ODI2MiwxNC41MDMwNzU0IEMyNC4xNjM4MjYyLDE0LjUwMzA3NTQgMjQuNDk5ODI2MiwxNC4xNjcwNzU0IDI0LjQ5OTgyNjIsMTMuNzUzMDc1NCBDMjQuNDk5ODI2MiwxMy4zMzkwNzU0IDI0LjE2MzgyNjIsMTMuMDAzMDc1NCAyMy43NDk4MjYyLDEzLjAwMzA3NTQgTDE0LjUsMTMgWicgaWQ9J0NvbG9yJy8+PC9nPjwvZz48L3N2Zz4="
  }

  const item3: microsoftTeams.menus.MenuItem = { id: "changeApproval", title: "Change Approval Request", viewData: null, enabled: true, selected: false,
    displayMode: 0,
    icon: "PHN2ZyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgd2lkdGg9JzMycHgnIGhlaWdodD0nMzJweCcgdmlld0JveD0nMCAwIDI4IDI4Jz48ZyBpZD0nUHJvZHVjdC1JY29ucycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+PGcgaWQ9J2ljX2ZsdWVudF9hZGRfMjhfcmVndWxhcicgZmlsbD0nIzIxMjEyMScgZmlsbC1ydWxlPSdub256ZXJvJz48cGF0aCBkPSdNMTQuNSwxMyBMMTQuNSwzLjc1Mzc4NTc3IEMxNC41LDMuMzM5Nzg1NzcgMTQuMTY0LDMuMDAzNzg1NzcgMTMuNzUsMy4wMDM3ODU3NyBDMTMuMzM2LDMuMDAzNzg1NzcgMTMsMy4zMzk3ODU3NyAxMywzLjc1Mzc4NTc3IEwxMywxMyBMMy43NTM4NzU3MywxMyBDMy4zMzk4NzU3MywxMyAzLjAwMzg3NTczLDEzLjMzNiAzLjAwMzg3NTczLDEzLjc1IEMzLjAwMzg3NTczLDE0LjE2NCAzLjMzOTg3NTczLDE0LjUgMy43NTM4NzU3MywxNC41IEwxMywxNC41IEwxMywyMy43NTIzNjUxIEMxMywyNC4xNjYzNjUxIDEzLjMzNiwyNC41MDIzNjUxIDEzLjc1LDI0LjUwMjM2NTEgQzE0LjE2NCwyNC41MDIzNjUxIDE0LjUsMjQuMTY2MzY1MSAxNC41LDIzLjc1MjM2NTEgTDE0LjUsMTQuNSBMMjMuNzQ5ODI2MiwxNC41MDMwNzU0IEMyNC4xNjM4MjYyLDE0LjUwMzA3NTQgMjQuNDk5ODI2MiwxNC4xNjcwNzU0IDI0LjQ5OTgyNjIsMTMuNzUzMDc1NCBDMjQuNDk5ODI2MiwxMy4zMzkwNzU0IDI0LjE2MzgyNjIsMTMuMDAzMDc1NCAyMy43NDk4MjYyLDEzLjAwMzA3NTQgTDE0LjUsMTMgWicgaWQ9J0NvbG9yJy8+PC9nPjwvZz48L3N2Zz4="
  }

  const registerBackButton = document.getElementById('registerBackButton') as HTMLButtonElement
  const registerBackReturn = document.querySelector('#registerBackReturn') as HTMLSelectElement
  const setNavBarMenuButton = document.getElementById('setNavBarMenuButton') as HTMLButtonElement
  const setNavBarMenuInput = document.getElementById('setNavBarMenuInput') as HTMLTextAreaElement
  const clearLogs = document.querySelector('#clearLogs') as HTMLButtonElement
  const blobDiv = document.querySelector('#blobs') as HTMLDivElement
  const menuItems = [item1, item2, item3]

  setNavBarMenuInput.value = JSON.stringify(menuItems, undefined, 4)
  setNavBarMenuInput.style.width = setNavBarMenuInput.parentElement.scrollWidth + "px";
  setNavBarMenuInput.style.height = setNavBarMenuInput.scrollHeight + "px";

  setNavBarMenuButton.onclick = () => {
    const menuItems = JSON.parse(setNavBarMenuInput.value)
    microsoftTeams.menus.setNavBarMenu(menuItems, (id: string) => {
      output(`Clicked ${id}`)
      return true;
    })
  }

  registerBackButton.onclick = () => {
    microsoftTeams.registerBackButtonHandler(() => {
      const selectOption = registerBackReturn.options[registerBackReturn.selectedIndex].value
      var isHandled = false
      if (selectOption == 'true') 
        isHandled = true;
      output(`onBack isHandled ${isHandled}`)
      return isHandled;
    })
  }

  clearLogs.onclick = () => {
    clearLogClick()
  }

  function clearLogClick() {
    (document.querySelector('#logs') as HTMLDivElement).innerText = "";
    blobDiv.innerText = "";
  }

  function output(msg?: string) {
    printLog(logTag, msg)
  }
}