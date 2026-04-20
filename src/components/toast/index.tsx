import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Description, ErrorToast, SuccessToast, TextWrapper, Title, WarningToast } from './styles';
import { IconButton } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export interface ToastConfigParams {
  text1?: string;
  text2?: string;
}

export const toastConfig = {
  success: ({ text1, text2 }: ToastConfigParams) => (
    <SuccessToast>
      <MaterialCommunityIcons name="check-circle" size={24} color="#fff" />
      <TextWrapper>
        <Title>{text1}</Title>
        {text2 && <Description>{text2}</Description>}
      </TextWrapper>
      <IconButton icon='close' iconColor='#fff' onPress={() => Toast.hide()}/>
    </SuccessToast>
  ),

  error: ({ text1, text2 }: ToastConfigParams) => (
    <ErrorToast>
      <MaterialCommunityIcons name="close-circle" size={24} color="#fff" />
      <TextWrapper>
        <Title>{text1}</Title>
        {text2 && <Description>{text2}</Description>}
      </TextWrapper>
      <IconButton icon='close' iconColor='#fff' onPress={() => Toast.hide()}/>
    </ErrorToast>
  ),

  info: ({ text1, text2 }: ToastConfigParams) => (
    <WarningToast>
      <MaterialCommunityIcons name="information" size={24} color="#fff" />
      <TextWrapper>
        <Title>{text1}</Title>
        {text2 && <Description>{text2}</Description>}
      </TextWrapper>
      <IconButton icon='close' iconColor='#fff' onPress={() => Toast.hide()}/>
    </WarningToast>
  ),
};