# Dummy Products App

A modern React application for browsing and filtering products with a responsive design and advanced filtering capabilities.

## 🚀 Features

- **Product Browsing**: View products with images, titles, prices, and categories
- **Advanced Filtering**: Search, category filter, price range, and sorting options
- **Responsive Design**: Mobile-first design with sidebar filters on small screens
- **Real-time Search**: Debounced search with loading indicators
- **Pagination**: Server-side and client-side pagination support
- **Error Handling**: Beautiful error and empty state components
- **Modern UI**: Material-UI components with custom theme

## 🏗️ Project Structure

```
src/
├── api/                    # API layer
│   └── products.ts        # Product API functions
├── assets/                 # Static assets
│   └── react.svg
├── components/             # Reusable components
│   ├── filters/           # Filter components
│   │   ├── CategoryFilter.tsx
│   │   ├── ClearFilter.tsx
│   │   ├── PriceFilter.tsx
│   │   ├── SearchBar.tsx
│   │   └── SortSelect.tsx
│   ├── ErrorState.tsx     # Error state component
│   ├── EmptyState.tsx     # Empty state component
│   ├── FilterButton.tsx   # Mobile filter button
│   ├── FilterSidebar.tsx  # Mobile filter sidebar
│   ├── Footer.tsx         # Footer component
│   ├── NavBar.tsx        # Navigation component
│   └── ProductCard.tsx   # Product card component
├── hooks/                  # Custom React hooks
│   └── useProductsQueryParams.ts
├── pages/                  # Page components
│   └── ProductsPage.tsx   # Main products page
├── theme/                  # Theme configuration
│   └── theme.ts           # Material-UI theme
├── types/                  # TypeScript type definitions
│   └── product.ts         # Product and API types
├── App.tsx                # Main app component
├── App.css                # App styles
├── index.css              # Global styles
└── main.tsx               # App entry point
```

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Material-UI (MUI)** - UI component library
- **React Query (TanStack Query)** - Data fetching and caching
- **Axios** - HTTP client
- **Vite** - Build tool and dev server
- **Lodash** - Utility functions (debounce)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dummy-products-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your API base URL:

   ```
   VITE_API_BASE_URL=https://dummyjson.com
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🎨 Design System

### Theme Configuration

The app uses a custom Material-UI theme with:

- **Primary Color**: `#1f7a8c` (Teal)
- **Secondary Color**: `#bf1363` (Pink)
- **Background**: `#f7f9fb` (Light gray)
- **Typography**: Inter font family
- **Border Radius**: 12px for cards, 2px for buttons

### Responsive Breakpoints

- **Mobile**: `< 768px` - Sidebar filters
- **Desktop**: `≥ 768px` - Inline filters

## 🔧 How It Works

### Data Flow

1. **URL Parameters**: Query parameters are managed by `useProductsQueryParams` hook
2. **API Calls**: React Query handles data fetching with caching and background updates
3. **Filtering Logic**: Smart filtering that switches between server-side and client-side based on filter complexity
4. **State Management**: URL-based state management for shareable links

### Filtering Strategy

The app uses a hybrid filtering approach:

**Server-side Filtering** (when possible):

- Basic search queries
- Category filtering
- Simple sorting
- Pagination

**Client-side Filtering** (when needed):

- Price range filtering
- Complex sorting combinations
- Multiple filter combinations

### API Integration

- **Base URL**: Configurable via environment variables
- **Endpoints**:
  - `/products` - Get all products
  - `/products/search` - Search products
  - `/products/category/{category}` - Get products by category
  - `/products/categories` - Get all categories

## 📱 Responsive Design

### Mobile Experience

- **Filter Sidebar**: Drawer that slides in from the left
- **Filter Button**: Shows active filter count with badge
- **Touch-friendly**: Large touch targets and smooth animations

### Desktop Experience

- **Inline Filters**: All filters visible in toolbar
- **Grid Layout**: Responsive product grid
- **Hover Effects**: Interactive elements with hover states

## 🎯 Key Components

### FilterSidebar

- **Purpose**: Mobile filter interface
- **Features**: Organized filter sections, scrollable content, close button
- **Responsive**: Only shows on mobile devices

### FilterButton

- **Purpose**: Mobile filter trigger
- **Features**: Filter icon, active count badge, responsive text
- **Behavior**: Opens sidebar on mobile

### ErrorState & EmptyState

- **Purpose**: User feedback components
- **Features**: Custom icons, helpful messages, action buttons
- **Design**: Consistent with app theme

## 🔍 Filtering Features

### Search

- **Debounced**: 300ms delay to prevent excessive API calls
- **Loading Indicator**: Shows search progress
- **Real-time**: Updates results as you type

### Category Filter

- **Dynamic**: Fetches categories from API
- **Dropdown**: Material-UI Select component
- **All Option**: Clear category filter

### Price Range

- **Slider**: Material-UI Slider component
- **Range Display**: Shows current min/max values
- **Client-side**: Applied after data fetch

### Sorting

- **Options**: Price (asc/desc), Name (A-Z/Z-A)
- **Server-side**: When possible for performance
- **Client-side**: For complex combinations

## 🚀 Performance Optimizations

### React Query

- **Caching**: Automatic data caching
- **Background Updates**: Fresh data without loading states
- **Placeholder Data**: Smooth transitions between pages

### Debouncing

- **Search**: Prevents excessive API calls
- **Performance**: Reduces server load

### Lazy Loading

- **Images**: Lazy loading for product images
- **Components**: Code splitting where beneficial

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
```

### Environment Variables

- `VITE_API_BASE_URL`: API base URL (default: https://dummyjson.com)

### Code Style

- **TypeScript**: Strict type checking
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (if configured)

## 📋 API Reference

### Products API

```typescript
// Get products with pagination
fetchProducts({ limit: number, skip: number }): Promise<ProductsResponse>

// Search products
searchProducts({ q: string, limit: number, skip: number }): Promise<ProductsResponse>

// Get products by category
fetchProductsByCategory(category: string, params: { limit: number, skip: number }): Promise<ProductsResponse>

// Get all categories
fetchCategories(): Promise<Category[]>

// Get all products (for client-side filtering)
fetchAllProducts(category?: string): Promise<ProductsResponse>
```

### Types

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  limit: number;
  skip: number;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **DummyJSON API** for providing the product data
- **Material-UI** for the component library
- **React Query** for data fetching
- **Vite** for the build tooling
