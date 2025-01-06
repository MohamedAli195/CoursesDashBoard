import axios from "axios";
import i18n from "i18n";
import toast from "react-hot-toast";


const url = import.meta.env.VITE_API_URL;
  // Delete package function
export   const deletePackage = async (id: number,refetch:()=>void) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    try {
      await axios.delete(
        `${url}/admin/packages/${id}/destroy`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(`Package with ID ${id} deleted successfully`); 
      refetch()
    } catch (error) {
      // console.error('Failed to delete package:', error);
      toast.error('Error deleting package');
    }
  };


    /// Api requestes
    export const fetchPackages = async (page=1,perpage=10,search='',sort_dir:string) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    const response = await axios.get(
      `${url}/admin/packages?per_page=${perpage}&page=${page}&search=${search}&sort_direction=${sort_dir}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept:'application/json',
          lang:i18n.language
        },
      },
    );

    return response.data;
  };
  /// Api requestes
  export const fetchPackagesForCourses = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    const response = await axios.get(
      `${url}/admin/packages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept:'application/json',
          lang:i18n.language
        },
      },
    );

    return response.data;
  };

      /// Api requestes
      export const fetchPackage = async (id:number|undefined|string) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authorization token is missing");
    
        try {
            const response = await axios.get(
                `${url}/admin/packages/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching package details:", error); // Log full error
            throw error; // Rethrow to handle in useQuery's error state
        }
    };