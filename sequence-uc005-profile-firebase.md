# Sequence Diagram - Quản lý hồ sơ cá nhân (Firebase Auth)

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
participant "Giao diện hồ sơ" as UI
participant "Firebase Auth" as Firebase

"Người dùng" -> UI: Truy cập trang hồ sơ cá nhân
UI -> Firebase: Lấy thông tin cá nhân hiện tại
Firebase --> UI: Trả về thông tin cá nhân
UI --> "Người dùng": Hiển thị thông tin cá nhân
"Người dùng" -> UI: Chỉnh sửa thông tin (họ tên, số điện thoại, địa chỉ)
alt Upload ảnh đại diện
    "Người dùng" -> UI: Upload ảnh đại diện
    UI -> Firebase: Lưu ảnh đại diện
    Firebase --> UI: Xác nhận lưu ảnh
end
UI -> Firebase: Lưu thay đổi thông tin cá nhân
alt Thông tin không hợp lệ
    Firebase --> UI: Trả về lỗi
    UI --> "Người dùng": Hiển thị thông báo lỗi
else Thành công
    Firebase --> UI: Xác nhận cập nhật
    UI --> "Người dùng": Hiển thị thông báo thành công
end
@enduml 