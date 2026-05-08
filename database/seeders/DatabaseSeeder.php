<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Question;
use App\Models\Answer;
use App\Models\Category;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Admin User
        User::updateOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Default Settings
        Setting::updateOrCreate(['key' => 'questions_per_session'], ['value' => '10']);

        // 3. Create Categories
        $categories = [
            ['name' => 'البرمجة (Programming)', 'duration' => 15],
            ['name' => 'الشبكات (Networking)', 'duration' => 10],
            ['name' => 'أمن المعلومات (Cybersecurity)', 'duration' => 12],
            ['name' => 'الذكاء الاصطناعي (AI)', 'duration' => 20],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['name' => $cat['name']], ['duration' => $cat['duration']]);
        }

        $progCat = Category::where('name', 'البرمجة (Programming)')->first();
        $netCat = Category::where('name', 'الشبكات (Networking)')->first();
        $secCat = Category::where('name', 'أمن المعلومات (Cybersecurity)')->first();
        $aiCat = Category::where('name', 'الذكاء الاصطناعي (AI)')->first();

        // 4. Define Questions
        $questions = [
            // Programming
            ['q' => 'ما هي لغة البرمجة الأساسية المستخدمة في تطوير تطبيقات الأندرويد؟', 'a' => ['Java', 'Swift', 'C#', 'PHP'], 'c' => 0, 'cat' => $progCat->id],
            ['q' => 'ما هو اختصار SQL؟', 'a' => ['Simple Query Language', 'Structured Query Language', 'Sequential Query Language', 'System Query Language'], 'c' => 1, 'cat' => $progCat->id],
            ['q' => 'ما هي لغة تنسيق صفحات الويب؟', 'a' => ['HTML', 'Python', 'CSS', 'Java'], 'c' => 2, 'cat' => $progCat->id],
            ['q' => 'ما هي لغة البرمجة التي تعمل في متصفح الويب؟', 'a' => ['Python', 'Java', 'JavaScript', 'C#'], 'c' => 2, 'cat' => $progCat->id],
            ['q' => 'أي لغة تشتهر باستخدامها في مجال علم البيانات؟', 'a' => ['C++', 'Java', 'Python', 'PHP'], 'c' => 2, 'cat' => $progCat->id],
            
            // Networking
            ['q' => 'ما هي وظيفة الـ Router في الشبكة؟', 'a' => ['تخزين البيانات', 'توجيه البيانات بين الشبكات', 'طباعة المستندات', 'عرض الصور'], 'c' => 1, 'cat' => $netCat->id],
            ['q' => 'ما هو اختصار HTTP؟', 'a' => ['HyperText Transfer Protocol', 'High Technical Transfer Process', 'Hyperlinks Text Tool Path', 'Header Transfer Text Protocol'], 'c' => 0, 'cat' => $netCat->id],
            ['q' => 'ما هو الـ IP Address؟', 'a' => ['اسم المستخدم', 'عنوان فريد للجهاز على الشبكة', 'سرعة المعالج', 'حجم الشاشة'], 'c' => 1, 'cat' => $netCat->id],
            ['q' => 'ما هو اختصار DNS؟', 'a' => ['Digital Network System', 'Domain Name System', 'Data Node Server', 'Direct Network Service'], 'c' => 1, 'cat' => $netCat->id],
            ['q' => 'أي نوع من الكابلات يستخدم لنقل البيانات بسرعة الضوء؟', 'a' => ['Coaxial', 'Twisted Pair', 'Fiber Optic', 'USB'], 'c' => 2, 'cat' => $netCat->id],
            
            // Cybersecurity
            ['q' => 'ما هي وظيفة الـ Firewall؟', 'a' => ['تبريد الجهاز', 'حماية الشبكة من الاختراقات', 'تسريع الإنترنت', 'تنظيف الفيروسات'], 'c' => 1, 'cat' => $secCat->id],
            ['q' => 'ما هو الـ Ransomware؟', 'a' => ['برنامج تعليمي', 'برمجية خبيثة تطلب فدية لتشفير الملفات', 'مسرع ألعاب', 'برنامج للرسم'], 'c' => 1, 'cat' => $secCat->id],
            ['q' => 'ماذا تعني الاختصار VPN؟', 'a' => ['Virtual Private Network', 'Very Personal Node', 'Video Path Network', 'Virtual Path Name'], 'c' => 0, 'cat' => $secCat->id],
            ['q' => 'أي مما يلي يعتبر هجمة لسلب الخدمة؟', 'a' => ['DDoS', 'Phishing', 'SQLi', 'XSS'], 'c' => 0, 'cat' => $secCat->id],
            ['q' => 'ما هو الـ Encryption؟', 'a' => ['حذف الملفات', 'تحويل البيانات إلى صيغة غير مفهومة لحمايتها', 'ضغط الصور', 'تحميل الألعاب'], 'c' => 1, 'cat' => $secCat->id],

            // AI
            ['q' => 'أي لغة برمجة هي الأكثر استخداماً في الذكاء الاصطناعي؟', 'a' => ['C#', 'Python', 'JavaScript', 'Cobol'], 'c' => 1, 'cat' => $aiCat->id],
            ['q' => 'ما هو الـ Machine Learning؟', 'a' => ['صناعة الحواسيب', 'قدرة الآلات على التعلم من البيانات', 'طباعة اللوحات', 'تعديل الصور'], 'c' => 1, 'cat' => $aiCat->id],
            ['q' => 'أي مما يلي يعتبر شبكة عصبية اصطناعية؟', 'a' => ['CNN', 'HTTP', 'MySQL', 'RAM'], 'c' => 0, 'cat' => $aiCat->id],
            ['q' => 'ما هو الهدف من اختبار تورينج؟', 'a' => ['اختبار سرعة الإنترنت', 'تحديد ما إذا كان الآلة يمكنها التفكير كالإنسان', 'فحص الرامات', 'تصميم المواقع'], 'c' => 1, 'cat' => $aiCat->id],
            ['q' => 'ما هو الـ Chatbot؟', 'a' => ['فيروس', 'برنامج يحاكي المحادثة البشرية', 'لوحة مفاتيح', 'نوع من الشاشات'], 'c' => 1, 'cat' => $aiCat->id],
        ];

        // Only add if empty to protect manual additions
        if (Question::count() < 20) {
            foreach ($questions as $item) {
                $question = Question::create([
                    'text' => $item['q'],
                    'type' => 'scq',
                    'category_id' => $item['cat'],
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
