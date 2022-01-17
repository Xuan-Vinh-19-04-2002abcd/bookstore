const APIcart ='https://61bc10bcd8542f001782451a.mockapi.io/Itemofcart'
const APIlogin = 'https://61bc10bcd8542f001782451a.mockapi.io/Dangki'
const APIgiohang ='https://61bc10bcd8542f001782451a.mockapi.io/donhang'
var a ='';
var dem = 0;
var total =0;
var tong =0;
function showcart(){
    axios.get(`${APIcart}`).then(function(res){
        for(var i=0; i<res.data.length;i++){
            total = res.data[i].quanlity*res.data[i].price
            tong+=total
            document.getElementById('tien').innerHTML = tong
            document.getElementById('tbl').innerHTML +=`
            <tr>
            <td >${i+1}</td>
            <td>${res.data[i].nameItem}</td>
            <td><img id ="kichthuoc" src="${res.data[i].image}" alt=""></td>
            <td id='cost' >${res.data[i].price}</td>
            <td id ="soluong-${i}"> ${res.data[i].quanlity}</td>
            <td id="total-${i}">${total}</td>
            <td ><button class="del" onclick ="deleteproduct(${res.data[i].id})">Delete</button></td>
          </tr>`
      
        }
  
    })
    
}
function deleteproduct(id){
    axios.delete(`${APIcart}/${id}`).then(
        () => {location.reload()}
    )
}
function loadpage(){
    id =  window.localStorage.getItem('idlogin');
        axios.get(`${APIlogin}`).then(function(res){
            for (var i = 0; i<res.data.length;i++){
                if(res.data[i].id == id){
                    document.getElementById('vlogin').innerHTML =  res.data[i].Ho
                }
            }
        })
    
}
 var today = new Date()
 var day = today.getDay()+1;
 var month = today.getMonth()+2;
 var year = today.getFullYear();
function thanhtoan(){
    document.getElementById("cart1").style.display ="none"
    document.querySelector(".pag3").style.display ='block'
    axios.get(`${APIcart}`).then(function(res){
        for(var i = 0; i<res.data.length;i++){
            document.getElementById('Date').innerHTML = day + "/" + month+ "/"+ year
            document.getElementById('nameProduct').innerHTML += res.data[i].nameItem +" "
            document.getElementById('sumtotal').innerHTML = tong 
        }
        
    })
    axios.get(`${APIlogin}`).then(function(res){
        id =  window.localStorage.getItem('idlogin');
        for (var i = 0; i<res.data.length;i++){
            if(res.data[i].id == id){
                document.getElementById('fn').value =  res.data[i].Ho
                document.getElementById('dt').value = res.data[i].Sodienthoai
                document.getElementById('dc').value = res.data[i].address
            }
        }
    })
    addIteminlogin()
   
}
function addIteminlogin(){
     var arr =[];
    axios.get(`${APIcart}`).then(function (res){
        for (var i=0; i<res.data.length;i++){
            var data = {
                nameItem : res.data[i].nameItem,
                price :res.data[i].price,
                quanlity : res.data[i].quanlity,
                total: res.data[i].price*res.data[i].quanlity,
                date : document.getElementById('Date').innerHTML
            }
            arr.push(data)
        }
        id =  window.localStorage.getItem('idlogin');
        // console.log(id ,arr)
       axios.get(`${APIlogin}`).then(function (res){
           for (var i =0 ; i<res.data.length;i++){
               if(res.data[i].id == id){
                   arr1 = res.data[i].cart
                    
                   for (var j = 0; j<arr.length;j++){
                       arr1.push(arr[j])
                   }
                   var data1= {
                       Ho : res.data[i].Ho,
                       Sodienthoai: res.data[i].Sodienthoai,
                       Tendangnhap: res.data[i].Tendangnhap,
                       matkhau: res.data[i].matkhau,
                       address: res.data[i].address,
                       cart :arr1,
                       id : id,
                   }
                   axios.put(`${APIlogin}/${id}`,data1).then()
                   
               }
           }
       
       })
    })
   
    
}
function abc(){
    var array =[];
    id =  window.localStorage.getItem('idlogin');
    axios.get(`${APIcart}`).then(function (res){
        for (var i=0; i<res.data.length;i++){
            var data = {
                nameItem : res.data[i].nameItem,
                price :res.data[i].price,
                quanlity : res.data[i].quanlity,
                total: res.data[i].price*res.data[i].quanlity
            }
            array.push(data)
        }
        var vdata = {
            MaKH : id,
            date :day + "/" + month+ "/"+ year,
            mathang : array,
            Tongtien : tong
            
        }
        axios.post(APIgiohang,vdata).then()
        document.getElementById('ten').innerHTML =  document.getElementById('fn').value
        document.getElementById('sodienthoai').innerHTML =  document.getElementById('dt').value
        document.getElementById('diachi').innerHTML =  document.getElementById('dc').value
        document.getElementById('phuongthucthanhtoan').innerHTML = document.getElementById('exampleFormControlSelect').value
        for(var i = 0; i<array.length;i++){
            document.getElementById('chitiethoadon').innerHTML+=`
            <tr>
            <td> ${array[i].nameItem}</td>
            <td> ${array[i].price}</td>
            <td> ${array[i].quanlity}</td>
            <td> ${array[i].total}</td>

            </tr>
            `
        }
        document.getElementById('tongtienbill').innerHTML = tong
        deleteItemofcart()
       
       
    })
    
}
function sendEmailcart(cart){
    var data = {
        cart: cart
    }
    emailjs.send('service_bvcv8kq','template_xakxzog',data)
    alert("đã gửi đơn hàng thành công")
}
function billCus(){
    id =  window.localStorage.getItem('idlogin');
    document.getElementById('vvchitiethoadon').innerHTML =''
    axios.get(`${APIlogin}`).then(function(res){
        for(var i = 0; i< res.data.length;i++){
            if(res.data[i].id == id){
                for (var j = 0 ; j<res.data[i].cart.length;j++){
                    document.getElementById('vvchitiethoadon').innerHTML +=`
                    <tr>
                    <td>${j+1}</td>
                    <td>${res.data[i].cart[j].date}</td>
                    <td>${res.data[i].cart[j].nameItem}</td>
                    <td>${res.data[i].cart[j].price}</td>
                    <td>${res.data[i].cart[j].quanlity}</td>
                    <td>${res.data[i].cart[j].total}</td>
                  </tr>
                    `
                }
            }
        }
    })

   
} 

function deleteItemofcart(){
    axios.delete(`${APIcart}/0`).then()
    axios.delete(`${APIcart}/1`).then()
    axios.delete(`${APIcart}/2`).then()
    axios.delete(`${APIcart}/3`).then()
    axios.delete(`${APIcart}/4`).then()
    axios.delete(`${APIcart}/5`).then()
    axios.delete(`${APIcart}/6`).then()
    axios.delete(`${APIcart}/7`).then()
    axios.delete(`${APIcart}/8`).then()
    axios.delete(`${APIcart}/9`).then()
    
}

showcart()  
