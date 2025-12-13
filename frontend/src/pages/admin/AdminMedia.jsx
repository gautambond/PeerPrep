// import { useQuery } from "@tanstack/react-query";
// import { getAllMedia, deleteMediaAdmin } from "../../api/admin.api";
// import Layout from "../../components/Layout";
// import { Card, CardContent, Typography, Button } from "@mui/material";

// export default function AdminMedia() {
//   const { data: media = [], isLoading, refetch } = useQuery({
//     queryKey: ["admin-media"],
//     queryFn: async () => {
//       const res = await getAllMedia();  
//       return res.data;   // <-- FIXED: return real array
//     },
//   });

//   const menu = [
//     { label: "Dashboard", path: "/admin" },
//     { label: "Users", path: "/admin" },
//     { label: "Media", path: "/admin/media" },
//   ];

//   if (isLoading) return <Layout menu={menu}><p>Loading Media...</p></Layout>;

//   return (
//     <Layout menu={menu}>
//       <Typography variant="h4">All Uploaded Media</Typography>

//       {media.length === 0 && <p>No media uploaded yet.</p>}

//       {media.map((m) => (
//         <Card key={m._id} sx={{ mt: 2 }}>
//           <CardContent>

//             <Typography><strong>Course:</strong> {m.course?.title}</Typography>
//             <Typography><strong>Uploaded By:</strong> {m.uploadedBy?.name}</Typography>
//             <Typography><strong>Type:</strong> {m.type}</Typography>

//             {m.type === "image" ? (
//               <img src={m.url} width="300" alt="media" />
//             ) : (
//               <video width="300" controls>
//                 <source src={m.url} />
//               </video>
//             )}

//             <Button
//               variant="contained"
//               color="error"
//               sx={{ mt: 2 }}
//               onClick={async () => {
//                 await deleteMediaAdmin(m._id);
//                 refetch();
//               }}
//             >
//               Delete
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//     </Layout>
//   );
// }



import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllMedia, deleteMediaAdmin } from "../../api/admin.api";
import Layout from "../../components/Layout";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function AdminMedia() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-media"],
    queryFn: getAllMedia,
  });

  const menu = [
    { label: "Dashboard", path: "/admin" },
    { label: "Users", path: "/admin" },
    { label: "Media", path: "/admin/media" }
  ];

  if (isLoading) return <Layout menu={menu}><p>Loading Media...</p></Layout>;

  const mediaList = data?.data || [];

  return (
    <Layout menu={menu}>
      <Typography variant="h4">All Uploaded Media</Typography>

      {mediaList.length === 0 && <p>No media uploaded yet.</p>}

      {mediaList.map((m) => (
        <Card key={m._id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography><strong>Course:</strong> {m.course?.title}</Typography>
            <Typography><strong>Uploaded By:</strong> {m.uploadedBy?.name}</Typography>
            <Typography><strong>Type:</strong> {m.type}</Typography>

            {m.type === "image" ? (
              <img src={m.url} width="300" alt="media" />
            ) : (
              <video src={m.url} width="300" controls />
            )}

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={async () => {
                if (!confirm("Delete this media permanently?")) return;

                await deleteMediaAdmin(m._id);

                // Refresh media list
                queryClient.invalidateQueries(["admin-media"]);
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
