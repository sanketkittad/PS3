function fetchData(){
    var xhr=new XMLHttpRequest();
    xhr.open('GET','localhost:');
    xhr.send();
    xhr.onload=()=>{
        let res=JSON.parse(xhr.responseText);
        console.log(res);
        localStorage.setItem("users",JSON.stringify(res));
        display();
    }


}



fetchData();
function display(){
    let tbody=document.getElementById('tbody');
    tbody.innerHTML="";
    var users=JSON.parse(localStorage.getItem("users"));
    //console.log(users);
    users.forEach(element => {
        tbody.innerHTML+=`
        <tr>
            <td>${element.fullname}</td>
            <td>${element.email}</td>
            <td>${element.phone}</td>
        </tr>
        `
    });
}


document.getElementById('regForm').addEventListener('submit',(e)=>{
    e.preventDefault();
    const fullname=document.getElementById('fullname').value;
    const email=document.getElementById('email').value;
    const phone=document.getElementById('phone').value;
    const user={
        fullname: fullname,
        email: email,
        phone: phone
    };
    var xhr=new XMLHttpRequest();
    xhr.open('POST','https://jsonplaceholder.typicode.com/users');
    xhr.setRequestHeader('Content-type','application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload=()=>{
        if(xhr.status==201){
            var users=JSON.parse(localStorage.getItem("users"))||[];
            users.unshift(user);
            localStorage.setItem("users",JSON.stringify(users));
            display();
        }
    }


})