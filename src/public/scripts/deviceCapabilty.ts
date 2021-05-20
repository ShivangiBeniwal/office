import * as microsoftTeams from '@microsoft/teams-js';

export const initializeDCPButton = () => {
  const defaultValue = "{\"mediaType\":1,\"maxMediaCount\":1,\"imageProps\":{\"sources\":[1,2],\"startMode\":1,\"ink\":true,\"cameraSwitcher\":true,\"textSticker\":true,\"enableFilter\":false}}"
  printLog("initializeDCPButton");

  // Call the initialize API first
  microsoftTeams.initialize();

  // Check the initial theme user chose and respect it
  microsoftTeams.getContext(function(context){
    if (context)
      printLog(context.userClickTime + "")
      if (context && context.theme) {
          setTheme(context.theme);
      }
  });

  // Handle theme changes
  microsoftTeams.registerOnThemeChangeHandler(function(theme) {
      setTheme(theme);
  });

  // Set the desired theme
  function setTheme(theme: string) {
    if (theme) {
        // Possible values for theme: 'default', 'light', 'dark' and 'contrast'
        document.body.className = 'theme-' + (theme === 'default' ? 'light' : theme);
    }
  }

  document.getElementById("selectMediaITA")!.innerText = defaultValue;
  document.getElementById("getMediaITA")!.innerText = defaultValue;
  document.getElementById("viewImagesITA")!.innerText = defaultValue;

  var selectMediaBtn = document.getElementById("selectMedia");
  selectMediaBtn!.onclick = () => {
    var selectMediaInput = document.getElementById("selectMediaITA")!.innerHTML;
    printLog(selectMediaInput);

    var mediaInputs = JSON.parse(selectMediaInput!);
    selectMedia(mediaInputs);
  };

  var getMediaBtn = document.getElementById("getMedia");
  getMediaBtn!.onclick = () => {
    var getMediaInput = document.getElementById("getMediaITA")!.innerHTML;
    printLog(getMediaInput);

    var mediaInputs = JSON.parse(getMediaInput!);
    getMedia(mediaInputs);
  };

  var viewImagesBtn = document.getElementById("viewImages");
  viewImagesBtn!.onclick = () => {
    var viewImagesInput = document.getElementById("viewImagesITA")!.innerHTML;
    printLog(viewImagesInput);

    var mediaInputs = JSON.parse(viewImagesInput!);
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
    var logDiv = document.getElementById("logs");
    var p = document.createElement("p");
    p.innerText = finalMessage;

    if (logDiv)
        logDiv.insertBefore(p, logDiv.childNodes[0]);

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