function changeAddCartToEdit() {
    var nodeProduct = document.querySelectorAll("section .hinhAnhSanPham");

    for (let i = 0; i < nodeProduct.length; i++) {

        var SaveImg = nodeProduct[i].querySelector("img");
        nodeProduct[i].innerHTML = "";
        nodeProduct[i].appendChild(SaveImg);
        var CreateNodeBtn = document.createElement("button");
        CreateNodeBtn.className = "bnt";
        CreateNodeBtn.innerHTML = "Sửa sản phẩm";
        CreateNodeBtn.addEventListener("click", () => {
            document.getElementById('model-edit').style.display = 'block';
            editProduct(nodeProduct[i].id);
        });


        nodeProduct[i].appendChild(CreateNodeBtn);
    }
}
fixloadMore();
function fixloadMore() {
    var nodeLoadMore = document.querySelectorAll(".load-more");
    for (let i = 0; i < nodeLoadMore.length; i++) {
        nodeLoadMore[i].addEventListener("click", () => {
            changeAddCartToEdit();
        })
    }
}

function editProduct(id) {
    product = searchProducByID(id);
    var html =
        '<div class="showTemplateProduct"></div>' +
        '           <div class="bnt-edit">  ' +
        '               <button onclick="deleteModelEdit()">Hủy cập nhật</button>  ' +
        '               <button onclick="deleteProduct(' + id + ')">Xóa sản phẩm</button>  ' +
        '               <button onclick="updateProduct(' + id + ')">Cập nhật sản phẩm</button>  ' +
        '           </div>  ' +
        '           <input type="text" placeholder="Link hình ảnh" value="' + product.hinhAnh + '">  ' +
        '           <input type="text" placeholder="Tên sản phẩm" value="' + product.ten + '">  ' +
        '           <input type="number" placeholder="Giá gốc" value="' + product.giaGoc + '">  ' +
        '           <input type="number" placeholder="Phần trăm giảm giá" value="' + product.phamTramGiamGia + '">  ' +
        '          <input type="text" placeholder="Khu vực bán" value="' + product.khuVucBan + '">  ';
    document.getElementById('model-edit').innerHTML = html;
    showModel();
    createEventForInput();
    return html;
}

function createEventForInput() {
    var listnodeInput = document.querySelectorAll('.model-edit input');
    for (let i = 0; i < listnodeInput.length; i++) {
        listnodeInput[i].addEventListener("change", () => {
            showModel();
        })
    }
}

function showModel() {
    var listnodeInput = document.querySelectorAll('.model-edit input');

    var nodeHinhAnh = listnodeInput[0].value;
    var nodeTen = listnodeInput[1].value;

    if (listnodeInput[2].value < 0) {
        listnodeInput[2].value = 0
    }
    var nodeGiaGoc = listnodeInput[2].value;

    if (listnodeInput[3].value < 0 || listnodeInput[3].value > 100) {
        listnodeInput[3].value = 0;
    }
    var nodePhanTramGiamGia = listnodeInput[3].value;

    var giaBan = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(nodeGiaGoc * (1 - nodePhanTramGiamGia * 0.01));

    var html =
        '   <div class="frame-product-all">  ' +
        '               <div class="khungSanPham">  ' +
        '                   <div class="hinhAnhSanPham">  ' +
        '                       <img src="' + nodeHinhAnh + '" alt="">  ' +
        '                   </div>  ' +
        '                   <h3 class="tenSanPham">' + nodeTen + '</h3>  ' +
        '                   <p class="giaSauKhiGiam">' + giaBan + '</p>  ' +
        '                   <div class="phanTramGiam">SALE ' + nodePhanTramGiamGia + ' %</div>  ' +
        '               </div>  ' +
        '           </div>  '

    document.querySelector(".showTemplateProduct").innerHTML = html;
}

function deleteProduct(ID) {
    if (confirm('Bạn có muốn xóa sản phẩm này không?') == true) {
        var jonListProductsFromLocal = localStorage.getItem('danhSachSanPham');
        var listProducts = JSON.parse(jonListProductsFromLocal);

        for (var i = 0; i < listProducts.length; i++) {
            if (listProducts[i].ID == ID) {
                listProducts.splice(i, 1);
                break;
            }
        }
        console.log(listProducts.length);
        saveListProductsToLocal(listProducts);
        start();
        changeAddCartToEdit();
        deleteModelEdit();
        alert('Xóa sản phẩm thành công!');
    }
}

function updateProduct(ID) {
    if (confirm('Bạn có muốn cập nhật sản phẩm này không?') == true) {
        var jonListProductsFromLocal = localStorage.getItem('danhSachSanPham');
        var listProducts = JSON.parse(jonListProductsFromLocal);

        var listnodeInput = document.querySelectorAll('.model-edit input');
        var nodeHinhAnh = listnodeInput[0].value;
        var nodeTen = listnodeInput[1].value;
        var nodeGiaGoc = listnodeInput[2].value;
        var nodePhanTramGiamGia = listnodeInput[3].value;
        var nodeKhuVucBan = listnodeInput[4].value;

        for (var i = 0; i < listProducts.length; i++) {
            if (listProducts[i].ID == ID) {
                listProducts[i].hinhAnh = nodeHinhAnh;
                listProducts[i].ten = nodeTen;
                listProducts[i].giaGoc = nodeGiaGoc;
                listProducts[i].phamTramGiamGia = nodePhanTramGiamGia;
                listProducts[i].khuVucBan = nodeKhuVucBan;
                break;
            }
        }
        saveListProductsToLocal(listProducts);
        start();
        deleteModelEdit();
        changeAddCartToEdit();
        alert('Cập nhật danh sản phẩm thành công!');
    }
}

function deleteModelEdit() {
    document.getElementById('model-edit').style.display = 'none';
}

function deleteModelAdd() {
    document.getElementById('model-add').style.display = 'none';
}

function addProduct() {
    document.getElementById('model-add').style.display = 'block';
}

function cancelAddProduct() {
    document.getElementById('model-add').style.display = 'none';
}

function addNewProduct() {
    var listnodeInput = '';
    listnodeInput = document.querySelectorAll('.model-edit input');

    var nodeHinhAnh = listnodeInput[0].value;
    var nodeTen = listnodeInput[1].value;
    var nodeGiaGoc = listnodeInput[2].value;
    var nodePhanTramGiamGia = listnodeInput[3].value;
    var nodeKhuVucBan = listnodeInput[4].value;
    var nodeType = document.getElementById('typeProduct').value;

    if (checkFormEmpty() == true) {

        var newProduct = newSmartPhone(nodeTen, nodeHinhAnh, nodeGiaGoc, nodePhanTramGiamGia, nodeKhuVucBan, UUID(), nodeType);

        var listProducts = getListProductsFromLocal();
        listProducts.push(newProduct);
        console.log(listProducts);
        saveListProductsToLocal(listProducts);
        alert('Thêm mới sản phẩm thành công!');
        deleteModelAdd();
    }

}
