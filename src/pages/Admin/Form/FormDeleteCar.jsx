import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import axiosUrl from "../../../../config/AxiosConfig";

export default function DeleteVehicleForm() {
  const [vehicleList, setVehicleList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axiosUrl.get("/admin-vehicles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehicleList(res.data.vehicles || []);
      } catch (err) {
        console.error("❌ Lỗi fetch danh sách xe:", err);
      }
    };
    fetchVehicles();
  }, []);

  const handleChangeVehicle = (id) => {
    setSelectedId(id);
    const found = vehicleList.find((v) => v._id === id);
    setSelectedVehicle(found || null);
  };

  const handleDelete = async () => {
    if (!selectedId) {
      alert("🚫 Vui lòng chọn xe cần xoá!");
      return;
    }

    const confirm = window.confirm("⚠️ Bạn chắc chắn muốn xoá xe này? Hành động này không thể hoàn tác.");
    if (!confirm) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const res = await axiosUrl.delete(`/admin-vehicles/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.message) {
        alert("✅ Đã xoá xe thành công!");
        setVehicleList(vehicleList.filter((v) => v._id !== selectedId));
        setSelectedId("");
        setSelectedVehicle(null);
      }
    } catch (err) {
      console.error("❌ Lỗi xoá xe:", err);
      alert(err?.response?.data?.message || "Đã xảy ra lỗi khi xoá xe.");
    } finally {
      setLoading(false);
    }
  };

  const convertType = (type) => (type === "sale" ? "Đăng bán" : "Cho thuê");
  const convertCondition = (cond) => (cond === "used" ? "Đã sử dụng" : "Mới");
  const convertStatus = (status) => {
    switch (status) {
      case "draft":
        return "📦 Trong kho";
      case "available":
        return "✅ Có sẵn";
      case "sold":
        return "🛑 Đã bán";
      case "rented":
        return "🚗 Đang cho thuê";
      default:
        return status;
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>🗑️ Xoá Xe</Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Chọn xe</InputLabel>
        <Select
          value={selectedId}
          label="Chọn xe"
          onChange={(e) => handleChangeVehicle(e.target.value)}
        >
          {vehicleList.map((v) => (
            <MenuItem key={v._id} value={v._id}>
              {v.title} ({v.model})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedVehicle && (
        <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2, mb: 3 }}>
          <Grid container spacing={4} justifyContent="center">
            {/* LEFT SIDE */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{ mr: 4 , display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Typography><strong>Tên xe:</strong> {selectedVehicle.title}</Typography>
              <Typography><strong>Mô tả:</strong> {selectedVehicle.description}</Typography>
              <Typography><strong>Hãng:</strong> {selectedVehicle.brand?.name || selectedVehicle.brand}</Typography>
              <Typography><strong>Model:</strong> {selectedVehicle.model}</Typography>
              <Typography><strong>Năm sản xuất:</strong> {selectedVehicle.year}</Typography>
              <Typography><strong>Loại đăng:</strong> {convertType(selectedVehicle.type)}</Typography>
            </Grid>

            {/* RIGHT SIDE */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{ ml: 4 , display: "flex", flexDirection: "column", gap: 2 }}
            >
              {selectedVehicle.images?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  {selectedVehicle.images.map((img, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={img.url}
                      alt={`vehicle-img-${index}`}
                      sx={{
                        width: 150,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 2,
                        border: "1px solid #ccc",
                      }}
                    />
                  ))}
                </Box>
              )}
              <Typography><strong>Giá:</strong> {selectedVehicle.price?.toLocaleString()} VND</Typography>
              <Typography><strong>Tình trạng:</strong> {convertCondition(selectedVehicle.condition)}</Typography>
             {selectedVehicle.condition === "used" && selectedVehicle.user_percent && (
  <Typography>
    <strong>Hao mòn ước tính:</strong> {selectedVehicle.user_percent}%
  </Typography>
)}

              <Typography><strong>Trạng thái đăng:</strong> {convertStatus(selectedVehicle.status)}</Typography>
            </Grid>
          </Grid>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="error"
          disabled={loading || !selectedId}
          startIcon={loading && <CircularProgress size={20} />}
          onClick={handleDelete}
          sx={{ minWidth: 300 }}
        >
          {loading ? "Đang xoá..." : "Xoá xe"}
        </Button>
      </Box>
    </Box>
  );
}
