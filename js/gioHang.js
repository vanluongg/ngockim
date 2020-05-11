var keyLocalStorageItemGioHang = 'danhSachItemGioHang';

// tạo ra thằng sản phẩm đơn
function createItem(ID, soLuong) {
    var item = new Object();
    item.ID = ID;
    item.soLuong = soLuong;
    return item;
}

// lưu xuống local
function saveListItemsToLocal(listItems) {
    var jsonListItems = JSON.stringify(listItems);
    localStorage.setItem(keyLocalStorageItemGioHang, jsonListItems);
}

// lấy lên để dùng
function getListItemsFromLocal() {
    var listItems = [];
    var jsonListItems = localStorage.getItem(keyLocalStorageItemGioHang);
    if (jsonListItems != null) {
        var listItems = JSON.parse(jsonListItems);
    }

    return listItems;
}
