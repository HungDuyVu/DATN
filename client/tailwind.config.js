/** @type {import('tailwindcss').Config} */
module.exports = {
  // Kích hoạt chế độ dark mode. "class" có nghĩa là chế độ dark được điều khiển qua class "dark".
  darkMode: ["class"],

  // Khai báo các file nơi Tailwind sẽ quét để tìm các lớp CSS được sử dụng.
  content: [
    './pages/**/*.{js,jsx}', // Tất cả các file trong thư mục "pages" có phần mở rộng là .js hoặc .jsx.
    './components/**/*.{js,jsx}', // Tương tự cho "components".
    './app/**/*.{js,jsx}', // Tương tự cho "app".
    './src/**/*.{js,jsx}', // Tương tự cho "src".
  ],

  // Tiền tố cho các lớp CSS (nếu cần). Ở đây không sử dụng tiền tố.
  prefix: "",

  theme: {
    // Cấu hình container:
    container: {
      center: true, // Container sẽ được căn giữa.
      padding: "2rem", // Padding mặc định của container là 2rem.
      screens: {
        "2xl": "1400px", // Container sẽ không rộng hơn 1400px trên màn hình lớn hơn 2xl.
      },
    },

    // Mở rộng theme mặc định của Tailwind:
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'], 
      },
      // Cấu hình màu sắc:
      colors: {
        red: "#FE5454",
        blue: "#60B3F5",
        gray: '#E5E7EB',
        white: '#FFFFFF',
        pink: '#FCDBC9',
        gray: '#F2F2F2',
        main: "#FDACA0",
        border: "hsl(var(--border))", // Màu của viền dựa trên biến CSS --border.
        input: "hsl(var(--input))", // Màu nền của input.
        ring: "hsl(var(--ring))", // Màu của hiệu ứng focus (ring).
        background: "hsl(var(--background))", // Màu nền tổng thể.
        foreground: "hsl(var(--foreground))", // Màu của nội dung văn bản.
        primary: {
          DEFAULT: "hsl(var(--primary))", // Màu chính (primary).
          foreground: "hsl(var(--primary-foreground))", // Màu chữ khi nằm trên nền primary.
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Màu phụ (secondary).
          foreground: "hsl(var(--secondary-foreground))", // Màu chữ khi nằm trên nền secondary.
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // Màu cho các hành động nguy hiểm (destructive).
          foreground: "hsl(var(--destructive-foreground))", // Màu chữ khi nằm trên nền destructive.
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // Màu muted (nhẹ, không nổi bật).
          foreground: "hsl(var(--muted-foreground))", // Màu chữ khi nằm trên nền muted.
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Màu điểm nhấn (accent).
          foreground: "hsl(var(--accent-foreground))", // Màu chữ khi nằm trên nền accent.
        },
        popover: {
          DEFAULT: "hsl(var(--popover))", // Màu nền của popover.
          foreground: "hsl(var(--popover-foreground))", // Màu chữ khi nằm trên nền popover.
        },
        card: {
          DEFAULT: "hsl(var(--card))", // Màu nền của card.
          foreground: "hsl(var(--card-foreground))", // Màu chữ khi nằm trên nền card.
        },
      },

      // Cấu hình bán kính bo góc (border-radius):
      borderRadius: {
        lg: "var(--radius)", // Giá trị lớn nhất, đọc từ biến CSS --radius.
        md: "calc(var(--radius) - 2px)", // Giá trị trung bình, giảm 2px so với --radius.
        sm: "calc(var(--radius) - 4px)", // Giá trị nhỏ nhất, giảm 4px so với --radius.
      },

      // Khai báo keyframes để tạo animation:
      keyframes: {
        "accordion-down": {
          from: { height: "0" }, // Bắt đầu từ chiều cao 0.
          to: { height: "var(--radix-accordion-content-height)" }, // Đến chiều cao nội dung của accordion.
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" }, // Bắt đầu từ chiều cao nội dung.
          to: { height: "0" }, // Kết thúc ở chiều cao 0.
        },
      },

      // Định nghĩa animation dựa trên keyframes:
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out", // Hiệu ứng mở accordion với thời gian 0.2 giây.
        "accordion-up": "accordion-up 0.2s ease-out", // Hiệu ứng đóng accordion với thời gian 0.2 giây.
      },
    },
  },

  // Khai báo plugin của Tailwind:
  plugins: [require("tailwindcss-animate")], // Sử dụng plugin để hỗ trợ animation.
}
