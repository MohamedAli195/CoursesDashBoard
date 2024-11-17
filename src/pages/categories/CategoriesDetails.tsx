import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";

import { fetchCategory } from "./categoriesFunct";
import ViewCategoryForm from "components/viewCategoriesForm/ViewCategoryForm";

function CategoriesDetails() {
    let { id } = useParams();

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['packageDetail', id],
        queryFn: () => fetchCategory(id),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;



    return (
        <>
        <ViewCategoryForm initialData ={data?.data}/>
        </>
    );
}

export default CategoriesDetails;
