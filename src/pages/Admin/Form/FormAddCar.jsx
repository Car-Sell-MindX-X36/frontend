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
  Slider,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import axiosUrl from "../../../../config/AxiosConfig.js";

const defaultValues = {
  title: "",
  description: "",
  brand: "",
  model: "",
  year: "",
  price: "",
  type: "sale",
  condition: "new",
  status: "draft",
  used_percent: 60,
};

const CreateVehicleForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, isValid },
  } = useForm({ defaultValues, mode: "onChange" });

  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState([]);
  const condition = useWatch({ control, name: "condition" });

  // 🔁 Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axiosUrl.get("/admin-vehicles/brands/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBrands(Array.isArray(res.data.brands) ? res.data.brands : []);
      } catch (err) {
        console.error("❌ Lỗi fetch brands:", err);
        setBrands([]);
      }
    };
    fetchBrands();
  }, []);

  // ⛽ Reset used_percent nếu xe mới
  useEffect(() => {
    if (condition === "new") {
      setValue("used_percent", 60);
    }
  }, [condition, setValue]);

  // 🖼️ Thêm ảnh
  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files);
    setImages((prev) => [...prev, ...selected]);
  };

  // ✅ Submit form
  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axiosUrl.post("/admin-vehicles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert("🚗 Xe đã tạo thành công!");
      reset();
      setImages([]);
    } catch (err) {
      console.error("❌ Tạo xe thất bại:", err);
      alert("❌ Lỗi khi tạo xe");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        🧾 Thêm Xe
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ columnGap: "50px" }}
      >
        {/* Cột trái */}
        <Grid item xs={12} md={5} sx={{ gap: 2, display: "flex", flexDirection: "column", minWidth: 320 }}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Vui lòng nhập tiêu đề" }}
            render={({ field, fieldState }) => (
              <TextField fullWidth label="Tiêu đề" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: "Vui lòng nhập mô tả",
              minLength: { value: 10, message: "Tối thiểu 10 ký tự" },
            }}
            render={({ field, fieldState }) => (
              <TextField fullWidth multiline rows={3} label="Mô tả" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
          <Controller
  name="brand"
  control={control}
  rules={{ required: "Chọn hãng xe" }}
  render={({ field, fieldState }) => (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>Hãng xe</InputLabel>
      <Select
        {...field}
        label="Hãng xe"
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 5 + 8, // 👈 hạn chế dropdown cao quá
              width: 250,
            },
          },
        }}
      >
        {brands.map((b) => (
          <MenuItem key={b._id} value={b._id}>
            {b.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )}
/>

          <Controller name="model" control={control} render={({ field }) => <TextField fullWidth label="Model" {...field} />} />
          <Controller
  name="year"
  control={control}
  rules={{
  required: "Nhập năm sản xuất",
  min: { value: 1986, message: "Năm thấp nhất là 1986" },
  max: { value: new Date().getFullYear(), message: "Không vượt quá năm hiện tại" }
}}

  render={({ field, fieldState }) => (
    <TextField
      fullWidth
      type="number"
      label="Năm sản xuất"
      inputProps={{ min: 1986, max: new Date().getFullYear() }}
      {...field}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  )}
/>
<Controller
            name="price"
            control={control}
            rules={{ required: "Nhập giá" }}
            render={({ field, fieldState }) => (
              <TextField fullWidth type="number" label="Giá" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />

        </Grid>

        {/* Cột phải */}
        <Grid item xs={12} md={6} sx={{ gap: 2, display: "flex", flexDirection: "column", minWidth: 320 }}>
          
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Loại xe</InputLabel>
                <Select {...field} label="Loại xe">
                  <MenuItem value="sale">Bán</MenuItem>
                  <MenuItem value="rental">Cho thuê</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="condition"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Tình trạng</InputLabel>
                <Select {...field} label="Tình trạng">
                  <MenuItem value="new">Mới</MenuItem>
                  <MenuItem value="used">Đã sử dụng</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select {...field} label="Trạng thái">
                  <MenuItem value="draft">Kho</MenuItem>
                  <MenuItem value="available">Có sẵn</MenuItem>
                  <MenuItem value="sold">Đã bán</MenuItem>
                  <MenuItem value="rented">Đã thuê</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {condition === "used" && (
            <Box>
              <Typography gutterBottom>Phần trăm đã sử dụng (%)</Typography>
              <Controller
                name="used_percent"
                control={control}
                render={({ field }) => (
                  <Slider {...field} min={60} max={99} valueLabelDisplay="auto" />
                )}
              />
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

  {/* Thông báo số ảnh đã chọn */}
  {images.length > 0 && (
    <>
      <Typography variant="caption" color="textSecondary" mt={1}>
        Đã chọn {images.length} ảnh
      </Typography>

      {/* Preview ảnh được chọn */}
      <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
        {images.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt={`Ảnh ${index + 1}`}
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
    </>
  )}
</Box>



        </Grid>
      </Grid>

      {/* Nút submit */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting || !isValid}
          startIcon={isSubmitting && <CircularProgress size={20} />}
          sx={{ minWidth: 400 }}
        >
          {isSubmitting ? "Đang tạo..." : "Thêm xe"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateVehicleForm;
