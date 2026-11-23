
import { Router } from "express";
import { ObjectId } from "mongodb";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { getDB } from "../config/db.js";

const router = Router();

// Submit a tuition application
router.post("/", async (req, res) => {
  try {
    // Verify logged-in user
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Please sign in first",
      });
    }

    const user = session.user as typeof session.user & {
      role?: string;
    };

    if (user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can apply",
      });
    }

    const { tuitionId, message } = req.body;

    if (!tuitionId || !ObjectId.isValid(tuitionId)) {
      return res.status(400).json({
        success: false,
        message: "Valid tuition ID is required",
      });
    }

    const db = getDB();

    const tuition = await db.collection("tuitions").findOne({
      _id: new ObjectId(tuitionId),
      status: "approved",
    });

    if (!tuition) {
      return res.status(404).json({
        success: false,
        message: "Tuition not found or unavailable",
      });
    }

    // Prevent duplicate applications
    const existingApplication = await db
      .collection("applications")
      .findOne({
        tuitionId: new ObjectId(tuitionId),
        studentId: user.id,
      });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this tuition",
      });
    }

    const application = {
      tuitionId: new ObjectId(tuitionId),
      studentId: user.id,
      studentName: user.name,
      studentEmail: user.email,
      message: typeof message === "string" ? message.trim().slice(0, 1000) : "",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection("applications")
      .insertOne(application);

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: {
        applicationId: result.insertedId,
        ...application,
      },
    });
  } catch (error) {
    console.error("Submit application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
});

// Get applications of logged-in student
router.get("/my-applications", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Please sign in first",
      });
    }

    const db = getDB();

    const applications = await db
      .collection("applications")
      .aggregate([
        {
          $match: {
            studentId: session.user.id,
          },
        },
        {
          $lookup: {
            from: "tuitions",
            localField: "tuitionId",
            foreignField: "_id",
            as: "tuition",
          },
        },
        {
          $unwind: {
            path: "$tuition",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .toArray();

    return res.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Get applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
});

export default router;
