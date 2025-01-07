import axios from "axios";
import i18n from "i18n";
import toast from "react-hot-toast";


const url = import.meta.env.VITE_API_URL;
  // Delete package function
export   const deleteAnyThing = async (id: number,refetch:()=>void ,module:string) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    try {
      await axios.delete(
        `${url}/admin/${module}/${id}/destroy`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(`${module} with ID ${id} deleted successfully`); 
      refetch()
    } catch (error) {
      // console.error('Failed to delete package:', error);
      toast.error('Error deleting package');
    }
  };


    /// Api requestes
    export const fetchAllData = async (page=1,perpage=1,search='',sort_dir:string,typeFilter='',module:string) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    const response = await axios.get(
      `${url}/admin/${module}?per_page=${perpage}&page=${page}&search=${search}&sort_direction=${sort_dir}&type=${typeFilter}`,
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
  export const fetchPackagesOrCAtegoriesForCourses = async (module:string) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    const response = await axios.get(
      `${url}/admin/${module}`,
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

      /// Api requestes tomorow
      export const fetchOne = async (id:number|undefined|string,module:string) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authorization token is missing");
    
        try {
            const response = await axios.get(
                `${url}/admin/${module}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${module} details:`, error); // Log full error
            throw error; // Rethrow to handle in useQuery's error state
        }
    };


    export const updateStatus = async (id:number|undefined,path:string,status2:string) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token is missing");
  
      try {
          const response = await axios.post(
              `${url}/admin/${path}/${id}/change-status`,
              {status : status2},
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
          // console.log(response)
      } catch (error) {
          console.error("Error fetching package details:", error); // Log full error
          throw error; // Rethrow to handle in useQuery's error state
      }
  };