let fetchData=()=>{
    const xhr=new XMLHttpRequest();
    xhr.open('GET','https://jsonplaceholder.typicode.com/users/');
    xhr.send();
    xhr.onload=()=>{
        let res=JSON.parse(xhr.responseText);
        console.log(res);
        localStorage.setItem("users",JSON.stringify(res));
        display();
    }
}

let display=()=>{
    let tbody=document.getElementById('tbody');
    tbody.innerHTML="";
    let storedData=JSON.parse(localStorage.getItem("users"));
    console.log(storedData);
    storedData.map(
        (user,index)=>(
            tbody.innerHTML+=`
                <tr>
                <td>
                ${index+1}
                </td>
                <td>
                ${user.firstname}
                </td>
                <td>
                ${user.lastname}
                </td>
                <td>
                ${user.username}
                </td>
                <td>
                ${user.firstname}
                </td>
                </tr>
            `
        )
    );
}

document.getElementById('registrationForm').addEventListener('submit',(e)=>{
    e.preventDefault();
    const firstname=document.getElementById('firstname').value;
    const lastname=document.getElementById('lastname').value;
    const username=document.getElementById('username').value;
    const password1=document.getElementById('password1').value;
    const user={
        username: username,
        firstname: firstname,
        lastname: lastname,
        password1: password1, 
    }
    const xhr=new XMLHttpRequest();
    xhr.open('POST','https://jsonplaceholder.typicode.com/users/');
    xhr.setRequestHeader('Content-type','application/json; charset=UTF-8');
    xhr.send(JSON.stringify(user));
    console.log(localStorage)
    xhr.onload=()=>{
        if(xhr.status==201){
            let arr=JSON.parse(localStorage.getItem("users"))||[];
            arr.unshift(user);
            localStorage.setItem("users",JSON.stringify(arr));
            display();
        }
    }
})