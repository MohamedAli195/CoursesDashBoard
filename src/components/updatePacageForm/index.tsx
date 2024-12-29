import { Box, Button, Stack, TextField } from '@mui/material';
import axios from 'axios';
import InputFileUpload from 'components/UploadImage';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { CloudUpload } from 'lucide-react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface IFormInput {
  name: {
    en: string;
    ar: string;
  };
  image: FileList | null;
  price: string;
}

function UpdatePackageForm({
  handleClose,
  initialData,
  refetch,
}: {
  handleClose: () => void;
  refetch: () => void;
  initialData?: null | {
    id: number;
    nameAr: string;
    nameEn: string;
    price: string;
    imageUrl: string;
  };
}) {
  const { register, setValue, handleSubmit, watch } = useForm<IFormInput>();
  const { t } = useTranslation();
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.imageUrl || null);
  const selectedImage = watch('image');

  useEffect(() => {
    if (initialData) {
      setValue('name.en', initialData.nameEn);
      setValue('name.ar', initialData.nameAr);
      setValue('price', initialData.price);
    }
  }, [initialData, setValue]);

  useEffect(() => {
    if (selectedImage && selectedImage.length > 0) {
      const file = selectedImage[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [selectedImage]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name[en]', data.name.en);
      formData.append('name[ar]', data.name.ar);
      formData.append('price', data.price);

      if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0]);
      }

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(
        `https://market-mentor.flexi-code.com/public/api/admin/packages/${initialData?.id}/update`,
        formData,
        { headers },
      );

      toast.success(t('Package updated successfully'));
      refetch();
      handleClose();
    } catch (err) {
      console.error('Error updating package:', err);
      toast.error(t('Failed to update package, please check your input.'));
    }
  };

  return (
    <Box
      sx={{
        mt: { sm: 5, xs: 2.5 },
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3}>
        <TextField
          fullWidth
          variant="outlined"
          id="name-ar"
          type="text"
          label={t('ArabicName')}
          {...register('name.ar', { required: t('ArabicNameReq') })}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="name-en"
          type="text"
          label={t('EnglishName')}
          {...register('name.en', { required: t('EnglishNameReq') })}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="price"
          type="text"
          label={t('price')}
          {...register('price', { required: t('priceReq2') })}
        />
        {/* <TextField
          fullWidth
          variant="outlined"
          id="image"
          type="file"
          label={t('image')}
          InputLabelProps={{ shrink: true }}
          inputProps={{ accept: 'image/*' }}
          {...register('image')}
        /> */}
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudUpload />}
          
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            {...register('image')}
            multiple
          />
        </Button>

        {previewImage && (
          <Box sx={{ mt: 2 }}>
            <img
              src={previewImage}
              alt={t('Preview')}
              style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'cover' }}
            />
          </Box>
        )}
      </Stack>

      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        sx={{ mt: 3, fontSize: '18px' }}
      >
        {t('UpdatePackage')}
      </Button>
    </Box>
  );
}

export default UpdatePackageForm;
