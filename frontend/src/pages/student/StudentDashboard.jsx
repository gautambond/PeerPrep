import { listCourses, enrollCourse } from "../../api/student.api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";
import {
  Card,
  CardContent,
  Button,
  Typography,
  CircularProgress,
  Box
} from "@mui/material";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["studentCourses"],
    queryFn: listCourses,
  });

  if (isLoading)
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    );

  const allCourses = data?.data?.all || [];
  const myCourses = data?.data?.enrolled || [];

  return (
    <Layout
      menu={[
        { label: "Dashboard", path: "/student" },
        { label: "Courses", path: "/student" },
      ]}
    >
      <Typography variant="h4" gutterBottom>
        Enrolled Courses
      </Typography>

      {/* ---------------- My Courses Section ---------------- */}
      {myCourses.length === 0 && (
        <Typography>No enrolled courses yet.</Typography>
      )}

      {myCourses.map((c) => (
        <Card
          key={c._id}
          sx={{ mt: 2, cursor: "pointer" }}
          onClick={() => navigate(`/student/course/${c._id}/media`)}
        >
          <CardContent>
            <Typography variant="h6">{c.title}</Typography>
            <Typography>{c.description}</Typography>
            <Typography sx={{ mt: 1, fontStyle: "italic", color: "green" }}>
              Enrolled
            </Typography>
          </CardContent>
        </Card>
      ))}

      {/* ---------------- Available Courses Section ---------------- */}
      <Typography variant="h4" sx={{ mt: 5 }}>
        All Courses
      </Typography>

      {allCourses.map((c) => {
        const isEnrolled = myCourses.some((mc) => mc._id === c._id);

        return (
          <Card key={c._id} sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6">{c.title}</Typography>
              <Typography>{c.description}</Typography>

              {!isEnrolled ? (
                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  onClick={async () => {
                    await enrollCourse(c._id);
                    refetch();
                  }}
                >
                  Enroll
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ mt: 1, backgroundColor: "gray" }}
                  disabled
                >
                  Enrolled
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Layout>
  );
}
