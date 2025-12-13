// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

// import { getCourseMedia } from "../../api/student.api";
// import { deleteMedia } from "../../api/instructor.api";
// import Layout from "../../components/Layout";
// import { Card, CardContent, Button, Typography } from "@mui/material";

// export default function CoursePage() {
//   const { courseId } = useParams();

//   // React Query v5
//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ["courseMedia", courseId],
//     queryFn: () => getCourseMedia(courseId),
//   });

//   const menu = [
//     { label: "Dashboard", path: "/instructor" },
//     { label: "Courses", path: "/instructor" },
//   ];

//   if (isLoading)
//     return (
//       <Layout menu={menu}>
//         <p>Loading...</p>
//       </Layout>
//     );

//   if (error)
//     return (
//       <Layout menu={menu}>
//         <p>Error loading media</p>
//       </Layout>
//     );

//   const mediaList = data?.data || [];

//   return (
//     <Layout menu={menu}>
//       <Typography variant="h4" gutterBottom>
//         Course Media
//       </Typography>

//       {/* 👉 NEW: Add Media Button */}
//       <Button
//         variant="contained"
//         sx={{ mb: 3 }}
//         onClick={() =>
//           (window.location.href = `/instructor/course/${courseId}/upload`)
//         }
//       >
//         ➕ Add New Media
//       </Button>

//       {mediaList.length === 0 && (
//         <Typography>No media uploaded yet.</Typography>
//       )}

//       {mediaList.map((m) => (
//         <Card key={m._id} sx={{ mt: 2 }}>
//           <CardContent>
//             <Typography>
//               <strong>Type:</strong> {m.type}
//             </Typography>

//             {/* Show Image or Video Preview */}
//             {m.type === "image" ? (
//               <img
//                 src={m.url}
//                 width="250"
//                 alt="uploaded"
//                 style={{ marginTop: "10px", borderRadius: "6px" }}
//               />
//             ) : (
//               <video width="300" controls style={{ marginTop: "10px" }}>
//                 <source src={m.url} type="video/mp4" />
//               </video>
//             )}

//             {/* Delete button */}
//             <Button
//               variant="contained"
//               color="error"
//               sx={{ mt: 2 }}
//               onClick={async () => {
//                 await deleteMedia(courseId, m._id);
//                 refetch();
//               }}
//             >
//               Delete Media
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//     </Layout>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getCourseMedia } from "../../api/student.api";
import { deleteMedia } from "../../api/instructor.api";
import Layout from "../../components/Layout";
import { 
  Card, CardContent, Button, Typography, CircularProgress 
} from "@mui/material";

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["courseMedia", courseId],
    queryFn: () => getCourseMedia(courseId),
  });

  const menu = [
    { label: "Dashboard", path: "/instructor" },
    { label: "Courses", path: "/instructor" }
  ];

  if (isLoading) return <Layout menu={menu}><CircularProgress /></Layout>;
  if (error) return <Layout menu={menu}><p>Error loading media</p></Layout>;

  const mediaList = data?.data || [];

  return (
    <Layout menu={menu}>
      <Typography variant="h4" gutterBottom>
        Course Details
      </Typography>

      {/* ACTION BUTTONS */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <Button 
          variant="contained" 
          onClick={() => navigate(`/instructor/course/${courseId}/upload`)}
        >
          ➕ Add Media
        </Button>

        <Button 
          variant="outlined" 
          onClick={() => navigate(`/instructor/course/${courseId}/students`)}
        >
          👨‍🎓 Manage Students
        </Button>
      </div>

      {/* MEDIA LIST */}
      {mediaList.length === 0 && (
        <Typography>No media uploaded yet.</Typography>
      )}

      {mediaList.map((m) => (
        <Card key={m._id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography><strong>Type:</strong> {m.type}</Typography>

            {m.type === "image" ? (
              <img src={m.url} width="250" alt="media" />
            ) : (
              <video width="300" controls>
                <source src={m.url} type="video/mp4" />
              </video>
            )}

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={async () => {
                await deleteMedia(courseId, m._id);
                refetch();
              }}
            >
              Delete Media
            </Button>
          </CardContent>
        </Card>
      ))}
    </Layout>
  );
}

