"use strict"

const socket = io();
const friendId = localStorage.getItem("friendId");
const roomName = localStorage.getItem("roomName");
const nickname = document.querySelector("#nickname")
const myId = localStorage.getItem("myId");
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container")
const name ="11";


chatInput.addEventListener("keypress", (event)=>{
    if(event.keyCode === 13){
        send(true);
    }
})

function send(type){
console.log(`ddd`);
    const param = {
        name: myId,
        msg: chatInput.value,
        friendId:friendId,
        roomName:roomName,
        type:type

    }
    socket.emit("chatting" , param)
}


sendButton.addEventListener("click", send)


socket.on("chatting",(data)=>{
    console.log(data);
    console.log(`소켓 데이터 수신이구나!.!`);
    const {name, msg, time} = data;
    const item= new LiMoodel(name, msg, time);
    console.log(name,time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
});


function LiMoodel(name, msg, time){

    console.log(name);
    this.name = name;
    this.msg = msg;
    this.time = time;

    console.log("됨?");
    this.makeLi = ()=>{
        
    console.log("됨?");
        const li=document.createElement("li");
        console.log(myId === this.name?"sent":"received");
        
        
    console.log("됨?");
        li.classList.add(myId === this.name ? "sent":"received")
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="https://placeimg.com/50/50/any" alt="any">
    </span>
    <span class="message">${this.msg}</span>
    <span class="isread">1</span>
    <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);

    }
}


function init(){
    nickname.innerHTML = friendId;
}

function friend_chattingList(){
    const param = {
        id: myId,
        friendId: friendId,
        roomName:roomName
    }
    axios.post("/chatting/list/read", param)
    .then(response => {
        console.log(response);
        axios.post("/chatting/List", param)
        .then(response => { 
            const data = response.data
            console.log(data);
            listlistslit(data);
      
        
        })
        .catch(error => {
            console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
}

function listlistslit(data){
    data.forEach( e => {
        console.log(e.ID, e.MESSAGE, e.IN_DT, e.IS_READ)
        LiMoodel2(e.ID, e.MESSAGE, e.IN_DT, e.IS_READ);
    });
}

function LiMoodel2(name, msg, time, isread){
    
    console.log("name? =" + name +"nickname.value?" +nickname.value);
        const li=document.createElement("li");
        console.log(myId === name?"sent":"received");
        
        
    console.log("됨?");
        li.classList.add(myId === name ? "sent":"received")
        const dom = `<span class="profile">
        <span class="user">${name}</span>
        <img class="image" src="https://placeimg.com/50/50/any" alt="any">
    </span>
    <span class="message">${msg}</span>
    <span class="isread">${isread==1?isread:""}</span>
    <span class="time">${time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
}

// 팝업 창 내부의 JavaScript 코드 (popup.html)
window.addEventListener("click", () => {
    console.log("팝업 창에서 콘솔 로그 출력");
    const param = {
        id: myId,
        friendId: friendId,
        roomName:roomName
    }
    axios.post("/chatting/list/read", param)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

   // window.opener.postMessage("click", "*");
  });

window.onload = function () {
    init();
    friend_chattingList();
    send(false);
};
