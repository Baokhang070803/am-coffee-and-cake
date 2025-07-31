# Sequence Diagram - Quên mật khẩu (Firebase Auth)

' Lưu ý: Để hiển thị tiếng Việt có dấu, nên dùng PlantUML offline hoặc công cụ online hỗ trợ Unicode.

@startuml
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

actor "Người dùng"
participant "Giao diện quên mật khẩu" as UI
participant "Firebase Auth" as Firebase
participant "Dịch vụ Email" as Email

"Người dùng" -> UI: Chọn "Quên mật khẩu"
"Người dùng" -> UI: Nhập email đã đăng ký
UI -> Firebase: Yêu cầu đặt lại mật khẩu
alt Email không tồn tại
    Firebase --> UI: Trả về lỗi
    UI --> "Người dùng": Hiển thị thông báo lỗi
else Email tồn tại
    Firebase -> Email: Gửi link đặt lại mật khẩu
    Email --> "Người dùng": Nhận link đặt lại mật khẩu
    "Người dùng" -> Firebase: Click link đặt lại mật khẩu
    "Người dùng" -> UI: Nhập mật khẩu mới
    "Người dùng" -> UI: Xác nhận mật khẩu mới
    UI -> Firebase: Cập nhật mật khẩu
    Firebase --> UI: Xác nhận thành công
    UI --> "Người dùng": Hiển thị thông báo thành công
end
@enduml 