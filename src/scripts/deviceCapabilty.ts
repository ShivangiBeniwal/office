import * as microsoftTeams from '@microsoft/teams-js';
import { printLog, formatFileSize } from './../utils/utils';

export const initializeDCP = () => {
  const logTag = "DCP"
  const defaultAudioValue = "{\n  \"mediaType\" : 4,\n  \"maxMediaCount\" : 1,\n  \"audioProps\" : \n  "
                          + "{\n    \"maxDuration\" : 1,\n    \"videoEnable\" : true,\n    \"videoVisibility\" : true,"
                          + "\n    \"cameraMode\": 1\n  }\n}";
  const defaultImageValue = "{\n  \"mediaType\" : 1,\n  \"maxMediaCount\" : 1,\n  \"imageProps\" : \n  "
                          + "{\n    \"sources\" : [1,2],\n    \"startMode\" : 1,\n    \"ink\" : true,"
                          + "\n    \"cameraSwitcher\" : true,\n    \"textSticker\" : true,\n    \"enableFilter\" : false\n  }\n}";
  const defaultVideoValue = "{\n  \"mediaType\" : 2,\n  \"maxMediaCount\" : 3,\n  \"videoProps\" : \n  "
                          + "{\n    \"sources\" : [1,2],\n    \"startMode\" : 5,\n    \"ink\" : true,"
                          + "\n    \"cameraSwitcher\" : true,\n    \"textSticker\" : true,\n    \"enableFilter\" : false,"
                          + "\n    \"maxDuration\" : 1\n  }\n}";
  output("initializeDCP")

  // Call the initialize API first
  microsoftTeams.initialize()

  const apiType = document.querySelector('select#apiType') as HTMLSelectElement
  const mediaType = document.querySelector('#mediaType') as HTMLSelectElement
  const startButton = document.getElementById('start') as HTMLButtonElement
  const inputTextArea = document.getElementById('inputTextArea') as HTMLTextAreaElement
  const blobDiv = document.getElementById('blobs') as HTMLDivElement

  inputTextArea.value = defaultVideoValue
  inputTextArea.style.width = inputTextArea.scrollWidth + "px";
  inputTextArea.style.height = inputTextArea.scrollHeight + "px";
  mediaType.onchange = () => {
    const selectOption = mediaType.options[mediaType.selectedIndex].value
    if (selectOption == 'image') 
      inputTextArea.value = defaultImageValue
    else if (selectOption == 'audio') 
      inputTextArea.value = defaultAudioValue
    else
      inputTextArea.value = defaultVideoValue
  }

  const clearLogs = document.getElementById('clearLogs') as HTMLButtonElement
  clearLogs.onclick = () => {
    clearLogClick()
  }
  
  function clearLogClick() {
    (document.getElementById('logs') as HTMLDivElement).innerText = "";
    blobDiv.innerText = "";
  }

  startButton.onclick = () => {
    clearLogClick()

    const mediaInput = JSON.parse(inputTextArea.value)
    const selectOption = apiType.options[apiType.selectedIndex].value
    output(`${selectOption} : ${JSON.stringify(mediaInput)}`)

    if (selectOption == 'getMedia')
        getMedia(mediaInput)
    else if(selectOption == 'viewImages')
        viewImages(mediaInput)
    else
        selectMedia(mediaInput)
  }

  function selectMedia(mediaInputs: microsoftTeams.media.MediaInputs) {
    microsoftTeams.media.selectMedia(mediaInputs, (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
      if (err) {
        output(err.errorCode + " " + err.message)
        return
      }

      for (let i = 0; i < medias.length; i++) {
        const media: microsoftTeams.media.Media = medias[i]
        let preview = "", len = 20
        if (media.preview) {
          len = Math.min(len, media.preview.length)
          preview = media.preview.substr(0, len)
        }

        var innerBlock = document.createElement('div') as HTMLDivElement
        var msg = document.createElement('p') as HTMLParagraphElement
        msg.innerText = "MEDIA " + (i + 1) + " - [format: " + media.format + ", size: " + media.size
        + ", mimeType: " + media.mimeType + ", content: " + media.content
        + ", preview: " + preview + "]"
        innerBlock.appendChild(msg)

        if (media.mimeType.includes('image')) {
          var img = document.createElement('img') as HTMLImageElement
          img.src = ("data:" + media.mimeType + ";base64," + media.preview)
          setSize(img)
          innerBlock.appendChild(img)
        }

        if (media.mimeType.includes('video')) {
          var vid = document.createElement('video') as HTMLVideoElement
          vid.src = ("data:" + media.mimeType + ";base64," + media.preview)
          setSize(vid)
          vid.controls = true
          innerBlock.appendChild(vid)
        }
          
        if (media.mimeType.includes('audio')) {
          var aud = document.createElement('audio') as HTMLAudioElement
          aud.src = ("data:" + media.mimeType + ";base64," + media.preview)
          setSize(aud)
          aud.controls = true;
          innerBlock.appendChild(aud)
        }
        
        innerBlock.className = 'blob'
        blobDiv.appendChild(innerBlock)
      }
    });
  }

  function getMedia(mediaInputs: microsoftTeams.media.MediaInputs) {
    microsoftTeams.media.selectMedia(mediaInputs, (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
      if (err) {
        output(err.errorCode + " " + err.message)
        return
      }

      let message = ""
      for (let i = 0; i < medias.length; i++) {
        const media: microsoftTeams.media.Media = medias[i]
        media.getMedia((gmErr: microsoftTeams.SdkError, blob: Blob) => {
          if (gmErr) {
            output(gmErr.errorCode + " " + gmErr.message)
            return;
          }

          var reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            if (reader.result) {

              var innerBlock = document.createElement('div') as HTMLDivElement
              var msg = document.createElement('p') as HTMLParagraphElement
              msg.innerText = "MEDIA " + (i + 1) + " - Received Blob : size - " + formatFileSize(blob.size) + " (" + blob.size + ")"
              innerBlock.appendChild(msg)

              if (blob.type.includes('image')) {
                var img = document.createElement('img') as HTMLImageElement
                img.src = URL.createObjectURL(blob)
                setSize(img)
                innerBlock.appendChild(img)
              }

              if (blob.type.includes('video')) {
                var vid = document.createElement('video') as HTMLVideoElement
                vid.src = URL.createObjectURL(blob)
                setSize(vid)
                vid.controls = true
                innerBlock.appendChild(vid)
              }
              
              if (blob.type.includes('audio')) {
                var aud = document.createElement('audio') as HTMLAudioElement
                aud.src = URL.createObjectURL(blob)
                setSize(aud)
                aud.controls = true
                innerBlock.appendChild(aud)
              }
              
              innerBlock.className = 'blob'
              blobDiv.appendChild(innerBlock)
            }
          }
        });
      }
    });
  }

  function viewImages(mediaInputs: microsoftTeams.media.MediaInputs) {
    microsoftTeams.media.selectMedia(mediaInputs, (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
      if (err) {
        output(err.errorCode + " " + err.message)
        return
      }

      const urlList: microsoftTeams.media.ImageUri[] = [];
      for (let i = 0; i < medias.length; i++) {
        const media = medias[i]
        urlList.push({
          value: media.content,
          type: 1 //microsoftTeams.ImageUriType.ID
        } as microsoftTeams.media.ImageUri)
      }

      microsoftTeams.media.viewImages(urlList, (gmErr?: microsoftTeams.SdkError) => {
        if (gmErr) {
          output(gmErr.errorCode + " " + gmErr.message)
          return
        }

        output("Success")
      });
    });
  }

  function setSize(element: HTMLElement) {
    element.style.width = '300px'
    element.style.height = '400px'
  }

  function output(msg?: string) {
    printLog(logTag, msg)
  }
}