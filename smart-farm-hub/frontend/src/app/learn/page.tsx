'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  topics: string[];
  instructor: string;
  image?: string;
}

export default function LearningPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { language } = useAppStore();

  const labels = {
    en: {
      title: 'Learning Hub',
      subtitle: 'Master modern farming techniques and increase your profits',
      categories: {
        all: 'All Courses',
        soil: 'Soil Management',
        pest: 'Pest Control',
        water: 'Water Management',
        market: 'Market Analysis',
        technology: 'Farm Technology',
      },
      duration: 'Duration',
      level: 'Level',
      instructor: 'Instructor',
      topics: 'Topics Covered',
      enroll: 'Enroll Now',
      closeCourse: 'Close',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      hours: 'hours',
    },
    ka: {
      title: 'ಕಲಿಕೆ ಕೇಂದ್ರ',
      subtitle: 'ಆಧುನಿಕ ಕೃಷಿ ತಂತ್ರಗಳನ್ನು ಕರಾಳಿ ಮತ್ತು ನಿಮ್ಮ ಲಾಭ ಹೆಚ್ಚಿಸಿ',
      categories: {
        all: 'ಎಲ್ಲ ಕೋರ್ಸ್‌ಗಳು',
        soil: 'ಮೆಣ್ಣುಭೂಮಿ ನಿರ್ವಹಣೆ',
        pest: 'ಕೀಟ ನಿಯಂತ್ರಣ',
        water: 'ಜಲ ನಿರ್ವಹಣೆ',
        market: 'ಮಾರುಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆ',
        technology: 'ಕೃಷಿ ತಂತ್ರಜ್ಞಾನ',
      },
      duration: 'ಅವಧಿ',
      level: 'ಮಟ್ಟ',
      instructor: 'ಬೋಧಕ',
      topics: 'ಅಂಶಗಳನ್ನು ಒಳಗೊಂಡಿರುವುದು',
      enroll: 'ಈಗ ನೋಂದಣಿ ಮಾಡಿ',
      closeCourse: 'ಮುಚ್ಚಲು',
      beginner: 'ಆರಂಭಿಕ',
      intermediate: 'ಮಧ್ಯ',
      advanced: 'ಸುಧಾರಿತ',
      hours: 'ಗಂಟೆಗಳು',
    },
    hi: {
      title: 'शिक्षा केंद्र',
      subtitle: 'आधुनिक खेती तकनीकें सीखें और अपने मुनाफे में वृद्धि करें',
      categories: {
        all: 'सभी पाठ्यक्रम',
        soil: 'मिट्टी प्रबंधन',
        pest: 'कीट नियंत्रण',
        water: 'जल प्रबंधन',
        market: 'बाजार विश्लेषण',
        technology: 'खेत प्रौद्योगिकी',
      },
      duration: 'अवधि',
      level: 'स्तर',
      instructor: 'प्रशिक्षक',
      topics: 'विषय शामिल',
      enroll: 'अभी नामांकन करें',
      closeCourse: 'बंद करें',
      beginner: 'शुरुआती',
      intermediate: 'मध्यवर्ती',
      advanced: 'उन्नत',
      hours: 'घंटे',
    },
  };

  const t = labels[language as keyof typeof labels] || labels.en;

  const courses: Course[] = [
    {
      id: '1',
      title: 'Soil Health & Fertility Management',
      description: 'Learn how to assess, improve, and maintain soil health for maximum crop productivity.',
      duration: '8',
      level: 'beginner',
      topics: ['Soil testing', 'Organic matter', 'Nutrient cycling', 'Composting'],
      instructor: 'Dr. Ramesh Kumar',
    },
    {
      id: '2',
      title: 'Integrated Pest Management (IPM)',
      description: 'Master sustainable pest control techniques that reduce chemical usage and increase profits.',
      duration: '6',
      level: 'intermediate',
      topics: ['Pest identification', 'Biological control', 'Crop rotation', 'Monitoring'],
      instructor: 'Prof. Priya Sharma',
    },
    {
      id: '3',
      title: 'Water-Efficient Irrigation',
      description: 'Implement modern irrigation techniques to save water and reduce costs.',
      duration: '5',
      level: 'beginner',
      topics: ['Drip irrigation', 'Micro-sprinklers', 'Soil moisture', 'Scheduling'],
      instructor: 'Eng. Rajesh Patel',
    },
    {
      id: '4',
      title: 'Market Analysis & Pricing',
      description: 'Understand market trends and make informed decisions about crop selection and timing.',
      duration: '4',
      level: 'intermediate',
      topics: ['Price trends', 'Market timing', 'Crop selection', 'Contract farming'],
      instructor: 'Vikram Singh',
    },
    {
      id: '5',
      title: 'Precision Agriculture',
      description: 'Learn to use modern technology including sensors, drones, and data analytics.',
      duration: '10',
      level: 'advanced',
      topics: ['Remote sensing', 'Drones', 'IoT sensors', 'Data analysis'],
      instructor: 'Dr. Arjun Verma',
    },
    {
      id: '6',
      title: 'Organic Farming Certification',
      description: 'Get certified and access premium markets for organic produce.',
      duration: '12',
      level: 'intermediate',
      topics: ['Organic standards', 'Certification process', 'Record keeping', 'Premium marketing'],
      instructor: 'Ms. Anjali Desai',
    },
  ];

  const t_labels = labels[language as keyof typeof labels] || labels.en;

  const filteredCourses =
    selectedCategory === 'all'
      ? courses
      : courses.filter((course) => {
          const categoryMap = {
            soil: ['Soil Health', 'Organic Farming'],
            pest: ['Pest Management', 'IPM'],
            water: ['Water-Efficient', 'Irrigation'],
            market: ['Market Analysis', 'Pricing'],
            technology: ['Precision', 'Technology'],
          };
          const keywords = categoryMap[selectedCategory as keyof typeof categoryMap] || [];
          return keywords.some((keyword) => course.title.includes(keyword));
        });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {Object.entries(t.categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === key
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-green-500 to-blue-500"></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">{course.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-2 ${getLevelColor(course.level)}`}>
                    {t_labels.level === 'Level'
                      ? course.level.charAt(0).toUpperCase() + course.level.slice(1)
                      : course.level}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>📚 {course.duration} {t.hours}</span>
                  <span>👤 {course.instructor}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCourse(course);
                  }}
                  className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  {t.enroll}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedCourse.title}</h2>
                  <p className="text-green-100">{selectedCourse.instructor}</p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-2xl font-bold hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-6">{selectedCourse.description}</p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">{t.duration}</p>
                    <p className="text-lg font-bold text-blue-600">
                      {selectedCourse.duration} {t.hours}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">{t.level}</p>
                    <p className="text-lg font-bold text-green-600">
                      {selectedCourse.level.charAt(0).toUpperCase() + selectedCourse.level.slice(1)}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Certificate</p>
                    <p className="text-lg font-bold text-purple-600">Yes</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{t.topics}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCourse(null)}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
                >
                  {t.enroll}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">6</p>
            <p className="text-gray-600">Premium Courses</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">50+</p>
            <p className="text-gray-600">Expert Instructors</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-4xl font-bold text-purple-600 mb-2">10,000+</p>
            <p className="text-gray-600">Farmers Trained</p>
          </div>
        </div>
      </div>
    </div>
  );
}
