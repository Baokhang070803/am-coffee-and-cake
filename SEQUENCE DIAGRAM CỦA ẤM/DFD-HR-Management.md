# 👨‍💼 Data Flow Diagram (DFD) - HR Management System
## Hệ thống Quản lý Nhân sự - Ấm Coffee & Cake

---

## 🎯 Overview

Sơ đồ luồng dữ liệu mô tả hệ thống quản lý nhân sự toàn diện, bao gồm chấm công GPS, quản lý nghỉ phép, tăng ca, và cổng thông tin nhân viên.

---

## 📋 DFD Level 0 (Context Diagram)

```mermaid
graph TB
    subgraph "External Entities"
        E[👨‍💻 Employee]
        M[👨‍💼 HR Manager]
        S[👨‍💼 Supervisor]
        A[👨‍💼 Admin]
        G[📍 GPS Service]
        P[💰 Payroll System]
        L[⚖️ Labor Authority]
    end
    
    subgraph "HR Management System"
        HRS[👨‍💼 HR Management System]
    end
    
    E -->|Chấm công| HRS
    E -->|Đăng ký nghỉ phép| HRS
    E -->|Đăng ký tăng ca| HRS
    E -->|Cập nhật thông tin| HRS
    
    HRS -->|Bảng chấm công| E
    HRS -->|Trạng thái nghỉ phép| E
    HRS -->|Lịch làm việc| E
    HRS -->|Payslip| E
    
    M -->|Quản lý nhân viên| HRS
    M -->|Phê duyệt nghỉ phép| HRS
    M -->|Thiết lập chính sách| HRS
    
    HRS -->|Báo cáo HR| M
    HRS -->|Performance analytics| M
    
    S -->|Phê duyệt tăng ca| HRS
    HRS -->|Team schedule| S
    
    A -->|System configuration| HRS
    HRS -->|System reports| A
    
    G -->|Location data| HRS
    HRS -->|GPS verification| G
    
    HRS -->|Salary data| P
    P -->|Payment confirmation| HRS
    
    HRS -->|Labor reports| L
    L -->|Compliance requirements| HRS
```

---

## 📊 DFD Level 1 (System Overview)

```mermaid
graph TB
    subgraph "External Entities"
        E[👨‍💻 Employee]
        M[👨‍💼 HR Manager]
        S[👨‍💼 Supervisor]
        G[📍 GPS Service]
        P[💰 Payroll]
    end
    
    subgraph "HR Management Processes"
        P1[1.0<br/>⏰ Attendance<br/>Management]
        P2[2.0<br/>🏖️ Leave<br/>Management]
        P3[3.0<br/>⏱️ Overtime<br/>Management]
        P4[4.0<br/>👥 Employee<br/>Management]
        P5[5.0<br/>💰 Payroll<br/>Processing]
        P6[6.0<br/>📊 Performance<br/>Evaluation]
        P7[7.0<br/>📋 Compliance<br/>& Reporting]
        P8[8.0<br/>📱 Employee<br/>Portal]
    end
    
    subgraph "Data Stores"
        D1[(D1: Employees<br/>👥 Nhân viên)]
        D2[(D2: Attendance<br/>⏰ Chấm công)]
        D3[(D3: Leave Records<br/>🏖️ Nghỉ phép)]
        D4[(D4: Overtime<br/>⏱️ Tăng ca)]
        D5[(D5: Payroll<br/>💰 Lương)]
        D6[(D6: Performance<br/>📈 Hiệu suất)]
        D7[(D7: Policies<br/>📋 Chính sách)]
        D8[(D8: Reports<br/>📊 Báo cáo)]
    end
    
    %% Employee flows
    E -->|Chấm công GPS| P1
    E -->|Đăng ký nghỉ phép| P2
    E -->|Đăng ký tăng ca| P3
    E -->|Cập nhật profile| P4
    E -->|Truy cập portal| P8
    
    P1 -->|Attendance status| E
    P2 -->|Leave status| E
    P3 -->|Overtime approval| E
    P4 -->|Profile updated| E
    P8 -->|Portal dashboard| E
    
    %% Manager flows
    M -->|Phê duyệt nghỉ phép| P2
    M -->|Review performance| P6
    M -->|Generate reports| P7
    M -->|Manage policies| P7
    
    P2 -->|Leave reports| M
    P6 -->|Performance reports| M
    P7 -->|HR analytics| M
    
    %% Supervisor flows
    S -->|Approve overtime| P3
    S -->|Rate performance| P6
    P3 -->|Overtime reports| S
    P6 -->|Team performance| S
    
    %% External integrations
    P1 -->|GPS verification| G
    G -->|Location confirmed| P1
    
    P5 -->|Salary calculation| P
    P -->|Payment processed| P5
    
    %% Data store connections
    P1 -.->|Read/Write| D2
    P1 -.->|Read| D1
    P2 -.->|Read/Write| D3
    P2 -.->|Read| D1
    P2 -.->|Read| D7
    P3 -.->|Read/Write| D4
    P3 -.->|Read| D1
    P4 -.->|Read/Write| D1
    P5 -.->|Read| D2
    P5 -.->|Read| D3
    P5 -.->|Read| D4
    P5 -.->|Write| D5
    P6 -.->|Read/Write| D6
    P6 -.->|Read| D1
    P7 -.->|Read/Write| D7
    P7 -.->|Read| D2
    P7 -.->|Read| D3
    P7 -.->|Read| D4
    P7 -.->|Write| D8
    P8 -.->|Read| D1
    P8 -.->|Read| D2
    P8 -.->|Read| D3
    P8 -.->|Read| D5
```

---

## 🔍 DFD Level 2 - Chi tiết Process 1.0 (Attendance Management)

```mermaid
graph TB
    subgraph "External Entities"
        E[👨‍💻 Employee]
        M[👨‍💼 Manager]
        G[📍 GPS Service]
        A[📱 Mobile App]
    end
    
    subgraph "Attendance Management Detailed"
        P11[1.1<br/>📱 Mobile<br/>Check-in]
        P12[1.2<br/>📍 GPS<br/>Verification]
        P13[1.3<br/>⏰ Record<br/>Attendance]
        P14[1.4<br/>🕐 Track<br/>Working Hours]
        P15[1.5<br/>⚠️ Late/Early<br/>Detection]
        P16[1.6<br/>📊 Generate<br/>Timesheet]
        P17[1.7<br/>✍️ Manual<br/>Adjustment]
        P18[1.8<br/>📧 Send<br/>Notifications]
    end
    
    subgraph "Data Stores"
        D1[(D1: Employees)]
        D2[(D2: Attendance)]
        D7[(D7: Policies)]
        D9[(D9: GPS Locations)]
        D10[(D10: Work Schedules)]
        D11[(D11: Notifications)]
    end
    
    %% Input flows
    E -->|Check-in request| P11
    E -->|Check-out request| P11
    A -->|Mobile attendance| P11
    M -->|Manual adjustment| P17
    G -->|Location data| P12
    
    %% Process flows
    P11 -->|Attendance data| P12
    P12 -->|GPS verified| P13
    P13 -->|Attendance recorded| P14
    P14 -->|Hours calculated| P15
    P15 -->|Anomaly detected| P18
    P15 -->|Normal attendance| P16
    P16 -->|Timesheet ready| P17
    P17 -->|Adjusted data| P18
    
    %% Output flows
    P11 -->|Check-in confirmation| E
    P11 -->|Mobile response| A
    P12 -->|GPS status| E
    P13 -->|Record confirmation| E
    P14 -->|Working hours| E
    P15 -->|Late/early warning| E
    P16 -->|Timesheet| E
    P16 -->|Attendance report| M
    P17 -->|Adjustment confirmed| M
    P18 -->|Notifications sent| E
    P18 -->|Alert sent| M
    
    %% Data store interactions
    P11 -.->|Read| D1
    P12 -.->|Read| D9
    P13 -.->|Write| D2
    P14 -.->|Read| D10
    P14 -.->|Update| D2
    P15 -.->|Read| D7
    P16 -.->|Read| D2
    P17 -.->|Update| D2
    P18 -.->|Write| D11
```

---

## 🏖️ DFD Level 2 - Chi tiết Process 2.0 (Leave Management)

```mermaid
graph TB
    subgraph "External Entities"
        E[👨‍💻 Employee]
        M[👨‍💼 HR Manager]
        S[👨‍💼 Supervisor]
        N[📧 Notification]
    end
    
    subgraph "Leave Management Detailed"
        P21[2.1<br/>📝 Submit<br/>Leave Request]
        P22[2.2<br/>🔍 Validate<br/>Request]
        P23[2.3<br/>👀 Manager<br/>Review]
        P24[2.4<br/>✅ Approve/Reject<br/>Leave]
        P25[2.5<br/>📅 Update<br/>Calendar]
        P26[2.6<br/>📊 Track<br/>Leave Balance]
        P27[2.7<br/>🔄 Auto<br/>Calculation]
        P28[2.8<br/>📧 Send<br/>Notifications]
    end
    
    subgraph "Data Stores"
        D1[(D1: Employees)]
        D3[(D3: Leave Records)]
        D7[(D7: Policies)]
        D10[(D10: Work Schedules)]
        D11[(D11: Notifications)]
        D12[(D12: Leave Balance)]
        D13[(D13: Approvals)]
    end
    
    %% Input flows
    E -->|Leave request| P21
    S -->|Review request| P23
    M -->|Approve/reject| P24
    
    %% Process flows
    P21 -->|Request submitted| P22
    P22 -->|Validation OK| P23
    P23 -->|Reviewed| P24
    P24 -->|Decision made| P25
    P24 -->|Approved| P26
    P25 -->|Calendar updated| P27
    P26 -->|Balance updated| P28
    P27 -->|Auto calculated| P28
    
    %% Output flows
    P21 -->|Submission confirmed| E
    P22 -->|Validation errors| E
    P23 -->|Review notification| S
    P24 -->|Approval result| E
    P25 -->|Calendar updated| E
    P26 -->|New balance| E
    P27 -->|Auto accrual| E
    P28 -->|Status notifications| E
    P28 -->|Manager alerts| M
    
    %% Notification flows
    P24 -->|Approval notification| N
    P28 -->|Leave alerts| N
    
    %% Data store interactions
    P21 -.->|Read| D1
    P21 -.->|Write| D3
    P22 -.->|Read| D7
    P22 -.->|Read| D12
    P23 -.->|Read| D3
    P24 -.->|Update| D3
    P24 -.->|Write| D13
    P25 -.->|Update| D10
    P26 -.->|Update| D12
    P27 -.->|Read| D7
    P27 -.->|Update| D12
    P28 -.->|Write| D11
```

---

## ⏱️ DFD Level 2 - Chi tiết Process 3.0 (Overtime Management)

```mermaid
graph TB
    subgraph "External Entities"
        E[👨‍💻 Employee]
        S[👨‍💼 Supervisor]
        M[👨‍💼 Manager]
        P[💰 Payroll]
    end
    
    subgraph "Overtime Management Detailed"
        P31[3.1<br/>📝 Request<br/>Overtime]
        P32[3.2<br/>🔍 Validate<br/>Business Need]
        P33[3.3<br/>👀 Supervisor<br/>Review]
        P34[3.4<br/>✅ Approve<br/>Overtime]
        P35[3.5<br/>⏰ Track<br/>OT Hours]
        P36[3.6<br/>💰 Calculate<br/>OT Pay]
        P37[3.7<br/>📊 Generate<br/>OT Reports]
        P38[3.8<br/>⚖️ Compliance<br/>Check]
    end
    
    subgraph "Data Stores"
        D1[(D1: Employees)]
        D2[(D2: Attendance)]
        D4[(D4: Overtime)]
        D7[(D7: Policies)]
        D5[(D5: Payroll)]
        D14[(D14: OT Approvals)]
        D15[(D15: Labor Compliance)]
    end
    
    %% Input flows
    E -->|OT request| P31
    E -->|Actual OT hours| P35
    S -->|Review request| P33
    S -->|Approve OT| P34
    M -->|Policy review| P38
    
    %% Process flows
    P31 -->|Request data| P32
    P32 -->|Validated| P33
    P33 -->|Reviewed| P34
    P34 -->|Approved| P35
    P35 -->|Hours tracked| P36
    P36 -->|Pay calculated| P37
    P37 -->|Reports generated| P38
    
    %% Output flows
    P31 -->|Request submitted| E
    P32 -->|Validation result| E
    P33 -->|Review feedback| S
    P34 -->|Approval status| E
    P35 -->|OT confirmation| E
    P36 -->|OT payment| E
    P37 -->|OT reports| M
    P38 -->|Compliance status| M
    
    %% External integrations
    P36 -->|OT pay data| P
    
    %% Data store interactions
    P31 -.->|Read| D1
    P31 -.->|Write| D4
    P32 -.->|Read| D7
    P33 -.->|Read| D4
    P34 -.->|Update| D4
    P34 -.->|Write| D14
    P35 -.->|Read| D2
    P35 -.->|Update| D4
    P36 -.->|Read| D4
    P36 -.->|Read| D7
    P36 -.->|Write| D5
    P37 -.->|Read| D4
    P38 -.->|Read| D4
    P38 -.->|Write| D15
```

---

## 📱 DFD Level 2 - Chi tiết Process 8.0 (Employee Portal)

```mermaid
graph TB
    subgraph "External Entities"
        E[👨‍💻 Employee]
        M[📱 Mobile App]
        W[🌐 Web Portal]
    end
    
    subgraph "Employee Portal Detailed"
        P81[8.1<br/>🔐 User<br/>Authentication]
        P82[8.2<br/>📊 Dashboard<br/>Display]
        P83[8.3<br/>👤 Profile<br/>Management]
        P84[8.4<br/>📅 Schedule<br/>View]
        P85[8.5<br/>💰 Payroll<br/>Information]
        P86[8.6<br/>📋 Request<br/>Management]
        P87[8.7<br/>📧 Notifications<br/>Center]
        P88[8.8<br/>📱 Mobile<br/>Sync]
    end
    
    subgraph "Data Stores"
        D1[(D1: Employees)]
        D2[(D2: Attendance)]
        D3[(D3: Leave Records)]
        D4[(D4: Overtime)]
        D5[(D5: Payroll)]
        D10[(D10: Work Schedules)]
        D11[(D11: Notifications)]
        D16[(D16: User Sessions)]
    end
    
    %% Input flows
    E -->|Login credentials| P81
    E -->|Profile updates| P83
    E -->|Request submission| P86
    M -->|Mobile access| P88
    W -->|Web access| P81
    
    %% Process flows
    P81 -->|Authenticated| P82
    P82 -->|Dashboard loaded| P83
    P83 -->|Profile data| P84
    P84 -->|Schedule data| P85
    P85 -->|Payroll data| P86
    P86 -->|Requests data| P87
    P87 -->|Notifications| P88
    
    %% Output flows
    P81 -->|Login status| E
    P82 -->|Dashboard| E
    P83 -->|Profile info| E
    P84 -->|Work schedule| E
    P85 -->|Pay information| E
    P86 -->|Request status| E
    P87 -->|Notifications| E
    P88 -->|Mobile dashboard| M
    P88 -->|Sync status| E
    
    %% Data store interactions
    P81 -.->|Read| D1
    P81 -.->|Write| D16
    P82 -.->|Read| D2
    P82 -.->|Read| D3
    P82 -.->|Read| D11
    P83 -.->|Read/Write| D1
    P84 -.->|Read| D10
    P84 -.->|Read| D2
    P85 -.->|Read| D5
    P86 -.->|Read| D3
    P86 -.->|Read| D4
    P87 -.->|Read| D11
    P88 -.->|Read| D16
```

---

## 📊 Data Dictionary (Từ điển Dữ liệu)

### **Data Flows**

| Tên Data Flow | Mô tả | Thành phần dữ liệu |
|---------------|-------|-------------------|
| **Chấm công GPS** | Check-in/out với GPS | employee_id + timestamp + location + device_id + photo |
| **Đăng ký nghỉ phép** | Yêu cầu nghỉ phép | employee_id + leave_type + start_date + end_date + reason |
| **Đăng ký tăng ca** | Yêu cầu làm thêm giờ | employee_id + date + hours + reason + supervisor_id |
| **Phê duyệt nghỉ phép** | Duyệt/từ chối nghỉ phép | request_id + decision + comments + approver_id |
| **Bảng chấm công** | Báo cáo chấm công | employee_id + period + total_hours + overtime + absences |

### **Data Stores**

| Data Store | Mô tả | Cấu trúc chính |
|------------|-------|----------------|
| **D1: Employees** | Thông tin nhân viên | employee_id + name + position + department + hire_date + salary |
| **D2: Attendance** | Dữ liệu chấm công | attendance_id + employee_id + date + check_in + check_out + location |
| **D3: Leave Records** | Hồ sơ nghỉ phép | leave_id + employee_id + type + start_date + end_date + status |
| **D4: Overtime** | Tăng ca | overtime_id + employee_id + date + hours + rate + approved_by |
| **D5: Payroll** | Bảng lương | payroll_id + employee_id + period + basic_salary + overtime_pay + deductions |
| **D6: Performance** | Đánh giá hiệu suất | performance_id + employee_id + period + score + goals + feedback |

### **Processes**

| Process | Mô tả | Input | Output |
|---------|-------|-------|--------|
| **1.0 Attendance** | Quản lý chấm công | GPS check-ins, time records | Attendance reports, alerts |
| **2.0 Leave** | Quản lý nghỉ phép | Leave requests, approvals | Leave schedules, balances |
| **3.0 Overtime** | Quản lý tăng ca | OT requests, approvals | OT schedules, payments |
| **4.0 Employee** | Quản lý nhân viên | Employee data, updates | Employee records, reports |
| **5.0 Payroll** | Xử lý lương | Attendance, leave, OT data | Payslips, salary reports |
| **6.0 Performance** | Đánh giá hiệu suất | Goals, feedback, metrics | Performance reports, ratings |

---

## 🔄 Business Rules & Constraints

### **Quy tắc Kinh doanh**

1. **Attendance Management**
   - Chấm công phải trong bán kính 100m từ cửa hàng
   - Late check-in >15 phút = cảnh báo
   - Quên check-out = auto check-out 8 giờ sau check-in

2. **Leave Management**
   - Annual leave: 12 ngày/năm, tích lũy tối đa 24 ngày
   - Sick leave: Cần đăng ký trước >2 ngày (trừ cấp cứu)
   - Maternity leave: 6 tháng theo luật lao động

3. **Overtime Management**
   - Tối đa 40 giờ OT/tháng theo luật
   - OT rate: 150% lương cơ bản (ngày thường), 200% (cuối tuần)
   - Phải được approve trước khi làm

4. **Performance Management**
   - Đánh giá 2 lần/năm (giữa năm + cuối năm)
   - KPIs theo position và department
   - 360-degree feedback cho management level

### **Ràng buộc Kỹ thuật**

1. **GPS & Location**
   - GPS accuracy ±10 meters
   - Offline mode: 24 hours storage
   - Location verification mỗi 30 phút

2. **Security & Privacy**
   - Biometric authentication cho sensitive data
   - Location data encrypted
   - GDPR compliance cho EU employees

3. **Integration & Sync**
   - Real-time sync giữa mobile và web
   - API integration với payroll system
   - Backup data mỗi 6 giờ

---

## 📈 Flow Scenarios

### **Scenario 1: Chấm công GPS thành công**

```
1. Employee → Open Mobile App → Authenticate
2. App → Get GPS Location → Verify with Office Location
3. Employee → Take Selfie → Submit Check-in
4. System → Validate Location → Within Radius OK
5. System → Record Attendance → Update Database
6. System → Send Confirmation → To Employee & Manager
7. System → Update Dashboard → Real-time Status
```

### **Scenario 2: Đăng ký và phê duyệt nghỉ phép**

```
1. Employee → Submit Leave Request → Through Portal
2. System → Validate Leave Balance → Check Availability
3. System → Send to Supervisor → For Review
4. Supervisor → Review Request → Approve/Reject
5. System → Update Leave Calendar → Block Dates
6. System → Calculate New Balance → Update Records
7. System → Notify Employee → Email/Push Notification
8. System → Update Payroll → Deduct Leave Days
```

### **Scenario 3: Tính lương tự động hàng tháng**

```
1. System → Collect Attendance Data → Full Month
2. System → Calculate Working Hours → Regular + OT
3. System → Apply Leave Deductions → Unpaid Leave
4. System → Calculate Gross Salary → Base + OT + Allowances
5. System → Apply Deductions → Tax + Insurance + Other
6. System → Generate Payslip → PDF Format
7. System → Send to Employee → Email + Portal
8. System → Export to Payroll → Bank Transfer File
```

---

*Sơ đồ DFD này mô tả luồng dữ liệu hoàn chỉnh cho hệ thống quản lý nhân sự, từ chấm công GPS đến xử lý lương và đánh giá hiệu suất.*
