export const updateComputing = (value) => ({
  type: "COMPUTING",
  value: value
});

export const newFaces = rects => ({
  type: "NEW_RECTS",
  value: rects
});

export const newMembers = members => ({
  type: "NEW_MEMBERS",
  value: members
});

export const newProjections = (user, members) => ({
  type: "NEW_PROJECTIONS",
  user: user,
  members: members
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