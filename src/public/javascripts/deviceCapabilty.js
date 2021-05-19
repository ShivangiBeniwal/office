(function() {
  "use strict";

  const defaultValue = "{\"mediaType\":1,\"maxMediaCount\":1,\"imageProps\":{\"sources\":[1,2],\"startMode\":1,\"ink\":true,\"cameraSwitcher\":true,\"textSticker\":true,\"enableFilter\":false}}"
  function initializeDCPButton() {

    document.getElementById("selectMediaITA").value = defaultValue;
    document.getElementById("getMediaITA").value = defaultValue;
    document.getElementById("viewImagesITA").value = defaultValue;

    var selectMediaBtn = document.getElementById("selectMedia");
    selectMediaBtn.onclick = () => {
      var selectMediaInput = document.getElementById("selectMediaITA").value;
      printLog(selectMediaInput);

      var mediaInputs = JSON.parse(selectMediaInput);
      selectMedia(mediaInputs);
    };

    var getMediaBtn = document.getElementById("getMedia");
    getMediaBtn.onclick = () => {
      var getMediaInput = document.getElementById("getMediaITA").value;
      printLog(getMediaInput);

      var mediaInputs = JSON.parse(getMediaInput);
      getMedia(mediaInputs);
    };

    var viewImagesBtn = document.getElementById("viewImages");
    viewImagesBtn.onclick = () => {
      var viewImagesInput = document.getElementById("viewImagesITA").value;
      printLog(viewImagesInput);

      var mediaInputs = JSON.parse(viewImagesInput);
      viewImages(mediaInputs);
    };
  }

  function selectMedia(mediaInputs) {
    printLog("selectMedia");
    microsoftTeams.media.selectMedia(mediaInputs, (err: microsoftTeams.SdkError, medias: microsoftTeams.media.Media[]) => {
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

  function getMedia(mediaInputs) {
    printLog("getMedia");
    microsoftTeams.media.selectMedia(mediaInputs, (err, medias) => {
      if (err) {
        output(err);
        return;
      }

      const media = medias[0];
      media.getMedia((gmErr, blob) => {
        if (gmErr) {
          output(gmErr);
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

  function viewImages(mediaInputs) {
    printLog("viewImages");
    microsoftTeams.media.selectMedia(mediaInputs, (err, medias) => {
      if (err) {
        output(err);
        return;
      }

      const urlList = new Array();
      for (let i = 0; i < medias.length; i++) {
        const media = medias[i];
        urlList.push({
          value: media.content,
          type: 1 //microsoftTeams.ImageUriType.ID
        })
      }

      microsoftTeams.media.viewImages(urlList, (gmErr) => {
        if (gmErr) {
          output(gmErr);
          return;
        }

        output("Success");
      });
    });
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
