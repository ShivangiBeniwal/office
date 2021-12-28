import * as microsoftTeams from '@microsoft/teams-js';
import { printLog, formatFileSize } from './../utils/utils';

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 0.8,
    canvas = <HTMLCanvasElement> document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');

export const initializeDCP = () => {
  const logTag = "DCP"
  output("initializeDCP")
  const defaultImageOutputValue = "{\n  \"mediaType\" : 1,\n  \"maxMediaCount\" : 6,\n  \"imageProps\" : \n  "
                          + "{\n    \"sources\" : [1,2], \"imageOutputFormats\":[2],\n    \"startMode\" : 1,\n    \"ink\" : true," 
                          + "\n    \"cameraSwitcher\" : true,\n    \"textSticker\" : true,\n    \"enableFilter\" : true\n  }\n}";

  const defaultVideoAndImageProps: microsoftTeams.media.VideoAndImageProps = {
    sources: [microsoftTeams.media.Source.Camera, microsoftTeams.media.Source.Gallery],
    startMode: microsoftTeams.media.CameraStartMode.Photo,
    ink: true,
    cameraSwitcher: true,
    textSticker: true,
    enableFilter: true,
    maxDuration: 30
  }

  const defaultVideoAndImageMediaInput: microsoftTeams.media.MediaInputs = {
    mediaType: microsoftTeams.media.MediaType.VideoAndImage,
    maxMediaCount: 6,
    videoAndImageProps: defaultVideoAndImageProps
  }

  let videoControllerCallback: microsoftTeams.media.VideoControllerCallback = {
    onRecordingStarted() {
      console.log('onRecordingStarted Callback Invoked');
      output("onRecordingStarted Callback Invoked");
      stopMedia.style.display = 'block'
    },
  };

  const defaultNativeVideoProps: microsoftTeams.media.VideoProps = {
    maxDuration: 30,
    isFullScreenMode: false,
    isStopButtonVisible: false,
    videoController: new microsoftTeams.media.VideoController(videoControllerCallback)
  }

  const defaultNativeVideoMediaInput: microsoftTeams.media.MediaInputs = {
    mediaType: microsoftTeams.media.MediaType.Video,
    maxMediaCount: 1,
    videoProps: defaultNativeVideoProps
  }

  const defaultLensVideoProps: microsoftTeams.media.VideoProps = {
    sources: [microsoftTeams.media.Source.Camera, microsoftTeams.media.Source.Gallery],
    startMode: microsoftTeams.media.CameraStartMode.Photo,
    cameraSwitcher: true,
    maxDuration: 30
  }

  const defaultLensVideoMediaInput: microsoftTeams.media.MediaInputs = {
    mediaType: microsoftTeams.media.MediaType.Video,
    maxMediaCount: 6,
    videoProps: defaultLensVideoProps
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
    maxMediaCount: 1,
    audioProps: defaultAudioProps
  }

  const stopItem: microsoftTeams.menus.MenuItem = {
    id: "stop",
    title: "STOP",
    icon: null,
    viewData: null,
    enabled: true,
    selected: false
  }

  // Call the initialize API first
  microsoftTeams.initialize()

  const apiType = document.querySelector('#apiType') as HTMLSelectElement
  const mediaType = document.querySelector('#mediaType') as HTMLSelectElement
  const startButton = document.querySelector('#start') as HTMLButtonElement
  const inputTextArea = document.querySelector('#inputTextArea') as HTMLTextAreaElement
  const blobDiv = document.querySelector('#blobs') as HTMLDivElement

  const stopMedia = document.querySelector('#stopMedia') as HTMLButtonElement
  stopMedia.style.display = 'none'
  stopMedia.onclick = () => {
    new microsoftTeams.media.VideoController().stop((err?: microsoftTeams.SdkError) => {
      if (err) {
        output(`[] Error occured while stopping the video - ${err.errorCode} : ${err.message}`)
        // Retry
      }
      stopMedia.style.display = 'none'
      output(`[] Video successfully stopped`)
      // Success case handling
    })
  }

  const clearLogs = document.querySelector('#clearLogs') as HTMLButtonElement
  clearLogs.onclick = () => {
    clearLogClick()
  }

  inputTextArea.value = JSON.stringify(defaultNativeVideoMediaInput, undefined, 4)
  inputTextArea.style.width = inputTextArea.scrollWidth + "px";
  inputTextArea.style.height = inputTextArea.scrollHeight + "px";

  mediaType.onchange = () => {
    const selectOption = mediaType.options[mediaType.selectedIndex].value
    var value = JSON.stringify(defaultNativeVideoMediaInput, undefined, 4)
    if (selectOption == 'image')
      value = JSON.stringify(defaultImageMediaInput, undefined, 4)
    else if (selectOption == 'audio')
      value = JSON.stringify(defaultAudioMediaInput, undefined, 4)
    else if (selectOption == 'videoAndImage')
      value = JSON.stringify(defaultVideoAndImageMediaInput, undefined, 4)
    else if (selectOption == 'lensVideo')
      value = JSON.stringify(defaultLensVideoMediaInput, undefined, 4)
    else if (selectOption == 'imageOutputFormats')
      value = defaultImageOutputValue
    inputTextArea.value = value
  }

  function clearLogClick() {
    (document.querySelector('#logs') as HTMLDivElement).innerText = "";
    blobDiv.innerText = "";
  }

  startButton.onclick = () => {
    clearLogClick()

    const mediaInput = JSON.parse(inputTextArea.value)
    const selectOption = apiType.options[apiType.selectedIndex].value
    output(`${selectOption} : ${JSON.stringify(mediaInput, undefined, 4)}`)

    if (mediaInput.mediaType === microsoftTeams.media.MediaType.Video && mediaInput.videoProps && mediaInput.videoProps.isFullScreenMode === false) {
      if (mediaInput.videoProps.videoController) {
        mediaInput.videoProps.videoController = defaultNativeVideoProps.videoController
      }
      enableStopButton()
    }

    if (selectOption == 'getMedia')
        getMedia(mediaInput)
    else if(selectOption == 'viewImages')
        viewImages(mediaInput)
    else
        selectMedia(mediaInput)
  }

  function enableStopButton() {
    stopMedia.style.display = 'block'
    microsoftTeams.menus.setNavBarMenu([stopItem], (id: string) => {
      if (id === "stop") {
        new microsoftTeams.media.VideoController().stop((err?: microsoftTeams.SdkError) => {
          if (err) {
            output(`Error occured while stopping the video - ${err.errorCode} : ${err.message}`)
            // Retry
          }
          stopMedia.style.display = 'none'
          output(`Video successfully stopped`)
          // Success case handling
        })
      }
      return true;
    })
  }

  function selectMedia(mediaInputs: microsoftTeams.media.MediaInputs) {
    microsoftTeams.media.selectMedia(mediaInputs, (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
      microsoftTeams.menus.setNavBarMenu([], (id: string) => {return true});
      stopMedia.style.display = 'none'
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
        var mediaType = getSelectMediaMimeType(media.mimeType)
        var src = "data:" + mediaType + ";base64," + media.preview
        createViewElement(message, mediaType, src)
      }
    });
  }

  function getMedia(mediaInputs: microsoftTeams.media.MediaInputs) {
    microsoftTeams.media.selectMedia(mediaInputs, (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
      microsoftTeams.menus.setNavBarMenu([], (id: string) => {return true});
      stopMedia.style.display = 'none'
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
            output("MEDIA " + (i + 1) + gmErr.errorCode + " " + gmErr.message)
            return;
          }
          
          var reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {            
            if (reader.result) {
              var timeTaken = new Date().getTime() - timeMap.get(i);
              var message = "MEDIA " + (i + 1) + " - Received Blob : \n[size - " + formatFileSize(blob.size) + " (" + blob.size + "),\n"
                          + "timeTaken - " + timeTaken + "]"
              var poster = "data:" + getSelectMediaMimeType(media.mimeType) + ";base64," + media.preview
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
      output("audio recieved")
    } else if (mediaType.includes('application/pdf')) {
      loadPdfInViewer(src)
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

  function getSelectMediaMimeType(mimeType: string): string {
    if (mimeType.includes("video")) {
      return "image"
    }
    return mimeType
  }

  function output(msg?: string) {
    printLog(logTag, msg)
    console.log(msg)
  }

  function loadPdfInViewer(url : String){
      const prev = document.querySelector('#prev') as HTMLButtonElement; 
      const next = document.querySelector('#next') as HTMLButtonElement;
      prev.onclick = () => {
        onPrevPage()
      }
      next.onclick = () => {
        onNextPage()
      }
      // Loaded via <script> tag, create shortcut to access PDF.js exports.
      var pdfjsLib = window['pdfjs-dist/build/pdf'];
      pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
      pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
      pdfDoc = pdfDoc_;
     //document.querySelector('page_count').textContent = pdfDoc.numPages;
     // Initial/first page rendering
        renderPage(pageNum);
      });
  }

  function renderPage(num) {
    pageRendering = true;
    // Using promise to fetch the page
    pdfDoc.getPage(num).then(function(page) {
      var viewport = page.getViewport({scale: scale});
      canvas.height = viewport.height;
      canvas.width = viewport.width;
  
      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
  
      // Wait for rendering to finish
      renderTask.promise.then(function() {
        pageRendering = false;
        if (pageNumPending !== null) {
          // New page rendering is pending
          renderPage(pageNumPending);
          pageNumPending = null;
        }
      });
    });
  
    // Update page counters
    //document.querySelector('page_num').textContent = num;
  }
  
  /**
   * If another page rendering in progress, waits until the rendering is
   * finised. Otherwise, executes rendering immediately.
   */
  function queueRenderPage(num) {
    if (pageRendering) {
      pageNumPending = num;
    } else {
      renderPage(num);
    }
  }
  
  /**
   * Displays previous page.
   */
  function onPrevPage() {
    if (pageNum <= 1) {
      return;
    }
    pageNum--;
    queueRenderPage(pageNum);
  }
  /**
   * Displays next page.
   */
  function onNextPage() {
    if (pageNum >= pdfDoc.numPages) {
      return;
    }
    pageNum++;
    queueRenderPage(pageNum);
  }
}
