// // import axios from "axios";
// // import Nprogress from "nprogress";
// // import "nprogress/nprogress.css"; // Import CSS cho Nprogress

// // // Cấu hình Nprogress
// // Nprogress.configure({
// //   showSpinner: false,
// //   trickleSpeed: 100,
// // });

// // // Tạo instance Axios
// // const instance = axios.create({
// //   baseURL: "https://quizzlet-19y7.onrender.com/", // Kiểm tra baseURL
// // });

// // // Interceptor cho request
// // instance.interceptors.request.use(
// //   (config) => {
// //     Nprogress.start();
// //     return config;
// //   },
// //   (error) => {
// //     Nprogress.done();
// //     console.error("Request error:", error); // Log lỗi request
// //     return Promise.reject(error);
// //   }
// // );

// // // Interceptor cho response
// // instance.interceptors.response.use(
// //   (response) => {
// //     Nprogress.done();
// //     // Kiểm tra nếu response chứa `message` hoặc `quiz`
// //     // if (response.data?.message) {
// //     //   console.log(response.data.message); // Log thông báo để xác nhận
// //     // }
// //     // console.log(response.data);

// //     return response.data || response; // Trả về dữ liệu đầy đủ
// //   },
// //   (error) => {
// //     Nprogress.done();
// //     console.error("Response error:", error); // Log lỗi response
// //     return Promise.reject(
// //       error?.response?.data?.message || error // Trả về message hoặc reject lỗi
// //     );
// //   }
// // );

// // export default instance;

// import axios from "axios";
// import Nprogress from "nprogress";
// import "nprogress/nprogress.css"; // Import CSS cho Nprogress
// import { toast } from "react-toastify";

// // Cấu hình Nprogress
// Nprogress.configure({
//   showSpinner: false,
//   trickleSpeed: 100,
// });

// // Tạo instance Axios
// const instance = axios.create({
//   // baseURL: "https://quizzlet-19y7.onrender.com/", // Kiểm tra baseURL
//   baseURL: "https://qlctt.kain.id.vn/", // Kiểm tra baseURL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Interceptor cho request
// instance.interceptors.request.use(
//   (config) => {
//     Nprogress.start();

//     // Lấy token từ localStorage và thêm vào header Authorization nếu có
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     Nprogress.done();
//     console.error("Request error:", error); // Log lỗi request
//     return Promise.reject(error);
//   }
// );

// // Interceptor cho response
// instance.interceptors.response.use(
//   (response) => {
//     Nprogress.done();
//     return response.data || response; // Trả về dữ liệu đầy đủ
//   },
//   (error) => {
//     Nprogress.done();
//     console.error("Response error:", error); // Log lỗi response

//     if (error.response && error.response.status === 401) {
//       localStorage.clear();
//       // Hiển thị thông báo lỗi nếu token hết hạn
//       toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại");

//       setTimeout(() => {
//         window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
//       }, 1000);
//     } else {
//       toast.error(error?.response?.data?.message || "Đã xảy ra lỗi");
//     }

//     return Promise.reject(error?.response?.data?.message || error); // Trả về message lỗi hoặc reject lỗi
//   }
// );

// export default instance;

import axios from "axios";
import Nprogress from "nprogress";
import "nprogress/nprogress.css"; // Import CSS cho Nprogress
import { toast } from "react-toastify";

// Cấu hình Nprogress
Nprogress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

// Tạo instance Axios
const instance = axios.create({
  baseURL: "https://qlctt.kain.id.vn/", // Kiểm tra baseURL
  // baseURL: "http://localhost:3435/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request
instance.interceptors.request.use(
  (config) => {
    Nprogress.start();

    // Lấy token từ localStorage và thêm vào header Authorization nếu có
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("token", token);
    return config;
  },
  (error) => {
    Nprogress.done();
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Helper function to refresh token
const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("No refresh token found.");
  }

  const response = await axios.post(
    "https://qlctt.kain.id.vn/auth/refresh",
    // "localhost:3435/auth/refresh",
    {
      refresh_token: refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );

  // Save new tokens to localStorage
  const { access_token, refresh_token } = response.data;
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);

  return access_token;
};

// Interceptor cho response
instance.interceptors.response.use(
  (response) => {
    Nprogress.done();
    return response.data || response; // Trả về dữ liệu đầy đủ
  },
  async (error) => {
    Nprogress.done();
    console.error("Response error:", error);

    if (error.response && error.response.status === 401) {
      // Token hết hạn, thử làm mới token
      try {
        const newAccessToken = await refreshToken();

        // Sau khi lấy token mới, retry lại request gốc với access token mới
        const config = error.config;
        config.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the failed request
        return instance(config);
      } catch (refreshError) {
        // Nếu refresh thất bại, logout và chuyển hướng đến trang login
        localStorage.clear();
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại");

        setTimeout(() => {
          window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
        }, 1000);

        return Promise.reject(refreshError);
      }
    } else {
      toast.error(error?.response?.data?.message || "Đã xảy ra lỗi");
      return Promise.reject(error?.response?.data?.message || error);
    }
  }
);

export default instance;
