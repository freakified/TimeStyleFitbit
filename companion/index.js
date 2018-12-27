import { settingsStorage } from "settings";
import * as messaging from "messaging";

settingsStorage.onchange = function(evt) {
  console.log("warning setting recvd");
  console.log(JSON.stringify(evt));
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // uh
    messaging.peerSocket.send(evt);
    
    
    // if (evt.key === "theme") {
    //   let data = JSON.parse(evt.newValue);
    //   messaging.peerSocket.send(data["values"][0].value);
    // }
  }
}
