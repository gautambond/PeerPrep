// import { useParams } from "react-router-dom";
// //import { useQuery } from "react-query";
// import { useQuery } from "@tanstack/react-query";

// import { addStudent, removeStudent } from "../../api/instructor.api";
// import { getCourseMedia } from "../../api/student.api";
// import Layout from "../../components/Layout";
// import {
//   Card, CardContent, Typography, Button, TextField
// } from "@mui/material";
// import { useState } from "react";

// export default function InstructorStudents() {
//   const { courseId } = useParams();
//   const [studentId, setStudentId] = useState("");

//   const { data, refetch } = useQuery(["courseMedia", courseId], () =>
//     getCourseMedia(courseId)
//   );

//   const students = data?.data?.students || [];

//   const menu = [
//     { label: "Dashboard", path: "/instructor" },
//     { label: "Courses", path: "/instructor" }
//   ];

//   return (
//     <Layout menu={menu}>
//       <Typography variant="h4">Manage Students</Typography>

//       <Card sx={{ mt: 2 }}>
//         <CardContent>
//           <Typography variant="h6">Add Student</Typography>

//           <TextField
//             label="Student ID"
//             fullWidth
//             sx={{ mt: 2 }}
//             onChange={(e) => setStudentId(e.target.value)}
//           />

//           <Button
//             variant="contained"
//             sx={{ mt: 2 }}
//             onClick={async () => {
//               await addStudent(courseId, studentId);
//               refetch();
//             }}
//           >
//             Add Student
//           </Button>
//         </CardContent>
//       </Card>

//       <Typography variant="h5" sx={{ mt: 4 }}>Enrolled Students</Typography>

//       {students.length === 0 && <Typography>No students enrolled</Typography>}

//       {students.map((s) => (
//         <Card key={s._id} sx={{ mt: 2 }}>
//           <CardContent>
//             <Typography>{s.name} ({s.email})</Typography>
//             <Button
//               variant="contained"
//               color="error"
//               sx={{ mt: 1 }}
//               onClick={async () => {
//                 await removeStudent(courseId, s._id);
//                 refetch();
//               }}
//             >
//               Remove
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//     </Layout>
//   );
// }


// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

// import { addStudent, removeStudent, getCourseStudents } from "../../api/instructor.api";
// import Layout from "../../components/Layout";
// import {
//   Card, CardContent, Typography, Button, TextField
// } from "@mui/material";
// import { useState } from "react";

// export default function InstructorStudents() {
//   const { courseId } = useParams();
//   const [studentId, setStudentId] = useState("");

//   // ✅ Fetch students correctly
//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ["courseStudents", courseId],
//     queryFn: () => getCourseStudents(courseId),
//   });

//   const students = data?.data || [];

//   const menu = [
//     { label: "Dashboard", path: "/instructor" },
//     { label: "Courses", path: "/instructor" }
//   ];

//   if (isLoading) return <Layout menu={menu}><p>Loading...</p></Layout>;
//   if (error) return <Layout menu={menu}><p>Error loading students</p></Layout>;

//   return (
//     <Layout menu={menu}>
//       <Typography variant="h4">Manage Students</Typography>

//       {/* Add Student */}
//       <Card sx={{ mt: 2 }}>
//         <CardContent>
//           <Typography variant="h6">Add Student by ID</Typography>

//           <TextField
//             label="Student ID"
//             fullWidth
//             sx={{ mt: 2 }}
//             onChange={(e) => setStudentId(e.target.value)}
//           />

//           <Button
//             variant="contained"
//             sx={{ mt: 2 }}
//             onClick={async () => {
//               await addStudent(courseId, studentId);
//               refetch(); // Refresh student list
//               setStudentId("");
//             }}
//           >
//             Add Student
//           </Button>
//         </CardContent>
//       </Card>

//       {/* List Students */}
//       <Typography variant="h5" sx={{ mt: 4 }}>Enrolled Students</Typography>

//       {students.length === 0 && (
//         <Typography>No students enrolled.</Typography>
//       )}

//       {students.map((s) => (
//         <Card key={s._id} sx={{ mt: 2 }}>
//           <CardContent>
//             <Typography>{s.name} ({s.email})</Typography>

//             <Button
//               variant="contained"
//               color="error"
//               sx={{ mt: 1 }}
//               onClick={async () => {
//                 await removeStudent(courseId, s._id);
//                 refetch(); // Refresh student list
//               }}
//             >
//               Remove Student
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//     </Layout>
//   );
// }



import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  getCourseStudents,
  addStudent,
  removeStudent
} from "../../api/instructor.api";

import Layout from "../../components/Layout";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  CircularProgress
} from "@mui/material";

import { useState } from "react";

export default function InstructorStudents() {
  const { courseId } = useParams();
  const [studentId, setStudentId] = useState("");

  // ✅ Correct React Query call
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["students", courseId],
    queryFn: () => getCourseStudents(courseId),
  });

  const students = data?.data?.students || [];

  const menu = [
    { label: "Dashboard", path: "/instructor" },
    { label: "Courses", path: "/instructor" },
  ];

  if (isLoading)
    return (
      <Layout menu={menu}>
        <CircularProgress />
      </Layout>
    );

  return (
    <Layout menu={menu}>
      <Typography variant="h4">Manage Students</Typography>

      {/* ADD STUDENT */}
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6">Add Student</Typography>

          <TextField
            label="Student ID"
            fullWidth
            sx={{ mt: 2 }}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={async () => {
              await addStudent(courseId, studentId);
              refetch(); // ← refresh UI
            }}
          >
            Add Student
          </Button>
        </CardContent>
      </Card>

      {/* ENROLLED STUDENTS */}
      <Typography variant="h5" sx={{ mt: 4 }}>
        Enrolled Students ({students.length})
      </Typography>

      {students.length === 0 && (
        <Typography>No students enrolled yet.</Typography>
      )}

      {students.map((s) => (
        <Card key={s._id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">{s.name}</Typography>
            <Typography>{s.email}</Typography>

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 1 }}
              onClick={async () => {
                await removeStudent(courseId, s._id);
                refetch();
              }}
            >
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
    </Layout>
  );
}
