// src/contexts/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// bạn đang chạy json-server ở 3001, nên để base thế này
const API_BASE = "http://localhost:3001";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("auth_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("auth_token") || "";
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    global: "",
  });

  // gắn token vào axios (nếu sau này bạn dùng backend thật)
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const clearErrors = useCallback(() => {
    setErrors({
      email: "",
      password: "",
      global: "",
    });
  }, []);

  const login = async (emailOrUser, password) => {
    const identifier = (emailOrUser || "").trim();
    const rawPassword = password || "";

    // validate form
    const nextErrors = { email: "", password: "", global: "" };
    let hasError = false;
    if (!identifier) {
      nextErrors.email = "Không được để trống";
      hasError = true;
    }
    if (!rawPassword) {
      nextErrors.password = "Mật khẩu không được để trống";
      hasError = true;
    }
    if (hasError) {
      setErrors(nextErrors);
      return false;
    }

    setLoading(true);
    setErrors({ email: "", password: "", global: "" });

    // 1) THỬ LOGIN BACKEND THẬT (/api/auth/login)
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email: identifier,
        password: rawPassword,
      });

      const payload = res.data || {};
      const gotUser = payload.user || payload.data || null;
      const gotToken = payload.token || payload.accessToken || "";

      if (!gotUser) {
        setErrors({
          email: "",
          password: "",
          global: "Đăng nhập thất bại: dữ liệu trả về không hợp lệ",
        });
        return false;
      }

      setUser(gotUser);
      setToken(gotToken);
      localStorage.setItem("auth_user", JSON.stringify(gotUser));
      if (gotToken) {
        localStorage.setItem("auth_token", gotToken);
      }
      return true;
    } catch (err) {
      // nếu là 404 hoặc không có route → fallback sang json-server
      const status = err?.response?.status;
      if (status && status !== 404) {
        // backend có route nhưng báo sai thông tin
        const apiMsg =
          err?.response?.data?.error?.message ||
          err?.response?.data?.message ||
          "Email hoặc mật khẩu không đúng";
        setErrors({
          email: "",
          password: "",
          global: apiMsg,
        });
        setLoading(false);
        return false;
      }
    }

    // 2) FALLBACK: LOGIN BẰNG JSON-SERVER (/users?username=...&password=...)
    try {
      // db.json của bạn: field là "username", không phải email
      const res = await axios.get(`${API_BASE}/users`, {
        params: {
          username: identifier,
          password: rawPassword,
        },
      });

      const list = Array.isArray(res.data) ? res.data : [];
      if (list.length === 0) {
        setErrors({
          email: "",
          password: "",
          global: "Sai username hoặc mật khẩu (json-server)",
        });
        return false;
      }

      const found = list[0];
      // mô phỏng user giống backend thật
      const mappedUser = {
        id: found.id,
        fullName: found.fullName,
        username: found.username,
        role: found.role,
      };

      setUser(mappedUser);
      setToken(""); // json-server không có token
      localStorage.setItem("auth_user", JSON.stringify(mappedUser));
      // không set token vì json-server không cấp
      return true;
    } catch (err2) {
      setErrors({
        email: "",
        password: "",
        global: "Không kết nối được json-server tại http://localhost:3001",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    errors,
    clearErrors,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
