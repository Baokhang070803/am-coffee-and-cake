// Hiển thị danh sách đơn hàng
function displayTransactions(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedOrders = orders.slice(start, end);

    const tbody = document.getElementById('transactionTableBody');
    const emptyState = document.querySelector('.empty-state');
    const tableContainer = document.querySelector('.transaction-table');
    const paginationContainer = document.querySelector('.pagination-container');
    
    if (orders.length === 0) {
        // Hiển thị empty state
        emptyState.style.display = 'block';
        tableContainer.style.display = 'none';
        paginationContainer.style.display = 'none';
        return;
    }

    // Ẩn empty state và hiện bảng
    emptyState.style.display = 'none';
    tableContainer.style.display = 'table';
    paginationContainer.style.display = 'flex';
    
    tbody.innerHTML = '';
    
    paginatedOrders.forEach(order => {
        // Format mã đơn hàng
        const orderId = order.id.slice(-8).toUpperCase(); // Lấy 8 ký tự cuối
        
        // Format ngày giờ
        const orderDate = new Date(order.createdAt);
        const formattedDate = orderDate.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const formattedTime = orderDate.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Xử lý danh sách sản phẩm
        const productsList = order.items && order.items.length > 0
            ? order.items.map(item => {
                const quantity = item.quantity || 1;
                const name = item.name || 'Sản phẩm không xác định';
                const image = item.image || 'images/default-product.png';
                return `
                    <div class="product-item">
                        <img src="${image}" alt="${name}" class="product-image">
                        <div class="product-info">
                            <div class="product-name">${name}</div>
                            <div class="product-quantity">x${quantity}</div>
                        </div>
                    </div>`;
            }).join('')
            : '<div class="product-item">Không có sản phẩm</div>';

        // Xử lý trạng thái
        const status = order.status || 'pending';
        const statusDisplay = {
            'pending': { text: 'Đang xử lý', class: 'status-pending' },
            'processing': { text: 'Đang xử lý', class: 'status-processing' },
            'confirmed': { text: 'Đã xác nhận', class: 'status-processing' },
            'shipped': { text: 'Đang giao', class: 'status-shipped' },
            'delivered': { text: 'Đã giao', class: 'status-delivered' },
            'cancelled': { text: 'Đã hủy', class: 'status-cancelled' }
        }[status] || { text: 'Không xác định', class: '' };

        // Xử lý nút hành động
        const actionButtons = `
            <div class="action-buttons">
                <button class="action-btn view-btn" onclick="viewOrder('${order.id}')">
                    <i class="fa fa-eye"></i> Xem
                </button>
                ${(status === 'pending' || status === 'processing') ? 
                    `<button class="action-btn cancel-btn" onclick="cancelOrder('${order.id}')">
                        <i class="fa fa-times"></i> Hủy
                    </button>` : ''}
            </div>`;

        const row = `
            <tr>
                <td class="order-id">#${orderId}</td>
                <td>${formattedDate}<br><small style="color:#666">${formattedTime}</small></td>
                <td class="products">${productsList}</td>
                <td class="total-amount">${(order.grandTotal || 0).toLocaleString('vi-VN')}đ</td>
                <td><span class="status-badge ${statusDisplay.class}">${statusDisplay.text}</span></td>
                <td>${actionButtons}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // Cập nhật thông tin phân trang
    const totalOrders = orders.length;
    const totalPages = Math.ceil(totalOrders / itemsPerPage);
    const startItem = start + 1;
    const endItem = Math.min(end, totalOrders);
    
    document.querySelector('.pagination-info').textContent = 
        `Hiển thị ${startItem}-${endItem} trong tổng số ${totalOrders} đơn hàng`;
    document.querySelector('.page-number').textContent = `Trang ${page}/${totalPages}`;
    
    // Cập nhật trạng thái nút phân trang
    document.getElementById('prevBtn').disabled = page === 1;
    document.getElementById('nextBtn').disabled = end >= totalOrders;
}

// Xem chi tiết đơn hàng
function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Tạo nội dung chi tiết đơn hàng
    const orderDate = new Date(order.createdAt);
    const formattedDate = orderDate.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const productsList = order.items?.map(item => `
        <div style="display:flex;align-items:center;margin-bottom:10px;padding:10px;background:#f8f9fa;border-radius:8px;">
            <img src="${item.image || 'images/default-product.png'}" 
                 style="width:50px;height:50px;object-fit:cover;border-radius:6px;margin-right:15px;">
            <div style="flex:1">
                <div style="font-weight:500;color:#333;margin-bottom:4px;">${item.name}</div>
                <div style="color:#666;font-size:13px;">
                    ${item.quantity}x × ${(item.price || 0).toLocaleString('vi-VN')}đ
                </div>
            </div>
            <div style="font-weight:600;color:#f7544a;">
                ${((item.price || 0) * (item.quantity || 1)).toLocaleString('vi-VN')}đ
            </div>
        </div>
    `).join('') || 'Không có sản phẩm';

    const statusDisplay = {
        'pending': { text: 'Đang xử lý', color: '#ffc107' },
        'processing': { text: 'Đang xử lý', color: '#2196f3' },
        'confirmed': { text: 'Đã xác nhận', color: '#2196f3' },
        'shipped': { text: 'Đang giao', color: '#4caf50' },
        'delivered': { text: 'Đã giao', color: '#00c853' },
        'cancelled': { text: 'Đã hủy', color: '#ef4444' }
    }[order.status || 'pending'] || { text: 'Không xác định', color: '#6c757d' };

    Swal.fire({
        title: `Chi tiết đơn hàng #${order.id.slice(-8).toUpperCase()}`,
        html: `
            <div style="text-align:left;max-height:70vh;overflow-y:auto;padding:0 10px;">
                <div style="margin-bottom:20px;padding-bottom:15px;border-bottom:1px solid #eee;">
                    <div style="color:#666;margin-bottom:5px;">Ngày đặt hàng</div>
                    <div style="font-weight:500;">${formattedDate}</div>
                </div>
                
                <div style="margin-bottom:20px;padding-bottom:15px;border-bottom:1px solid #eee;">
                    <div style="color:#666;margin-bottom:5px;">Trạng thái</div>
                    <div style="font-weight:500;color:${statusDisplay.color};">
                        ${statusDisplay.text}
                    </div>
                </div>

                <div style="margin-bottom:20px;padding-bottom:15px;border-bottom:1px solid #eee;">
                    <div style="color:#666;margin-bottom:5px;">Địa chỉ giao hàng</div>
                    <div style="font-weight:500;">
                        ${order.shippingInfo?.address || 'Chưa có địa chỉ'}
                    </div>
                </div>

                <div style="margin-bottom:20px;">
                    <div style="color:#666;margin-bottom:10px;">Sản phẩm đã đặt</div>
                    ${productsList}
                </div>

                <div style="margin-top:20px;padding-top:15px;border-top:1px solid #eee;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                        <div style="color:#666;">Tạm tính</div>
                        <div>${(order.subtotal || 0).toLocaleString('vi-VN')}đ</div>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                        <div style="color:#666;">Phí vận chuyển</div>
                        <div>${(order.shippingFee || 0).toLocaleString('vi-VN')}đ</div>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                        <div style="color:#666;">Giảm giá</div>
                        <div>-${(order.discount || 0).toLocaleString('vi-VN')}đ</div>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:15px;padding-top:15px;border-top:1px dashed #eee;">
                        <div style="font-weight:600;font-size:16px;">Tổng cộng</div>
                        <div style="font-weight:600;font-size:16px;color:#f7544a;">
                            ${(order.grandTotal || 0).toLocaleString('vi-VN')}đ
                        </div>
                    </div>
                </div>
            </div>
        `,
        width: 600,
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Đóng',
        cancelButtonColor: '#6B7280'
    });
}

// Hủy đơn hàng
function cancelOrder(orderId) {
    Swal.fire({
        title: 'Hủy đơn hàng?',
        text: 'Bạn có chắc muốn hủy đơn hàng này không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Hủy đơn hàng',
        cancelButtonText: 'Đóng',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const orderRef = ref(database, `orders/${orderId}`);
            update(orderRef, { 
                status: 'cancelled',
                cancelledAt: new Date().toISOString()
            }).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Đã hủy đơn hàng',
                    text: 'Đơn hàng của bạn đã được hủy thành công',
                    timer: 1500,
                    showConfirmButton: false
                });
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: `Không thể hủy đơn hàng: ${error.message}`,
                    confirmButtonColor: '#ef4444'
                });
            });
        }
    });
}

// Lọc đơn hàng
function filterOrders() {
    Swal.fire({
        title: 'Lọc đơn hàng',
        html: `
            <div style="text-align:left;">
                <div style="margin-bottom:15px;">
                    <label style="display:block;margin-bottom:5px;color:#666;">Trạng thái</label>
                    <select id="statusFilter" class="swal2-input" style="width:100%;margin:0;">
                        <option value="">Tất cả trạng thái</option>
                        <option value="pending">Đang xử lý</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="shipped">Đang giao</option>
                        <option value="delivered">Đã giao</option>
                        <option value="cancelled">Đã hủy</option>
                    </select>
                </div>
                <div style="margin-bottom:15px;">
                    <label style="display:block;margin-bottom:5px;color:#666;">Từ ngày</label>
                    <input type="date" id="startDate" class="swal2-input" style="width:100%;margin:0;">
                </div>
                <div style="margin-bottom:15px;">
                    <label style="display:block;margin-bottom:5px;color:#666;">Đến ngày</label>
                    <input type="date" id="endDate" class="swal2-input" style="width:100%;margin:0;">
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Áp dụng',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#f7544a',
        cancelButtonColor: '#6B7280',
        preConfirm: () => {
            return {
                status: document.getElementById('statusFilter').value,
                startDate: document.getElementById('startDate').value,
                endDate: document.getElementById('endDate').value
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { status, startDate, endDate } = result.value;
            
            // Lọc đơn hàng theo điều kiện
            let filteredOrders = [...orders];
            
            if (status) {
                filteredOrders = filteredOrders.filter(order => order.status === status);
            }
            
            if (startDate) {
                const start = new Date(startDate);
                filteredOrders = filteredOrders.filter(order => {
                    const orderDate = new Date(order.createdAt);
                    return orderDate >= start;
                });
            }
            
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                filteredOrders = filteredOrders.filter(order => {
                    const orderDate = new Date(order.createdAt);
                    return orderDate <= end;
                });
            }
            
            // Cập nhật danh sách đơn hàng và hiển thị lại
            orders = filteredOrders;
            currentPage = 1;
            displayTransactions(currentPage);
        }
    });
}

// Export các hàm để sử dụng
window.displayTransactions = displayTransactions;
window.viewOrder = viewOrder;
window.cancelOrder = cancelOrder;
window.filterOrders = filterOrders;

// Load orders from Firebase
async function loadOrders() {
    try {
        const ordersRef = ref(database, 'orders');
        const q = query(ordersRef, orderBy('createdAt', 'desc'));
        const snapshot = await get(q);
        
        if (snapshot.exists()) {
            const orders = [];
            snapshot.forEach((childSnapshot) => {
                const order = childSnapshot.val();
                order.id = childSnapshot.key;
                if (order.userId === auth.currentUser.uid) {
                    console.log('Order items:', order.items); // Debug log
                    orders.push(order);
                }
            });
            
            // Render orders
            const ordersList = document.getElementById('ordersList');
            if (orders.length === 0) {
                ordersList.innerHTML = `
                    <div class="text-center py-5">
                        <img src="../images/empty-order.png" alt="No orders" style="width: 120px; opacity: 0.5;">
                        <p class="text-muted mt-3">Bạn chưa có đơn hàng nào</p>
                    </div>
                `;
                return;
            }
            
            ordersList.innerHTML = orders.map(order => `
                <div class="order-item mb-3 p-3 border rounded">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <div class="text-muted small">Mã đơn hàng: #${order.id}</div>
                            <div class="text-muted small">${formatDate(order.createdAt)}</div>
                        </div>
                        <span class="badge ${getStatusBadgeClass(order.status)}">${getStatusText(order.status)}</span>
                    </div>
                    
                    <div class="products-preview mb-3">
                        ${order.items?.map(item => `
                            <div class="product-item d-flex align-items-center mb-2">
                                <img src="${item.image || '../images/default-product.png'}" 
                                     alt="${item.name}" 
                                     class="product-image me-3">
                                <div>
                                    <div class="product-name">${item.name}</div>
                                    <div class="text-muted small">
                                        ${item.quantity}x × ${item.price?.toLocaleString('vi-VN')}đ
                                    </div>
                                </div>
                            </div>
                        `).join('') || '<div class="text-muted">Không có sản phẩm</div>'}
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="text-muted">Tổng tiền: <span class="text-dark fw-500">${order.grandTotal?.toLocaleString('vi-VN')}đ</span></div>
                        <button class="btn btn-primary btn-sm" onclick="viewOrderDetail('${order.id}')">
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            document.getElementById('ordersList').innerHTML = `
                <div class="text-center py-5">
                    <img src="../images/empty-order.png" alt="No orders" style="width: 120px; opacity: 0.5;">
                    <p class="text-muted mt-3">Bạn chưa có đơn hàng nào</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading orders:', error);
        Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.'
        });
    }
} 