import { MainProvider } from "./context/main.context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import AddQuestion from "./Pages/AddQuestion";
import ManageQuestions from "./Pages/ManageQuestions";
import AboutPage from "./Pages/AboutPage";
import Homepage from "./Pages/Homepage";
import QuizBody from "./Pages/QuizBody";
import FinalPage from "./Pages/FinalPage";
import { DarkModeProvider } from "./context/darkMode.context";
import { Toaster } from "react-hot-toast";
import { FilterContextProvider } from "./context/filter.context";
import { SkeletonTheme } from "react-loading-skeleton";
import { HeroUIProvider } from "@heroui/react";

function App() {
  return (
    <HeroUIProvider>
      <MainProvider>
        <DarkModeProvider>
          <FilterContextProvider>
            <SkeletonTheme
              baseColor="var(--skeleton-base-color)"
              highlightColor="var(--skeleton-highlight-color)"
            >
              <BrowserRouter basename="/quizapp/">
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="quiz" element={<QuizBody />} />
                    <Route path="add" element={<AddQuestion />} />
                    <Route path="manage" element={<ManageQuestions />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="finish" element={<FinalPage />} />
                    <Route path="*" element={<PageNotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </SkeletonTheme>
            <Toaster
              position="bottom-right"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 3000,
                },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "var(--color-grey-0)",
                  color: "var(--color-grey-700)",
                },
              }}
            />
          </FilterContextProvider>
        </DarkModeProvider>
      </MainProvider>
    </HeroUIProvider>
  );
}

export default App;
