import Button from "@/src/components/button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ActionsContainer, Address, Avatar, CardContainer, Content, IconContainer, StatusBadge, StatusText, Title, TopContent } from "./styles";

interface ServiceCardProps {
  title: string;
  address: string;
  status: string;
  avatarUrl?: string;

  showActions?: boolean;

  onAccept?: () => void;
  onReject?: () => void;
  onPress?: () => void;
}

const ServiceCard = ({
  title,
  address,
  status,
  avatarUrl,
  showActions = false,
  onAccept,
  onReject,
  onPress,
}: ServiceCardProps) => {
  return (
    <CardContainer activeOpacity={0.8} onPress={onPress}>
      <TopContent>
        <IconContainer>
          <MaterialCommunityIcons
            name="clipboard-outline"
            size={24}
            color="#FFF"
          />
        </IconContainer>

        <Content>
          <Title>{title}</Title>

          <Address numberOfLines={2}>
            {address}
          </Address>
        </Content>

        <StatusBadge status={status}>
          <StatusText status={status}>
            {status}
          </StatusText>
        </StatusBadge>
      </TopContent>

      {showActions && (
        <ActionsContainer>
          <Button
            mode="outlined"
            icon={() => (
              <MaterialCommunityIcons
                name="close"
                size={22}
                color="#6650A4"
              />
            )}
            onPress={onReject}
          >
            Recusar
          </Button>

          <Button
            mode="elevated"
            icon={() => (
              <MaterialCommunityIcons
                name="check"
                size={22}
                color="#fff"
              />
            )}
            onPress={onAccept}
          >
            Aceitar
          </Button>
        </ActionsContainer>
      )}
    </CardContainer>
  );
};

export default ServiceCard;