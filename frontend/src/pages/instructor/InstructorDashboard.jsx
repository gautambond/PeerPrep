import { useQuery } from "@tanstack/react-query";
import { getInstructorCourses, createCourse } from "../../api/instructor.api";
import Layout from "../../components/Layout";
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

export default function InstructorDashboard() {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState({ title: "", description: "" });

  // Fetch instructor courses (React Query v5 syntax)
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["instructor-courses"],
    queryFn: getInstructorCourses,
  });

  const createNewCourse = async () => {
    await createCourse(course);
    setOpen(false);
    refetch(); // refresh the course list after creation
  };

  const menu = [
    { label: "Dashboard", path: "/instructor" },
    { label: "My Courses", path: "/instructor" },
  ];

  if (isLoading) return <Layout>Loading...</Layout>;

  return (
    <Layout menu={menu}>
      <Typography variant="h4" gutterBottom>
        Instructor Dashboard
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Create Course
      </Button>

      {/* Course Create Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) =>
              setCourse({ ...course, title: e.target.value })
            }
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={createNewCourse}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Your Courses
      </Typography>

      {data?.data?.courses?.map((c) => (
        <Card
          key={c.courseId}
          sx={{ mt: 2, cursor: "pointer" }}
          onClick={() =>
            (window.location.href = `/instructor/course/${c.courseId}`)
          }
        >
          <CardContent>
            <Typography variant="h6">{c.title}</Typography>
            <Typography>Total Students: {c.totalStudents}</Typography>
          </CardContent>
        </Card>
      ))}
    </Layout>
  );
}
