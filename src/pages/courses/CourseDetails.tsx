import { useLocation, useNavigate, useParams } from "react-router-dom"
import { fetchCourse } from "./coursesFunct";
import { useQuery } from "@tanstack/react-query";
import ViewPackageForm from "components/viewpackageForm";
import { useEffect } from "react";
import i18n from "i18n";
import { Button, Typography } from "@mui/material";
import paths from "routes/path";

function CourseDetails() {
    let { id } = useParams();
  const navigate = useNavigate();


    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['packageDetail', id],
        queryFn: () => fetchCourse(id),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;



    return (
        <>
        <Typography variant="h1" color="initial">
          Courses Details 
        </Typography>
        <ViewPackageForm initialData ={data?.data}/>
        <Button variant="contained" color="info" onClick={() => navigate(`${paths.courses}/${id}/add-lectuer`)}>
          Add Course Lectuer
        </Button>
        </>
    );
}

export default CourseDetails;
