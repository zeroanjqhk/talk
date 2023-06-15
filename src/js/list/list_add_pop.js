
const pop_user =  document.querySelector("#pop_user");
const pop_id_insert =  document.querySelector(".pop_id_insert");
const pop_id_search =  document.querySelector("#pop_id_search");


const param={};
let user_info =[];
function pop_list_add(){

    param.id = pop_id_search.value
    axios.post("/add/search", param
    )
    .then(response => {
        console.log(response.data[0]);
        console.log(response.data.length);
        if(response.data.length == 0){
        
            alert("존재하지 않는 아이디 입니다.");
        }else{
            pop_list_add_check(response.data[0]);
           

        }
       // pop_list_friend(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}

function pop_list_add_check(value){

    console.log(value);
    axios.post("/add/check", {id:value.USER_ID}
    )
    .then(response => {
        let type; 
        console.log(response.data.length );
        if(response.data.length == 0){
            type = false;
        }else{
            alert("이미 추가되어있습니다.");
            type = true;
        }
        pop_list_friend(value, type)
    })
    .catch(error => {
      console.log(error);
    });
}

function pop_list_friend(value , type ){
    user_info = value;
    console.log(value);
    console.log(value.USER_ID);
    pop_user.textContent =value.USER_NAME;
    pop_id_insert.disabled = type

    console.log(user_info)
}

function pop_list_insert(){

    
    axios.post("/add/insert" , user_info
    )
    .then(response => {
        pop_id_insert.disabled = true;
        alert("등록 완료");
    })
    .catch(error => {
      console.log(error);
    });
}