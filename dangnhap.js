const APIlogin = 'https://61bc10bcd8542f001782451a.mockapi.io/Dangki'
var xacnhan =0;
var seekId = 0;
var a =''
var loginStatus = false;
function confirmData(){
    axios.get(`${APIlogin}`).then(function(res){
        for(var i = 0; i<res.data.length;i++){
            if(res.data[i].Tendangnhap==document.getElementById("login").value && res.data[i].matkhau==document.getElementById("matkhau").value){
              xacnhan++;
              a=res.data[i].Ho
              seekId =res.data[i].id
            }
        }
        if(xacnhan!=0){
            alert("Đăng nhập thành công")
            loginStatus = true;
           document.getElementById('abcd').style.display ='none'
           document.querySelector(".footer").style.display = 'block'
           document.getElementById("userName").innerHTML =  a 
            reset()
            localStorage.setItem("idlogin",seekId)
        }
        else{
            alert("đăng nhập thất bại")
            reset()
        }
    })
}
function reset(){
    document.getElementById("login").value=''
    document.getElementById("matkhau").value =''
}
function loadpage(){
    id =  window.localStorage.getItem('idlogin');
    if(id == undefined){
        document.getElementById('abcd').style.display ='block'
        document.querySelector(".footer").style.display = 'block'
        document.getElementById("userName").innerHTML =  ''
    }
    else{
        loginStatus = true;
        document.getElementById('abcd').style.display ='none'
        document.querySelector(".footer").style.display = 'block'
        axios.get(`${APIlogin}`).then(function(res){
            for (var i = 0; i<res.data.length;i++){
                if(res.data[i].id == id){
                    document.getElementById('userName').innerHTML = res.data[i].Ho
                }
            }
        })
    }
}
function logout(){
    localStorage.clear();
    location.reload();
}
function outputdatatouser(){
    id=window.localStorage.getItem('idlogin');
    axios.get(`${APIlogin}`).then(function(res){
        for (var i =0; i<res.data.length;i++){
            if(res.data[i].id == id){
                document.getElementById('hovatencapnhat').value = res.data[i].Ho
                document.getElementById('sodienthoaicapnhat').value = res.data[i].Sodienthoai
                document.getElementById('diachicapnhat').value = res.data[i].address
                document.getElementById('emailcapnhat').value = res.data[i].email
            }
        }
    })
}
function uploadtomodal(){
    id=window.localStorage.getItem('idlogin');
    var hovaten= document.getElementById('hovatencapnhat').value
    var sodienthoai= document.getElementById('sodienthoaicapnhat').value
    var diachi = document.getElementById('diachicapnhat').value
    var email = document.getElementById('emailcapnhat').value
    var data ={
        Ho :hovaten,
        Sodienthoai: sodienthoai,
        address :diachi,
        email:email
    }
    axios.put(`${APIlogin}/${id}`,data).then(() => {location.reload()});
}
function changepassword(){
    var email = document.getElementById('emaillaylaimk').value;
    var a = Math.floor(Math.random()*100000000)+1;
    axios.get(`${APIlogin}`).then(function(res){
        for(var i = 0 ; i<res.data.length;i++){
            if(res.data[i].email == email){
                id = res.data[i].id
                var data ={
                    matkhau: a,
                    email:email,
                    Tendangnhap: res.data[i].Tendangnhap
                }
                axios.put(`${APIlogin}/${id}`,data).then(sendEmailoutput(a,email,res.data[i].Tendangnhap));
            }
        }
    })
    
}
function sendEmailoutput(matkhau,email,tendangnhap){
    var data ={
        matkhau:matkhau,
        email:email,
        Ho: tendangnhap
    }
    emailjs.send('service_n8ss14q','template_8cmmlim',data)
    alert("Mật khẩu của bạn đã được cập nhật vui lòng vào email để kiểm tra lại")
}
