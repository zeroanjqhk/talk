window.shared = {
    chatWindows: {},
  };

function openCheck(friendId,user_id){
    console.log(window.shared.chatWindows.hasOwnProperty(friendId))
    if (window.shared.chatWindows.hasOwnProperty(friendId)) {
        const existingChatWindow = window.shared.chatWindows[friendId];
        if (existingChatWindow.closed) {
          openChatWindow(friendId);
        } else {
          existingChatWindow.focus();
        }
      } else {
        openSave(friendId, user_id)
        openChatWindow(friendId);
      }
}




function openSave(friendId,user_id){
    const sortIds = [user_id, friendId].sort();
    const roomName = sortIds.join("");
    localStorage.setItem("friendId", friendId);
    localStorage.setItem("roomName", roomName);
    localStorage.setItem("myId", user_id);
    console.log(friendId,roomName,user_id)

}



function openChatWindow(friendId) {
  const url = "../../page/chat/chatting.html?id=" + friendId;
  const name = "ChatWindow_" + friendId;
  const options = "width=600,height=400";

  const newChatWindow = window.open(url, name, options);
  window.shared.chatWindows[friendId] = newChatWindow;


  newChatWindow.onbeforeunload = function() {
    delete window.shared.chatWindows[friendId];
  };
}