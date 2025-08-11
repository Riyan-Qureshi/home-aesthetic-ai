import { Dimensions } from "react-native";
import images from "./images";


export const RESPONSIVE_SCREEN_WIDTH = Dimensions.get('window').width * 0.9;
export const RESPONSIVE_SCREEN_HEIGHT = Dimensions.get('window').height * 0.9;

export enum textSize {
    small = 'text-sm',
    medium = 'text-md',
    large = 'text-lg',
    xl = 'text-xl'
}

export const FEATURED_DATA = [
  {
    title: 'Interior Design',
    description: 'Upload a pic, choose a style, let AI design the room!',
    staticImage: images.cartoonRoom,
    beforeImage: images.beforeLivingRoom1,
    afterImage: images.cartoonRoom,
  },
  {
    title: 'Garden Design',
    description: 'Upload a pic, choose a style, let AI design the room!',
    staticImage: images.garden,
    beforeImage: images.beforeLivingRoom1,
    afterImage: images.garden,
  },
  {
    title: 'Reference Style',
    description: 'Upload a pic, choose a style, let AI design the room!',
    staticImage: images.medievalRoom,
    beforeImage: images.beforeBedroom,
    afterImage: images.medievalRoom,
  },
]

export const ROOM_DATA = [
    { name: "Kitchen", icon: "silverware-fork-knife" }, 
    { name: "Home Office", icon: "desk-lamp" }, 
    { name: "Living Room", icon: "sofa" }, 
    { name: "Bedroom", icon: "bed-king" },
    { name: 'Bathroom', icon: "bathtub" },
    { name: 'Dining Room', icon: "table-furniture" },
    { name: 'Study Room', icon: "bookshelf" },
    { name: 'Gaming Room', icon: "gamepad-variant" },
    { name: 'Office', icon: "office-building" },
    { name: 'Attic', icon: "home-roof" },
    { name: 'Toilet', icon: "toilet"},
    { name: 'Balcony', icon: 'balcony'},
    { name: 'Restaurant', icon: 'chef-hat' },
    { name: 'Patio', icon: 'patio-heater' }
]

export const STYLE_DATA = [
    { name: "Cyberpunk", image: images.cyberpunkRoom }, 
    { name: "Rustic", image: images.rusticRoom }, 
    { name: "Modern", image: images.modernRoom }, 
    { name: "Minimalistic", image: images.minimalisticRoom },
    { name: 'Bohemian', image: images.bohemianRoom },
    { name: 'Vintage', image: images.vintageRoom },
    { name: 'Baroque', image: images.baroqueRoom },
    { name: 'Mediterranean', image: images.mediterraneanRoom },
    { name: 'Tropical', image: images.tropicalRoom },
    { name: 'Biophilic', image: images.biophilicRoom },
    { name: 'Egyptian', image: images.egyptianRoom },
    { name: 'Airbnb', image: images.airbnbRoom },
    { name: 'Discotheque', image: images.discothequeRoom },
    { name: 'Soho Style', image: images.sohoRoom },
    { name: 'Rainbow', image: images.rainbowRoom },
    { name: 'Luxury', image: images.luxuryRoom },
    { name: 'Technoland', image: images.technolandRoom },
    { name: 'Gamer', image: images.gamerRoom },
    { name: 'Cozy', image: images.cozyRoom },
    { name: 'Coastal', image: images.coastalRoom },
    { name: 'Japandi', image: images.japandiRoom },
    { name: 'Cottagecore', image: images.cottagecoreRoom },
    { name: 'Ski Chalet', image: images.skiChaletRoom },
    { name: 'Gothic', image: images.gothicRoom },
    { name: 'Creepy', image: images.creepyRoom },
    { name: 'Medieval', image: images.medievalRoom },
    { name: '80s Style', image: images.eightiesRoom },
    { name: 'Cartoon', image: images.cartoonRoom },
    { name: 'Wood', image: images.woodRoom },
    { name: 'Chocolate', image: images.chocolateRoom },
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