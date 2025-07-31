# Sequence Diagram - Xem trang chủ

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

actor "Người dùng/Khách vãng lai"
participant "Giao diện trang chủ" as UI
participant "Backend API" as API

"Người dùng/Khách vãng lai" -> UI: Truy cập trang chủ
UI -> API: Lấy dữ liệu banner quảng cáo
API --> UI: Trả về dữ liệu banner
UI -> API: Lấy sản phẩm nổi bật
API --> UI: Trả về danh sách sản phẩm nổi bật
UI -> API: Lấy tin tức mới nhất
API --> UI: Trả về danh sách tin tức
UI -> API: Lấy thông tin liên hệ
API --> UI: Trả về thông tin liên hệ
UI --> "Người dùng/Khách vãng lai": Hiển thị trang chủ với đầy đủ thông tin
@enduml 