# 👥 Data Flow Diagram (DFD) - Social Network System
## Mạng xã hội "Xã hội Ấm" - Coffee & Cake

---

## 🎯 Overview

Sơ đồ luồng dữ liệu mô tả hoạt động của mạng xã hội nội bộ "Xã hội Ấm", bao gồm timeline, chat, video call, stories và hệ thống kết bạn.

---

## 📋 DFD Level 0 (Context Diagram)

```mermaid
graph TB
    subgraph "External Entities"
        U[👤 User]
        F[👥 Friends]
        A[👨‍💼 Admin]
        N[📧 Notification Service]
        W[🌐 WebRTC Service]
        C[☁️ Cloudinary]
    end
    
    subgraph "Social Network System"
        SNS[👥 Xã hội Ấm System]
    end
    
    U -->|Đăng bài viết| SNS
    U -->|Gửi tin nhắn| SNS
    U -->|Kết bạn| SNS
    U -->|Video call| SNS
    U -->|Đăng story| SNS
    
    SNS -->|Timeline feed| U
    SNS -->|Tin nhắn| U
    SNS -->|Thông báo| U
    SNS -->|Video stream| U
    
    F -->|Tương tác bài viết| SNS
    SNS -->|Bài viết của bạn bè| F
    
    A -->|Quản lý nội dung| SNS
    SNS -->|Báo cáo hoạt động| A
    
    SNS -->|Push notification| N
    SNS -->|Peer connection| W
    SNS -->|Upload media| C
    C -->|Media URL| SNS
```

---

## 📊 DFD Level 1 (System Overview)

```mermaid
graph TB
    subgraph "External Entities"
        U[👤 User]
        F[👥 Friends]
        A[👨‍💼 Admin]
        N[📧 Notification]
        W[🌐 WebRTC]
        C[☁️ Cloudinary]
    end
    
    subgraph "Social Network Processes"
        P1[1.0<br/>📱 Quản lý<br/>Timeline]
        P2[2.0<br/>💬 Hệ thống<br/>Chat]
        P3[3.0<br/>👥 Quản lý<br/>Bạn bè]
        P4[4.0<br/>📹 Video/Voice<br/>Call]
        P5[5.0<br/>📸 Stories<br/>24h]
        P6[6.0<br/>🔔 Notification<br/>System]
        P7[7.0<br/>🛡️ Content<br/>Moderation]
    end
    
    subgraph "Data Stores"
        D1[(D1: Posts<br/>📱 Bài viết)]
        D2[(D2: Messages<br/>💬 Tin nhắn)]
        D3[(D3: Friends<br/>👥 Bạn bè)]
        D4[(D4: Stories<br/>📸 Stories)]
        D5[(D5: Media<br/>🖼️ Media)]
        D6[(D6: Notifications<br/>🔔 Thông báo)]
        D7[(D7: User Activity<br/>📊 Hoạt động)]
    end
    
    %% User flows
    U -->|Tạo bài viết| P1
    U -->|Gửi tin nhắn| P2
    U -->|Kết bạn| P3
    U -->|Bắt đầu cuộc gọi| P4
    U -->|Đăng story| P5
    
    P1 -->|Timeline feed| U
    P2 -->|Tin nhắn realtime| U
    P3 -->|Danh sách bạn bè| U
    P4 -->|Video/audio stream| U
    P5 -->|Stories feed| U
    P6 -->|Thông báo| U
    
    %% Friend interactions
    F -->|Like, comment| P1
    F -->|Nhắn tin| P2
    P1 -->|Bài viết mới| F
    P2 -->|Tin nhắn| F
    
    %% Admin flows
    A -->|Kiểm duyệt nội dung| P7
    P7 -->|Báo cáo vi phạm| A
    
    %% External services
    P4 -->|WebRTC connection| W
    P1 -->|Upload media| C
    P5 -->|Upload media| C
    C -->|Media URLs| P1
    C -->|Media URLs| P5
    
    P6 -->|Send notifications| N
    
    %% Data store connections
    P1 -.->|Read/Write| D1
    P1 -.->|Write| D5
    P1 -.->|Write| D7
    P2 -.->|Read/Write| D2
    P2 -.->|Write| D7
    P3 -.->|Read/Write| D3
    P4 -.->|Write| D7
    P5 -.->|Read/Write| D4
    P5 -.->|Write| D5
    P6 -.->|Read/Write| D6
    P7 -.->|Read| D1
    P7 -.->|Read| D4
    P7 -.->|Read| D7
```

---

## 🔍 DFD Level 2 - Chi tiết Process 1.0 (Quản lý Timeline)

```mermaid
graph TB
    subgraph "External Entities"
        U[👤 User]
        F[👥 Friends]
        C[☁️ Cloudinary]
    end
    
    subgraph "Timeline Management Detailed"
        P11[1.1<br/>✍️ Tạo<br/>Bài viết]
        P12[1.2<br/>📷 Upload<br/>Media]
        P13[1.3<br/>🔍 Validate<br/>Content]
        P14[1.4<br/>📢 Publish<br/>Post]
        P15[1.5<br/>👍 Xử lý<br/>Tương tác]
        P16[1.6<br/>📄 Load<br/>Timeline]
        P17[1.7<br/>🔄 Real-time<br/>Updates]
    end
    
    subgraph "Data Stores"
        D1[(D1: Posts)]
        D3[(D3: Friends)]
        D5[(D5: Media)]
        D7[(D7: Activity)]
        D8[(D8: Reactions)]
        D9[(D9: Comments)]
    end
    
    %% Input flows
    U -->|Nội dung bài viết| P11
    U -->|Hình ảnh/video| P12
    U -->|Like/comment| P15
    U -->|Load timeline| P16
    F -->|React to posts| P15
    
    %% Process flows
    P11 -->|Content data| P13
    P12 -->|Media files| C
    C -->|Media URLs| P13
    P13 -->|Validated content| P14
    P14 -->|Published post| P17
    P15 -->|Interaction data| P17
    P16 -->|Timeline request| P17
    
    %% Output flows
    P12 -->|Upload progress| U
    P13 -->|Validation errors| U
    P14 -->|Post confirmation| U
    P15 -->|Interaction result| U
    P16 -->|Timeline feed| U
    P17 -->|Real-time updates| U
    P17 -->|New posts| F
    
    %% Data store interactions
    P11 -.->|Write| D7
    P13 -.->|Read| D1
    P14 -.->|Write| D1
    P14 -.->|Write| D5
    P15 -.->|Write| D8
    P15 -.->|Write| D9
    P15 -.->|Update| D7
    P16 -.->|Read| D1
    P16 -.->|Read| D3
    P16 -.->|Read| D8
    P16 -.->|Read| D9
    P17 -.->|Read| D1
```

---

## 💬 DFD Level 2 - Chi tiết Process 2.0 (Hệ thống Chat)

```mermaid
graph TB
    subgraph "External Entities"
        U1[👤 User A]
        U2[👤 User B]
        N[📧 Notification]
    end
    
    subgraph "Chat System Detailed"
        P21[2.1<br/>💬 Gửi<br/>Tin nhắn]
        P22[2.2<br/>📷 Gửi<br/>Media]
        P23[2.3<br/>🔍 Validate<br/>Message]
        P24[2.4<br/>📤 Deliver<br/>Message]
        P25[2.5<br/>✅ Read<br/>Receipt]
        P26[2.6<br/>📜 Load Chat<br/>History]
        P27[2.7<br/>🔄 Real-time<br/>Sync]
        P28[2.8<br/>🔍 Search<br/>Messages]
    end
    
    subgraph "Data Stores"
        D2[(D2: Messages)]
        D3[(D3: Friends)]
        D5[(D5: Media)]
        D6[(D6: Notifications)]
        D10[(D10: Chat Rooms)]
        D11[(D11: Read Status)]
    end
    
    %% Input flows
    U1 -->|Tin nhắn text| P21
    U1 -->|Gửi hình/video| P22
    U1 -->|Tìm kiếm tin nhắn| P28
    U1 -->|Load chat cũ| P26
    U2 -->|Đọc tin nhắn| P25
    U2 -->|Reply message| P21
    
    %% Process flows
    P21 -->|Message data| P23
    P22 -->|Media message| P23
    P23 -->|Validated msg| P24
    P24 -->|Delivered msg| P25
    P24 -->|New message| P27
    P25 -->|Read status| P27
    P26 -->|History request| P27
    P28 -->|Search query| P27
    
    %% Output flows
    P21 -->|Send status| U1
    P22 -->|Upload status| U1
    P23 -->|Validation error| U1
    P24 -->|Message delivered| U2
    P25 -->|Read receipt| U1
    P26 -->|Chat history| U1
    P27 -->|Real-time messages| U1
    P27 -->|Real-time messages| U2
    P28 -->|Search results| U1
    
    %% Notification flows
    P24 -->|New message alert| N
    
    %% Data store interactions
    P21 -.->|Write| D2
    P22 -.->|Write| D5
    P23 -.->|Read| D3
    P24 -.->|Write| D2
    P24 -.->|Write| D6
    P25 -.->|Write| D11
    P26 -.->|Read| D2
    P26 -.->|Read| D10
    P27 -.->|Read/Write| D2
    P28 -.->|Read| D2
```

---

## 📹 DFD Level 2 - Chi tiết Process 4.0 (Video/Voice Call)

```mermaid
graph TB
    subgraph "External Entities"
        U1[👤 Caller]
        U2[👤 Receiver]
        W[🌐 WebRTC Server]
        N[📧 Notification]
    end
    
    subgraph "Video Call System Detailed"
        P41[4.1<br/>📞 Initiate<br/>Call]
        P42[4.2<br/>🔔 Send Call<br/>Notification]
        P43[4.3<br/>✅ Accept/Reject<br/>Call]
        P44[4.4<br/>🌐 Establish<br/>WebRTC]
        P45[4.5<br/>📹 Stream<br/>Audio/Video]
        P46[4.6<br/>📞 End<br/>Call]
        P47[4.7<br/>📊 Log Call<br/>History]
    end
    
    subgraph "Data Stores"
        D3[(D3: Friends)]
        D6[(D6: Notifications)]
        D12[(D12: Call History)]
        D13[(D13: Call Sessions)]
    end
    
    %% Input flows
    U1 -->|Start call| P41
    U1 -->|End call| P46
    U2 -->|Accept/Reject| P43
    U2 -->|End call| P46
    
    %% Process flows
    P41 -->|Call request| P42
    P42 -->|Notification sent| P43
    P43 -->|Call accepted| P44
    P44 -->|Connection established| P45
    P45 -->|Call in progress| P46
    P46 -->|Call ended| P47
    
    %% Output flows
    P41 -->|Call initiated| U1
    P42 -->|Incoming call| U2
    P43 -->|Call status| U1
    P44 -->|Connection ready| U1
    P44 -->|Connection ready| U2
    P45 -->|Audio/Video stream| U1
    P45 -->|Audio/Video stream| U2
    P46 -->|Call ended| U1
    P46 -->|Call ended| U2
    P47 -->|Call logged| U1
    
    %% External services
    P42 -->|Call notification| N
    P44 -->|WebRTC setup| W
    P45 -->|Media relay| W
    W -->|Peer connection| P44
    W -->|Media stream| P45
    
    %% Data store interactions
    P41 -.->|Read| D3
    P42 -.->|Write| D6
    P43 -.->|Write| D13
    P44 -.->|Update| D13
    P45 -.->|Update| D13
    P46 -.->|Update| D13
    P47 -.->|Write| D12
```

---

## 📸 DFD Level 2 - Chi tiết Process 5.0 (Stories 24h)

```mermaid
graph TB
    subgraph "External Entities"
        U[👤 User]
        V[👥 Viewers]
        C[☁️ Cloudinary]
        S[⏰ Scheduler Service]
    end
    
    subgraph "Stories System Detailed"
        P51[5.1<br/>📸 Create<br/>Story]
        P52[5.2<br/>📤 Upload<br/>Media]
        P53[5.3<br/>🔍 Validate<br/>Content]
        P54[5.4<br/>📢 Publish<br/>Story]
        P55[5.5<br/>👀 View<br/>Story]
        P56[5.6<br/>📊 Track<br/>Views]
        P57[5.7<br/>⏰ Auto<br/>Delete]
        P58[5.8<br/>📱 Stories<br/>Feed]
    end
    
    subgraph "Data Stores"
        D3[(D3: Friends)]
        D4[(D4: Stories)]
        D5[(D5: Media)]
        D14[(D14: Story Views)]
        D15[(D15: Story Queue)]
    end
    
    %% Input flows
    U -->|Tạo story| P51
    U -->|Upload media| P52
    U -->|Xem stories| P58
    V -->|View story| P55
    S -->|24h timer| P57
    
    %% Process flows
    P51 -->|Story data| P52
    P52 -->|Media uploaded| P53
    P53 -->|Content validated| P54
    P54 -->|Story published| P58
    P55 -->|Story viewed| P56
    P56 -->|View recorded| P58
    P57 -->|Delete expired| P58
    
    %% Output flows
    P51 -->|Story created| U
    P52 -->|Upload progress| U
    P53 -->|Validation result| U
    P54 -->|Story published| U
    P55 -->|Story content| V
    P56 -->|View count| U
    P57 -->|Delete notification| U
    P58 -->|Stories feed| U
    P58 -->|Stories feed| V
    
    %% External services
    P52 -->|Upload media| C
    C -->|Media URL| P53
    P57 -->|Schedule deletion| S
    
    %% Data store interactions
    P51 -.->|Write| D15
    P52 -.->|Write| D5
    P54 -.->|Write| D4
    P55 -.->|Read| D4
    P55 -.->|Read| D5
    P56 -.->|Write| D14
    P57 -.->|Delete| D4
    P57 -.->|Delete| D5
    P58 -.->|Read| D3
    P58 -.->|Read| D4
    P58 -.->|Read| D14
```

---

## 📊 Data Dictionary (Từ điển Dữ liệu)

### **Data Flows**

| Tên Data Flow | Mô tả | Thành phần dữ liệu |
|---------------|-------|-------------------|
| **Đăng bài viết** | Tạo bài viết mới | user_id + content + media + privacy_setting |
| **Gửi tin nhắn** | Nhắn tin realtime | sender_id + receiver_id + message + media |
| **Kết bạn** | Yêu cầu kết bạn | requester_id + target_id + message |
| **Video call** | Cuộc gọi video | caller_id + receiver_id + call_type |
| **Đăng story** | Story 24h | user_id + media + text + duration |
| **Timeline feed** | Bảng tin cá nhân | posts[] + reactions[] + comments[] |

### **Data Stores**

| Data Store | Mô tả | Cấu trúc chính |
|------------|-------|----------------|
| **D1: Posts** | Bài viết timeline | post_id + user_id + content + media + timestamp + reactions |
| **D2: Messages** | Tin nhắn chat | message_id + chat_id + sender_id + content + timestamp |
| **D3: Friends** | Quan hệ bạn bè | user_id + friend_id + status + created_date |
| **D4: Stories** | Stories 24h | story_id + user_id + media + text + created_date + expires_at |
| **D5: Media** | File media | media_id + url + type + size + uploaded_by |
| **D6: Notifications** | Thông báo | notification_id + user_id + type + content + read_status |

### **Processes**

| Process | Mô tả | Input | Output |
|---------|-------|-------|--------|
| **1.0 Timeline** | Quản lý bảng tin | Post content, interactions | Timeline feed, notifications |
| **2.0 Chat** | Hệ thống nhắn tin | Messages, media | Real-time chat, delivery status |
| **3.0 Friends** | Quản lý bạn bè | Friend requests | Friend lists, relationship status |
| **4.0 Video Call** | Cuộc gọi A/V | Call requests | WebRTC streams, call history |
| **5.0 Stories** | Stories 24h | Story content | Stories feed, view analytics |
| **6.0 Notifications** | Thông báo | Activity events | Push notifications, alerts |

---

## 🔄 Business Rules & Constraints

### **Quy tắc Kinh doanh**

1. **Timeline & Posts**
   - Mỗi bài viết có thể chứa tối đa 10 hình ảnh
   - Video tối đa 5 phút
   - Auto-delete posts sau 1 năm nếu không có tương tác

2. **Chat System**
   - Message history lưu vô thời hạn
   - File attachment tối đa 50MB
   - Group chat tối đa 100 members

3. **Stories**
   - Tự động xóa sau 24 giờ
   - Tối đa 100 story views được hiển thị
   - Media tối đa 15 giây (video)

4. **Video Calls**
   - Tối đa 8 người trong group call
   - Call timeout sau 4 giờ
   - Ghi log tất cả cuộc gọi

5. **Privacy & Security**
   - Chỉ bạn bè mới nhắn tin được
   - Stories có thể set public/friends only
   - Admin có thể moderate tất cả content

### **Ràng buộc Kỹ thuật**

1. **Real-time Performance**
   - Message delivery < 1 second
   - Timeline updates < 2 seconds
   - Video call latency < 200ms

2. **Storage & Media**
   - Images auto-compress 80% quality
   - Videos transcode to 720p max
   - CDN cache cho media files

3. **Scalability**
   - Support 10,000+ concurrent users
   - Horizontal scaling cho chat
   - Load balancing cho WebRTC

---

## 📈 Flow Scenarios

### **Scenario 1: Đăng bài viết có hình ảnh**

```
1. User → Create Post → Add Text Content
2. User → Upload Images → Cloudinary Processing
3. System → Validate Content → Check Guidelines
4. System → Publish Post → Update Timeline
5. System → Notify Friends → Send Push Notifications
6. Friends → View Post → Load in Timeline
7. Friends → React/Comment → Real-time Updates
```

### **Scenario 2: Video call giữa 2 người**

```
1. User A → Initiate Call → Select Friend
2. System → Send Notification → To User B
3. User B → Accept Call → Start WebRTC
4. WebRTC → Establish Connection → P2P Stream
5. System → Log Call Start → Record Activity
6. Users → Video/Audio Stream → Real-time Communication
7. User → End Call → Cleanup Resources
8. System → Log Call End → Save History
```

### **Scenario 3: Đăng story và xem analytics**

```
1. User → Create Story → Add Media + Text
2. System → Upload to Cloudinary → Get URLs
3. System → Publish Story → Add to Feed
4. Friends → View Story → Track Views
5. System → Count Views → Real-time Analytics
6. Timer → 24h Expired → Auto Delete
7. System → Clean Media → Remove from CDN
```

---

*Sơ đồ DFD này mô tả luồng dữ liệu hoàn chỉnh cho mạng xã hội "Xã hội Ấm", từ các tính năng cơ bản như timeline, chat đến các tính năng nâng cao như video call và stories.*
