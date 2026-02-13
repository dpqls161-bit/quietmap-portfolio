// src/mock/pins.mock.js

export const mockPins = [
  { id: 1, lat: 37.5665, lng: 126.9780, tags: ["조용한길"] },
  { id: 2, lat: 37.5651, lng: 126.9895, tags: ["골목", "산책"] },
];

export const mockPinDetail = (pinId) => ({
  id: pinId,
  image_url: "https://placehold.co/600x400?text=Quiet+Map",
  tags: ["조용한길", "산책", "카페근처"],
});
