import styled from "styled-components/native";

export const CardContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  background: #dcebf2;
  margin-bottom: 12px;
`;

export const TopContent = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
`

export const IconContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 36px;
  background: #8db9cf;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
  margin-left: 16px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
`;

export const Address = styled.Text`
  margin-top: 4px;
  font-size: 12px;
  color: #374151;
`;

export const StatusBadge = styled.View<{ status: string }>`
  padding: 8px 16px;
  border-radius: 50px;

  background-color: ${({ status }) =>
    status === "Pendente"
      ? "#F0C266"
      : status === "Finalizado"
      ? "#CBEFCC"
      : "#BDE7F5"};
`;

export const StatusText = styled.Text<{ status: string }>`
  font-size: 12px;
  font-weight: 500;

  color: ${({ status }) =>
    status === "Pendente"
      ? "#946200"
      : "#1F6F8B"};
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 20px;
`;

export const Avatar = styled.Image`
  width: 26px;
  height: 26px;
  border-radius: 18px;

  position: absolute;
  right: 18px;
  bottom: 70px;
`;