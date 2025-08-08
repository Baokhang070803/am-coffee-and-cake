# 💳 Data Flow Diagram (DFD) - Payment Integration System
## Hệ thống Tích hợp Thanh toán - Ấm Coffee & Cake

---

## 🎯 Overview

Sơ đồ luồng dữ liệu mô tả hệ thống tích hợp thanh toán đa dạng, bao gồm VNPAY gateway, COD, ví điện tử, và xử lý refund/chargeback.

---

## 📋 DFD Level 0 (Context Diagram)

```mermaid
graph TB
    subgraph "External Entities"
        C[👤 Customer]
        M[🏪 Merchant]
        V[💳 VNPAY Gateway]
        B[🏦 Bank]
        W[📱 E-Wallets]
        A[👨‍💼 Admin]
        T[🧾 Tax Authority]
        F[🔍 Fraud Detection]
    end
    
    subgraph "Payment Integration System"
        PIS[💳 Payment Integration System]
    end
    
    C -->|Thanh toán đơn hàng| PIS
    C -->|Chọn phương thức| PIS
    C -->|Xác nhận thanh toán| PIS
    
    PIS -->|Payment form| C
    PIS -->|Transaction status| C
    PIS -->|Receipt/Invoice| C
    
    M -->|Merchant config| PIS
    M -->|Refund request| PIS
    PIS -->|Payment notification| M
    PIS -->|Settlement report| M
    
    PIS -->|Payment request| V
    V -->|Payment result| PIS
    
    PIS -->|Bank transfer| B
    B -->|Transaction confirmation| PIS
    
    PIS -->|E-wallet payment| W
    W -->|Wallet confirmation| PIS
    
    A -->|System monitoring| PIS
    PIS -->|Payment analytics| A
    
    PIS -->|Tax calculation| T
    T -->|Tax rates| PIS
    
    PIS -->|Fraud check| F
    F -->|Risk assessment| PIS
```

---

## 📊 DFD Level 1 (System Overview)

```mermaid
graph TB
    subgraph "External Entities"
        C[👤 Customer]
        M[🏪 Merchant]
        V[💳 VNPAY]
        B[🏦 Bank]
        W[📱 E-Wallets]
        F[🔍 Fraud System]
    end
    
    subgraph "Payment Integration Processes"
        P1[1.0<br/>💳 Payment<br/>Gateway]
        P2[2.0<br/>🔍 Fraud<br/>Detection]
        P3[3.0<br/>💰 Transaction<br/>Processing]
        P4[4.0<br/>🧾 Invoice &<br/>Receipt]
        P5[5.0<br/>↩️ Refund &<br/>Chargeback]
        P6[6.0<br/>📊 Payment<br/>Analytics]
        P7[7.0<br/>🔄 Settlement<br/>& Reconciliation]
        P8[8.0<br/>🛡️ Security &<br/>Compliance]
    end
    
    subgraph "Data Stores"
        D1[(D1: Transactions<br/>💳 Giao dịch)]
        D2[(D2: Payment Methods<br/>💰 Phương thức)]
        D3[(D3: Customer Cards<br/>💳 Thẻ KH)]
        D4[(D4: Merchant Config<br/>🏪 Cấu hình)]
        D5[(D5: Fraud Rules<br/>🔍 Quy tắc)]
        D6[(D6: Invoices<br/>🧾 Hóa đơn)]
        D7[(D7: Refunds<br/>↩️ Hoàn tiền)]
        D8[(D8: Analytics<br/>📊 Phân tích)]
    end
    
    %% Customer flows
    C -->|Payment request| P1
    C -->|Card details| P1
    C -->|Confirm payment| P3
    
    P1 -->|Payment form| C
    P3 -->|Payment status| C
    P4 -->|Receipt/Invoice| C
    
    %% Merchant flows
    M -->|Merchant setup| P1
    M -->|Refund request| P5
    
    P1 -->|Payment notification| M
    P4 -->|Invoice copy| M
    P6 -->|Analytics dashboard| M
    P7 -->|Settlement report| M
    
    %% External gateway flows
    P1 -->|Payment processing| V
    P1 -->|Bank transfer| B
    P1 -->|E-wallet payment| W
    
    V -->|Payment result| P3
    B -->|Transfer confirmation| P3
    W -->|Wallet confirmation| P3
    
    %% Fraud detection flows
    P1 -->|Transaction data| P2
    P2 -->|Risk assessment| P3
    P2 -->|Fraud alert| F
    
    %% Data store connections
    P1 -.->|Read| D2
    P1 -.->|Read| D4
    P2 -.->|Read| D5
    P2 -.->|Write| D8
    P3 -.->|Write| D1
    P3 -.->|Read| D3
    P4 -.->|Write| D6
    P4 -.->|Read| D1
    P5 -.->|Write| D7
    P5 -.->|Read| D1
    P6 -.->|Read| D1
    P6 -.->|Read| D7
    P6 -.->|Write| D8
    P7 -.->|Read| D1
    P7 -.->|Read| D6
    P8 -.->|Read| D1
    P8 -.->|Read| D5
```

---

## 🔍 DFD Level 2 - Chi tiết Process 1.0 (Payment Gateway)

```mermaid
graph TB
    subgraph "External Entities"
        C[👤 Customer]
        V[💳 VNPAY]
        W[📱 E-Wallets]
        B[🏦 Bank]
    end
    
    subgraph "Payment Gateway Detailed"
        P11[1.1<br/>🛒 Initialize<br/>Payment]
        P12[1.2<br/>🔍 Validate<br/>Payment Data]
        P13[1.3<br/>💳 Route to<br/>Payment Method]
        P14[1.4<br/>🔐 Encrypt<br/>Sensitive Data]
        P15[1.5<br/>🌐 Redirect to<br/>Gateway]
        P16[1.6<br/>⏳ Handle<br/>Callbacks]
        P17[1.7<br/>✅ Verify<br/>Response]
        P18[1.8<br/>📝 Log<br/>Transaction]
    end
    
    subgraph "Data Stores"
        D1[(D1: Transactions)]
        D2[(D2: Payment Methods)]
        D4[(D4: Merchant Config)]
        D9[(D9: Payment Logs)]
        D10[(D10: Encryption Keys)]
        D11[(D11: Gateway URLs)]
    end
    
    %% Input flows
    C -->|Order total + method| P11
    C -->|Card/wallet info| P12
    V -->|Payment callback| P16
    W -->|Wallet callback| P16
    B -->|Bank response| P16
    
    %% Process flows
    P11 -->|Payment initialized| P12
    P12 -->|Data validated| P13
    P13 -->|Method selected| P14
    P14 -->|Data encrypted| P15
    P15 -->|Redirected| P16
    P16 -->|Callback received| P17
    P17 -->|Response verified| P18
    
    %% Output flows
    P11 -->|Payment form| C
    P12 -->|Validation errors| C
    P13 -->|Method confirmation| C
    P15 -->|Gateway redirect| C
    P16 -->|Processing status| C
    P17 -->|Payment result| C
    P18 -->|Transaction logged| C
    
    %% External communications
    P15 -->|Payment request| V
    P15 -->|Wallet request| W
    P15 -->|Bank transfer| B
    
    %% Data store interactions
    P11 -.->|Read| D4
    P12 -.->|Read| D2
    P13 -.->|Read| D11
    P14 -.->|Read| D10
    P16 -.->|Write| D1
    P17 -.->|Update| D1
    P18 -.->|Write| D9
```

---

## 💰 DFD Level 2 - Chi tiết Process 3.0 (Transaction Processing)

```mermaid
graph TB
    subgraph "External Entities"
        C[👤 Customer]
        M[🏪 Merchant]
        N[📧 Notification]
        A[📊 Analytics]
    end
    
    subgraph "Transaction Processing Detailed"
        P31[3.1<br/>⚡ Process<br/>Payment]
        P32[3.2<br/>💰 Calculate<br/>Amounts]
        P33[3.3<br/>🏦 Update<br/>Merchant Balance]
        P34[3.4<br/>📧 Send<br/>Notifications]
        P35[3.5<br/>🧾 Generate<br/>Receipt]
        P36[3.6<br/>📊 Update<br/>Statistics]
        P37[3.7<br/>⏰ Handle<br/>Timeouts]
        P38[3.8<br/>🔄 Retry<br/>Failed Payments]
    end
    
    subgraph "Data Stores"
        D1[(D1: Transactions)]
        D4[(D4: Merchant Config)]
        D6[(D6: Invoices)]
        D8[(D8: Analytics)]
        D12[(D12: Merchant Balance)]
        D13[(D13: Failed Transactions)]
        D14[(D14: Notification Queue)]
    end
    
    %% Input flows
    C -->|Payment confirmation| P31
    M -->|Merchant fees config| P32
    
    %% Process flows
    P31 -->|Payment data| P32
    P32 -->|Amounts calculated| P33
    P33 -->|Balance updated| P34
    P34 -->|Notifications sent| P35
    P35 -->|Receipt generated| P36
    P36 -->|Stats updated| P37
    P37 -->|Timeout handled| P38
    P38 -->|Retry attempted| P31
    
    %% Output flows
    P31 -->|Processing status| C
    P32 -->|Fee breakdown| M
    P33 -->|Balance update| M
    P34 -->|Notifications| C
    P34 -->|Merchant alerts| M
    P35 -->|Receipt| C
    P36 -->|Transaction stats| A
    P37 -->|Timeout alert| M
    P38 -->|Retry result| C
    
    %% External notifications
    P34 -->|Email/SMS| N
    
    %% Data store interactions
    P31 -.->|Update| D1
    P32 -.->|Read| D4
    P33 -.->|Update| D12
    P34 -.->|Write| D14
    P35 -.->|Write| D6
    P36 -.->|Write| D8
    P37 -.->|Read| D1
    P38 -.->|Write| D13
```

---

## 🔍 DFD Level 2 - Chi tiết Process 2.0 (Fraud Detection)

```mermaid
graph TB
    subgraph "External Entities"
        F[🔍 External Fraud API]
        A[👨‍💼 Admin]
        L[⚖️ Legal Authority]
    end
    
    subgraph "Fraud Detection Detailed"
        P21[2.1<br/>📊 Risk<br/>Scoring]
        P22[2.2<br/>🔍 Pattern<br/>Analysis]
        P23[2.3<br/>🚨 Real-time<br/>Monitoring]
        P24[2.4<br/>🛡️ Rule Engine<br/>Processing]
        P25[2.5<br/>⚠️ Flag<br/>Suspicious]
        P26[2.6<br/>📧 Alert<br/>Generation]
        P27[2.7<br/>🔒 Block<br/>Transaction]
        P28[2.8<br/>📝 Fraud<br/>Reporting]
    end
    
    subgraph "Data Stores"
        D1[(D1: Transactions)]
        D5[(D5: Fraud Rules)]
        D8[(D8: Analytics)]
        D15[(D15: Risk Scores)]
        D16[(D16: Blocked Transactions)]
        D17[(D17: Fraud Reports)]
        D18[(D18: Suspicious Patterns)]
    end
    
    %% Input flows
    F -->|External risk data| P21
    A -->|Fraud rules update| P24
    L -->|Investigation request| P28
    
    %% Process flows
    P21 -->|Risk calculated| P22
    P22 -->|Patterns identified| P23
    P23 -->|Monitoring active| P24
    P24 -->|Rules applied| P25
    P25 -->|Flagged transactions| P26
    P26 -->|Alerts generated| P27
    P27 -->|Transactions blocked| P28
    
    %% Output flows
    P21 -->|Risk score| P22
    P22 -->|Pattern alerts| A
    P23 -->|Monitoring dashboard| A
    P24 -->|Rule results| A
    P25 -->|Suspicious activity| A
    P26 -->|Fraud alerts| A
    P27 -->|Block notification| A
    P28 -->|Fraud reports| L
    
    %% External APIs
    P21 -->|Risk assessment| F
    
    %% Data store interactions
    P21 -.->|Read| D1
    P21 -.->|Write| D15
    P22 -.->|Read| D1
    P22 -.->|Write| D18
    P23 -.->|Read| D1
    P24 -.->|Read| D5
    P25 -.->|Update| D1
    P26 -.->|Write| D8
    P27 -.->|Write| D16
    P28 -.->|Write| D17
```

---

## ↩️ DFD Level 2 - Chi tiết Process 5.0 (Refund & Chargeback)

```mermaid
graph TB
    subgraph "External Entities"
        C[👤 Customer]
        M[🏪 Merchant]
        V[💳 VNPAY]
        B[🏦 Bank]
        A[👨‍💼 Admin]
    end
    
    subgraph "Refund & Chargeback Detailed"
        P51[5.1<br/>📝 Refund<br/>Request]
        P52[5.2<br/>🔍 Validate<br/>Refund]
        P53[5.3<br/>💰 Calculate<br/>Refund Amount]
        P54[5.4<br/>⚡ Process<br/>Refund]
        P55[5.5<br/>🔄 Handle<br/>Chargeback]
        P56[5.6<br/>📧 Notify<br/>Parties]
        P57[5.7<br/>📊 Update<br/>Records]
        P58[5.8<br/>🛡️ Dispute<br/>Management]
    end
    
    subgraph "Data Stores"
        D1[(D1: Transactions)]
        D4[(D4: Merchant Config)]
        D7[(D7: Refunds)]
        D12[(D12: Merchant Balance)]
        D19[(D19: Chargeback Cases)]
        D20[(D20: Dispute Evidence)]
        D21[(D21: Refund Policies)]
    end
    
    %% Input flows
    C -->|Refund request| P51
    M -->|Approve refund| P52
    V -->|Chargeback notification| P55
    B -->|Dispute notice| P55
    A -->|Dispute resolution| P58
    
    %% Process flows
    P51 -->|Request received| P52
    P52 -->|Validation passed| P53
    P53 -->|Amount calculated| P54
    P54 -->|Refund processed| P56
    P55 -->|Chargeback received| P56
    P56 -->|Notifications sent| P57
    P57 -->|Records updated| P58
    P58 -->|Dispute handled| P51
    
    %% Output flows
    P51 -->|Request confirmation| C
    P52 -->|Validation result| M
    P53 -->|Refund breakdown| C
    P54 -->|Refund confirmation| C
    P55 -->|Chargeback notice| M
    P56 -->|Status notifications| C
    P56 -->|Merchant alerts| M
    P57 -->|Updated records| A
    P58 -->|Dispute outcome| M
    
    %% External processing
    P54 -->|Refund to gateway| V
    P54 -->|Bank reversal| B
    P58 -->|Evidence submission| V
    
    %% Data store interactions
    P51 -.->|Read| D1
    P52 -.->|Read| D21
    P53 -.->|Read| D4
    P54 -.->|Write| D7
    P54 -.->|Update| D12
    P55 -.->|Write| D19
    P56 -.->|Update| D1
    P57 -.->|Update| D7
    P58 -.->|Write| D20
```

---

## 📊 Data Dictionary (Từ điển Dữ liệu)

### **Data Flows**

| Tên Data Flow | Mô tả | Thành phần dữ liệu |
|---------------|-------|-------------------|
| **Thanh toán đơn hàng** | Yêu cầu thanh toán | order_id + amount + currency + customer_id + payment_method |
| **Payment result** | Kết quả thanh toán | transaction_id + status + amount + gateway_response + timestamp |
| **Refund request** | Yêu cầu hoàn tiền | transaction_id + refund_amount + reason + customer_id |
| **Fraud alert** | Cảnh báo gian lận | transaction_id + risk_score + fraud_type + blocked_reason |
| **Settlement report** | Báo cáo đối soát | period + total_amount + fees + net_settlement + transaction_count |

### **Data Stores**

| Data Store | Mô tả | Cấu trúc chính |
|------------|-------|----------------|
| **D1: Transactions** | Giao dịch thanh toán | transaction_id + order_id + amount + status + gateway + created_at |
| **D2: Payment Methods** | Phương thức thanh toán | method_id + name + type + gateway + fees + active_status |
| **D3: Customer Cards** | Thẻ khách hàng | card_id + customer_id + masked_number + expiry + brand + is_default |
| **D4: Merchant Config** | Cấu hình merchant | merchant_id + gateway_config + fees + settlement_account |
| **D5: Fraud Rules** | Quy tắc chống gian lận | rule_id + condition + action + priority + active |
| **D6: Invoices** | Hóa đơn | invoice_id + transaction_id + amount + tax + customer_info |

### **Processes**

| Process | Mô tả | Input | Output |
|---------|-------|-------|--------|
| **1.0 Payment Gateway** | Cổng thanh toán | Payment requests | Payment processing |
| **2.0 Fraud Detection** | Phát hiện gian lận | Transaction data | Risk assessment, alerts |
| **3.0 Transaction Processing** | Xử lý giao dịch | Payment confirmations | Transaction records |
| **4.0 Invoice & Receipt** | Hóa đơn & biên lai | Transaction data | Invoices, receipts |
| **5.0 Refund & Chargeback** | Hoàn tiền & tranh chấp | Refund requests | Refund processing |
| **6.0 Analytics** | Phân tích thanh toán | Transaction data | Reports, insights |

---

## 🔄 Business Rules & Constraints

### **Quy tắc Kinh doanh**

1. **Payment Processing**
   - Minimum transaction: 1,000 VND
   - Maximum daily limit: 50,000,000 VND/customer
   - Session timeout: 15 minutes for payment form

2. **Fraud Detection**
   - Auto-block transactions >5,000,000 VND from new cards
   - Velocity check: Max 5 transactions/hour/card
   - Geographic check: Warn if payment location differs >100km

3. **Refund Policy**
   - Full refund: Within 24 hours of purchase
   - Partial refund: 70% after 24-72 hours
   - No refund: After 7 days (except special cases)

4. **Settlement**
   - Daily settlement for transactions >100
   - Weekly settlement for smaller volumes
   - Hold period: 2 days for new merchants

### **Ràng buộc Kỹ thuật**

1. **Performance**
   - Payment processing: <5 seconds
   - Fraud check: <2 seconds
   - Gateway response: <10 seconds

2. **Security**
   - PCI DSS Level 1 compliance
   - End-to-end encryption for card data
   - Token-based card storage (no raw PAN)

3. **Availability**
   - 99.9% uptime guarantee
   - Failover to backup gateway <30 seconds
   - Real-time monitoring and alerts

---

## 📈 Flow Scenarios

### **Scenario 1: Thanh toán VNPAY thành công**

```
1. Customer → Select VNPAY → Enter Amount
2. System → Generate Payment URL → Redirect to VNPAY
3. Customer → Enter Bank Info → Confirm Payment
4. VNPAY → Process Payment → Send Callback
5. System → Verify Signature → Update Transaction
6. System → Send Confirmation → To Customer & Merchant
7. System → Generate Receipt → Email/SMS
8. System → Update Analytics → Dashboard Metrics
```

### **Scenario 2: Phát hiện và chặn giao dịch gian lận**

```
1. Customer → Submit Payment → High Amount
2. System → Run Fraud Check → Multiple Risk Factors
3. System → Calculate Risk Score → >80 (High Risk)
4. System → Block Transaction → Automatic
5. System → Alert Admin → Real-time Notification
6. System → Notify Customer → Explain Block Reason
7. Admin → Review Case → Manual Investigation
8. Admin → Whitelist/Maintain Block → Decision
```

### **Scenario 3: Xử lý refund tự động**

```
1. Customer → Request Refund → Through Portal
2. System → Validate Request → Check Policy
3. System → Calculate Amount → Include Fees
4. System → Process Refund → Through Original Gateway
5. Gateway → Return Funds → To Customer Account
6. System → Update Records → Transaction Status
7. System → Notify Parties → Customer & Merchant
8. System → Generate Report → Refund Analytics
```

---

*Sơ đồ DFD này mô tả luồng dữ liệu hoàn chỉnh cho hệ thống tích hợp thanh toán, từ xử lý giao dịch cơ bản đến chống gian lận và quản lý tranh chấp.*
