# Quizo Cheat Sheet 📝

| التقنية | الوظيفة الأساسية | أهم ملفاتها في المشروع |
| :--- | :--- | :--- |
| **Laravel** | العمود الفقري (Logic) | `routes/web.php`, `app/Http/Controllers/` |
| **React** | الوجه الجميل (UI) | `resources/js/Pages/` |
| **Inertia.js** | الجسر (Bridge) | `app/Http/Middleware/HandleInertiaRequests.php` |
| **Tailwind CSS** | التزيين (Styling) | `tailwind.config.js`, `resources/css/app.css` |
| **Eloquent** | قاعدة البيانات | `app/Models/` |
| **Vite** | البنّاء (Bundler) | `vite.config.js` |
| **Docker** | الحاوية (Shipping) | `Dockerfile`, `render.yaml` |

## أهم الأوامر التي تحتاجها دائماً:
- `php artisan serve`: تشغيل السيرفر.
- `npm run dev`: تشغيل الواجهة (للتطوير).
- `php artisan migrate`: إنشاء الجداول.
- `php artisan db:seed`: حقن البيانات.
- `php artisan tinker`: تجربة الكود البرمجي مباشرة.
