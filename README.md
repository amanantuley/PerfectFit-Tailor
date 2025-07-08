
# 👗 PerfectFit-Tailor - AI-Powered Online Tailoring Service

PerfectFit-Tailor is an AI-driven online tailoring platform that helps customers get perfectly fitted clothes from the comfort of their homes. By leveraging computer vision and machine learning, this system captures body measurements through real-time camera input or uploaded images, and provides precise data to tailors for custom clothing.

---

## 📌 Project Highlights

- 🔍 **AI-Powered Body Measurement Detection**
- 📸 **Real-Time Camera Input or Image Upload**
- ✅ **Measurement Validation & Human Verification**
- 💾 **Secure Data Storage (Firebase/SQLite)**
- 👤 **User-Friendly Interface for Customers & Tailors**
- 🔐 **High Accuracy Model (95–100%) for Measurement Prediction**

---

## 🛠️ Tech Stack

- **Frontend**: Flutter (for mobile app)
- **Backend**: Flask (Python)
- **AI/ML**: OpenCV, TensorFlow/Keras
- **Database**: Firebase or SQLite
- **Deployment**: Firebase Hosting / GitHub Pages (Frontend), Heroku / Render / Railway (Backend)

---

## 🚀 Features

- 👤 Customer registration & profile setup
- 📷 AI model detects body measurements via:
  - Live camera feed
  - Uploaded photos
- 🧠 Human validation layer before submission
- 📊 Real-time size estimation and visualization
- 📬 Data securely sent to tailor’s dashboard
- 📁 Order and measurement history tracking

---

## 📸 Sample Use Case Flow

1. **User Registration/Login**
2. **Capture or Upload Body Image**
3. **AI Detects Key Body Points and Dimensions**
4. **Measurements Displayed Live (with Validation)**
5. **Tailor Receives Accurate Measurements & Order Details**
6. **Tailor Prepares Custom Fit Garments**

---

## 📂 Folder Structure

```

PerfectFit-Tailor/
├── mobile-app/        # Flutter app
├── backend/           # Flask API & AI model integration
├── model/             # Trained ML models
├── database/          # Firebase config / SQLite DB
└── README.md

````

---

## 🧪 Accuracy & Testing

- Model trained using diverse datasets to ensure inclusive sizing
- Achieved **>95% accuracy** on test sets
- Real-time validation layer ensures trust before confirming measurements

---

## 🔧 Setup Instructions

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/PerfectFit-Tailor.git
cd PerfectFit-Tailor
````

2. **Install Python Dependencies**

```bash
cd backend
pip install -r requirements.txt
```

3. **Run Flask Backend**

```bash
python app.py
```

4. **Run Flutter Mobile App**

```bash
cd mobile-app
flutter pub get
flutter run
```

---

## 📈 Future Plans

* Integration with payment gateway
* Admin panel for tailors
* Feedback & rating system
* Dataset expansion for more accurate size prediction

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🧑‍💻 Developed By

**Aman Antuley**

* 💼 Web Developer | Python & AI Enthusiast
* 📧 [amanantuley@gmail.com](mailto:amanantuley@gmail.com)
* 🔗 [LinkedIn](https://linkedin.com/in/amanantuley)
* 🐦 [Twitter](https://twitter.com/amanantuley)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


