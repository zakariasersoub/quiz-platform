<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create/Update Admin User (Safe: Won't delete others)
        User::updateOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Only add CS Questions if the database is empty
        if (Question::count() === 0) {
            $csQuestions = [
                ['q' => 'ما هي لغة البرمجة الأساسية المستخدمة في تطوير تطبيقات الأندرويد؟', 'a' => ['Java', 'Swift', 'C#', 'PHP'], 'c' => 0],
                ['q' => 'ما هو اختصار SQL؟', 'a' => ['Simple Query Language', 'Structured Query Language', 'Sequential Query Language', 'System Query Language'], 'c' => 1],
                ['q' => 'أي مما يلي يعتبر وحدة إخراج في الكمبيوتر؟', 'a' => ['لوحة المفاتيح', 'الفأرة', 'الشاشة', 'الميكروفون'], 'c' => 2],
                ['q' => 'ما هي الذاكرة التي تفقد محتوياتها عند انقطاع التيار الكهربائي؟', 'a' => ['ROM', 'RAM', 'Hard Disk', 'Flash Memory'], 'c' => 1],
                ['q' => 'ما هي لغة تنسيق صفحات الويب؟', 'a' => ['HTML', 'Python', 'CSS', 'Java'], 'c' => 2],
                ['q' => 'من هو مؤسس شركة مايكروسوفت؟', 'a' => ['ستيف جوبز', 'بيل غيتس', 'مارك زوكربيرج', 'إيلون ماسك'], 'c' => 1],
                ['q' => 'ما هي وظيفة الـ Router في الشبكة؟', 'a' => ['تخزين البيانات', 'توجيه البيانات بين الشبكات', 'طباعة المستندات', 'عرض الصور'], 'c' => 1],
                ['q' => 'أي لغة برمجة تشتهر باستخدامها في مجال الذكاء الاصطناعي؟', 'a' => ['PHP', 'Python', 'C++', 'Swift'], 'c' => 1],
                ['q' => 'ما هو نظام التشغيل مفتوح المصدر؟', 'a' => ['Windows', 'iOS', 'Linux', 'macOS'], 'c' => 2],
                ['q' => 'ما هو اختصار HTTP؟', 'a' => ['HyperText Transfer Protocol', 'High Technical Transfer Process', 'Hyperlinks Text Tool Path', 'Header Transfer Text Protocol'], 'c' => 0],
                ['q' => 'أي من هذه البروتوكولات يستخدم لإرسال البريد الإلكتروني؟', 'a' => ['HTTP', 'FTP', 'SMTP', 'SSH'], 'c' => 2],
                ['q' => 'ما هي وحدة المعالجة المركزية في الكمبيوتر؟', 'a' => ['RAM', 'CPU', 'GPU', 'HDD'], 'c' => 1],
                ['q' => 'ما هو أصغر وحدة لتخزين البيانات في الكمبيوتر؟', 'a' => ['Byte', 'Bit', 'Kilobyte', 'Megabyte'], 'c' => 1],
                ['q' => 'ما هي لغة البرمجة التي تعمل في متصفح الويب؟', 'a' => ['Python', 'Java', 'JavaScript', 'C#'], 'c' => 2],
                ['q' => 'ماذا تعني الاختصار RAM؟', 'a' => ['Read Access Memory', 'Random Access Memory', 'Ready Active Memory', 'Real Audio Media'], 'c' => 1],
                ['q' => 'أي مما يلي ليس نظام تشغيل؟', 'a' => ['Ubuntu', 'Windows 11', 'Google Chrome', 'Android'], 'c' => 2],
                ['q' => 'ما هو اختصار URL؟', 'a' => ['Uniform Resource Locator', 'Universal Road Line', 'Unique Reading List', 'Unit Resource Link'], 'c' => 0],
                ['q' => 'من هو مخترع شبكة الويب العالمية (WWW)؟', 'a' => ['تيم بيرنرز لي', 'آلان تورينج', 'جون فون نيومان', 'ستيف وزنياك'], 'c' => 0],
                ['q' => 'ما هي وظيفة الـ Firewall؟', 'a' => ['تبريد الجهاز', 'حماية الشبكة من الاختراقات', 'تسريع الإنترنت', 'تنظيف الفيروسات'], 'c' => 1],
                ['q' => 'ما هو بروتوكول نقل الملفات؟', 'a' => ['HTTP', 'SMTP', 'FTP', 'UDP'], 'c' => 2],
                ['q' => 'أي لغة تستخدم لتطوير تطبيقات الـ iOS؟', 'a' => ['Kotlin', 'Swift', 'Java', 'Ruby'], 'c' => 1],
                ['q' => 'ما هو الـ IP Address؟', 'a' => ['اسم المستخدم', 'عنوان فريد للجهاز على الشبكة', 'سرعة المعالج', 'حجم الشاشة'], 'c' => 1],
                ['q' => 'ما هي الذاكرة الدائمة في الجهاز؟', 'a' => ['RAM', 'ROM', 'Cache', 'Virtual Memory'], 'c' => 1],
                ['q' => 'ما هو اختصار DNS؟', 'a' => ['Digital Network System', 'Domain Name System', 'Data Node Server', 'Direct Network Service'], 'c' => 1],
                ['q' => 'أي نوع من الكابلات يستخدم لنقل البيانات بسرعة الضوء؟', 'a' => ['Coaxial', 'Twisted Pair', 'Fiber Optic', 'USB'], 'c' => 2],
                ['q' => 'ما هو المحرك البرمجي لقواعد البيانات؟', 'a' => ['Excel', 'MySQL', 'Word', 'Photoshop'], 'c' => 1],
                ['q' => 'ما معنى الـ Cloud Computing؟', 'a' => ['أجهزة الكمبيوتر القديمة', 'تخزين ومعالجة البيانات عبر الإنترنت', 'برامج الرسم', 'صيانة الأجهزة'], 'c' => 1],
                ['q' => 'ما هو الـ Bug في البرمجة؟', 'a' => ['نوع من المعالجات', 'خطأ في الكود البرمجي', 'جهاز خارجي', 'اسم لغة برمجة'], 'c' => 1],
                ['q' => 'ما هي وظيفة الـ Compiler؟', 'a' => ['تنسيق النصوص', 'تحويل الكود المصدري إلى لغة الآلة', 'ضغط الملفات', 'تشغيل الفيديوهات'], 'c' => 1],
                ['q' => 'ما هو الـ GitHub؟', 'a' => ['محرك بحث', 'منصة لاستضافة وإدارة مستودعات الكود', 'برنامج للمونتاج', 'متصفح إنترنت'], 'c' => 1],
                ['q' => 'ما هي لغة الاستعلام عن البيانات؟', 'a' => ['HTML', 'SQL', 'XML', 'JSON'], 'c' => 1],
                ['q' => 'ما هو الـ API؟', 'a' => ['واجهة برمجة التطبيقات', 'نوع من الشاشات', 'بطارية المحمول', 'لوحة الأم'], 'c' => 0],
                ['q' => 'ما هي التقنية المستخدمة في العملات الرقمية؟', 'a' => ['Big Data', 'Blockchain', 'IoT', 'Cloud'], 'c' => 1],
                ['q' => 'ماذا يعني الاختصار CSS؟', 'a' => ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Colorful Style Sheets'], 'c' => 1],
                ['q' => 'ما هو الـ Kernel في نظام التشغيل؟', 'a' => ['واجهة المستخدم', 'قلب النظام والمسؤول عن إدارة الموارد', 'برنامج الحماية', 'سلة المحذوفات'], 'c' => 1],
                ['q' => 'ما هي وظيفة الـ GPU؟', 'a' => ['معالجة البيانات النصية', 'معالجة الرسوميات والفيديوهات', 'تخزين الملفات', 'تزويد الطاقة'], 'c' => 1],
                ['q' => 'ما هو اختصار SSD؟', 'a' => ['Solid State Drive', 'Super Speed Disk', 'Simple Storage Device', 'Static System Data'], 'c' => 0],
                ['q' => 'ما هي الـ Cookies في المتصفح؟', 'a' => ['فيروسات', 'ملفات صغيرة لتخزين بيانات الجلسة', 'خلفيات الشاشة', 'ألعاب'], 'c' => 1],
                ['q' => 'ما هو الـ Open Source؟', 'a' => ['برامج غالية الثمن', 'برامج متاح كودها المصدري للجميع', 'أجهزة كمبيوتر محمولة', 'شركة برمجيات'], 'c' => 1],
                ['q' => 'ما هي لغة البرمجة التي اخترعها غيدو فان روسوم؟', 'a' => ['Java', 'Python', 'PHP', 'C#'], 'c' => 1],
                ['q' => 'ماذا تعني الاختصار IoT؟', 'a' => ['Internet of Things', 'Input of Technology', 'Internal of Tools', 'International of Tasks'], 'c' => 0],
                ['q' => 'ما هو الـ Ransomware؟', 'a' => ['برنامج تعليمي', 'برمجية خبيثة تطلب فدية لتشفير الملفات', 'مسرع ألعاب', 'برنامج للرسم'], 'c' => 1],
                ['q' => 'ما هي وظيفة الـ BIOS؟', 'a' => ['تصميم المواقع', 'بدء تشغيل الجهاز وفحص المكونات', 'تعديل الصور', 'إرسال الإيميلات'], 'c' => 1],
                ['q' => 'ما هو الـ 404 Error؟', 'a' => ['تم العثور على الصفحة', 'الصفحة غير موجودة', 'خطأ في قاعدة البيانات', 'سرعة إنترنت ضعيفة'], 'c' => 1],
                ['q' => 'ما هي لغة البرمجة الأكثر استخداماً في تطوير الويب (جانب الخادم)؟', 'a' => ['Python', 'PHP', 'Ruby', 'Node.js'], 'c' => 1],
                ['q' => 'ماذا يعني الاختصار PDF؟', 'a' => ['Personal Data File', 'Portable Document Format', 'Public Detail Form', 'Printable Digital File'], 'c' => 1],
                ['q' => 'ما هو الـ VPN؟', 'a' => ['شبكة خاصة افتراضية', 'نوع من الشواحن', 'معالج بيانات', 'برنامج للمحاسبة'], 'c' => 0],
                ['q' => 'ما هي وظيفة الـ Ping؟', 'a' => ['حذف الملفات', 'اختبار سرعة وجودة الاتصال بالشبكة', 'تلوين الصور', 'تغيير الوقت'], 'c' => 1],
                ['q' => 'ما هي الـ Virtual Machine؟', 'a' => ['جهاز حقيقي', 'محاكاة برمجية لجهاز كمبيوتر', 'طابعة ليزر', 'كاميرا ويب'], 'c' => 1],
                ['q' => 'ما هو الـ SaaS؟', 'a' => ['البرمجيات كخدمة', 'سرعة المعالج', 'حجم القرص الصلب', 'نوع من الرامات'], 'c' => 0],
            ];

            foreach ($csQuestions as $item) {
                $question = Question::create([
                    'text' => $item['q'],
                    'type' => 'scq',
                ]);

                foreach ($item['a'] as $index => $answerText) {
                    Answer::create([
                        'question_id' => $question->id,
                        'text' => $answerText,
                        'is_correct' => ($index === $item['c']),
                    ]);
                }
            }
        }
    }
}
