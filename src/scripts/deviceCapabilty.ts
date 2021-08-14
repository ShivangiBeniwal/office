import * as microsoftTeams from '@microsoft/teams-js';
import { printLog, formatFileSize } from './../utils/utils';

export const initializeDCP = () => {
  const logTag = "DCP"
  output("initializeDCP")
  const defaultAudioValue = "{\n  \"mediaType\" : 4,\n  \"maxMediaCount\" : 6,\n  \"audioProps\" : \n  "
                          + "{\n    \"maxDuration\" : 4,\n    \"videoEnable\" : true,\n    \"videoVisibility\" : true,"
                          + "\n    \"cameraMode\": 1\n  }\n}";
  const defaultImageValue = "{\n  \"mediaType\" : 1,\n  \"maxMediaCount\" : 6,\n  \"imageProps\" : \n  "
                          + "{\n    \"sources\" : [1,2],\n    \"startMode\" : 1,\n    \"ink\" : true,"
                          + "\n    \"cameraSwitcher\" : true,\n    \"textSticker\" : true,\n    \"enableFilter\" : true\n  }\n}";
  const defaultVideoValue = "{\n  \"mediaType\" : 2,\n  \"maxMediaCount\" : 6,\n  \"videoProps\" : \n  "
                          + "{\n    \"sources\" : [1,2],\n    \"startMode\" : 5,\n    \"ink\" : true,"
                          + "\n    \"cameraSwitcher\" : true,\n    \"textSticker\" : true,\n    \"enableFilter\" : true,"
                          + "\n    \"maxDuration\" : 4\n  }\n}";


  const defaultVideoAndImageProps: microsoftTeams.media.VideoAndImageProps = {
    sources: [microsoftTeams.media.Source.Camera, microsoftTeams.media.Source.Gallery],
    startMode: microsoftTeams.media.CameraStartMode.Photo,
    ink: true,
    cameraSwitcher: true,
    textSticker: true,
    enableFilter: true,
    maxDuration: 4,
    resolution: microsoftTeams.media.VideoResolution.SD_360P
  }

  const defaultVideoAndImageMediaInput: microsoftTeams.media.MediaInputs = {
    mediaType: microsoftTeams.media.MediaType.VideoAndImage,
    maxMediaCount: 6,
    videoAndImageProps: defaultVideoAndImageProps
  }

  const defaultVideoProps: microsoftTeams.media.VideoProps = {
    sources: [microsoftTeams.media.Source.Camera, microsoftTeams.media.Source.Gallery],
    startMode: microsoftTeams.media.CameraStartMode.Photo,
    cameraSwitcher: true,
    maxDuration: 4,
    resolution: microsoftTeams.media.VideoResolution.SD_360P
  }

  const defaultVideoMediaInput: microsoftTeams.media.MediaInputs = {
    mediaType: microsoftTeams.media.MediaType.VideoAndImage,
    maxMediaCount: 6,
    videoAndImageProps: defaultVideoProps
  }

  const defaultImageProps: microsoftTeams.media.ImageProps = {
    sources: [microsoftTeams.media.Source.Camera, microsoftTeams.media.Source.Gallery],
    startMode: microsoftTeams.media.CameraStartMode.Photo,
    ink: true,
    cameraSwitcher: true,
    textSticker: true,
    enableFilter: true
  }

  const defaultImageMediaInput: microsoftTeams.media.MediaInputs = {
    mediaType: microsoftTeams.media.MediaType.Image,
    maxMediaCount: 6,
    imageProps: defaultImageProps
  }

  const defaultAudioProps: microsoftTeams.media.AudioProps = {
    maxDuration: 4
  }

  const defaultAudioMediaInput: microsoftTeams.media.MediaInputs = {
    mediaType: microsoftTeams.media.MediaType.Audio,
    maxMediaCount: 6,
    audioProps: defaultAudioProps
  }

  // Call the initialize API first
  microsoftTeams.initialize()

  const apiType = document.querySelector('select#apiType') as HTMLSelectElement
  const mediaType = document.querySelector('#mediaType') as HTMLSelectElement
  const startButton = document.getElementById('start') as HTMLButtonElement
  const inputTextArea = document.getElementById('inputTextArea') as HTMLTextAreaElement
  const blobDiv = document.getElementById('blobs') as HTMLDivElement

  inputTextArea.value = JSON.stringify(defaultVideoAndImageMediaInput, undefined, 4)
  inputTextArea.style.width = inputTextArea.scrollWidth + "px";
  inputTextArea.style.height = inputTextArea.scrollHeight + "px";

  mediaType.onchange = () => {
    const selectOption = mediaType.options[mediaType.selectedIndex].value
    var value = JSON.stringify(defaultVideoAndImageMediaInput, undefined, 4)
    if (selectOption == 'image')
      value = JSON.stringify(defaultImageMediaInput, undefined, 4)
    else if (selectOption == 'audio')
      value = JSON.stringify(defaultAudioMediaInput, undefined, 4)
    else if (selectOption == 'video')
      value = defaultVideoValue
    inputTextArea.value = value
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
    output(`${selectOption} : ${JSON.stringify(mediaInput, undefined, 4)}`)

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

        var message = "MEDIA " + (i + 1) + " - [format: " + media.format + ",\n [size: " + formatFileSize(media.size) + " (" + media.size + ")]"
                      + ", \nmimeType: " + media.mimeType + ", content: " + media.content
                      + ", \npreview: " + preview + "]"
        var mediaType = getMediaType(mediaInputs)
        var src = "data:" + mediaType + ";base64," + media.preview
        createViewElement(message, mediaType, src)
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
              var mediaType = getMediaType(mediaInputs)
              var poster = "data:" + mediaType + ";base64," + media.preview
              createViewElement(message, blob.type, URL.createObjectURL(blob), poster, i)
            } else {
              output("error occurred")
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
          type: microsoftTeams.media.ImageUriType.ID
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

  function createViewElement(message: string, mediaType: string, src: string, poster?: string, index?: number) {
    var innerBlock = document.createElement('div') as HTMLDivElement
    var msg = document.createElement('p') as HTMLParagraphElement
    msg.innerText = message
    msg.style.overflow = 'auto'
    msg.style.paddingLeft = '10px'
    msg.style.paddingRight = '10px'
    innerBlock.appendChild(msg)

    var element: HTMLAudioElement | HTMLImageElement | HTMLVideoElement
    if (mediaType.includes('video')) {
      var video = document.createElement('video') as HTMLVideoElement
      video.controls = true
      video.preload = "auto"
      if (poster)
        video.poster = poster
      element = video
    } else if (mediaType.includes('audio')) {
      var audio = document.createElement('audio') as HTMLAudioElement
      audio.controls = true
      element = audio
    } else {
      var img = document.createElement('img') as HTMLImageElement
      element = img
    }

    element.src = src
    element.style.width = '300px'
    element.style.height = '400px'

    innerBlock.appendChild(element)
    innerBlock.className = 'blob'
    blobDiv.appendChild(innerBlock)
  }

  function getMediaType(mediaInputs: microsoftTeams.media.MediaInputs): string {
    if (mediaInputs.mediaType == 4) {
      return "audio"
    }
    return "image"
  }

  function output(msg?: string) {
    printLog(logTag, msg)
  }
}