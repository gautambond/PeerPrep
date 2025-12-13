import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getCourseMedia } from "../../api/student.api";
import Layout from "../../components/Layout";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box
} from "@mui/material";

export default function CourseMedia() {
  const { courseId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["course-media", courseId],
    queryFn: () => getCourseMedia(courseId),
  });

  const mediaList = data?.data || [];

  return (
    <Layout menu={[]}>
      <Typography variant="h4" gutterBottom>
        Course Media
      </Typography>

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography color="error" sx={{ mt: 3 }}>
          Failed to load media
        </Typography>
      )}

      {/* No Media */}
      {!isLoading && mediaList.length === 0 && (
        <Typography sx={{ mt: 3, color: "gray" }}>
          No media uploaded for this course yet.
        </Typography>
      )}

      {/* Media List */}
      {mediaList.map((m) => (
        <Card key={m._id} sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {m.type.toUpperCase()}
            </Typography>

            {m.type === "video" ? (
              <video
                width="100%"
                style={{ maxWidth: "600px", borderRadius: "8px" }}
                controls
              >
                <source src={m.url} type="video/mp4" />
              </video>
            ) : (
              <img
                src={m.url}
                alt="media"
                width="100%"
                style={{ maxWidth: "600px", borderRadius: "8px" }}
              />
            )}
          </CardContent>
        </Card>
      ))}
    </Layout>
  );
}
