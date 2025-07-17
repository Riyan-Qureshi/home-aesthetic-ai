/// Holds the form data required for image generation

let imageUri: string | undefined;

export const setImageUri = (uri: string) => {
  imageUri = uri;
};

export const getImageUri = (): string | undefined => {
  return imageUri;
};

export const clearImageUri = () => {
  imageUri = undefined;
};

let roomType: string

export const setRoomType = (type: string) => {
    roomType = type;
}

export const getRoomType = () => {
    return roomType
}

let roomAesthetic: string;

export const setAesthetic = (aesthetic: string) => {
    roomAesthetic = aesthetic;
}

export const getAesthetic = () => {
    return roomAesthetic;
}