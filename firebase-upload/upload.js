const admin = require('firebase-admin');
const fs = require('fs');

// Khởi tạo Firebase Admin SDK
const serviceAccount = require('./coffee-and-cake-e2f5d-firebase-adminsdk-abc123.json'); // Thay bằng tên file Service Account Key thực tế của bạn

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://coffee-and-cake-e2f5d-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

const db = admin.database();

// Đọc dữ liệu từ checkout.json
const transactions = JSON.parse(fs.readFileSync('checkout.json', 'utf8'));

// Hàm đẩy dữ liệu lên Firebase
async function uploadTransactions() {
  try {
    const transactionsRef = db.ref('transactions');
    
    for (const transaction of transactions) {
      const newTransactionRef = transactionsRef.push();
      await newTransactionRef.set(transaction);
      console.log(`Đã tải giao dịch của ${transaction.customerName} lên Firebase.`);
    }
    
    console.log('Tất cả giao dịch đã được tải lên Firebase thành công!');
    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu lên Firebase:', error);
    process.exit(1);
  }
}

// Gọi hàm để thực hiện
uploadTransactions();