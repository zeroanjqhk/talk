
const id = document.querySelector("#userid");
const pw = document.querySelector("#userpw");

function login_check() {
  if (id.value === "") {
    alert("아이디를 입력해주세요.");
    id.focus();
    return false;
  }
  if (pw.value === "") {
    alert("패스워드를 입력해주세요.");
    pw.focus();
    return false;
  }
console.log(id.value)
  // 서버로 로그인 요청 보내기
  axios.post("/select", {id:id.value,pw:pw.value })
    .then(response => {
        console.log(response.data.length)
        if(response.data.length == 0){
            alert("아이디가 없습니다.");
            return;
        }else{
            location.href="../../page/list/list.html";
        }

      // 로그인 성공 시 list.html로 이동
 
    })
    .catch(error => {
      console.log(error);
      alert("로그인에 실패했습니다.");
    });
}