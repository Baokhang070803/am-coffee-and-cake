# Sequence Diagram - Đăng ký (Firebase Auth)

```@startuml
' Chữ màu đen, nền trong suốt, border xanh biển nhẹ, không đổ bóng
skinparam backgroundColor transparent
skinparam handwritten false
skinparam shadowing false
skinparam sequence {
    ArrowColor #1E90FF
    LifeLineBorderColor #1E90FF
    ParticipantBorderColor #1E90FF
    ParticipantBackgroundColor transparent
    ParticipantFontColor black
    ActorBorderColor #1E90FF
    ActorBackgroundColor transparent
    ActorFontColor black
    BoxBackgroundColor transparent
    BoxBorderColor #1E90FF
    GroupBorderColor #1E90FF
    GroupBackgroundColor transparent
    NoteBackgroundColor transparent
    NoteBorderColor #1E90FF
    AltBackgroundColor transparent
    AltBorderColor #1E90FF
    TitleFontColor black
    TitleBorderColor #1E90FF
}

actor User as "Khách vãng lai"
participant "Giao diện đăng ký" as UI
participant "Firebase Auth" as Firebase
participant "Email" as Email
participant "Trang chủ" as Home

User -> UI: Truy cập trang đăng ký
User -> UI: Nhập thông tin cá nhân\n(họ tên, email, sđt, mật khẩu)
UI -> Firebase: Gửi thông tin đăng ký
alt Email đã tồn tại hoặc thông tin không hợp lệ
    Firebase --> UI: Trả về lỗi
    UI --> User: Hiển thị thông báo lỗi
else Đăng ký thành công
    Firebase --> UI: Tạo tài khoản tạm thời
    Firebase -> Email: Gửi email xác thực
    Email --> User: Nhận email xác thực
    User -> Firebase: Click link xác thực email
    Firebase --> UI: Kích hoạt tài khoản
    UI -> Home: Chuyển hướng đến trang chủ
    Home --> User: Hiển thị giao diện trang chủ
end
@enduml
``` 