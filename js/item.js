var keyLocalItem = 'danhSachItemGioHang';


function showItems() {
    var nodeHienThiSanPham = document.getElementById('my-cart');

    if (getListItemsFromLocal().length == 0) {
        var html = '<img src="images/cart-empty.png" alt="">  <a href="index.html">Mua sắm nào</a>';
        nodeHienThiSanPham.innerHTML = html;
    } else {
        var html = chuyenDSItemThanhHtml(getLisItemsFromLocal());
        nodeHienThiSanPham.innerHTML = html;
    }
    totalPrice();
}

function chuyenItemThanhHtml(item) {
    var sanPham = searchProducByID(item.ID);

    var giaBanTong = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(sanPham.tinhGiaBan() * item.soLuong);
    var giaBanRa = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(sanPham.tinhGiaBan());

    html = '';
    html += '   <div class="khungItem">';
    html += '       <div class="hinhAnhItem">';
    html += '           <img src="' + sanPham.hinhAnh + '" alt="">';
    html += '       </div>';
    html += '       <div class="khungTenVaGia">'
    html += '           <div class="tenItem">';
    html += '               <p>' + sanPham.ten + '</p>';
    html += '           </div>';
    html += '           <div class="GiaItem">';
    html += '               <p>' + giaBanRa + '</p>';
    html += '           </div>';
    html += '       </div>'
    html += '       <div class="soLuongItem">';
    html += '           <input type="number" class="soLuong" id="' + sanPham.ID + '" value="' + item.soLuong + '" onchange="luuSoLuong(' + item.ID + ')">';
    html += '       </div>';
    html += '       <div class="thanhTien">' + giaBanTong + '</div>';
    html += '       <button class="xoaItemGioHang" onclick="deleteItem(' + sanPham.ID + ')"><i class="fas fa-trash"></i></button>';
    html += '   </div>';
    return html;
}

function chuyenDSItemThanhHtml(listItems) {
    var htmlAll = '';
    for (let i = 0; i < listItems.length; i++) {
        var item = listItems[i];
        htmlAll += chuyenItemThanhHtml(item);
    }

    return htmlAll;
}

function totalPrice() {
    var listItems = getLisItemsFromLocal();
    if (listItems == null) {
        document.querySelector('.cart-number').innerHTML = 0;
    } else {
        var sumMoney = 0;
        var sumCount = 0;
        for (let i = 0; i < listItems.length; i++) {
            var sanPham = searchProducByID(listItems[i].ID);
            sumMoney += sanPham.tinhGiaBan() * listItems[i].soLuong;

            sumCount += parseInt(listItems[i].soLuong);
        }

        sumMoney = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(sumMoney);
        document.querySelector('.cart-number').innerHTML = sumCount;
        try {
            document.getElementById('tinhTien1').innerHTML = 'Tổng giá trị: ' + sumMoney;
        } catch (error) {
        }
    }
}

function deleteItem(ID) {
    var jonListItemsFromLocal = localStorage.getItem('danhSachItemGioHang');
    var listItems = JSON.parse(jonListItemsFromLocal);
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].ID == ID) {
            listItems.splice(i, 1);
            break;
        }
    }
    saveListItemsToLocal(listItems);
    showItems();
}

function luuSoLuong(ID) {
    var jonListItemsFromLocal = localStorage.getItem('danhSachItemGioHang');
    var listItems = JSON.parse(jonListItemsFromLocal);

    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].ID == ID) {
            listItems[i].soLuong = document.getElementById(listItems[i].ID).value;
            if (document.getElementById(listItems[i].ID).value <= 0) {
                listItems[i].soLuong = 1;
            }
            break;
        }
    }

    saveListItemsToLocal(listItems);
    showItems();
}

function getLisItemsFromLocal() {
    var jonListItemsFromLocal = localStorage.getItem(keyLocalItem);
    var listItems = JSON.parse(jonListItemsFromLocal);
    return listItems;
}

