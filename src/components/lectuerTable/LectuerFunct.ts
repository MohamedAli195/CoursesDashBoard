import axios from "axios";
import i18n from "i18n";
import toast from "react-hot-toast";



  // Delete package function
export   const deleteLectuer = async (id: number,refetch:()=>void) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    try {
      await axios.delete(
        `https://market-mentor.flexi-code.com/public/api/admin/course-lectures/${id}/destroy`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(`Lectuer with ID ${id} deleted successfully`); 
      refetch()
    } catch (error) {
      console.error('Failed to delete Lectuer:', error);
      toast.error('Error deleting Lectuer');
    }
  };


    /// Api requestes
    export const fetchLectuers = async (id:string|undefined,page=1,perpage=1,search='',sort_dir='') => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    const response = await axios.get(
      `https://market-mentor.flexi-code.com/public/api/admin/course-lectures/course/${id}?per_page=${perpage}&page=${page}&search=${search}&sort_direction=${sort_dir}`,
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
      export const fetchLectuer = async (id:string|undefined) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authorization token is missing");
    
        try {
            const response = await axios.get(
                `https://market-mentor.flexi-code.com/public/api/admin/course-lectures/${id}`,
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