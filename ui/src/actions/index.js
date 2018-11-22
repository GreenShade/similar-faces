export const updateComputing = (value) => ({
  type: "COMPUTING",
  value: value
});

export const newFaces = rects => ({
  type: "NEW_RECTS",
  value: rects
});

export const newFace = (base64Image, id) => ({
  type: "NEW_FACE",
  value: "data:image/webp;base64," + base64Image,
  id: id
});

export const newName = (name, id) => ({
  type: "NEW_NAME",
  value: name,
  id: id
});

export const updateVideoDimensions = dims => ({
  type: "VIDEO_DIMENSIONS",
  ...dims
});

export const updateVideoFrame = frame => ({
  type: "VIDEO_FRAME",
  video: frame.video,
  id: frame.id
});