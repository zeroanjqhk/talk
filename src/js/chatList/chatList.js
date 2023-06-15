
const socket = io();
const chatList_list = document.querySelector('.chatList-list');
const myId = localStorage.getItem("myId");
const list_friend = document.querySelector('.chatList-list-friendList');

window.onload = function () {
    console.log('채팅목록');
    chatList_List();
  };


  
  list_friend.addEventListener("click", (event)=>{
    location.href="../../page/list/list.html";
  });
  

  function chatList_List() {
    console.log("why?");
    axios.post("/chatList/list")
      .then(response => {
        console.log(response.data);
        chatList_create(response.data);
      })
      .catch(error => {
        console.log(error);
        alert("로그인에 실패했습니다.");
      });
  }

  function chatList_create(data){
    console.log(data);

    data.forEach(e => {

      
      const li=document.createElement("li");
      li.id = `${e.ROOM_ID}`; // 각 <li>에 고유한 ID 할당
      li.addEventListener("dblclick", handleChatListDoubleClick);
      const isread = e.ID==myId?"0":e.IS_READ;
      console.log("됨?");
      const dom = ` <div class="chatList-profile">
      <span>친구 프로필</span>
      </div>
      <div class="chatList-message">
          <label>${e.SEND_ID}</label>
          <span>${e.MESSAGE}</span>
      </div>
      <div class ="chatList-time">
          <span class="chatlist_time_span">${e.IN_DT}</span>
          <span class="chatlist_talkcnt_span" id="span${e.ROOM_ID}" >${e.ID==myId?"0":e.IS_READ}</span>                      
          
      </div>`;
      li.innerHTML = dom;
      chatList_list.appendChild(li);
      setUnreadCount("span"+e.ROOM_ID, e.isRead);
      const param = {
       
        roomName:e.ROOM_ID

    }
      socket.emit("chatting" , param)
      
    });

    
    
    
  }

  socket.on("chatting",(data)=>{
    console.log(data);
    console.log(`소켓 데이터 수신이구나!.!`);
    const {name, msg, time, roomName, isRead} = data;
    console.log(roomName);
    const li= document.getElementById(roomName);
    const span_msg = li.querySelector('.chatList-message span');
    const span_time = li.querySelector('.chatlist_time_span');
    
    span_msg.textContent=msg;
    span_time.textContent=time;
    chatList_list.prepend(li);
    setUnreadCount("span"+roomName, isRead ,name);
    
});


  function setUnreadCount(elementId, count ,id) {
    const element = document.getElementById(elementId);
    console.log(element, count);
    if (myId == id) {
      element.style.display = "none";
    } else {
      element.style.display = "block";
      element.textContent = count;
    }
  }

  function handleChatListDoubleClick(event){
    //const itemId = event.target.closest("li").id;;
    const itemId = event.currentTarget.id;
    const friendId = event.currentTarget.querySelector('label').textContent;
    
    openCheck(friendId,myId);

    localStorage.setItem("friendId", friendId);
    localStorage.setItem("roomName", itemId);

  console.log("List Item ID:", itemId);
  }

  