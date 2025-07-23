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
import axiosUrl from "../../../../config/AxiosConfig";
import { toast } from "react-toastify";

export default function PublishVehicleForm() {
  const [vehicleList, setVehicleList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [vehicleData, setVehicleData] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    watch,
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
  const fetchDraftVehicles = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axiosUrl.get("/admin-vehicles?type=sale&status=draft", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicleList(res.data.vehicles || []);
    } catch (err) {
      toast.error("❌ Lỗi fetch danh sách xe trong kho");
      console.error("❌ Lỗi fetch draft vehicles:", err);
    }
  };

  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axiosUrl.get("/admin-vehicles/brands/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const brandList = Array.isArray(res.data.brands) ? res.data.brands : [];
      setBrands(brandList);
    } catch (err) {
      toast.error("❌ Lỗi fetch danh sách hãng xe");
      console.error("❌ Lỗi fetch hãng xe:", err);
    }
  };

  fetchDraftVehicles();
  fetchBrands();
}, []);


  useEffect(() => {
    const fetchVehicleDetail = async () => {
      if (!selectedId) return;
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
        toast.error("❌ Lỗi fetch chi tiết xe");
        console.error("❌ Lỗi fetch chi tiết xe:", err);
      }
    };
    fetchVehicleDetail();
  }, [selectedId, reset]);

  const handleImageChange = (e) => {
  const newFiles = Array.from(e.target.files);

  // Lưu ảnh đã chọn từ input, không làm mất ảnh cũ
  setSelectedImages((prev) => [...prev, ...newFiles]);
};


  const handlePublish = async (formData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "used_percent" && formData.condition !== "used") return;
        data.append(key, value);
      });

      if (selectedImages.length > 0) {
        selectedImages.forEach((file) => data.append("images", file));
      }

      const res = await axiosUrl.patch(`/admin/vehicles/${selectedId}/publish`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.vehicle) {
         toast.success("🚀 Đăng bán xe thành công!");
        setVehicleData(res.data.vehicle);
        setSelectedImages([]);
      }
    } catch (err) {
      console.error("❌ Lỗi đăng bán xe:", err);
      toast.error(err?.response?.data?.message || "❌ Lỗi khi đăng bán xe", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>🚗 Chọn xe cần đăng bán</Typography>
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

      {vehicleData && vehicleData.status === "draft" && vehicleData.type === "sale" ? (
        <Box
          component="form"
          onSubmit={handleSubmit(handlePublish)}
          sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2 }}
        >
          <Typography variant="h5" gutterBottom>📤 Đăng Bán Xe</Typography>

          <Grid container spacing={2} justifyContent="center" sx={{ columnGap: "50px" }}>
            <Grid item xs={12} md={5} sx={{ display: "flex", flexDirection: "column", gap: 2, mr: 4 }}>
              <Controller name="title" control={control} rules={{ required: "Tiêu đề là bắt buộc" }} render={({ field }) => <TextField label="Tiêu đề" fullWidth {...field} />} />
              <Controller name="description" control={control} rules={{ required: "Mô tả là bắt buộc" }} render={({ field }) => <TextField label="Mô tả" fullWidth multiline minRows={7} {...field} />} />
              <Controller name="brand" control={control} render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Hãng xe</InputLabel>
                  <Select {...field} label="Hãng xe">
                    {brands.map((b) => (
                      <MenuItem key={b._id} value={b._id}>{b.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )} />
              <Controller name="model" control={control} rules={{ required: "Model là bắt buộc" }} render={({ field }) => <TextField label="Model" fullWidth {...field} />} />
              <Controller name="year" control={control} rules={{ required: "Năm sản xuất là bắt buộc", min: { value: 1986, message: "Năm sản xuất không được nhỏ hơn 1986" } }} render={({ field, fieldState }) => (
                <TextField label="Năm sản xuất" type="number" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} {...field} />
              )} />
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: 2, ml: 4 }}>
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

              {condition === "used" && (
                <Box>
                  <Typography gutterBottom>Phần trăm đã qua sử dụng (%)</Typography>
                  <Controller name="used_percent" control={control} render={({ field }) => <Slider {...field} min={60} max={99} valueLabelDisplay="auto" />} />
                </Box>
              )}

            <Box>
  <Button variant="outlined" component="label">
    TẢI ẢNH LÊN
    <input
      type="file"
      hidden
      multiple
      accept="image/*"
      onChange={handleImageChange}
    />
  </Button>

  {(vehicleData?.images?.length > 0 || selectedImages.length > 0) && (
    <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
      {/* Ảnh đã có từ backend */}
      {vehicleData?.images?.length > 0 &&
        vehicleData.images.map((img, index) => (
          <img
            key={`existing-${img._id || index}`}
            src={img.url}
            alt={`Ảnh đã có ${index + 1}`}
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />
        ))}

      {/* Ảnh mới được chọn từ máy */}
      {selectedImages.map((file, index) => (
        <img
          key={`new-${index}`}
          src={URL.createObjectURL(file)}
          alt={`Ảnh mới ${index + 1}`}
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />
      ))}
    </Box>
  )}
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
              {isSubmitting ? "Đang đăng bán..." : "Đăng bán xe"}
            </Button>
          </Box>
        </Box>
      ) : vehicleData ? (
        <Typography color="error" mt={3}>
          ❌ Không thể đăng bán. Xe phải có <strong>status = "draft"</strong> và <strong>type = "sale"</strong>.
        </Typography>
      ) : null}
    </Box>
  );
}
