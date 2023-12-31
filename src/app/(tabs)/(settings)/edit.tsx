import { View, Text, useColorScheme, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { IUser } from '../../../auth/interfaces/auth/IUser';
import { useAuthStore } from '../../../auth/store/authStore';
import { colorPalette } from '../../../theme/colors';
import { Controller, useForm } from 'react-hook-form';
import Loader from '../../../components/Loader';
import { Avatar, TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';
import { getBase64Web } from '../../../utils/getBase64Web';

type FormData = {
  name: string;
};

export default function EditScreen() {
  const user: IUser | null = useAuthStore((state) => state.user);

  const colorScheme = useColorScheme();
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light'];

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name,
    },
  });

  const onPressPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      if (result.assets.length === 1) {
        setIsLoading(true);

        const imageUri = result.assets[0].uri;

        const uriArray = imageUri.split('.');
        const fileExtension = uriArray[uriArray.length - 1];
        const fileMimeType = `${result.assets[0].type}/${fileExtension}`;
        // console.log(result.assets[0], fileMimeType);

        let base64: any;

        if (Platform.OS === 'web') {
          base64 = await getBase64Web(imageUri);
        } else {
          base64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
        }

        try {
          const response = await fetch(
            'https://soundset.webitup.pl/api/auth/picture',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${useAuthStore.getState().token}`,
              },
              body: JSON.stringify({
                picture:
                  Platform.OS === 'web'
                    ? base64
                    : `data:${fileMimeType};base64,${base64}`,
              }),
            }
          );
          const code = await response.status;
          // console.log('Code: ', code);

          if (code === 200) {
            useAuthStore.getState().setUser({ ...user, picture: imageUri });

            toast.show('Avatar changed successfully!', {
              type: 'success',
              placement: 'bottom',
              textStyle: { fontFamily: 'Kanit-Regular' },
              style: {
                borderRadius: 16,
                backgroundColor: colors.primary,
                marginBottom: 50,
              },
              animationType: 'slide-in',
            });
          }
        } catch (error) {
          toast.show('Something went wrong, try again later', {
            type: 'danger',
            placement: 'bottom',
            textStyle: { fontFamily: 'Kanit-Regular' },
            style: {
              borderRadius: 16,
              backgroundColor: colors.error,
              marginBottom: 50,
            },
            animationType: 'slide-in',
          });
          console.error(error);
        }
      } else {
        toast.show('You can only select one image', {
          type: 'danger',
          duration: 3000,
          placement: 'bottom',
          textStyle: { fontFamily: 'Kanit-Regular' },
          style: {
            borderRadius: 16,
            backgroundColor: colors.error,
            marginBottom: 50,
          },
          animationType: 'slide-in',
        });
      }
    } else {
      toast.show('No image selected', {
        type: 'danger',
        placement: 'bottom',
        textStyle: { fontFamily: 'Kanit-Regular' },
        style: {
          borderRadius: 16,
          backgroundColor: colors.error,
          marginBottom: 50,
        },
        animationType: 'slide-in',
      });
    }
    setIsLoading(false);
  };

  const onSaveName = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://soundset.webitup.pl/api/auth/name?name=${encodeURIComponent(
          data.name
        )}`,
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${useAuthStore.getState().token}`,
          },
        }
      );
      const code = await response.status;
      // console.log('Code: ', code);

      if (code === 200) {
        useAuthStore.getState().setUser({ ...user, name: data.name });

        toast.show('Name changed successfully!', {
          type: 'success',
          placement: 'bottom',
          animationType: 'slide-in',
        });
      }
    } catch (error) {
      toast.show('Something went wrong, try again later', {
        type: 'danger',
        placement: 'bottom',
        textStyle: { fontFamily: 'Kanit-Regular' },
        style: {
          borderRadius: 16,
          backgroundColor: colors.error,
          marginBottom: 50,
        },
        animationType: 'slide-in',
      });
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <View
        style={[styles.mainContainer, { backgroundColor: colors.contrast }]}
      >
        <TouchableOpacity onPress={onPressPicture}>
          <View style={{ marginBottom: 30 }}>
            {user?.picture ? (
              <Avatar.Image source={{ uri: user?.picture }} size={120} />
            ) : (
              <Avatar.Icon size={120} icon="account" />
            )}
          </View>
        </TouchableOpacity>

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Name is required',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Name"
              mode="outlined"
              style={{ width: '100%', maxWidth: 400 }}
              error={errors.name ? true : false}
              left={
                <TextInput.Icon icon={'account'} color={colors.cardContrast} />
              }
              textColor={colors.cardText}
              theme={{
                colors: {
                  primary: colors.secondary,
                  background: colors.contrast,
                },
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}

        <Button
          icon="check"
          mode="outlined"
          onPress={handleSubmit(onSaveName)}
          buttonColor={colors.secondary}
          textColor={colors.contrast}
          style={{
            width: '100%',
            maxWidth: 400,
            borderRadius: 4,
            marginTop: 20,
          }}
        >
          Save name
        </Button>
      </View>

      {isLoading && (
        <Loader color={colors.secondary} size={'large'} centered={true} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Kanit-Medium',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  errorText: {
    marginLeft: 5,
    color: '#D43232',
    width: '100%',
    maxWidth: 400,
  },
});
