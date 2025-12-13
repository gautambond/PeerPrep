import { useQuery } from "@tanstack/react-query";
import { getUsers, getAllMedia } from "../../api/admin.api";
import Layout from "../../components/Layout";
import { Card, CardContent, Typography, Divider } from "@mui/material";

export default function AdminDashboard() {
  
  // Fetch Users
  const { data: users = [] } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await getUsers();
      return res.data;
    },
  });

  // Fetch Media
  const { data: media = [] } = useQuery({
    queryKey: ["admin-media-dashboard"],
    queryFn: async () => {
      const res = await getAllMedia();
      return res.data;
    },
  });

  const menu = [
    { label: "Dashboard", path: "/admin" },
    { label: "Users", path: "/admin" },
    { label: "Media", path: "/admin/media" },
  ];

  return (
    <Layout menu={menu}>
      <Typography variant="h4">Admin Dashboard</Typography>

      {/* ===================== USERS SECTION ====================== */}
      <Typography variant="h5" sx={{ mt: 4 }}>All Users</Typography>

      {users.map((u) => (
        <Card key={u._id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">{u.name}</Typography>
            <Typography>{u.email}</Typography>
            <Typography>Role: {u.role}</Typography>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 5 }} />

      {/* ===================== MEDIA SECTION ====================== */}
      <Typography variant="h5">All Media Uploaded</Typography>

      {media.length === 0 && <p>No media uploaded yet.</p>}

      {media.map((m) => (
        <Card key={m._id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography><strong>Course:</strong> {m.course?.title}</Typography>
            <Typography><strong>Uploaded By:</strong> {m.uploadedBy?.name}</Typography>
            <Typography><strong>Type:</strong> {m.type}</Typography>

            {m.type === "image" ? (
              <img src={m.url} width="250" alt="media" />
            ) : (
              <video src={m.url} width="250" controls />
            )}
          </CardContent>
        </Card>
      ))}

    </Layout>
  );
}
