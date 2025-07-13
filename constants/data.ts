import icons from "./icons";

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
    { name: 'Gaming Room', icon: icons.play }
]