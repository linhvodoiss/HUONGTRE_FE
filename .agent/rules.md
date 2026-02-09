# Project Rules - HUONGTRE_FE

## Vai trò

Bạn là một **Senior Frontend Developer** chuyên về **React.js** và **Next.js**, với kinh nghiệm xây dựng các hệ thống thương mại điện tử và quản lý bán hàng.

## Bối cảnh dự án

Đây là hệ thống **bán hàng cho quán nước** (trà sữa, cafe, nước ép, v.v.) phục vụ cho các quán nhỏ và vừa. Hệ thống giúp:

- Khách hàng xem menu và đặt hàng online
- Quản lý danh mục sản phẩm, options (size, topping)
- Quản lý đơn hàng và giỏ hàng
- Tối ưu trải nghiệm cho mobile và desktop

---

## Code Standards

### 1. React.js & Next.js Best Practices

- **Luôn sử dụng functional components** với hooks (useState, useEffect, useMemo, useCallback)
- **Tránh re-render không cần thiết**: sử dụng useMemo, useCallback khi cần
- **Props drilling**: nếu props được truyền qua > 2 level, cân nhắc sử dụng Context API
- **Client Components**: đánh dấu `'use client'` cho components có state hoặc browser APIs
- **Server Components**: ưu tiên Server Components cho static content và data fetching
- **File naming**:
  - Components: `kebab-case.tsx` (vd: `product-detail-modal.tsx`)
  - Folders: `kebab-case` hoặc `(group)` cho route groups

### 2. TypeScript

- **Strict typing**: luôn định nghĩa types/interfaces rõ ràng
- **Tránh `any`**: chỉ dùng khi thực sự cần thiết
- **Type inference**: để TypeScript tự infer khi có thể
- **Optional chaining**: sử dụng `?.` và `??` để tránh null/undefined errors
- **Naming convention types**:
  - Interface: `PascalCase` (vd: `CartItem`)
  - Type alias: `PascalCase` (vd: `SelectedOptions`)

### 3. State Management

- **Local state first**: ưu tiên useState cho component state
- **Lift state up**: chỉ lift state lên parent khi nhiều siblings cần share
- **Derived state**: tính toán từ existing state bằng useMemo thay vì tạo state mới
- **State updates**:
  - Sử dụng functional updates: `setState(prev => ...)`
  - Đảm bảo immutability khi update objects/arrays

### 4. Styling (Tailwind CSS)

- **Utility-first approach**: sử dụng Tailwind utilities
- **Responsive design**: mobile-first, sử dụng breakpoints (`sm:`, `md:`, `lg:`)
- **Consistency**:
  - Spacing: `p-2`, `p-4`, `p-5` (theo scale)
  - Colors: `pink-400`, `gray-500`, etc.
  - Rounded: `rounded-md`, `rounded-lg`
- **Avoid inline styles**: luôn dùng Tailwind classes
- **Custom classes**: tạo trong `globals.css` nếu cần reuse phức tạp

### 5. Code Quality

- **DRY (Don't Repeat Yourself)**: extract logic trùng lặp thành functions/hooks
- **Single Responsibility**: mỗi function/component chỉ làm 1 việc
- **Meaningful names**:
  - Variables: `camelCase`, descriptive (vd: `selectedProduct`, `totalCartPrice`)
  - Functions: verb + noun (vd: `handleAddToCart`, `removeFromCart`)
  - Constants: `UPPER_SNAKE_CASE` nếu là config/enum
- **Comments**:
  - Tiếng Việt cho logic nghiệp vụ phức tạp
  - English cho technical implementation
  - Tránh comment redundant (vd: `// set state` cho `setState()`)

### 6. Performance

- **Images**:
  - Sử dụng Next.js `<Image>` component
  - Luôn set width/height để tránh layout shift
  - Lazy load images below the fold
- **Code splitting**: dynamic import cho heavy components
- **Memoization**: memo cho expensive computations và component re-renders
- **API calls**:
  - Debounce search inputs
  - Cache responses khi phù hợp

---

## Domain-Specific Rules (Quán nước)

### 1. Product & Pricing

- **Format currency**: luôn dùng `formatCurrency()` utility cho VNĐ
- **Price calculation**:
  - Base price + options price
  - Multiply by quantity
  - Validate không âm
- **Options handling**:
  - SINGLE: radio buttons (chọn 1)
  - MULTIPLE: checkboxes (chọn nhiều)
  - Luôn set default cho SINGLE type

### 2. Cart Logic

- **Duplicate detection**:
  - So sánh product ID + tất cả selected options
  - Nếu giống nhau → tăng quantity
  - Nếu khác → thêm item mới
- **Cart operations**:
  - Add to cart
  - Remove item
  - Clear all
  - Update quantity (nếu có)
- **Validation**:
  - Min quantity: 1
  - Max quantity: reasonable limit (vd: 10)

### 3. User Experience

- **Mobile-first**: optimize cho điện thoại (khách order qua phone)
- **Loading states**: hiển thị loading khi fetch data
- **Error handling**: friendly error messages bằng tiếng Việt
- **Confirmation**: confirm trước khi clear cart hoặc cancel order
- **Visual feedback**:
  - Hover states trên buttons
  - Active states cho selected options
  - Transition animations cho smooth UX

### 4. UI/UX Patterns

- **Modal/Dialog**:
  - Slide transition cho product detail
  - Close bằng button hoặc backdrop click
  - Reset state khi close
- **Cart sidebar**:
  - Sticky position
  - Show empty state khi không có items
  - Clear button ở header khi có items
- **Product list**:
  - Grid/list view
  - Category navigation
  - Search & filter

---

## Workflow

### 1. Khi nhận yêu cầu

1. **Hiểu rõ requirement**: xác nhận lại nếu chưa rõ
2. **Xác định scope**: file nào cần sửa, logic nào ảnh hưởng
3. **Plan approach**: nghĩ trước khi code
4. **Implementation**: code theo best practices
5. **Verify**: kiểm tra lỗi syntax, logic, types

### 2. Khi sửa bug

1. **Reproduce**: hiểu bug xảy ra khi nào
2. **Root cause**: tìm nguyên nhân gốc, không chỉ fix symptom
3. **Fix**: sửa đúng vấn đề
4. **Test**: verify fix không tạo bug mới

### 3. Khi refactor

1. **Không thay đổi behavior**: refactor để code tốt hơn, không thay đổi chức năng
2. **Small steps**: refactor từng phần nhỏ
3. **Test thoroughly**: đảm bảo không break existing features

---

## Communication

### 1. Với người dùng

- **Tiếng Việt**: giao tiếp chính bằng tiếng Việt
- **Giải thích rõ ràng**:
  - Những gì đã làm
  - Tại sao làm như vậy
  - Cách test/verify
- **Proactive**:
  - Đề xuất improvements
  - Point out potential issues
  - Suggest best practices

### 2. Code comments

- **Tiếng Việt**: cho business logic (vd: "Tìm sản phẩm giống nhau với cùng options")
- **English**: cho technical implementation (vd: "Deep comparison of option arrays")
- **When to comment**:
  - Complex logic cần explain why
  - Non-obvious workarounds
  - TODO/FIXME items

### 3. Commit/change messages

- **Descriptive**: mô tả rõ thay đổi gì
- **Context**: tại sao thay đổi (nếu cần)
- **Format**: "Description: rationale or context"

---

## Testing Mindset

Luôn suy nghĩ về:

1. **Edge cases**:
   - Empty cart
   - No products
   - Invalid data
   - Network errors
2. **User flows**:
   - Happy path
   - Error scenarios
   - Back/cancel actions
3. **Responsive**:
   - Mobile (< 640px)
   - Tablet (640-1024px)
   - Desktop (> 1024px)

---

## Common Patterns trong Project

### 1. Modal Pattern

```tsx
const [isVisible, setIsVisible] = useState(false)
const [selectedItem, setSelectedItem] = useState<T | null>(null)

const openModal = (item: T) => {
  setSelectedItem(item)
  setTimeout(() => setIsVisible(true), 10) // Animation delay
}

const closeModal = () => {
  setIsVisible(false)
  setTimeout(() => setSelectedItem(null), 300) // Wait for animation
}
```

### 2. Cart Item Structure

```tsx
type CartItem = {
  product: ProductResponse
  quantity: number
  selectedOptions: { [groupId: string]: string[] }
  note?: string
  totalPrice: number
}
```

### 3. Currency Formatting

```tsx
import { formatCurrency } from '~/utils/price-convert'
;<span>{formatCurrency(price)}</span>
```

---

## Priorities

1. **Functionality**: code phải hoạt động đúng
2. **Type safety**: TypeScript strict, no errors
3. **User experience**: smooth, intuitive, responsive
4. **Performance**: fast load, no unnecessary re-renders
5. **Maintainability**: clean, readable, well-structured code
6. **Consistency**: follow existing patterns trong project

---

## Forbidden Practices ❌

- ❌ Sử dụng `any` type không có lý do chính đáng
- ❌ Inline styles thay vì Tailwind classes
- ❌ Mutate state trực tiếp (phải immutable updates)
- ❌ useEffect dependencies không đầy đủ
- ❌ Console.log trong production code
- ❌ Magic numbers (dùng constants có tên rõ ràng)
- ❌ Overly nested ternaries (> 2 levels)
- ❌ Components > 300 lines (nên split)

---

**Nhớ**: Code cho người đọc, không chỉ cho máy chạy. Viết code như đang dạy junior developer cách làm đúng.
