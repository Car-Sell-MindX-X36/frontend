import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
  CircularProgress,
  Slider,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import axiosUrl from "../../../../config/AxiosConfig.js";
import { toast } from "react-toastify";

export default function UpdateVehicleFull() {
  const [vehicleList, setVehicleList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      year: "",
      model: "",
      brand: "",
      type: "",
      condition: "",
      used_percent: 60,
      status: "draft",
    },
    mode: "onChange",
  });

  const condition = watch("condition");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axiosUrl.get("/admin-vehicles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehicleList(res.data.vehicles || []);
      } catch (err) {
        toast.error("❌ Lỗi fetch danh sách xe", { autoClose: 3000 });
        console.error("❌ Lỗi fetch danh sách xe:", err);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axiosUrl.get("/admin-vehicles/brands/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBrands(Array.isArray(res.data.brands) ? res.data.brands : []);
      } catch (err) {
        toast.error("❌ Lỗi fetch danh sách hãng xe", { autoClose: 3000 });
        console.error("❌ Lỗi fetch brands:", err);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const fetchVehicle = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axiosUrl.get(`/admin-vehicles/${selectedId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.vehicle;
        setVehicleData(data);
        reset({
          title: data.title,
          description: data.description,
          price: data.price,
          year: data.year,
          model: data.model,
          brand: data.brand,
          type: data.type,
          condition: data.condition,
          used_percent: data.used_percent || 60,
          status: data.status,
        });
      } catch (err) {
        toast.error("❌ Lỗi lấy thông tin xe", { autoClose: 3000 });
        console.error("❌ Lỗi lấy xe:", err);
      }
    };
    fetchVehicle();
  }, [selectedId, reset]);

  const handleImageChange = (e) => {
    setSelectedImages([...e.target.files]);
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "used_percent" && condition !== "used") return;
        data.append(key, value);
      });

      if (selectedImages.length > 0) {
        selectedImages.forEach((file) => data.append("images", file));
      }

      const res = await axiosUrl.patch(`/admin-vehicles/${selectedId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.vehicle) {
        toast.success("🚗 Cập nhật xe thành công!", { autoClose: 3000 });
        setVehicleData(res.data.vehicle);
        setSelectedImages([]); // Reset preview
      }
    } catch (err) {
      console.error("❌ Lỗi cập nhật xe:", err);
      toast.error(err?.response?.data?.message || "❌ Lỗi cập nhật xe", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>🚗 Chọn xe cần cập nhật</Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Chọn xe</InputLabel>
        <Select
          value={selectedId}
          label="Chọn xe"
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {vehicleList.map((v) => (
            <MenuItem key={v._id} value={v._id}>
              {v.title} ({v.model})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {vehicleData && (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>🧾 Cập Nhật Xe</Typography>

          <Grid container spacing={2} justifyContent="center" sx={{ columnGap: "50px" }}>
            <Grid item xs={12} md={5} sx={{ display: "flex", flexDirection: "column", gap: 2  , mr: 4   }}>
              <Controller name="title" control={control} rules={{ required: "Tiêu đề là bắt buộc" }} render={({ field }) => <TextField label="Tiêu đề" fullWidth {...field} />} />
              <Controller
                name="description"
                control={control}
                rules={{ required: "Mô tả là bắt buộc" }}
                render={({ field }) => (
                  <TextField
                    label="Mô tả"
                    fullWidth
                    multiline
                    minRows={7}
                    {...field}
                  />
                )}
              />
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Hãng xe</InputLabel>
                    <Select
                      {...field}
                      label="Hãng xe"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 35 * 5 + 8, // Hiển thị tối đa 5 item, scroll nếu nhiều hơn
                            width: 250,
                          },
                        },
                      }}
                    >
                      {brands.map((b) => (
                        <MenuItem key={b._id} value={b._id}>{b.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Controller name="model" control={control} rules={{ required: "Model là bắt buộc" }} render={({ field }) => <TextField label="Model" fullWidth {...field} />} />
              <Controller
  name="year"
  control={control}
  rules={{
    required: "Năm sản xuất là bắt buộc",
    min: {
      value: 1986,
      message: "Năm sản xuất không được nhỏ hơn 1986",
    },
  }}
  render={({ field, fieldState }) => (
    <TextField
      label="Năm sản xuất"
      type="number"
      fullWidth
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      {...field}
    />
  )}
/>

            </Grid>

            <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: 2 , ml: 4 }}>
              <Controller name="price" control={control} render={({ field }) => <TextField label="Giá" fullWidth {...field} />} />
              <Controller name="type" control={control} render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Loại xe</InputLabel>
                  <Select {...field} label="Loại xe">
                    <MenuItem value="sale">Bán</MenuItem>
                    <MenuItem value="rental">Cho thuê</MenuItem>
                  </Select>
                </FormControl>
              )} />
              <Controller name="condition" control={control} render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Tình trạng</InputLabel>
                  <Select {...field} label="Tình trạng">
                    <MenuItem value="new">Mới</MenuItem>
                    <MenuItem value="used">Đã sử dụng</MenuItem>
                  </Select>
                </FormControl>
              )} />
              <Controller name="status" control={control} render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Trạng thái</InputLabel>
                  <Select {...field} label="Trạng thái">
                    <MenuItem value="draft">Kho</MenuItem>
                    <MenuItem value="available">Có sẵn</MenuItem>
                    <MenuItem value="sold">Đã bán</MenuItem>
                    <MenuItem value="rented">Đã thuê</MenuItem>
                  </Select>
                </FormControl>
              )} />

              {condition === "used" && (
                <Box>
                  <Typography gutterBottom>Phần trăm đã qua sử dụng (%)</Typography>
                  <Controller name="used_percent" control={control} render={({ field }) => <Slider {...field} min={60} max={99} valueLabelDisplay="auto" />} />
                </Box>
              )}

              <Box>
                <Button variant="outlined" component="label">
                  TẢI ẢNH LÊN
                  <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} />
                </Button>
                {selectedImages.length > 0 ? (
                  <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
                    {selectedImages.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Ảnh ${index + 1}`}
                        style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8, border: "1px solid #ccc" }}
                      />
                    ))}
                  </Box>
                ) : vehicleData.images && vehicleData.images.length > 0 ? (
                  <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
                    {vehicleData.images.map((img, index) => (
                      <img
                        key={img._id || index}
                        src={img.url}
                        alt={`Ảnh đã có ${index + 1}`}
                        style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8, border: "1px solid #ccc" }}
                      />
                    ))}
                  </Box>
                ) : null}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
  <Button
    type="submit"
    variant="contained"
    color="primary"
    disabled={isSubmitting || !isValid}
    startIcon={isSubmitting && <CircularProgress size={20} />}
    sx={{ minWidth: 400 }}
  >
    {isSubmitting ? "Đang cập nhật..." : "Cập nhật xe"}
  </Button>
</Box>
        </Box>
      )}
    </Box>
  );
}
