import axios from "axios";
import i18n from "i18n";
import toast from "react-hot-toast";

const url = 'https://market-mentor.flexi-code.com/public/api/admin/'

  // Delete package function
export   const deleteCourse = async (id: number,refetch:()=>void) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    try {
      await axios.delete(
        `${url}courses/${id}/destroy`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        },
      );
      toast.success(`Package with ID ${id} deleted successfully`); 
      refetch()
    } catch (error) {
      console.error('Failed to delete package:', error);
      toast.error('Error deleting package');
    }
  };


    /// Api requestes
    export const fetchCourses = async (page=1,perpage=10,search='',sort_dir='') => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    const response = await axios.get(
      `${url}courses?per_page=${perpage}&page=${page}&search=${search}&sort_direction=${sort_dir}`,
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
      export const fetchCourse = async (id:string|undefined) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authorization token is missing");
    
        try {
            const response = await axios.get(
                `${url}courses/${id}`,
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

        /// Api requestes
        export const updateStatus = async (id:number|undefined,path:string,status2:string) => {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("Authorization token is missing");
      
          try {
              const response = await axios.post(
                  `${url}${path}/${id}/change-status`,
                  {status : status2},
                  {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
              );
              console.log(response)
          } catch (error) {
              console.error("Error fetching package details:", error); // Log full error
              throw error; // Rethrow to handle in useQuery's error state
          }
      };