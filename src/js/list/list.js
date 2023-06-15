


const list_search = document.querySelector("#list_search");
const list_add = document.querySelector("#list_add");
const list_search_list = document.querySelector(".list_search_list");
const list_friend = document.querySelector(".list_ui");
const list_friends_chattingList = document.querySelector(".list-friends-chattingList");


let user_id = "";

function friendList() {
  axios.get("/list/select")
    .then(response => {
      console.log(`111111111111111111111111dick`);
      
      list_friend_select();
    })
    .catch(error => {
      console.log(error);
      alert("로그인에 실패했습니다.");
    });
}

list_add.addEventListener("click", (event) => {
  console.log('추가');
  list_search_pop();
});

list_search.addEventListener("click", (event) => {
  if (list_search_list.style.display === "none") {
    list_search_list.style.display = "block";
  } else {
    list_search_list.style.display = "none";
  }
});

list_friends_chattingList.addEventListener("click", (event) => {
  location.href="../../page/chatList/chatList.html";
});


function list_search_pop() {
  var url = "list_add_pop.html";
  var name = "popup test";
  var option = "width=300,height=200,top=0,left=0,location=no";
  window.open(url, name, option);
}

function init() {
  friendList();
}

window.onload = function () {
  console.log('로그인');
  init();
};

function list_friend_select() {
  console.log("why?");
  axios.post("/list/friend/list")
    .then(response => {
      console.log(response.data);
      list_friend_list(response.data);
    })
    .catch(error => {
      console.log(error);
      alert("로그인에 실패했습니다.");
    });
}

function list_friend_list(data) {
  list_friend.addEventListener("dblclick", handleFriendClick);
  user_id = data[0].ID;
  
  data.forEach((e, i) => {
    const li = document.createElement("li");
    li.dataset.friendId = e.F_ID;
    li.addEventListener("dblclick", handleFriendDoubleClick);

    const dom = `
      <span>${e.F_ID}</span>
      <span class="list-friends-id">${e.F_NAME}</span>
      <span class="list-friends-message">${e.F_MESSAGE}</span>
    `;
    li.innerHTML = dom;
    list_friend.appendChild(li);
  });
}

function handleFriendClick(event) {
  const target = event.target;
  if (target.tagName === "LI") {
    const friendId = target.querySelector(".list-friends-id").textContent;
    handleFriendDoubleClick(friendId);
  }
}


function handleFriendDoubleClick(event) {
  console.log(event.target.dataset.friendId)
  const friendId = event.target.dataset.friendId;
  console.log("Double click on friend with ID: ", friendId);
  openCheck(friendId,user_id);
}

window.addEventListener("message", (event) => {
  if (event.data === "click") {
    console.log("클릭 이벤트 감지");
  }
});