var keyListProducsLocal = "danhSachSanPham";

function start() {
  if (
    localStorage.getItem("danhSachSanPham") == null ||
    localStorage.getItem("danhSachSanPham") == ""
  ) {
    var listProducts = createListProducts();
    jsonListProducts = JSON.stringify(listProducts);
    localStorage.setItem("danhSachSanPham", jsonListProducts);
  }

  // b1.2: nếu đã có json dưới localStorage thì lấy lên và chuyển thành object
  var jsonListProducts = localStorage.getItem("danhSachSanPham");
  var listProducts = newSmartPhone().fromJSONS(jsonListProducts);

  loadMore("show-phone", "phone");
  loadMore("show-laptop", "laptop");
  loadMore("show-support", "support");
  totalPrice();
}

function outProduct(filterProducts, sl, type) {
  var html = chuyenDSSanPhamThanhHTML(filterProducts, sl);
  if (type == "phone") document.getElementById("show-phone").innerHTML = html;
  if (type == "laptop") document.getElementById("show-laptop").innerHTML = html;
  if (type == "support") document.getElementById("show-support").innerHTML = html;
}

function themVaoGioHang(idSanPham) {
  alert("OK đã thêm! ");

  var listItems = getListItemsFromLocal();
  var confirm = false;

  for (var i = 0; i < listItems.length; i++) {
    var thisItem = listItems[i];
    if (thisItem.ID == idSanPham) {
      listItems[i].soLuong++;
      confirm = true;
      break;
    }
  }

  if (confirm == false) {
    var item = createItem(idSanPham, 1);
    listItems.push(item);
  }
  saveListItemsToLocal(listItems);
  totalPrice();
}

function newSmartPhone(ten, hinhAnh, giaGoc, phamTramGiamGia, khuVucBan, ID, type) {
  var product = new Object();
  product.ten = ten;
  product.hinhAnh = hinhAnh;
  product.giaGoc = giaGoc;
  product.phamTramGiamGia = phamTramGiamGia;
  product.khuVucBan = khuVucBan;
  product.type = type;
  if (ID != null) {
    product.ID = ID;
  } else {
    product.ID = UUID();
  }

  product.tinhGiaBan = function () {
    var giaBan = this.giaGoc * (1 - this.phamTramGiamGia * 0.01);
    return giaBan;
  };

  product.fromJSONS = function (jsonListProducts) {
    var listProductsFull = [];
    var listProducts = JSON.parse(jsonListProducts);

    for (var i = 0; i < listProducts.length; i++) {
      var product = listProducts[i];
      var productFull = newSmartPhone(
        product.ten,
        product.hinhAnh,
        product.giaGoc,
        product.phamTramGiamGia,
        product.khuVucBan,
        product.ID,
        product.type
      );
      listProductsFull[i] = productFull;
    }
    return listProductsFull;
  };

  return product;
}

function createListProducts() {
  var SM10 = newSmartPhone(
    "Iphone 11 Pro Max",
    "images/f/f10.png",
    33000000,
    10,
    "Hà Nội",
    UUID(),
    "phone"
  );
  var SM9 = newSmartPhone(
    "LG G7",
    "images/f/f9.png",
    3700000,
    10,
    "Hà Nội",
    UUID(),
    "phone"
  );
  var SM8 = newSmartPhone(
    "Samsum Galay A71",
    "images/f/f8.png",
    105000000,
    10,
    "Hà Nội",
    UUID(),
    "phone"
  );
  var SM7 = newSmartPhone(
    "Iphone 14 Pro Max",
    "images/f/f7.png",
    36000000,
    10,
    "Hà Nội",
    UUID(),
    "phone"
  );
  var SM6 = newSmartPhone(
    "Samsung Galaxy Note 10",
    "images/f/f6.png",
    15000000,
    10,
    "Hà Nội",
    UUID(),
    "phone"
  );
  var SM5 = newSmartPhone(
    "Huawei P30 Pro",
    "images/f/f5.png",
    20000000,
    15,
    "Sài Gòn",
    UUID(),
    "phone"
  );
  var SM4 = newSmartPhone(
    "Huawei Nova 3i",
    "images/f/f4.png",
    6000000,
    15,
    "Sài Gòn",
    UUID(),
    "phone"
  );
  var SM3 = newSmartPhone(
    "Redmi K20 Pro",
    "images/f/f3.png",
    8000000,
    15,
    "Sài Gòn",
    UUID(),
    "phone"
  );
  var SM2 = newSmartPhone(
    "Redmi Note 8",
    "images/f/f2.png",
    3500000,
    15,
    "Sài Gòn",
    UUID(),
    "phone"
  );
  var SM1 = newSmartPhone(
    "OPPO A5",
    "images/f/f1.png",
    3500000,
    15,
    "Sài Gòn",
    UUID(),
    "phone"
  );


  var LT10 = newSmartPhone(
    "Lenovo Thinkpad E490S",
    "images/l/l10.png",
    22000000,
    10,
    "Hà Nội",
    UUID(),
    "laptop"
  );

  var LT9 = newSmartPhone(
    "Lenovo Ideapad S340/R5",
    "images/l/l9.png",
    13000000,
    10,
    "Hà Nội",
    UUID(),
    "laptop"
  );

  var LT8 = newSmartPhone(
    "HP Pavilion 14-ce2034TU",
    "images/l/l8.png",
    12000000,
    15,
    "Sài Gòn",
    UUID(),
    "laptop"
  );

  var LT7 = newSmartPhone(
    "HP 348 G5",
    "images/l/l7.png",
    10000000,
    15,
    "Sài Gòn",
    UUID(),
    "laptop"
  );

  var LT6 = newSmartPhone(
    "Dell Inspiron 3580",
    "images/l/l6.png",
    16000000,
    15,
    "Sài Gòn",
    UUID(),
    "laptop"
  );

  var LT5 = newSmartPhone(
    "Asus X409FA-EK201T",
    "images/l/l5.png",
    14000000,
    10,
    "Hà Nội",
    UUID(),
    "laptop"
  );

  var LT4 = newSmartPhone(
    "Apple Macbook Pro T2019",
    "images/l/l4.png",
    35000000,
    15,
    "Sài Gòn",
    UUID(),
    "laptop"
  );

  var LT3 = newSmartPhone(
    "MSI GF63 9RCX 646VN",
    "images/l/l3.png",
    19000000,
    15,
    "Sài Gòn",
    UUID(),
    "laptop"
  );
  var LT2 = newSmartPhone(
    "MSI Gaming 15 GF63 9SC",
    "images/l/l2.png",
    25000000,
    10,
    "Hà Nội",
    UUID(),
    "laptop"
  );

  var LT1 = newSmartPhone(
    "Asus Strix G531GT-AL030T",
    "images/l/l1.png",
    25000000,
    15,
    "Sài Gòn",
    UUID(),
    "laptop"
  );




  var PK10 = newSmartPhone(
    "Loa bluetooth SRS-XB12",
    "images/p/p10.png",
    1000000,
    15,
    "Sài Gòn",
    UUID(),
    "support"
  );

  var PK9 = newSmartPhone(
    "Airpods 2",
    "images/p/p9.png",
    5000000,
    15,
    "Sài Gòn",
    UUID(),
    "support"
  );

  var PK8 = newSmartPhone(
    "MicroSD 128 GB Lexar",
    "images/p/p8.png",
    1100000,
    15,
    "Sài Gòn",
    UUID(),
    "support"
  );

  var PK7 = newSmartPhone(
    "20000 Gen 3 Type-C 2019",
    "images/p/p7.png",
    1000000,
    15,
    "Sài Gòn",
    UUID(),
    "support"
  );

  var PK6 = newSmartPhone(
    "Mini Speaker B2",
    "images/p/p6.png",
    800000,
    15,
    "Sài Gòn",
    UUID(),
    "support"
  );

  var PK5 = newSmartPhone(
    "Logitech G300S",
    "images/p/p5.png",
    400000,
    15,
    "Sài Gòn",
    UUID(),
    "support"
  );

  var PK4 = newSmartPhone(
    "Energizer 10.000mAh",
    "images/p/p4.png",
    600000,
    15,
    "Sài Gòn",
    UUID(),
    "support"
  );

  var PK3 = newSmartPhone(
    "Aula F2039",
    "images/p/p3.png",
    900000,
    15,
    "Sài Gòn",
    UUID(),
    "support"
  );

  var PK2 = newSmartPhone(
    "Redmi AirDots",
    "images/p/p2.png",
    500000,
    15,
    "Sài Gòn",
    UUID(),
    "support"
  );

  var PK1 = newSmartPhone(
    "512GB MicroSDXC",
    "images/p/p1.png",
    3000000,
    15,
    "Sài Gòn",
    UUID(),
    "support"
  );

  var listProducts = [];

  listProducts.push(SM10);
  listProducts.push(SM9);
  listProducts.push(SM8);
  listProducts.push(SM7);
  listProducts.push(SM6);
  listProducts.push(SM5);
  listProducts.push(SM4);
  listProducts.push(SM3);
  listProducts.push(SM2);
  listProducts.push(SM1);

  listProducts.push(LT10);
  listProducts.push(LT9);
  listProducts.push(LT8);
  listProducts.push(LT7);
  listProducts.push(LT6);
  listProducts.push(LT5);
  listProducts.push(LT4);
  listProducts.push(LT3);
  listProducts.push(LT2);
  listProducts.push(LT1);

  listProducts.push(PK10);
  listProducts.push(PK9);
  listProducts.push(PK8);
  listProducts.push(PK7);
  listProducts.push(PK6);
  listProducts.push(PK5);
  listProducts.push(PK4);
  listProducts.push(PK3);
  listProducts.push(PK2);
  listProducts.push(PK1);

  return listProducts;
}

function chuyenSanPhamThanhHTML(product) {
  product = newSmartPhone(
    product.ten,
    product.hinhAnh,
    product.giaGoc,
    product.phamTramGiamGia,
    product.khuVucBan,
    product.ID,
    product.type
  );

  var html = "";
  var giaBan = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.tinhGiaBan());
  html += '   <div class="khungSanPham" >';
  html += '       <div class="hinhAnhSanPham " id="' + product.ID + '">';
  html += '           <img src="' + product.hinhAnh + '">';
  html += '       <button class="bnt" onclick="themVaoGioHang(\'' + product.ID + "')\"><p>Thêm vào giỏ</p></button>";
  html += "       </div>";
  html += '       <h3 class="tenSanPham">' + product.ten + "</h3>";
  html += '       <p class="giaSauKhiGiam">' + giaBan + "</p>";
  html += '       <div class="phanTramGiam">SALE ' + product.phamTramGiamGia + "%</div>";
  html += "   </div>";
  // html += '</div>';
  return html;
}

function chuyenDSSanPhamThanhHTML(listProducts, count) {
  var htmlAll = "";

  for (let index = 0; index < count; index++) {
    var product = listProducts[index];
    htmlAll += chuyenSanPhamThanhHTML(product);
  }

  return htmlAll;
}

function searchProducByID(ID) {
  var product = new Object();
  var listProducts = getListProductsFromLocal();

  for (var i = 0; i < listProducts.length; i++) {
    var thisProduct = listProducts[i];
    if (thisProduct.ID == ID) {
      product = thisProduct;
      break;
    }
  }

  product = newSmartPhone(
    product.ten,
    product.hinhAnh,
    product.giaGoc,
    product.phamTramGiamGia,
    product.khuVucBan,
    product.ID,
    product.type
  );

  return product;
}

function getListProductsFromLocal() {
  var jsonListProducts = localStorage.getItem(keyListProducsLocal);
  var listProducts = JSON.parse(jsonListProducts);

  return listProducts;
}

function UUID() {
  var ID = Math.random().toString().substr(2, 10) + String(new Date().getTime());

  return ID;
}

function loadMore(node, type) {
  let countNode = document.querySelectorAll("#" + node + ">div");
  let listProducts = JSON.parse(localStorage.getItem("danhSachSanPham"));
  let countOut = countNode.length;
  var filterProducts = new Array();
  for (let i = 0; i < listProducts.length; i++) {
    if (listProducts[i].type == type) filterProducts.push(listProducts[i]);
  }
  if (countOut + 4 >= filterProducts.length) countOut = filterProducts.length;
  else countOut += 4;
  outProduct(filterProducts, countOut, type);
}

function saveListProductsToLocal(listProducts) {
    var jsonListItems = JSON.stringify(listProducts);
    localStorage.setItem('danhSachSanPham', jsonListItems);

}
