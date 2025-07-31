# Sequence Diagram - Đăng xuất (Firebase Auth)

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
participant "Giao diện" as UI
participant "Firebase Auth" as Firebase
participant "Trang chủ" as Home

"Người dùng" -> UI: Chọn "Đăng xuất"
UI -> Firebase: Gửi yêu cầu đăng xuất
Firebase --> UI: Xóa session, xác nhận đăng xuất
UI -> Home: Chuyển hướng về trang chủ
Home --> "Người dùng": Hiển thị giao diện trang chủ
@enduml 