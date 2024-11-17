import { useLocation, useParams } from "react-router-dom"
import { fetchPackage } from "./packagesFunct";
import { useQuery } from "@tanstack/react-query";
import ViewPackageForm from "components/viewpackageForm";
import { useEffect } from "react";
import i18n from "i18n";

function PackageDetails() {
    let { id } = useParams();

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['packageDetail', id],
        queryFn: () => fetchPackage(id),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;



    return (
        <>
        <ViewPackageForm initialData ={data?.data}/>
        </>
    );
}

export default PackageDetails;
