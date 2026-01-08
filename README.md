# dgz-ui-shared

A robust, shared UI library built for React applications using TypeScript, Tailwind CSS, and `dgz-ui`. This library provides a collection of high-level components, hooks, and utilities to streamline development, featuring advanced data tables, form integrations, and responsive design patterns.

## Features

- **Advanced Data Table**: A feature-rich table component with server-side pagination, sorting, filtering, searching, column visibility management, and export capabilities.
- **Form Components**: Wrappers for common form inputs (`Input`, `Select`, `DatePicker`, `Checkbox`, etc.) seamlessly integrated with `react-hook-form` and `zod` validation.
- **Confirmation Dialogs**: Promise-based confirmation modals (including password confirmation) via the `useConfirm` hook.
- **UI Patterns**: Ready-to-use components for Modals, Galleries, Tooltips, and Loaders.
- **Theming**: Built-in dark/light mode support with `ThemeProvider` and `ThemeToggle`.
- **Responsive Utilities**: Hooks for managing media queries and responsive layouts.
- **Internationalization**: Built with `i18next` support for easy localization.

## Installation

Install the package via npm:

```bash
npm install dgz-ui-shared
```

Ensure you have the required peer dependencies installed:

```bash
npm install react react-dom dayjs
```

## Setup

### 1. Import Styles

Import the library's CSS in your main entry file (e.g., `main.tsx` or `App.tsx`):

```tsx
import 'dgz-ui-shared/dist/dgz-ui-shared.css';
```

### 2. Theme Provider

Wrap your application with the `ThemeProvider` to enable theme management:

```tsx
import { ThemeProvider } from 'dgz-ui-shared/providers';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <YourApp />
    </ThemeProvider>
  );
}
```

## Usage Examples

### Data Table

The `DataTable` component is the centerpiece of this library. It handles complex data presentation needs with minimal boilerplate.

```tsx
import { DataTable } from 'dgz-ui-shared/components/datatable';
import { useDataTable } from 'dgz-ui-shared/hooks';

const MyUserTable = () => {
  // Define columns
  const columns = [
    { key: 'name', dataIndex: 'name', name: 'Name', sortable: true },
    { key: 'email', dataIndex: 'email', name: 'Email' },
    { key: 'role', dataIndex: 'role', name: 'Role' },
  ];

  // Example data source (usually from an API)
  const dataSource = {
    docs: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      // ... more data
    ],
    page: 1,
    limit: 10,
    totalPages: 5,
    total: 50,
  };

  const handleParamChange = (params) => {
    console.log('Fetch new data with:', params);
  };

  return (
    <DataTable
      tableKey="user-table"
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      onParamChange={handleParamChange}
      hasPagination
      hasSearch
      hasColumnsVisibilityDropdown
      hasCheckbox
    />
  );
};
```

### Form Components

Use the `My*` form components to build accessible, validated forms with `react-hook-form`.

```tsx
import { useForm } from 'react-hook-form';
import { MyInput, MySelect } from 'dgz-ui-shared/components/form';
import { Button } from 'dgz-ui/button'; // Assuming you have base UI components

const SignUpForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <MyInput
        control={control}
        name="username"
        label="Username"
        required
        placeholder="Enter your username"
      />

      <MySelect
        control={control}
        name="role"
        label="Role"
        options={[
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
        ]}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};
```

### Confirmation Dialogs

Trigger confirmation modals programmatically using `useConfirm`.

```tsx
import { useConfirm } from 'dgz-ui-shared/hooks';
import { Button } from 'dgz-ui/button';

const DeleteButton = () => {
  const { confirm } = useConfirm();

  const handleDelete = () => {
    confirm({
      onConfirm: () => {
        console.log('Item deleted!');
      },
    });
  };

  return <Button onClick={handleDelete}>Delete Item</Button>;
};
```

### Image Gallery

Display a responsive grid of images with a fullscreen viewer.

```tsx
import { MyGallery } from 'dgz-ui-shared/components/gallery';

const images = [
  {
    id: '1',
    src: 'https://example.com/large.jpg',
    thumbnail: 'https://example.com/thumb.jpg',
    alt: 'Example Image',
    title: 'Beautiful Scenery',
  },
];

const GalleryPage = () => {
  return <MyGallery images={images} hasInfo />;
};
```

## Available Components

| Category         | Components                                                                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Data Display** | `DataTable`, `MyTable`, `MyGallery`                                                                                                                          |
| **Form**         | `MyInput`, `MySelect`, `MyCheckbox`, `MyRadio`, `MySwitch`, `MyTextarea`, `MyDatePicker`, `MyDateRangePicker`, `MyTimePicker`, `MyHtmlEditor`, `MyMaskInput` |
| **Feedback**     | `Loader`, `Spin`, `Empty`                                                                                                                                    |
| **Overlays**     | `MyModal`, `Confirm`, `PasswordConfirm`, `MyTooltip`                                                                                                         |
| **Navigation**   | `MyPagination`, `MyLimitSelect`                                                                                                                              |
| **Utils**        | `ThemeToggle`, `ExportData`, `FilterWrapper`, `Search`                                                                                                       |

## Hooks

| Hook                 | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `useDataTable`       | Manages row selection and table state.               |
| `useColumns`         | Manages column visibility and persistence.           |
| `useConfirm`         | Provides imperative API for confirmation dialogs.    |
| `useTheme`           | Access and toggle current theme (light/dark/system). |
| `useFilter`          | Syncs filter state with URL parameters or form.      |
| `useMediaQuerySizes` | Responsive breakpoints helpers.                      |

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/Alisher1119/dgz-ui-shared.git
cd dgz-ui-shared
npm install
```

### Available Scripts

- `npm run dev`: Start the development server (Vite).
- `npm run build`: Build the library for production.
- `npm run lint`: Lint the codebase.
- `npm run format`: Format code with Prettier.
- `npm run test`: Run tests with Vitest.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[Alisher Khayrillaev](https://github.com/Alisher1119)
