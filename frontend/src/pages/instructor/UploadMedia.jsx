import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { uploadMedia } from "../../api/instructor.api";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box
} from "@mui/material";

export default function UploadMedia() {
  const { courseId } = useParams();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    multiple: true,
  });

  const uploadAll = async () => {
    if (files.length === 0) return alert("Select at least one file");

    setLoading(true);

    for (const file of files) {
      await uploadMedia(courseId, file);
    }

    setLoading(false);
    alert("All files uploaded!");
    setFiles([]); // reset selected files
  };

  // sidebar for instructor
  const menu = [
    { label: "Dashboard", path: "/instructor" },
    { label: "Courses", path: "/instructor" }
  ];

  return (
    <Layout menu={menu}>
      <Typography variant="h4" gutterBottom>
        Upload Media (Images or Videos)
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #aaa",
              padding: "40px",
              textAlign: "center",
              cursor: "pointer",
              borderRadius: "10px",
            }}
          >
            <input {...getInputProps()} />

            {isDragActive ? (
              <Typography>Drop the files here...</Typography>
            ) : (
              <Typography>
                Drag & drop files here, or click to select<br />
                (Images and Videos supported)
              </Typography>
            )}
          </div>

          {/* PREVIEW SELECTED FILES */}
          {files.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Selected Files:</Typography>
              {files.map((file, index) => (
                <Typography key={index} sx={{ mt: 1 }}>
                  📄 {file.name} ({Math.round(file.size / 1024)} KB)
                </Typography>
              ))}
            </Box>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={files.length === 0 || loading}
            onClick={uploadAll}
          >
            {loading ? <CircularProgress size={20} /> : "Upload All"}
          </Button>
        </CardContent>
      </Card>
    </Layout>
  );
}
