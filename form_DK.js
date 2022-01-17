const APTform ='https://61bc10bcd8542f001782451a.mockapi.io/Dangki'

 var id =0;
var xacnhan=0;
var arr = []
function addData (){
    id++;
    var firstName = document.getElementById('firstName').value;
    var phone = document.getElementById("phone").value;
    var nameLogin = document.getElementById("account").value;
    var password = document.getElementById('password').value;
    var address = document.getElementById('adress').value;
    var email = document.getElementById('email').value;
    if(password.length<8){
        document.getElementById('canhbao').innerHTML="Vui lòng nhập trên 8 kí tự"
        document.getElementById('password').value='';
        return
    }
    if(firstName.length==0 || phone.length==0  || nameLogin.length==0  || email.length==0  || address.length==0){
        alert("Vui lòng nhập đầy đủ thông tin đăng kí")
        return
    }

    var data = {
        id:id,
        Ho:firstName,
        Sodienthoai: phone,
        address: address,
        email:email,
        Tendangnhap: nameLogin,
        matkhau: password
    }
    axios.get(`${APTform}`).then(function(res) {
        arr= res.data;
       for(let i = 0 ; i < arr.length;i ++){
        if(nameLogin == arr[i].Tendangnhap ){
            xacnhan = 1
           break
        }
       }
       if(xacnhan == 0){
        
        axios.post(APTform,data).then(
            
            alert("Đã đăng kí thành công")
            
        )
        sendEmail(firstName,email,password)
           
       }
       else{ 
        alert("Tài khoản đã tồn tại vui lòng đăng kí lại")
        xacnhan = 0;}
      
    })
   
    
    
}
function reset(){
    document.getElementById('firstName').value='';
     document.getElementById('adress').value='';
     document.getElementById("phone").value='';
    document.getElementById("account").value='';
    document.getElementById('password').value='';
    document.getElementById('email').value='';
}
function sendEmail(ten,email,matkhau){

    var data ={
        ten: ten,
        email:email,
        matkhau:matkhau
    }
    emailjs.send('service_7o58ygf','template_h91guhj',data)
}
