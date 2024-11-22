import axios from "axios";
import toast from "react-hot-toast";



  // Delete package function
export   const deleteCourse = async (id: number,refetch:()=>void) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    try {
      await axios.delete(
        `https://market-mentor.flexi-code.com/public/api/admin/courses/${id}/destroy`,
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
    export const fetchCourses = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    const response = await axios.get(
      'https://market-mentor.flexi-code.com/public/api/admin/courses',
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
                `https://market-mentor.flexi-code.com/public/api/admin/courses/${id}`,
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