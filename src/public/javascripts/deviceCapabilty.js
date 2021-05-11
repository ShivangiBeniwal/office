(function() {
  "use strict";

  const defaultValue = "{\"mediaType\":1,\"maxMediaCount\":1,\"imageProps\":{\"sources\":[1,2],\"startMode\":1,\"ink\":true,\"cameraSwitcher\":true,\"textSticker\":true,\"enableFilter\":false}}"
  function initializeDCPButton() {
    var selectMediaBtn = document.getElementById("selectMedia");
    selectMediaBtn.onclick = () => {
      var selectMediaTA = document.getElementById("selectMediaTA").value;
      printLog(selectMediaTA);
      selectMedia();
    };

    var getMediaBtn = document.getElementById("getMedia");
    getMediaBtn.onclick = () => {
      var getMediaTA = document.getElementById("getMediaTA").value;
      printLog(getMediaTA);
      getMedia();
    };

    var viewImagesBtn = document.getElementById("viewImages");
    viewImagesBtn.onclick = () => {
      var viewImagesTA = document.getElementById("viewImagesTA").value;
      printLog(viewImagesTA);
      viewImages();
    };
  }

  function selectMedia() {
    printLog("selectMedia");
    var mediaInputs = JSON.parse(defaultValue);
    printLog("selectMedia - "+ mediaInputs);
    microsoftTeams.media.selectMedia(mediaInputs, (err, medias) => {
      if (err) {
        output(err);
        return;
      }

      let message = "";
      for (let i = 0; i < medias.length; i++) {
        const media = medias[i];
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

  function getMedia() {
    printLog("getMedia");
    // microsoftTeams.media.selectMedia(mediaInputs: microsoftTeams.media.MediaInputs,
    //                                 (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
    //   if (err) {
    //     output(err);
    //     return;
    //   }

    //   const media: microsoftTeams.media.Media = medias[0] as microsoftTeams.media.Media;
    //   media.getMedia((gmErr: microsoftTeams.SdkError, blob: Blob) => {
    //     if (gmErr) {
    //       output(gmErr);
    //       return;
    //     }

    //     var reader = new FileReader();
    //     reader.readAsDataURL(blob);
    //     reader.onloadend = () => {
    //       if (reader.result) {
    //         output("Received Blob");
    //       }
    //     }
    //   });
    // });
  }

  function viewImages() {
    printLog("viewImages");
    // microsoftTeams.media.selectMedia(mediaInputs: microsoftTeams.media.MediaInputs,
    //                                 (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
    //   if (err) {
    //     output(err);
    //     return;
    //   }

    //   const urlList: microsoftTeams.media.ImageUri[] = [];
    //   for (let i = 0; i < medias.length; i++) {
    //     const media = medias[i];
    //     urlList.push({
    //       value: media.content,
    //       type: 1 //microsoftTeams.ImageUriType.ID
    //     } as microsoftTeams.media.ImageUri)
    //   }

    //   microsoftTeams.media.viewImages(urlList, (gmErr: microsoftTeams.SdkError) => {
    //     if (gmErr) {
    //       output(gmErr);
    //       return;
    //     }

    //     output("Success");
    //   });
    // });
  }

  function getAuthToken() {
    var authTokenRequest = {
      successCallback: result => {
        printLog("Token received: " + result);
      },
      failureCallback: function(error) {
        printLog("Error getting token: " + error);
      }
    };

    printLog("Get Auth Token Call is made.");
    microsoftTeams.authentication.getAuthToken(authTokenRequest);
  }

  function output(msg) {
    printLog(msg)
  }

  function printLog(msg) {
    var finalMessage = "[" + getCurrentDateTime() + "] " + msg;
    var logDiv = document.getElementById("logs");
    var p = document.createElement("p");
    logDiv.prepend(finalMessage, p);
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
  }

  initializeDCPButton();
})();
