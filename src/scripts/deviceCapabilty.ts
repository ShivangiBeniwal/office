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

                          let videoProps: microsoftTeams.media.VideoProps = {
                            sources: [microsoftTeams.media.Source.Camera, microsoftTeams.media.Source.Gallery],
                            startMode: microsoftTeams.media.CameraStartMode.Photo,
                            ink: false,
                            cameraSwitcher: false,
                            textSticker: false,
                            enableFilter: true,
                            propType: "video"
                        };

                        let mediaInput: microsoftTeams.media.MediaInputs = {
                            mediaType: microsoftTeams.media.MediaType.Image,
                            maxMediaCount: 10,
                            videoProps: videoProps
                        };
  output("initializeDCP")

  // Call the initialize API first
  // "@microsoft/teams-js": "^1.10.0",
  microsoftTeams.initialize()

  const apiType = document.querySelector('select#apiType') as HTMLSelectElement
  const mediaType = document.querySelector('#mediaType') as HTMLSelectElement
  const startButton = document.getElementById('start') as HTMLButtonElement
  const inputTextArea = document.getElementById('inputTextArea') as HTMLTextAreaElement
  const blobDiv = document.getElementById('blobs') as HTMLDivElement

  inputTextArea.value = JSON.stringify(mediaInput)
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

        var message = "MEDIA " + (i + 1) + " - [format: " + media.format + ", size: " + media.size
                      + ", mimeType: " + media.mimeType + ", content: " + media.content
                      + ", preview: " + preview + "]"
        createViewElement(message, media.mimeType, "data:" + media.mimeType + ";base64," + media.preview)
      }
    });
  }

  function getMedia(mediaInputs: microsoftTeams.media.MediaInputs) {
    microsoftTeams.media.selectMedia(mediaInputs, (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
      if (err) {
        output(err.errorCode + " " + err.message)
        return
      }

      var timeMap = new Map();
      for (let i = 0; i < medias.length; i++) {
        timeMap.set(i, new Date().getTime());

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
              var timeTaken = new Date().getTime() - timeMap.get(i);
              var message = "MEDIA " + (i + 1) + " - Received Blob : \n[size - " + formatFileSize(blob.size) + " (" + blob.size + "),\n"
                          + "timeTaken - " + timeTaken + "]"
              createViewElement(message, blob.type, URL.createObjectURL(blob))
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

  function output(msg?: string) {
    printLog(logTag, msg)
  }

  function createViewElement(message: string, mediaType: string, src: string) {
    var innerBlock = document.createElement('div') as HTMLDivElement
    var msg = document.createElement('p') as HTMLParagraphElement
    msg.innerText = message
    msg.style.overflow = 'auto'
    msg.style.paddingLeft = '10px'
    msg.style.paddingRight = '10px'
    innerBlock.appendChild(msg)
    
    var element
    if (mediaType.includes('image')) {
      element = document.createElement('img') as HTMLImageElement
    }
    
    if (mediaType.includes('video')) {
      element = document.createElement('video') as HTMLVideoElement
      element.controls = true
    }
    
    if (mediaType.includes('audio')) {
      element = document.createElement('audio') as HTMLAudioElement
      element.controls = true;
    }
    
    if (element) {
      element.src = src
      element.style.width = '300px'
      element.style.height = '400px'

      innerBlock.appendChild(element) 
      innerBlock.className = 'blob'
      blobDiv.appendChild(innerBlock)
    }
  }
}