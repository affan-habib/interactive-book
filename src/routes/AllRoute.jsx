import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "@/components/Loading";
import Layout from "@/layout/Layout";
import ProtectedRoute from "../layout/ProtectedRoute";
const ExamDetails = lazy(() => import("../pages/exam-details/ExamDetails"));
const ContentSubjectDetails = lazy(() => import("../pages/content-subject/ContentSubjectDetails"));
const ContentDetails = lazy(() => import("../pages/content/ContentDetails"));
const Quiz = lazy(() => import("../pages/quiz/Quiz"));
const Home = lazy(() => import("../pages/home"));
const CourseDetails = lazy(() => import("../pages/course/CourseDetails"));
// const ContentDetails = lazy(() => import("../pages/content/ContentDetails"));
const WrittenExam = lazy(() => import("../pages/written-exam/WrittenExam"));

// Public routes
const Login = lazy(() => import("@/pages/auth/login"));
const ForgotPass = lazy(() => import("@/pages/auth/forgot-password"));
const Error = lazy(() => import("@/pages/404"));

const Dashboard = lazy(() => import("@/pages/dashboard"));

const Profile = lazy(() => import("@/pages/profile/Profile"));

// Expert Items
const ExpertDashboard = lazy(() => import("@/pages/expert/dashboard"));

const AllRoutes = () => {

  const user_type = JSON.parse(window.localStorage.getItem("user_type"));

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="dashboard" element={user_type == "Student" ? <Dashboard /> : <ExpertDashboard />} />
        {/* <Route path="expert-dashboard" element={<ExpertDashboard />} /> */}
        <Route path="course-details/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="content-details/:id" element={<ContentDetails />} />
        <Route path="content-subject-details/:id" element={<ContentSubjectDetails />} />
        <Route path="quiz/:quizId/:courseId/:resultId" element={<Quiz />} />
        <Route path="quiz/written-exam/:resultId/:quizId/:courseId" element={<ProtectedRoute><WrittenExam /></ProtectedRoute>} />
        <Route path="exam-details/:id" element={<ExamDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>

      <Route
        path="/login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <Suspense fallback={<Loading />}>
            <ForgotPass />
          </Suspense>
        }
      />

      <Route
        path="/404"
        element={
          <Suspense fallback={<Loading />}>
            <Error />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
