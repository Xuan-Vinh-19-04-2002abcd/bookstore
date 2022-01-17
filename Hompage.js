const APIitem ='https://61bc10bcd8542f001782451a.mockapi.io/item'
const APIcart ='https://61bc10bcd8542f001782451a.mockapi.io/Itemofcart'
function showData(type){
    document.getElementById('product').innerHTML=''
    axios.get(`${APIitem}`).then(function(res){
        for (var i = 0;i<res.data.length;i++){
            if(res.data[i].type ==type){
                document.getElementById('product').innerHTML+=`
                    <div class="col-12 col-sm-6 col-md-3 mb-4 m">     
                        <div class="card box" style="width: 20rem;height: 34rem;">
                                <img class="card-img-top sizeimg" src="${res.data[i].image}" alt="Card image cap">
                            <div class="card-body">
                                <h4 class="card-title text-center">${res.data[i].nameItem}</h4>
                                <h5 class="card-text text-danger text-center font-weight-bold">${res.data[i].price}đ</h5>
                                <button id="cart" class="btn btn-info" onclick="confirmifo(${res.data[i].id})"><i class="fas fa-shopping-cart"></i>&ensp; Mua ngay</button>
                            </div>
                        </div>
                    </div>  
                `
            }
        }
    })
}
var a ='';  
var dem = 0;
var total =0;
var tong =0;
function confirmifo(id){
    if (!loginStatus) {
        alert('Bạn phải đăng nhập để mua hàng');
        return
    }
    dem++
    document.getElementById('showproduct').style.display='none';
    document.getElementById('detail').style.display='block';
    document.querySelector('.footer').style.display='block';
    axios.get(`${APIitem}`).then(function(res){
     for(var i =0; i<res.data.length;i++){
         if(res.data[i].id == id){
             a = res.data[i].image
            document.getElementById('detailimg').innerHTML =`
            <img style="width:100%" src="${a}" alt="">
            `
            document.getElementById('vnameItem').innerHTML = res.data[i].nameItem;
            document.getElementById('vpriceItem').innerHTML = res.data[i].price;
            document.getElementById('describeraboutbook').innerHTML = res.data[i].describe;

         }
     }
 })
}

function addmock(){
    var data={
        nameItem : document.getElementById('vnameItem').innerHTML,
        price : document.getElementById('vpriceItem').innerHTML,
        image: a,
        quanlity: document.getElementById('vquality').value,
    }
    axios.post(APIcart,data).then()
    document.getElementById('showproduct').style.display='block';
    document.getElementById('detail').style.display='none';
    alert("Đã thêm vào giỏ hàng")
    document.getElementById('quantily').innerHTML = dem;
}

function hienthithongtinsanpham(){
    document.getElementById("vdetail").innerHTML =''
    document.getElementById("vdetail").innerHTML = "Có lẽ cần phải trải qua tuổi thanh xuân mới có thể hiểu được tuổi xuân là khoảng thời gian ta sống ích kỷ biết chừng nào. Có lúc nghĩ, sở dĩ tình yêu cần phải đi một vòng tròn lớn như vậy, phải trả một cái giá quá đắt như thế, là bởi vì nó đến không đúng thời điểm. Khi có được tình yêu, chúng ta thiếu đi trí tuệ. Đợi đến khi có đủ trí tuệ, chúng ta đã không còn sức lực để yêu một tình yêu thuần khiết nữa.Cái đẹp của Hạ Long trước hết là sự kì vĩ của thiên nhiên. Trên một diện tích hẹp mọc lên hàng nghìn đảo nhấp nhô khuất khúc như rồng chầu phượng múa. Đảo có chỗ sừng sững chạy dài như bức tường thành vững chãi, ngăn khơi với lộng, nối mặt biển với chân trời. Có chỗ đảo dàn ra thưa thớt, hòn này với hòn kia biệt lập, xa trông như quân cờ bày chon von trên mặt biển. Tuỳ theo sự phân bố của đảo, mặt vịnh Hạ Long lúc toả mênh mông, lúc thu hẹp lại thành ao, thành vũng, lúc bị kẹp giữa hai triền đảo như một dòng suối, lúc uốn quanh chân đảo như dải lụa xanh."
}
function hienthithongtinchitiet(){
    document.getElementById("vdetail").innerHTML =''
    document.getElementById("vdetail").innerHTML+= `
    <table>
    <tr>
        <th>Thể loại</th>
        <th>Truyện dài</th>
    </tr>
    <tr>
        <th>Loại Sản phẩm </th>
        <th>Bìa mềm</th>
    </tr>
    <tr>
        <th>Kích thước</th>
        <th>15.5cm *23.5cm</th>
    </tr>
    <tr>
        <th>Nhà xuất bản</th>
        <th>Nhà xuất bản Đà Nẵng</th>
    </tr>
</table>
    `
}
function danhgia(){
    document.getElementById("vdetail").innerHTML =''
    document.getElementById("vdetail").innerHTML ="Chưa có đánh giá nào từ khách hàng"
}
