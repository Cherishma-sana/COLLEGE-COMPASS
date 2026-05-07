import express from "express";
import { pool } from "../db";

const router = express.Router();

/* GET ALL COLLEGES */
router.get("/", async (req, res) => {
  try {
    const { search, state, location, course } = req.query;

    let query = "SELECT * FROM colleges WHERE 1=1";
    const values: any[] = [];

    // Search by college name
    if (search) {
      values.push(`%${search}%`);
      query += ` AND name ILIKE $${values.length}`;
    }

    // Filter by state
    if (state) {
      values.push(state);
      query += ` AND state = $${values.length}`;
    }

    // Filter by location
    if (location) {
      values.push(location);
      query += ` AND location = $${values.length}`;
    }

    // Filter by course
    if (course) {
      values.push(course);
      query += ` AND $${values.length} = ANY(courses)`;
    }

    // Order by rating
    query += " ORDER BY rating DESC";

    const result = await pool.query(query, values);

    res.json(result.rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching colleges",
    });
  }
});

/* GET SINGLE COLLEGE DETAILS */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM colleges WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "College not found",
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching college details",
    });
  }
});

export default router;