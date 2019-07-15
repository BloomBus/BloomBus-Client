export enum CarouselMode {
  Collapsed, // Default state, user can swipe through loops
  Expanded, // User has clicked on carousel card, expand to show list of stops
  Hidden, // User hit the mode button while in 'Collapsed' mode, carousel now hidden
}

export default CarouselMode;