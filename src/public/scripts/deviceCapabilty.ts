import * as microsoftTeams from '@microsoft/teams-js';
// import { printLog, getCurrentDateTime } from './../utils/utils.js';

export const initializeDCP = () => {
  const defaultValue = "{\"mediaType\":1,\"maxMediaCount\":1,\"imageProps\":{\"sources\":[1,2],\"startMode\":1,\"ink\":true,\"cameraSwitcher\":true,\"textSticker\":true,\"enableFilter\":false}}"
  printLog("initializeDCP");

  // Call the initialize API first
  microsoftTeams.initialize();

  var clearLogs = document.getElementById("clearLogs") as HTMLButtonElement;
  clearLogs.onclick = () => {
    (document.getElementById("logs")as HTMLDivElement).innerText = "";
  };

  (document.getElementById("selectMediaITA")as HTMLTextAreaElement).value = defaultValue;
  (document.getElementById("getMediaITA") as HTMLTextAreaElement).value = defaultValue;
  (document.getElementById("viewImagesITA") as HTMLTextAreaElement).value = defaultValue;

  var selectMediaBtn = (document.getElementById("selectMedia") as HTMLButtonElement);
  selectMediaBtn.onclick = () => {
    var selectMediaInput = (document.getElementById("selectMediaITA") as HTMLTextAreaElement).value;
    printLog(selectMediaInput);

    var mediaInputs = JSON.parse(selectMediaInput);
    selectMedia(mediaInputs);
  };

  var getMediaBtn = (document.getElementById("getMedia") as HTMLButtonElement);
  getMediaBtn.onclick = () => {
    var getMediaInput = (document.getElementById("getMediaITA") as HTMLTextAreaElement).value;
    printLog(getMediaInput);

    var mediaInputs = JSON.parse(getMediaInput);
    getMedia(mediaInputs);
  };

  var viewImagesBtn = (document.getElementById("viewImages") as HTMLButtonElement);
  viewImagesBtn.onclick = () => {
    var viewImagesInput = (document.getElementById("viewImagesITA") as HTMLTextAreaElement).value;
    printLog(viewImagesInput);

    var mediaInputs = JSON.parse(viewImagesInput);
    viewImages(mediaInputs);
  };

  function selectMedia(mediaInputs: microsoftTeams.media.MediaInputs) {
    printLog("selectMedia - " + mediaInputs);
    microsoftTeams.media.selectMedia(mediaInputs, (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
      if (err) {
        output(err.errorCode + " " + err.message);
        return;
      }

      let message = "";
      for (let i = 0; i < medias.length; i++) {
        const media: microsoftTeams.media.Media = medias[i];
        let preview = "";
        let len = 20;
        if (media.preview) {
          len = Math.min(len, media.preview.length);
          preview = media.preview.substr(0, len);
        }
        message += "[format: " + media.format + ", size: " + media.size
          + ", mimeType: " + media.mimeType + ", content: " + media.content
          + ", preview: " + preview + "]"
      }
      output(message);
    });
  }

  function getMedia(mediaInputs: microsoftTeams.media.MediaInputs) {
    printLog("getMedia - " + mediaInputs);
    microsoftTeams.media.selectMedia(mediaInputs, (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
      if (err) {
        output(err.errorCode + " " + err.message);
        return;
      }

      const media: microsoftTeams.media.Media = medias[0] as microsoftTeams.media.Media;
      media.getMedia((gmErr: microsoftTeams.SdkError, blob: Blob) => {
        if (gmErr) {
          output(gmErr.errorCode + " " + gmErr.message);
          return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          if (reader.result) {
            output("Received Blob");
          }
        }
      });
    });
  }

  function viewImages(mediaInputs: microsoftTeams.media.MediaInputs) {
    printLog("viewImages - " + mediaInputs);
    microsoftTeams.media.selectMedia(mediaInputs, (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
      if (err) {
        output(err.errorCode + " " + err.message);
        return;
      }

      const urlList: microsoftTeams.media.ImageUri[] = [];
      for (let i = 0; i < medias.length; i++) {
        const media = medias[i];
        urlList.push({
          value: media.content,
          type: 1 //microsoftTeams.ImageUriType.ID
        } as microsoftTeams.media.ImageUri)
      }

      microsoftTeams.media.viewImages(urlList, (gmErr?: microsoftTeams.SdkError) => {
        if (gmErr) {
          output(gmErr.errorCode + " " + gmErr.message);
          return;
        }

        output("Success");
      });
    });
  }

  function output(msg?: string | null) {
    printLog(msg)
  }

  function printLog(msg?: string | null) {
    var finalMessage = "[" + getCurrentDateTime() + "] " + msg;
    var logDiv = document.getElementById("logs") as HTMLDivElement;
    var p = document.createElement("p") as HTMLParagraphElement;
    p.innerText = finalMessage;
    logDiv.insertBefore(p, logDiv.firstChild);

    console.log("DCP: " + finalMessage);
  }

  // ------------------------------------------------------------------------

  function getCurrentDateTime() {
    var today = new Date();
    var date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    return dateTime;
  }};