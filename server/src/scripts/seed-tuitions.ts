
import { connectDB, mongoClient } from "../config/db.js";

const seedTuitions = [
  {
    title: "Experienced Mathematics Tutor Needed",
    subject: "Mathematics",
    classLevel: "Class 9–10",
    location: "Uttara, Dhaka",
    salary: 6000,
    tuitionType: "Home Tuition",
    daysPerWeek: 4,
    description:
      "We are looking for an experienced Mathematics tutor for a Class 9–10 student. The tutor should be able to explain concepts clearly and help the student prepare for examinations.",
    requirements: [
      "Strong knowledge of Mathematics",
      "Previous teaching experience preferred",
      "Good communication skills",
    ],
    postedAt: "2 days ago",
  },
  {
    title: "English Tutor Required for Class 6",
    subject: "English",
    classLevel: "Class 6–8",
    location: "Dhanmondi, Dhaka",
    salary: 5000,
    tuitionType: "Home Tuition",
    daysPerWeek: 5,
    description:
      "Looking for an English tutor who can help a student improve grammar, writing, reading and speaking skills.",
    requirements: [
      "Good English communication skills",
      "Experience teaching school students",
      "Patient and responsible",
    ],
    postedAt: "1 day ago",
  },
  {
    title: "Physics and Chemistry Tutor Needed",
    subject: "Science",
    classLevel: "HSC",
    location: "Mirpur, Dhaka",
    salary: 8000,
    tuitionType: "Online / Home",
    daysPerWeek: 4,
    description:
      "An HSC student needs support in Physics and Chemistry. The tutor should provide clear explanations and regular academic guidance.",
    requirements: [
      "Science background",
      "Strong Physics and Chemistry knowledge",
      "Previous tutoring experience preferred",
    ],
    postedAt: "3 days ago",
  },
  {
    title: "ICT Tutor for HSC Student",
    subject: "ICT",
    classLevel: "HSC",
    location: "Mohammadpur, Dhaka",
    salary: 7000,
    tuitionType: "Home Tuition",
    daysPerWeek: 3,
    description:
      "Looking for an ICT tutor to teach programming basics, database concepts and other HSC ICT topics.",
    requirements: [
      "CSE or ICT background preferred",
      "Knowledge of programming fundamentals",
      "Ability to explain technical topics",
    ],
    postedAt: "4 days ago",
  },
  {
    title: "Primary School All Subjects Tutor",
    subject: "All Subjects",
    classLevel: "Class 1–5",
    location: "Bashundhara, Dhaka",
    salary: 4500,
    tuitionType: "Home Tuition",
    daysPerWeek: 5,
    description:
      "A responsible tutor is needed to help a primary school student with daily lessons and homework.",
    requirements: [
      "Good academic background",
      "Friendly teaching approach",
      "Regular availability",
    ],
    postedAt: "5 days ago",
  },
  {
    title: "Programming Tutor Needed",
    subject: "Programming",
    classLevel: "University",
    location: "Online",
    salary: 10000,
    tuitionType: "Online",
    daysPerWeek: 3,
    description:
      "A university student is looking for guidance in programming fundamentals, problem solving and basic data structures.",
    requirements: [
      "Good programming knowledge",
      "Experience with C, C++ or Python",
      "Ability to teach beginners",
    ],
    postedAt: "1 week ago",
  },
];

const runSeed = async () => {
  try {
    const db = await connectDB();
    const collection = db.collection("tuitions");

    // Avoid duplicate sample records when running seed again.
    for (const tuition of seedTuitions) {
      await collection.updateOne(
        { title: tuition.title },
        {
          $setOnInsert: {
            ...tuition,
            status: "approved",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        { upsert: true },
      );
    }

    console.log("Sample tuitions seeded successfully!");
    console.log(`Total sample records: ${seedTuitions.length}`);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoClient.close();
  }
};

runSeed();
