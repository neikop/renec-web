import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { queryClient, videoService } from 'services';
import { CardVideo } from '.';

const PopupAddVideo = ({ onClose }: PopupController) => {
  const { control, handleSubmit, watch } = useForm<CreateVideoBody>({ mode: 'onChange' });
  const { url } = watch();

  const { data: videoInfo, isError } = useQuery(
    ['videoService.getVideoInfo', url],
    () => videoService.getVideoInfo({ format: 'json', url }),
    {
      enabled: !!url,
      keepPreviousData: true,
    },
  );

  const { mutate: createVideo, isLoading } = useMutation(videoService.createVideo, {
    onSuccess: () => {
      enqueueSnackbar('Add video successfully');
      queryClient.invalidateQueries(['videoService.fetchVideos']);
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      if (!isError)
        createVideo({
          ...values,
          ...videoInfo,
        });
    })();
  };

  return (
    <>
      <DialogTitle>Add YouTube Video</DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <CardVideo videoInfo={videoInfo} />
          </Grid>
          <Grid item sm={12}>
            <Controller
              name='url'
              defaultValue=''
              control={control}
              rules={{
                required: 'YouTube Video URL is required',
              }}
              render={({ field, fieldState: { error, invalid } }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label='URL'
                  placeholder='https://www.youtube.com/watch?v=VIDEO_ID'
                  error={invalid || isError}
                  helperText={error?.message ?? (isError ? 'YouTube Video URL is not valid' : '')}
                  sx={{
                    marginBottom: 3,
                    '.MuiFormHelperText-root': {
                      position: 'absolute',
                      bottom: -24,
                    },
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <LoadingButton variant='outlined' color='inherit' onClick={onClose}>
          Cancel
        </LoadingButton>
        <LoadingButton variant='contained' color='success' loading={isLoading} onClick={handleClickSubmit}>
          Confirm
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default PopupAddVideo;
