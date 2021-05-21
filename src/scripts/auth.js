const logTag = "Auth"

function initializeAuth() {
  output("initializeAuth", logTag)

  var btn = document.getElementById("promptForConsentButton")
  btn.onclick = () => {
    getAuthToken()
  }
}

function getAuthToken() {
  var authTokenRequest = {
    successCallback: result => {
      output("Token received: " + result, logTag)
    },
    failureCallback: function(error) {
      output("Error getting token: " + error, logTag)
    }
  }

  output("Get Auth Token Call is made.", logTag)
  microsoftTeams.authentication.getAuthToken(authTokenRequest)
}

function output(msg) {
  printLog(logTag, msg)
}

initializeAuth()
