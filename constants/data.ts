import { Dimensions } from "react-native";
import icons from "./icons";


export const RESPONSIVE_SCREEN_WIDTH = Dimensions.get('window').width * 0.9;
export const RESPONSIVE_SCREEN_HEIGHT = Dimensions.get('window').height * 0.9;

export enum textSize {
    small = 'text-sm',
    medium = 'text-md',
    large = 'text-lg',
    xl = 'text-xl'
}

export const ROOM_DATA = [
    { name: "Kitchen", icon: icons.cutlery }, 
    { name: "Home Office", icon: icons.home }, 
    { name: "Living Room", icon: icons.people }, 
    { name: "Bedroom", icon: icons.bed },
    { name: 'Bathroom', icon: icons.bath },
    { name: 'Dining Room', icon: icons.cutlery },
    { name: 'Study Room', icon: icons.edit },
    { name: 'Gaming Room', icon: icons.play },
    { name: 'Office', icon: icons.area },
    { name: 'Attic', icon: icons.area }
]

export const STYLE_DATA = [
    { name: "Cyberpunk", icon: icons.cutlery }, 
    { name: "Rustic", icon: icons.home }, 
    { name: "Modern", icon: icons.people }, 
    { name: "Minimalistic", icon: icons.bed },
    { name: 'Bohemian', icon: icons.bath },
    { name: 'Vintage', icon: icons.cutlery },
    { name: 'Baroque', icon: icons.edit },
    { name: 'Mediterranean', icon: icons.play }
]

export const buttonShadowStyle = {
    borderWidth: 2,
    borderColor: '#8C8E983a',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
}