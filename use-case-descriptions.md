# MÔ TẢ USE CASE - HỆ THỐNG WEBSITE THƯƠNG MẠI ĐIỆN TỬ AM COFFEE AND CAKE

## 1. USE CASE QUẢN LÝ TÀI KHOẢN

### UC001: Đăng nhập
**Actor:** Khách vãng lai, Người dùng
**Mô tả:** Người dùng đăng nhập vào hệ thống bằng email/username và mật khẩu
**Precondition:** Người dùng chưa đăng nhập
**Main Flow:**
1. Người dùng truy cập trang đăng nhập
2. Nhập email/username và mật khẩu
3. Hệ thống xác thực thông tin
4. Nếu thành công, chuyển hướng đến trang chủ
5. Nếu thất bại, hiển thị thông báo lỗi
**Postcondition:** Người dùng đã đăng nhập thành công
**Exception:** Thông tin đăng nhập không chính xác

### UC002: Đăng ký
**Actor:** Khách vãng lai
**Mô tả:** Khách hàng tạo tài khoản mới trong hệ thống
**Precondition:** Chưa có tài khoản
**Main Flow:**
1. Người dùng truy cập trang đăng ký
2. Nhập thông tin cá nhân (họ tên, email, số điện thoại, mật khẩu)
3. Xác nhận mật khẩu
4. Đồng ý với điều khoản sử dụng
5. Hệ thống gửi email xác thực
6. Người dùng xác thực email
7. Tài khoản được kích hoạt
**Postcondition:** Tài khoản mới được tạo thành công
**Exception:** Email đã tồn tại, thông tin không hợp lệ

### UC003: Quên mật khẩu
**Actor:** Khách vãng lai, Người dùng
**Mô tả:** Người dùng yêu cầu đặt lại mật khẩu khi quên
**Precondition:** Có tài khoản trong hệ thống
**Main Flow:**
1. Người dùng chọn "Quên mật khẩu"
2. Nhập email đã đăng ký
3. Hệ thống gửi link đặt lại mật khẩu qua email
4. Người dùng click vào link
5. Nhập mật khẩu mới
6. Xác nhận mật khẩu mới
7. Cập nhật mật khẩu thành công
**Postcondition:** Mật khẩu được đặt lại thành công
**Exception:** Email không tồn tại, link hết hạn

### UC004: Đăng xuất
**Actor:** Người dùng
**Mô tả:** Người dùng đăng xuất khỏi hệ thống
**Precondition:** Người dùng đã đăng nhập
**Main Flow:**
1. Người dùng chọn "Đăng xuất"
2. Hệ thống xóa session
3. Chuyển hướng về trang chủ
**Postcondition:** Người dùng đã đăng xuất thành công

### UC005: Quản lý hồ sơ cá nhân
**Actor:** Người dùng
**Mô tả:** Người dùng cập nhật thông tin cá nhân
**Precondition:** Đã đăng nhập
**Main Flow:**
1. Truy cập trang hồ sơ cá nhân
2. Xem thông tin hiện tại
3. Chỉnh sửa thông tin (họ tên, số điện thoại, địa chỉ)
4. Upload ảnh đại diện (tùy chọn)
5. Lưu thay đổi
**Postcondition:** Thông tin cá nhân được cập nhật
**Exception:** Thông tin không hợp lệ

## 2. USE CASE THÔNG TIN VÀ ĐIỀU HƯỚNG

### UC006: Xem trang chủ
**Actor:** Khách vãng lai, Người dùng
**Mô tả:** Hiển thị trang chủ với thông tin tổng quan
**Precondition:** Không
**Main Flow:**
1. Truy cập trang chủ
2. Hiển thị banner quảng cáo
3. Hiển thị sản phẩm nổi bật
4. Hiển thị tin tức mới nhất
5. Hiển thị thông tin liên hệ
**Postcondition:** Trang chủ được hiển thị thành công

### UC007: Xem menu
**Actor:** Khách vãng lai, Người dùng
**Mô tả:** Xem danh sách sản phẩm theo danh mục
**Precondition:** Không
**Main Flow:**
1. Truy cập trang menu
2. Chọn danh mục sản phẩm
3. Hiển thị danh sách sản phẩm
4. Xem chi tiết sản phẩm (tùy chọn)
**Postcondition:** Menu được hiển thị thành công

### UC008: Xem chính sách
**Actor:** Khách vãng lai, Người dùng
**Mô tả:** Xem các chính sách của cửa hàng
**Precondition:** Không
**Main Flow:**
1. Truy cập trang chính sách
2. Chọn loại chính sách (đổi trả, bảo mật, vận chuyển)
3. Đọc nội dung chính sách
**Postcondition:** Chính sách được hiển thị

### UC009: Xem sự kiện
**Actor:** Khách vãng lai, Người dùng
**Mô tả:** Xem các sự kiện và khuyến mãi
**Precondition:** Không
**Main Flow:**
1. Truy cập trang sự kiện
2. Xem danh sách sự kiện đang diễn ra
3. Xem chi tiết sự kiện
4. Tham gia sự kiện (nếu đã đăng nhập)
**Postcondition:** Thông tin sự kiện được hiển thị

### UC010: Xem tin tức
**Actor:** Khách vãng lai, Người dùng
**Mô tả:** Xem tin tức và bài viết
**Precondition:** Không
**Main Flow:**
1. Truy cập trang tin tức
2. Xem danh sách tin tức
3. Đọc chi tiết tin tức
4. Bình luận (nếu đã đăng nhập)
**Postcondition:** Tin tức được hiển thị

## 3. USE CASE MUA SẮM VÀ ĐƠN HÀNG

### UC011: Tìm kiếm sản phẩm
**Actor:** Khách vãng lai, Người dùng
**Mô tả:** Tìm kiếm sản phẩm theo từ khóa
**Precondition:** Không
**Main Flow:**
1. Nhập từ khóa tìm kiếm
2. Chọn bộ lọc (giá, danh mục, đánh giá)
3. Hệ thống hiển thị kết quả tìm kiếm
4. Xem chi tiết sản phẩm
**Postcondition:** Kết quả tìm kiếm được hiển thị
**Exception:** Không tìm thấy sản phẩm

### UC012: Thêm vào giỏ hàng
**Actor:** Người dùng
**Mô tả:** Thêm sản phẩm vào giỏ hàng
**Precondition:** Đã đăng nhập
**Main Flow:**
1. Chọn sản phẩm
2. Chọn số lượng
3. Chọn tùy chọn (nếu có)
4. Thêm vào giỏ hàng
5. Hiển thị thông báo thành công
**Postcondition:** Sản phẩm được thêm vào giỏ hàng
**Exception:** Sản phẩm hết hàng

### UC013: Thanh toán
**Actor:** Người dùng
**Mô tả:** Thực hiện thanh toán đơn hàng
**Precondition:** Có sản phẩm trong giỏ hàng
**Main Flow:**
1. Xem giỏ hàng
2. Kiểm tra thông tin giao hàng
3. Chọn phương thức thanh toán
4. Nhập mã giảm giá (nếu có)
5. Xác nhận đơn hàng
6. Chuyển hướng đến cổng thanh toán VNPay
7. Hoàn tất thanh toán
8. Nhận xác nhận đơn hàng
**Postcondition:** Đơn hàng được tạo thành công
**Exception:** Thanh toán thất bại, hết hàng

### UC014: Xem lịch sử đơn hàng
**Actor:** Người dùng
**Mô tả:** Xem danh sách đơn hàng đã đặt
**Precondition:** Đã đăng nhập
**Main Flow:**
1. Truy cập trang lịch sử đơn hàng
2. Xem danh sách đơn hàng
3. Xem chi tiết đơn hàng
4. Đánh giá sản phẩm (nếu đã nhận hàng)
**Postcondition:** Lịch sử đơn hàng được hiển thị

### UC015: Xem điểm tích lũy
**Actor:** Người dùng
**Mô tả:** Xem điểm tích lũy và lịch sử giao dịch
**Precondition:** Đã đăng nhập
**Main Flow:**
1. Truy cập trang điểm tích lũy
2. Xem tổng điểm hiện tại
3. Xem lịch sử tích lũy
4. Xem cách sử dụng điểm
**Postcondition:** Thông tin điểm tích lũy được hiển thị

## 4. USE CASE GIAO TIẾP VÀ MẠNG XÃ HỘI

### UC016: Chat real-time
**Actor:** Người dùng
**Mô tả:** Trò chuyện trực tuyến với nhân viên hỗ trợ
**Precondition:** Đã đăng nhập
**Main Flow:**
1. Mở chat window
2. Gửi tin nhắn
3. Nhận phản hồi từ nhân viên
4. Gửi file/hình ảnh (nếu cần)
**Postcondition:** Cuộc trò chuyện được thực hiện
**Exception:** Không có nhân viên online

### UC017: Chat tư vấn AI
**Actor:** Người dùng
**Mô tả:** Trò chuyện với chatbot AI để được tư vấn
**Precondition:** Đã đăng nhập
**Main Flow:**
1. Mở chat AI
2. Đặt câu hỏi
3. Nhận phản hồi từ AI
4. Tiếp tục trò chuyện
**Postcondition:** Tư vấn AI được thực hiện
**Exception:** Hệ thống AI gặp sự cố

### UC018: Đăng bài mạng xã hội
**Actor:** Người dùng
**Mô tả:** Đăng bài viết lên mạng xã hội nội bộ
**Precondition:** Đã đăng nhập
**Main Flow:**
1. Truy cập trang mạng xã hội
2. Tạo bài viết mới
3. Thêm nội dung và hình ảnh
4. Chọn quyền riêng tư
5. Đăng bài
**Postcondition:** Bài viết được đăng thành công
**Exception:** Nội dung vi phạm quy định

### UC019: Tương tác bài viết MXH
**Actor:** Người dùng
**Mô tả:** Thích, bình luận, chia sẻ bài viết
**Precondition:** Đã đăng nhập
**Main Flow:**
1. Xem bài viết
2. Thực hiện hành động (thích/bình luận/chia sẻ)
3. Nhận thông báo phản hồi
**Postcondition:** Tương tác được thực hiện thành công

### UC020: Kết bạn MXH
**Actor:** Người dùng
**Mô tả:** Gửi và chấp nhận lời mời kết bạn
**Precondition:** Đã đăng nhập
**Main Flow:**
1. Tìm kiếm người dùng
2. Gửi lời mời kết bạn
3. Người nhận xem lời mời
4. Chấp nhận/từ chối lời mời
**Postcondition:** Kết nối bạn bè được thiết lập
**Exception:** Người dùng không tồn tại

### UC021: Voice/Video call
**Actor:** Người dùng
**Mô tả:** Thực hiện cuộc gọi âm thanh/hình ảnh
**Precondition:** Đã đăng nhập, có kết nối internet
**Main Flow:**
1. Chọn người gọi
2. Chọn loại cuộc gọi (voice/video)
3. Thiết lập kết nối WebRTC
4. Thực hiện cuộc gọi
5. Kết thúc cuộc gọi
**Postcondition:** Cuộc gọi được thực hiện thành công
**Exception:** Kết nối mạng không ổn định

## 5. USE CASE QUẢN TRỊ HỆ THỐNG (ADMIN)

### UC022: Xem dashboard thống kê
**Actor:** Admin
**Mô tả:** Xem tổng quan thống kê hệ thống
**Precondition:** Đã đăng nhập với quyền admin
**Main Flow:**
1. Truy cập dashboard
2. Xem thống kê doanh thu
3. Xem thống kê đơn hàng
4. Xem thống kê người dùng
5. Xem biểu đồ phân tích
**Postcondition:** Dashboard được hiển thị

### UC023: Quản lý người dùng
**Actor:** Admin
**Mô tả:** Quản lý danh sách người dùng hệ thống
**Precondition:** Đã đăng nhập với quyền admin
**Main Flow:**
1. Xem danh sách người dùng
2. Tìm kiếm người dùng
3. Xem chi tiết người dùng
4. Khóa/mở khóa tài khoản
5. Xóa tài khoản (nếu cần)
**Postcondition:** Quản lý người dùng thành công

### UC024: Quản lý sản phẩm
**Actor:** Admin
**Mô tả:** Thêm, sửa, xóa sản phẩm
**Precondition:** Đã đăng nhập với quyền admin
**Main Flow:**
1. Xem danh sách sản phẩm
2. Thêm sản phẩm mới
3. Chỉnh sửa thông tin sản phẩm
4. Upload hình ảnh sản phẩm
5. Cập nhật giá và số lượng
6. Xóa sản phẩm (nếu cần)
**Postcondition:** Quản lý sản phẩm thành công

### UC025: Quản lý đơn hàng
**Actor:** Admin
**Mô tả:** Xử lý và quản lý đơn hàng
**Precondition:** Đã đăng nhập với quyền admin
**Main Flow:**
1. Xem danh sách đơn hàng
2. Xem chi tiết đơn hàng
3. Cập nhật trạng thái đơn hàng
4. Xác nhận thanh toán
5. Giao hàng
**Postcondition:** Quản lý đơn hàng thành công

### UC026: Quản lý mã giảm giá
**Actor:** Admin
**Mô tả:** Tạo và quản lý mã giảm giá
**Precondition:** Đã đăng nhập với quyền admin
**Main Flow:**
1. Xem danh sách mã giảm giá
2. Tạo mã giảm giá mới
3. Thiết lập điều kiện sử dụng
4. Thiết lập thời gian hiệu lực
5. Xóa mã giảm giá (nếu cần)
**Postcondition:** Quản lý mã giảm giá thành công

### UC027: Xuất báo cáo thống kê
**Actor:** Admin
**Mô tả:** Xuất báo cáo thống kê định kỳ
**Precondition:** Đã đăng nhập với quyền admin
**Main Flow:**
1. Chọn loại báo cáo
2. Chọn khoảng thời gian
3. Chọn định dạng xuất (PDF/Excel)
4. Tạo báo cáo
5. Tải xuống báo cáo
**Postcondition:** Báo cáo được xuất thành công

## 6. USE CASE TÍCH HỢP BÊN NGOÀI

### UC028: Thanh toán VNPay
**Actor:** Người dùng, VNPay
**Mô tả:** Tích hợp thanh toán qua VNPay
**Precondition:** Có đơn hàng cần thanh toán
**Main Flow:**
1. Chọn thanh toán qua VNPay
2. Chuyển hướng đến cổng VNPay
3. Nhập thông tin thẻ
4. Xác thực thanh toán
5. Nhận kết quả thanh toán
6. Quay về website
**Postcondition:** Thanh toán hoàn tất
**Exception:** Thanh toán thất bại

### UC029: Tích hợp AI Chat
**Actor:** Người dùng, tudongchat.com
**Mô tả:** Tích hợp chat AI từ dịch vụ bên ngoài
**Precondition:** Đã đăng nhập
**Main Flow:**
1. Mở chat AI
2. Kết nối với tudongchat.com
3. Gửi câu hỏi
4. Nhận phản hồi từ AI
**Postcondition:** Chat AI hoạt động bình thường
**Exception:** Dịch vụ AI không khả dụng

### UC030: WebRTC Communication
**Actor:** Người dùng, WebRTC
**Mô tả:** Tích hợp giao tiếp real-time qua WebRTC
**Precondition:** Đã đăng nhập, có camera/microphone
**Main Flow:**
1. Khởi tạo kết nối WebRTC
2. Thiết lập media stream
3. Thực hiện cuộc gọi
4. Xử lý tín hiệu âm thanh/hình ảnh
5. Kết thúc cuộc gọi
**Postcondition:** Giao tiếp WebRTC thành công
**Exception:** Thiết bị không hỗ trợ, mạng không ổn định 