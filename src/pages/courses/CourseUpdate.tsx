import { useLocation, useNavigate, useParams } from "react-router-dom"
import { fetchCourse } from "./coursesFunct";
import { useQuery } from "@tanstack/react-query";
import ViewPackageForm from "components/viewpackageForm";
import { useEffect } from "react";
import i18n from "i18n";
import { Button, Stack, Typography } from "@mui/material";
import paths from "routes/path";
import { useTranslation } from "react-i18next";
import ViewCoursForm from "components/viewCoursForm";
import UpdateCourse from "./Update";
// import EditCoursForm from "components/editCoursForm";

function CourseUpdate() {
    const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['packageDetail', id],
        queryFn: () => fetchCourse(id),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;


// console.log(data.data)
    return (
        <>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
        
        <Typography variant="h1" color="initial">
        {t("coursepage")} update
        </Typography>

        </Stack>
        
        {/* <EditCoursForm initialData ={data?.data}/> */}
        <UpdateCourse {... data.data} />
       
        </>
    );
}

export default CourseUpdate;
