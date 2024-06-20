require("dotenv").config();
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const multer = require('multer');
const cors = require("cors");
const { pool, checkConnection } = require("./db"); // Correctly import pool and checkConnection

const app = express();
app.use(cors());
app.use(express.json());

// Call the checkConnection function to ensure the database is connected
checkConnection();
// Middleware to authenticate token and extract user ID
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

let users = [];
let pendingTeachers = [];

app.post("/register", async (req, res) => {
  const { name, lastName, rollNo, userId, password, role } = req.body;

  if (role === "teacher") {
    pendingTeachers.push({
      id: pendingTeachers.length + 1,
      name,
      lastName,
      userId,
      password,
    });
    return res.status(200).json({ role: "teacher" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    pool.query(
      "INSERT INTO users (user_id, password, role, name, last_name, roll_no) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, hashedPassword, role, name, lastName, rollNo],
      (err, results) => {
        if (err) {
          console.error("Error executing query", err);
          return res.status(500).send("Server error");
        }
        res.status(201).send("User registered successfully");
      }
    );
  }
});

app.get("/students", async (req, res) => {
  try {
    const query =
      'SELECT id, name, last_name AS lastName, roll_no AS rollNo, user_id AS userId FROM users WHERE role = "student"';
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query", err);
        return res.status(500).send("Server error");
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).send("Server error");
  }
});
//count student
app.get("/students/count", async (req, res) => {
  try {
    const query =
      'SELECT COUNT(*) AS studentCount FROM users WHERE role = "student"';
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query", err);
        return res.status(500).send("Server error");
      }
      const studentCount = results[0].studentCount;
      res.json({ studentCount });
    });
  } catch (error) {
    console.error("Error fetching student count:", error);
    res.status(500).send("Server error");
  }
});
// New route to fetch approved teachers' details Ui

app.get("/teachers", async (req, res) => {
  try {
    const query =
      'SELECT id, name, last_name AS lastName,  user_id AS userId FROM users WHERE role = "teacher"';
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query", err);
        return res.status(500).send("Server error");
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).send("Server error");
  }
});
//teacher count
// Endpoint to get the count of teachers
app.get("/teachers/count", async (req, res) => {
  try {
    const query =
      'SELECT COUNT(*) AS teacherCount FROM users WHERE role = "teacher"';
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query", err);
        return res.status(500).send("Server error");
      }
      const teacherCount = results[0].teacherCount;
      res.json({ teacherCount });
    });
  } catch (error) {
    console.error("Error fetching teacher count:", error);
    res.status(500).send("Server error");
  }
});

app.get("/teachers-info", async (req, res) => {
  try {
    const query =
      'SELECT name, user_id AS userId FROM users WHERE role = "teacher"';
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query", err);
        return res.status(500).send("Server error");
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching teachers information:", error);
    res.status(500).send("Server error");
  }
});

app.get("/pending-teachers", (req, res) => {
  res.json(pendingTeachers);
});

app.post("/approve-teacher/:id", async (req, res) => {
  const teacherId = parseInt(req.params.id);
  const teacher = pendingTeachers.find((t) => t.id === teacherId);

  if (teacher) {
    const { name, lastName, userId, password } = teacher;
    const hashedPassword = await bcrypt.hash(password, 10);
    pool.query(
      "INSERT INTO users (user_id, password, role, name, last_name) VALUES (?, ?, ?, ?, ?)",
      [userId, hashedPassword, "teacher", name, lastName],
      (err, results) => {
        if (err) {
          console.error("Error executing query", err);
          return res.status(500).send("Server error");
        }
        pendingTeachers = pendingTeachers.filter((t) => t.id !== teacherId);
        res.status(200).send("Teacher approved");
      }
    );
  } else {
    res.status(404).send("Teacher not found");
  }
});

app.post("/reject-teacher/:id", (req, res) => {
  const teacherId = parseInt(req.params.id);
  pendingTeachers = pendingTeachers.filter((t) => t.id !== teacherId);
  res.status(200).send("Teacher rejected");
});

app.post("/login", (req, res) => {
  const { userId, password } = req.body;

  pool.query(
    "SELECT * FROM users WHERE user_id = ?",
    [userId],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error");
      }
      if (results.length > 0) {
        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          const token = jwt.sign(
            { userId: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          return res.json({ token, role: user.role });
        } else {
          return res.status(401).send("Invalid credentials");
        }
      } else {
        return res.status(404).send("User not found");
      }
    }
  );
});

// Example in a Node.js/Express app
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "No user found with this email address." });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    // Send email logic here
    res.send({
      message:
        "An email has been sent to your account with further instructions.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error processing your request." });
  }
});

let exams = [];
app.get("/exams", (req, res) => {
  res.json(exams);
});

// Add a new exam
app.post("/exams", (req, res) => {
  const { examDate, examTime, examSubject, examRoom } = req.body;
  const newExam = {
    examId: uuidv4(),
    examDate,
    examTime,
    examSubject,
    examRoom,
  };
  exams.push(newExam);
  res.status(201).json(newExam);
});
app.get("/user-info", authenticateToken, (req, res) => {
  const userId = req.user.userId;

  pool.query(
    "SELECT name, roll_no AS rollNo, user_id AS userId FROM users WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error executing query", err);
        return res.status(500).send("Server error");
      }
      if (results.length > 0) {
        const userInfo = results[0];
        res.json(userInfo);
      } else {
        return res.status(404).send("User not found");
      }
    }
  );
});

// Delete an exam by ID
app.delete("/exams/:examId", (req, res) => {
  const { examId } = req.params;
  const index = exams.findIndex((exam) => exam.examId === examId);
  if (index > -1) {
    exams.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Exam not found");
  }
});

// Submit code (placeholder functionality)
app.post("/submit-code", (req, res) => {
  console.log("Code submitted:", req.body.code);
  // Placeholder for code evaluation logic
  res.send("Code evaluation result");
});

let scores = [];

let mcqs = [
  {
    question: "Which of the following is not a valid C variable name?",
    options: [
      "int number;",
      " float rate;",
      "int variable_count;",
      " int $main;",
    ],
    correctAnswer: "int $main;",
  },
  {
    question: "Which of the following cannot be a variable name in C?",
    options: ["volatile", "true", "friend", "export"],
    correctAnswer: "Jupiter",
  },
  {
    question:
      "Which keyword is used to prevent any changes in the variable within a C program?",
    options: [" immutable", "mutable", "const", "volatile"],
    correctAnswer: "Paris",
  },

  {
    question: "What is the output of the following C code?",
    options: ["5", "10", "15", "20"],
    correctAnswer: "15",
  },
  {
    question: "What is the purpose of the `return` statement in C?",
    options: [
      "To terminate the program",
      "To return a value from a function",
      "To continue the next iteration of a loop",
      "To exit a loop",
    ],
    correctAnswer: "To return a value from a function",
  },
  {
    question:
      "Which of the following is a correct way to declare a pointer to an integer in C?",
    options: ["int *ptr;", "int ptr*;", "int &ptr;", "int ptr;"],
    correctAnswer: "int *ptr;",
  },
  {
    question: "What does the following C code snippet do?",
    options: [
      "Prints 1 2 3 4 5",
      "Prints 0 1 2 3 4",
      "Prints 5 times",
      "Does nothing",
    ],
    correctAnswer: "Prints 0 1 2 3 4",
  },
  {
    question: "What is the output of the following C code?",
    options: ["Hello", "World", "Hello World", "World Hello"],
    correctAnswer: "Hello World",
  },
];

app.get("/mcqs", (req, res) => {
  res.json(mcqs);
});

app.post("/submit-score", (req, res) => {
  const { name, score } = req.body;
  if (!name || score === undefined) {
    return res.status(400).json({ error: "Invalid data provided" });
  }
  const newScore = { id: uuidv4(), name, score, timestamp: new Date() };
  scores.push(newScore);
  res.status(201).json(newScore);
});

app.get("/scores", (req, res) => {
  res.json(scores);
});
//Add Results on the student and admin Page//
let results = [];
app.get("/result", (req, res) => {
  res.json(results);
});

app.post("/submit-result", (req, res) => {
  const newResult = {
    id: results.length + 1,
    ...req.body
  };
  results.push(newResult);
  res.status(201).json(newResult);
});

app.delete("/result/:id", (req, res) => {
  const { id } = req.params;
  notices = notices.filter((notice) => notice.id !== parseInt(id, 10));
  res.status(204).send();
});

////Notice///
let notices = [];
app.get("/notices", (req, res) => {
  res.json(notices);
});

app.post("/notices", (req, res) => {
  const newNotice = {
    id: notices.length + 1,
    title: req.body.title,
    description: req.body.description,
    targetClass: req.body.targetClass,
  };
  notices.push(newNotice);
  res.status(201).json(newNotice);
});
app.delete("/notices/:id", (req, res) => {
  const { id } = req.params;
  notices = notices.filter((notice) => notice.id !== parseInt(id, 10));
  res.status(204).send();
});

let accessTimes = {
  quizTime: { start: "", end: "" },
  codingTime: { start: "", end: "" },
};

app.get("/access-times", (req, res) => {
  res.json(accessTimes);
});

app.post("/access-times", (req, res) => {
  accessTimes = req.body;
  res.status(200).send("Access times updated successfully.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
