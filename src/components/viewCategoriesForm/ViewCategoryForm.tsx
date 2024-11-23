import {
    Avatar,
    Box,
    Stack,
    TextField,
    useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IFormInput {
    name: {
        en: string;
        ar: string;
    };
    description: {
        en: string;
        ar: string;
    };
    image: FileList | string; // allow either FileList or URL string
 
}

function ViewCategoryForm({
    initialData,
}: {
    initialData?: {
        id: number;
        name: { en: string; ar: string };
        description: { en: string; ar: string };

        image: FileList | string; // allow either FileList or URL string

    };
}) {
    const { register, setValue } = useForm<IFormInput>();
    const theme = useTheme();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setValue('name.en', initialData.name.en);
            setValue('name.ar', initialData.name.ar);
    
            setValue('description.en', initialData.description?.en);
            setValue('description.ar', initialData.description?.ar);
            // Convert FileList to a URL if necessary
            if (initialData.image instanceof FileList && initialData.image.length > 0) {
                const url = URL.createObjectURL(initialData.image[0]);
                setImageUrl(url);
            } else if (typeof initialData.image === 'string') {
                setImageUrl(initialData.image); // assume image is a URL
            }
        }

        // Clean up URL object when component unmounts
        return () => {
            if (imageUrl) URL.revokeObjectURL(imageUrl);
        };
    }, [initialData, setValue, imageUrl]);

    return (
        <Box
            sx={{
                mt: { sm: 5, xs: 2.5 },width:"50%"
            }}
            component="form"
        >
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    variant="outlined"
                    id="names.ar"
                    type="text"
                    label="Name (Arabic)"
                    
                    sx={{ color: theme.palette.text.primary }}
                    {...register('name.ar')}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    id="names.en"
                    type="text"
                    label="Name (English)"
                    
                    sx={{ color: theme.palette.text.primary }}
                    {...register('name.en')}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    id="desc.ar"
                    type="text"
                    label="desc (Arabic)"
                    
                    sx={{ color: theme.palette.text.primary }}
                    {...register('description.ar')}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    id="desc.en"
                    type="text"
                    label="desc (English)"
                    
                    sx={{ color: theme.palette.text.primary }}
                    {...register('description.en')}
                />

                {imageUrl && (
                    <Avatar
                        src={imageUrl}
                        alt="desc Image"
                        sx={{ width: "100%", height: "40vh" }}
                    />
                )}
            </Stack>
        </Box>
    );
}

export default ViewCategoryForm;
