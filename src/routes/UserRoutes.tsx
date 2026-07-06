import AllCourses from "@/common/LMS/AllCourses";
import Settings from "@/common/Settings";
import ServerDeveloperSignUp from "@/components/user/ServerDeveloperSignUp";
import WorkExperience from "@/components/user/WorkExperience";
import ServerLayout from "@/Layout/ServerLayout";
import AllProgram from "@/pages/user/AllProgram";
import ServerDashBoard from "@/pages/user/ServerDashBoard";

const userRoutes = {
  path: "user",
  element: <ServerLayout />,
  children: [
    { path: "", element: <ServerDashBoard /> },
    { path: "dashboard", element: <ServerDashBoard /> },
    { path: "all-courses", element: <AllCourses /> },
    { path: "settings", element: <Settings /> },
    {
      path: "all-program",
      element: <AllProgram />,
    },
    {
      path: "experience",
      element: <WorkExperience />,
    },
    {
      path: "signup",
      element: <ServerDeveloperSignUp />,
    },
  ],
};

export default userRoutes;
