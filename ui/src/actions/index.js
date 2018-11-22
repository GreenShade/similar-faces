export const updateComputing = (value) => ({
  type: "COMPUTING",
  value: value
});

export const newFaces = rects => ({
  type: "NEW_FACES",
  value: rects
});

export const newFace = base64Image => ({
  type: "NEW_FACE",
  value: "data:image/webp;base64," + base64Image
});

export const newName = name => ({
  type: "NEW_NAME",
  value: name
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