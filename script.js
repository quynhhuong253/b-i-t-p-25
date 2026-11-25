// 1. Dữ liệu mảng ít nhất 5 sản phẩm
const products = [
  {
    id: 1,
    name: "Laptop MacBook Air M2",
    price: "24.500.000 VNĐ",
    desc: "Chip Apple M2, RAM 8GB, SSD 256GB, mỏng nhẹ.",
    image: "macbook.png"
  },
  {
    id: 2,
    name: "Điện thoại iPhone 15 Pro",
    price: "27.990.000 VNĐ",
    desc: "Khung viền Titan, chip A17 Pro mạnh mẽ.",
    image: "iphone.png"
  },
  {
    id: 3,
    name: "Tai nghe Sony WH-1000XM5",
    price: "6.490.000 VNĐ",
    desc: "Chống ồn chủ động hàng đầu, pin 30 giờ.",
    image: "tai-nghe.png"
  },
  {
    id: 4,
    name: "Bàn phím cơ Keychron K2",
    price: "1.850.000 VNĐ",
    desc: "Layout 75%, kết nối Bluetooth & dây, đèn LED RGB.",
    image: "ban-phim.png"
  },
  {
    id: 5,
    name: "Chuột Logitech MX Master 3S",
    price: "2.390.000 VNĐ",
    desc: "Cảm biến 8000 DPI, cuộn siêu tốc, thiết kế công thái học.",
    image: "chuot.png"
  },
  {
    id: 6,
    name: "Đồng hồ Apple Watch Series 9",
    price: "9.890.000 VNĐ",
    desc: "Màn hình sáng 2000 nits, cảm biến sức khỏe toàn diện.",
    image: "dong-ho.png"
  }
];

const productListEl = document.getElementById("productList");
const searchInputEl = document.getElementById("searchInput");
const errorMessageEl = document.getElementById("errorMessage");

// 2. Hàm render danh sách sản phẩm an toàn (chống XSS)
function renderProducts(items) {
  productListEl.innerHTML = "";

  if (items.length === 0) {
    errorMessageEl.classList.remove("hidden");
    return;
  }

  errorMessageEl.classList.add("hidden");

  // Sử dụng DocumentFragment để giảm số lần reflow/repaint của DOM
  const fragment = document.createDocumentFragment();

  items.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement("h2");
    title.className = "product-title";
    title.textContent = product.name; // Dùng textContent thay vì innerHTML

    const desc = document.createElement("p");
    desc.className = "product-desc";
    desc.textContent = product.desc;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = product.price;

    card.append(img, title, desc, price);
    fragment.appendChild(card);
  });

  productListEl.appendChild(fragment);
}

// 3. Hàm xử lý tìm kiếm
function handleSearch(keyword) {
  // Chuẩn hóa chuỗi: xóa khoảng trắng thừa và chuyển về chữ thường
  const cleanKeyword = keyword.trim().toLowerCase();

  // Nếu ô tìm kiếm trống, hiển thị lại toàn bộ danh sách
  if (!cleanKeyword) {
    renderProducts(products);
    return;
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(cleanKeyword)
  );

  if (filteredProducts.length === 0) {
    // Dùng textContent để hiển thị từ khóa người dùng nhập an toàn
    errorMessageEl.textContent = `Không tìm thấy sản phẩm nào khớp với từ khóa "${keyword.trim()}".`;
  }

  renderProducts(filteredProducts);
}

// 4. Kỹ thuật Debounce để tối ưu hiệu năng khi gõ phím liên tục
function debounce(func, delay = 250) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Lắng nghe sự kiện nhập liệu với Debounce
searchInputEl.addEventListener(
  "input",
  debounce((e) => {
    handleSearch(e.target.value);
  }, 250)
);

// Hiển thị danh sách ban đầu khi tải trang
renderProducts(products);
