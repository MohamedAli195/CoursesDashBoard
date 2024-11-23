import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";

import { fetchCategory } from "./categoriesFunct";
import ViewCategoryForm from "components/viewCategoriesForm/ViewCategoryForm";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function CategoriesDetails() {
    let { id } = useParams();
    const { t, i18n } = useTranslation();
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['packageDetail', id],
        queryFn: () => fetchCategory(id),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;



    return (
        <>
        <Typography variant="h1" color="initial">
        {t("categorypage")}
        </Typography>
        <ViewCategoryForm initialData ={data?.data}/>
        </>
    );
}

export default CategoriesDetails;
