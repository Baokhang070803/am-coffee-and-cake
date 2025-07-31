# Sequence Diagram - Đăng nhập (Firebase Auth)

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

actor User as "Người dùng"
participant "Giao diện đăng nhập" as UI
participant "Firebase Auth" as Firebase
participant "Trang chủ" as Home

User -> UI: Truy cập trang đăng nhập
User -> UI: Nhập email/username và mật khẩu
UI -> Firebase: Gửi thông tin đăng nhập (email/mật khẩu)
Firebase --> UI: Trả về kết quả xác thực
alt Đăng nhập thành công
    UI -> Home: Chuyển hướng đến trang chủ
    Home --> User: Hiển thị giao diện trang chủ
else Đăng nhập thất bại
    UI --> User: Hiển thị thông báo lỗi
end
@enduml
``` 