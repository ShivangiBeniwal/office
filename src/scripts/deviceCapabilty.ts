import * as microsoftTeams from '@microsoft/teams-js';
import { printLog } from './../utils/utils';

export const initializeDCP = () => {
  const logTag = "DCP";
  const defaultValue = "{\"mediaType\":1,\"maxMediaCount\":1,\"imageProps\":{\"sources\":[1,2],\"startMode\":1,\"ink\":true,\"cameraSwitcher\":true,\"textSticker\":true,\"enableFilter\":false}}"
  const defaultValueV = "{\"mediaType\":2,\"maxMediaCount\":3,\"videoProps\":{\"sources\":[1,2],\"startMode\":5,\"ink\":true,\"cameraSwitcher\":true,\"textSticker\":true,\"enableFilter\":false}}"
  output("initializeDCP");

  // Call the initialize API first
  microsoftTeams.initialize();

  var clearLogs = document.getElementById("clearLogs") as HTMLButtonElement;
  clearLogs.onclick = () => {
    (document.getElementById("logs")as HTMLDivElement).innerText = "";
  };

  (document.getElementById("selectMediaITA")as HTMLTextAreaElement).value = defaultValue;
  (document.getElementById("getMediaITA") as HTMLTextAreaElement).value = defaultValue;
  (document.getElementById("viewImagesITA") as HTMLTextAreaElement).value = defaultValueV;

  var selectMediaBtn = (document.getElementById("selectMedia") as HTMLButtonElement);
  selectMediaBtn.onclick = () => {
    var selectMediaInput = (document.getElementById("selectMediaITA") as HTMLTextAreaElement).value;
    output(selectMediaInput);

    var mediaInputs = JSON.parse(selectMediaInput);
    selectMedia(mediaInputs);
  };

  var getMediaBtn = (document.getElementById("getMedia") as HTMLButtonElement);
  getMediaBtn.onclick = () => {
    var getMediaInput = (document.getElementById("getMediaITA") as HTMLTextAreaElement).value;
    output(getMediaInput);

    var mediaInputs = JSON.parse(getMediaInput);
    getMedia(mediaInputs);
  };

  var viewImagesBtn = (document.getElementById("viewImages") as HTMLButtonElement);
  viewImagesBtn.onclick = () => {
    var viewImagesInput = (document.getElementById("viewImagesITA") as HTMLTextAreaElement).value;
    output(viewImagesInput);

    var mediaInputs = JSON.parse(viewImagesInput);
    viewImages(mediaInputs);
  };

  function selectMedia(mediaInputs: microsoftTeams.media.MediaInputs) {
    output("selectMedia - " + mediaInputs);
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

        message += "IMAGE " + (i + 1) + " - [format: " + media.format + ", size: " + media.size
          + ", mimeType: " + media.mimeType + ", content: " + media.content
          + ", preview: " + preview + "]"

          output(message);
          message = "";
      }
    });
  }

  function getMedia(mediaInputs: microsoftTeams.media.MediaInputs) {
    output("getMedia - " + mediaInputs);
    microsoftTeams.media.selectMedia(mediaInputs, (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
      if (err) {
        output(err.errorCode + " " + err.message);
        return;
      }

      for (let i = 0; i < medias.length; i++) {
        const media: microsoftTeams.media.Media = medias[i];
        media.getMedia((gmErr: microsoftTeams.SdkError, blob: Blob) => {
          if (gmErr) {
            output(gmErr.errorCode + " " + gmErr.message);
            return;
          }

          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            if (reader.result) {
              output("IMAGE " + (i + 1) + " - Received Blob " + blob + "" + reader.result);
            }
          }
        });
      }
    });
  }

  function viewImages(mediaInputs: microsoftTeams.media.MediaInputs) {
    output("viewImages - " + mediaInputs);
    microsoftTeams.media.selectMedia(mediaInputs, (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
      if (err) {
        output(err.errorCode + " " + err.message);
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
};