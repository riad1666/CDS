import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { UserDashboard } from "./pages/UserDashboard";
import { ShoppingPage } from "./pages/ShoppingPage";
import { CookingSchedulePage } from "./pages/CookingSchedulePage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UserManagement } from "./pages/admin/UserManagement";
import { NoticeManagement } from "./pages/admin/NoticeManagement";
import { ExpenseManagement } from "./pages/admin/ExpenseManagement";
import { SettlementManagement } from "./pages/admin/SettlementManagement";
import { Analytics } from "./pages/admin/Analytics";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/dashboard",
    Component: UserDashboard,
  },
  {
    path: "/shopping",
    Component: ShoppingPage,
  },
  {
    path: "/cooking",
    Component: CookingSchedulePage,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
    children: [
      {
        index: true,
        Component: UserManagement,
      },
      {
        path: "users",
        Component: UserManagement,
      },
      {
        path: "expenses",
        Component: ExpenseManagement,
      },
      {
        path: "settlements",
        Component: SettlementManagement,
      },
      {
        path: "cooking",
        Component: CookingSchedulePage,
      },
      {
        path: "notices",
        Component: NoticeManagement,
      },
      {
        path: "analytics",
        Component: Analytics,
      },
    ],
  },
]);
