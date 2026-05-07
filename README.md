# Quizo - Online Quiz Platform

منصة اختبارات إلكترونية متكاملة مبنية باستخدام إطار العمل **Laravel** وتقنية **Inertia.js** مع **React**.

---

## 🌍 أولاً: تجربة المشروع المباشر (أونلاين)
يمكنكم معاينة المنصة مباشرة دون الحاجة لأي إعدادات عبر الرابط التالي:
[https://quiz-platform-66kx.onrender.com/](https://quiz-platform-66kx.onrender.com/)

### بيانات دخول المسؤول (Admin Panel):
- **البريد الإلكتروني**: `admin@admin.com`
- **كلمة المرور**: `password`

---

## 💻 ثانياً: كيفية التشغيل محلياً (Local Setup)
لتشغيل المشروع على جهازكم الشخصي باستخدام **XAMPP**، يرجى اتباع الخطوات التالية:

### 1. إعدادات XAMPP الضرورية:
قبل البدء، يجب التأكد من تفعيل ملحقات PHP اللازمة في ملف `php.ini`:
- افتح **XAMPP Control Panel**.
- اضغط على **Config** بجانب Apache ثم اختر **PHP (php.ini)**.
- ابحث عن الأسطر التالية وقم بإزالة الفاصلة المنقوطة ( `;` ) من بدايتها:
  ```ini
  extension=pdo_mysql
  extension=mysql
  ```
- (اختياري) إذا كنت ستستخدم PostgreSQL:
  ```ini
  extension=pdo_pgsql
  extension=pgsql
  ```
- قم بحفظ الملف وإعادة تشغيل Apache و MySQL.

### 2. إعداد قاعدة البيانات:
- اذهب إلى [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/).
- أنشئ قاعدة بيانات جديدة باسم `quiz_platform`.

### 3. تحميل وتشغيل المشروع:
1. قم بتحميل المشروع (Clone):
   ```bash
   git clone https://github.com/zakariasersoub/quiz-platform.git
   ```
2. ادخل إلى مجلد المشروع:
   ```bash
   cd quiz-platform
   ```
3. تثبيت الملحقات:
   ```bash
   composer install
   npm install
   ```
4. إعداد ملف البيئة:
   - قم بنسخ ملف `.env.example` إلى `.env`.
   - تأكد من أن `DB_DATABASE=quiz_platform`.
5. تهيئة قاعدة البيانات والبيانات الأولية:
   ```bash
   php artisan migrate:fresh --seed
   ```
6. تشغيل الخادم المحلي:
   ```bash
   # في نافذة أولى
   php artisan serve
   # في نافذة ثانية
   npm run dev
   ```

---

## التقنيات المستخدمة
- **Backend**: Laravel 12
- **Frontend**: React 18 & Tailwind CSS
- **Bridge**: Inertia.js
- **Database**: PostgreSQL (Production) / MySQL (Local)
- **Environment**: Docker & Render
