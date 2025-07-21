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
import axiosUrl from "../../../../config/AxiosConfig.js"; // import file cấu hình axios

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
    watch,
    reset,
    setValue,
    formState: { isSubmitting, isValid },
  } = useForm({ defaultValues, mode: "onChange" });

  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState([]);
  const condition = useWatch({ control, name: "condition" });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        // Sửa lại endpoint cho đúng với backend
        const res = await axiosUrl.get("/brands/all");
        setBrands(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Lỗi fetch brands:", err);
        setBrands([]);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (condition === "new") {
      setValue("used_percent", 60);
    }
  }, [condition, setValue]);

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files);
    setImages((prev) => [...prev, ...selected]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(defaultValues).forEach(([key]) => {
      formData.append(key, data[key]);
    });

    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const token = localStorage.getItem("accessToken"); // ✅ đúng key
      const res = await axiosUrl.post("/admin-vehicles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ Thêm token đúng format
        },
      });
      alert("🚗 Xe đã tạo thành công!");
      reset();
      setImages([]);
      // Xử lý res từ backend nếu cần
      // console.log(res.data);
    } catch (err) {
      console.error("❌ Tạo xe thất bại:", err);
      alert("❌ Lỗi khi tạo xe");
    }
  };

return (
  <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
    <Typography variant="h5" gutterBottom>
      🧾 Thêm Xe Mới
    </Typography>
    <Grid container spacing={2} justifyContent="center" alignItems="flex-start" sx={{ columnGap: "50px" }}>
      {/* Cột trái */}
      <Grid
        item
        xs={12}
        md={5}
        display="flex"
        flexDirection="column"
        sx={{ gap: 2, pr: { md: 2 }, minWidth: 320 }}
      >
        <Controller
          name="title"
          control={control}
          rules={{ required: "Vui lòng nhập tiêu đề" }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              label="Tiêu đề"
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
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
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Mô tả"
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="brand"
          control={control}
          rules={{ required: "Chọn hãng xe" }}
          render={({ field, fieldState }) => (
            <FormControl fullWidth error={!!fieldState.error}>
              <InputLabel>Hãng xe</InputLabel>
              <Select {...field} label="Hãng xe">
                {brands.map((b) => (
                  <MenuItem key={b._id} value={b._id}>
                    {b.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="model"
          control={control}
          render={({ field }) => (
            <TextField fullWidth label="Model" {...field} />
          )}
        />
        <Controller
          name="year"
          control={control}
          rules={{ required: "Nhập năm sản xuất" }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              type="number"
              label="Năm sản xuất"
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      {/* Cột phải */}
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        flexDirection="column"
        sx={{ gap: 2, pl: { md: 2 }, minWidth: 320 }}
      >
        <Controller
          name="price"
          control={control}
          rules={{ required: "Nhập giá" }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              type="number"
              label="Giá"
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
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
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
        </Box>
      </Grid>
    </Grid>
    {/* Nút submit nằm ngoài grid lớn, dưới cùng và chính giữa */}
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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
